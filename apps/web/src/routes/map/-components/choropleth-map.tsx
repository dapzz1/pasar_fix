import { useQuery } from '@tanstack/react-query';
import L from 'leaflet';
import type React from 'react';
import { useEffect, useMemo } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import { orpc } from '@/lib/orpc/client';

interface ChoroplethMapProps {
  productBrandId?: string;
  landTypeId?: string;
  commodityTypeId?: string;
  onLoadingChange?: (loading: boolean) => void;
  provinceId?: string;
  year?: string;
}

interface ProvinceProperties {
  [key: string]: unknown;
  code?: string | number;
  name?: string;
  potential?: number | null;
  metricName?: string | null;
  metricType?: string | null;
  metricUnit?: string | null;
  provinceCode?: string;
}

interface PotentialMetadata {
  potential: number;
  metricName: string;
  metricType: string;
  metricUnit: string;
}

type ProvinceFeature = Parameters<
  NonNullable<L.GeoJSONOptions<ProvinceProperties>['onEachFeature']>
>[0];

interface ProvinceFeatureCollection {
  features: ProvinceFeature[];
  type: 'FeatureCollection';
}

type ProductPotentialRow = {
  potential: number | null;
  productBrandName: string;
  provinceCode: string;
};

type ProvinceLandRow = {
  area: number | null;
  landTypeName: string;
  provinceCode: string;
};

type ProvinceCommodityRow = {
  area: number | null;
  commodityTypeName: string;
  provinceCode: string;
};

const COLOR_SCALE = [
  '#ffffb2',
  '#fed976',
  '#fd8d3c',
  '#f03b20',
  '#bd0026',
] as const;
const NO_DATA_COLOR = '#e5e7eb';

const normalizeProvinceCode = (value: string | number | null | undefined) =>
  String(value ?? '').trim();

const addMetadata = (
  target: Map<string, PotentialMetadata>,
  provinceCode: string,
  metadata: PotentialMetadata
) => {
  const existing = target.get(provinceCode);
  target.set(provinceCode, {
    ...metadata,
    potential: (existing?.potential ?? 0) + metadata.potential,
  });
};

const addProductPotentials = (
  target: Map<string, PotentialMetadata>,
  rows: ProductPotentialRow[]
) => {
  for (const row of rows) {
    const provinceCode = normalizeProvinceCode(row.provinceCode);
    if (provinceCode) {
      addMetadata(target, provinceCode, {
        potential: Number(row.potential ?? 0),
        metricName: row.productBrandName,
        metricType: 'Product potential',
        metricUnit: 'ton',
      });
    }
  }
};

const addProvinceLands = (
  target: Map<string, PotentialMetadata>,
  rows: ProvinceLandRow[]
) => {
  for (const row of rows) {
    const provinceCode = normalizeProvinceCode(row.provinceCode);
    if (provinceCode) {
      addMetadata(target, provinceCode, {
        potential: Number(row.area ?? 0),
        metricName: row.landTypeName,
        metricType: 'Land area',
        metricUnit: 'km²',
      });
    }
  }
};

const addProvinceCommodities = (
  target: Map<string, PotentialMetadata>,
  rows: ProvinceCommodityRow[]
) => {
  for (const row of rows) {
    const provinceCode = normalizeProvinceCode(row.provinceCode);
    if (provinceCode) {
      addMetadata(target, provinceCode, {
        potential: Number(row.area ?? 0),
        metricName: row.commodityTypeName,
        metricType: 'Commodity area',
        metricUnit: 'km²',
      });
    }
  }
};

const enrichFeatures = (
  source: ProvinceFeatureCollection,
  metadataByCode: Map<string, PotentialMetadata>
) => {
  const features = source.features.map((feature) => {
    const properties = feature.properties ?? {};
    const provinceCode = normalizeProvinceCode(properties.code);
    const metadata = metadataByCode.get(provinceCode);

    return {
      ...feature,
      properties: {
        ...properties,
        potential: metadata?.potential ?? null,
        metricName: metadata?.metricName ?? null,
        metricType: metadata?.metricType ?? null,
        metricUnit: metadata?.metricUnit ?? null,
        provinceCode,
      },
    };
  });
  const values = features.flatMap((feature) =>
    typeof feature.properties.potential === 'number'
      ? [feature.properties.potential]
      : []
  );

  return {
    type: 'FeatureCollection' as const,
    features,
    stats: {
      min: values.length > 0 ? Math.min(...values) : 0,
      max: values.length > 0 ? Math.max(...values) : 0,
    },
  };
};

const isProvinceFeatureCollection = (
  value: unknown
): value is ProvinceFeatureCollection => {
  if (!(value && typeof value === 'object')) {
    return false;
  }

  const candidate = value as {
    type?: unknown;
    features?: unknown;
  };
  return (
    candidate.type === 'FeatureCollection' && Array.isArray(candidate.features)
  );
};

const getColor = (value: number, min: number, max: number) => {
  if (max === min) {
    return COLOR_SCALE.at(-1) ?? COLOR_SCALE[0];
  }

  const ratio = (value - min) / (max - min);
  const index = Math.min(
    COLOR_SCALE.length - 1,
    Math.floor(ratio * COLOR_SCALE.length)
  );
  return COLOR_SCALE[index];
};

const createLegendRow = (color: string, label: string) => {
  const row = L.DomUtil.create('div');
  row.style.alignItems = 'center';
  row.style.display = 'flex';
  row.style.marginBottom = '6px';

  const swatch = L.DomUtil.create('i', '', row);
  swatch.style.background = color;
  swatch.style.border = '1px solid #ccc';
  swatch.style.display = 'inline-block';
  swatch.style.height = '14px';
  swatch.style.marginRight = '8px';
  swatch.style.width = '18px';

  const text = L.DomUtil.create('span', '', row);
  text.textContent = label;
  return row;
};

const ChoroplethMap: React.FC<ChoroplethMapProps> = ({
  commodityTypeId,
  landTypeId,
  productBrandId,
  provinceId,
  year,
  onLoadingChange,
}) => {
  const map = useMap();
  const selectedYear = year === 'all' ? undefined : year;
  const productPotentials = useQuery({
    ...orpc.admin.potential.province_potential.get.queryOptions({
      input: { productBrandId, provinceId, year: selectedYear },
    }),
    enabled: Boolean(productBrandId),
  });
  const provinceLands = useQuery({
    ...orpc.admin.land.province_land.get.queryOptions({
      input: { landTypeId, provinceId, year: selectedYear },
    }),
    enabled: Boolean(landTypeId),
  });
  const provinceCommodities = useQuery({
    ...orpc.admin.commodity.province_commodity.get.queryOptions({
      input: { commodityTypeId, provinceId, year: selectedYear },
    }),
    enabled: Boolean(commodityTypeId),
  });
  const geoJsonData = useQuery({
    queryKey: ['indonesia-geojson'],
    queryFn: async () => {
      const response = await fetch('/data/indonesia-boundary.geojson');
      if (!response.ok) {
        throw new Error('Failed to load map data');
      }

      const data: unknown = await response.json();
      if (!isProvinceFeatureCollection(data)) {
        throw new Error('Invalid province map data');
      }
      return data;
    },
    staleTime: Number.POSITIVE_INFINITY,
    refetchOnWindowFocus: false,
  });

  const enriched = useMemo(() => {
    if (!geoJsonData.data) {
      return null;
    }

    const potentialsByCode = new Map<string, PotentialMetadata>();
    if (productBrandId) {
      addProductPotentials(
        potentialsByCode,
        productPotentials.data?.data ?? []
      );
    } else if (landTypeId) {
      addProvinceLands(potentialsByCode, provinceLands.data?.data ?? []);
    } else if (commodityTypeId) {
      addProvinceCommodities(
        potentialsByCode,
        provinceCommodities.data?.data ?? []
      );
    }
    return enrichFeatures(geoJsonData.data, potentialsByCode);
  }, [
    commodityTypeId,
    geoJsonData.data,
    landTypeId,
    productBrandId,
    productPotentials.data,
    provinceCommodities.data,
    provinceLands.data,
  ]);

  const geoKey = useMemo(() => {
    if (!enriched) {
      return 'empty';
    }

    const featureValues = enriched.features
      .map(
        (feature) =>
          `${feature.properties.provinceCode}:${String(feature.properties.potential ?? 'none')}`
      )
      .join('|');
    return `${productBrandId ?? landTypeId ?? commodityTypeId ?? 'all'}:${provinceId ?? 'all'}:${year ?? 'all'}:${featureValues}`;
  }, [commodityTypeId, enriched, landTypeId, productBrandId, provinceId, year]);

  useEffect(() => {
    onLoadingChange?.(
      productPotentials.isLoading ||
        provinceLands.isLoading ||
        provinceCommodities.isLoading ||
        geoJsonData.isLoading ||
        !enriched
    );
  }, [
    enriched,
    geoJsonData.isLoading,
    onLoadingChange,
    productPotentials.isLoading,
    provinceCommodities.isLoading,
    provinceLands.isLoading,
  ]);

  useEffect(() => {
    if (!enriched) {
      return;
    }

    const { min, max } = enriched.stats;
    const steps = COLOR_SCALE.length;
    const formatter = new Intl.NumberFormat();
    const legend = new L.Control({ position: 'bottomright' });

    legend.onAdd = () => {
      const container = L.DomUtil.create(
        'div',
        'info legend bg-white p-2 rounded shadow text-xs'
      );
      const interval = max === min ? 0 : (max - min) / (steps - 1);

      let index = 0;
      while (index < steps) {
        const fromValue = min + index * interval;
        const nextValue = min + (index + 1) * interval;
        const label =
          index < steps - 1
            ? `${formatter.format(Math.round(fromValue))} – ${formatter.format(Math.round(nextValue))}`
            : `≥ ${formatter.format(Math.round(fromValue))}`;
        container.append(createLegendRow(getColor(fromValue, min, max), label));
        index += 1;
      }

      container.append(createLegendRow(NO_DATA_COLOR, 'No data'));
      return container;
    };

    legend.addTo(map);
    return () => {
      legend.remove();
    };
  }, [enriched, map]);

  if (!enriched) {
    return null;
  }

  const style = (feature?: ProvinceFeature): L.PathOptions => {
    const potential = feature?.properties.potential;
    return {
      color: '#444',
      dashArray: '1',
      fillColor:
        typeof potential === 'number'
          ? getColor(potential, enriched.stats.min, enriched.stats.max)
          : NO_DATA_COLOR,
      fillOpacity: 0.8,
      opacity: 1,
      weight: 1,
    };
  };

  const onEachFeature = (feature: ProvinceFeature, layer: L.Layer) => {
    const name =
      typeof feature.properties.name === 'string'
        ? feature.properties.name
        : 'Unknown';
    const metricName = feature.properties.metricName ?? 'No selected data';
    const metricType = feature.properties.metricType ?? 'Value';
    const metricUnit = feature.properties.metricUnit ?? '';
    const potential = feature.properties.potential;
    const potentialText =
      typeof potential === 'number'
        ? `${potential.toLocaleString()} ${metricUnit}`.trim()
        : 'No data';
    const popup = L.DomUtil.create('div');
    const title = L.DomUtil.create('strong', '', popup);
    title.textContent = name;
    popup.append(document.createElement('br'));
    popup.append(`${metricType}: ${metricName}`);
    popup.append(document.createElement('br'));
    popup.append(`Value: ${potentialText}`);
    layer.bindPopup(popup);
  };

  return (
    <GeoJSON
      data={enriched}
      key={geoKey}
      onEachFeature={onEachFeature}
      style={style}
    />
  );
};

export default ChoroplethMap;
