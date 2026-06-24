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
  year?: string;
}

interface ProvinceProperties {
  [key: string]: unknown;
  code?: string | number;
  name?: string;
  potential?: number | null;
  productBrandId?: string | null;
  productBrandName?: string | null;
  provinceCode?: string;
}

interface PotentialMetadata {
  potential: number;
  productBrandId: string;
  productBrandName: string;
}

type ProvinceFeature = Parameters<
  NonNullable<L.GeoJSONOptions<ProvinceProperties>['onEachFeature']>
>[0];

interface ProvinceFeatureCollection {
  features: ProvinceFeature[];
  type: 'FeatureCollection';
}

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
  productBrandId,
  year,
  onLoadingChange,
}) => {
  const map = useMap();
  const potentialsData = useQuery(
    orpc.admin.potential.province_potential.get.queryOptions({
      input: { productBrandId, year },
    })
  );
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
    for (const row of potentialsData.data?.data ?? []) {
      const provinceCode = normalizeProvinceCode(row.provinceCode);
      if (!provinceCode) {
        continue;
      }

      potentialsByCode.set(provinceCode, {
        potential: Number(row.potential ?? 0),
        productBrandId: row.productBrandId,
        productBrandName: row.productBrandName,
      });
    }

    const features = geoJsonData.data.features.map((feature) => {
      const properties = feature.properties ?? {};
      const provinceCode = normalizeProvinceCode(properties.code);
      const metadata = potentialsByCode.get(provinceCode);

      return {
        ...feature,
        properties: {
          ...properties,
          potential: metadata?.potential ?? null,
          productBrandId: metadata?.productBrandId ?? null,
          productBrandName: metadata?.productBrandName ?? null,
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
  }, [geoJsonData.data, potentialsData.data]);

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
    return `${productBrandId ?? 'all'}:${year ?? 'all'}:${featureValues}`;
  }, [enriched, productBrandId, year]);

  useEffect(() => {
    onLoadingChange?.(
      potentialsData.isLoading || geoJsonData.isLoading || !enriched
    );
  }, [
    enriched,
    geoJsonData.isLoading,
    onLoadingChange,
    potentialsData.isLoading,
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
    const productBrandName =
      feature.properties.productBrandName ?? 'No product data';
    const potential = feature.properties.potential;
    const potentialText =
      typeof potential === 'number'
        ? `${potential.toLocaleString()} ton`
        : 'No data';
    const popup = L.DomUtil.create('div');
    const title = L.DomUtil.create('strong', '', popup);
    title.textContent = name;
    popup.append(document.createElement('br'));
    popup.append(`Product: ${productBrandName}`);
    popup.append(document.createElement('br'));
    popup.append(`Product Potential: ${potentialText}`);
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
