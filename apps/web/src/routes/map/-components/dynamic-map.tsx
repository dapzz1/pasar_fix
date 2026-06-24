import type React from 'react';
import { useEffect, useState } from 'react';
import { GeoJSON, MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Trans, useLingui } from '@lingui/react/macro';
import L from 'leaflet';
import { Layers3, Map as MapIcon, Store } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  loadProvinceGeoJSON,
  loadRegencyGeoJSON,
} from '../../../lib/utils/geojson-utils';
import type { AdministrativeLevel } from '../-app/administrative-boundaries-service';
import ChoroplethMap from './choropleth-map';
import StallMarkers from './stall-markers';

interface MapViewState {
  center: [number, number];
  zoom: number;
}

interface FilterCriteria {
  productTypes?: string[];
  productBrands?: string[];
  landTypes?: string[];
  commodityTypes?: string[];
  timeRange?: { start: Date; end: Date };
  administrativeRegion?: string;
}

interface DynamicMapProps {
  administrativeLevel: AdministrativeLevel;
  selectedProductBrand?: string;
  selectedLandType?: string;
  selectedCommodityType?: string;
  year?: string;
  filters?: FilterCriteria;
  onMapViewChange?: (viewState: MapViewState) => void;
}

const loadBoundaryData = async (
  administrativeLevel: AdministrativeLevel,
  administrativeBoundaryCode?: string
): Promise<GeoJSON.GeoJSON | null> => {
  if (!administrativeBoundaryCode && administrativeLevel !== 'national') {
    return null;
  }

  if (administrativeLevel === 'province' && administrativeBoundaryCode) {
    return loadProvinceGeoJSON(administrativeBoundaryCode);
  }
  if (administrativeLevel === 'regency' && administrativeBoundaryCode) {
    return loadRegencyGeoJSON(administrativeBoundaryCode);
  }

  const response = await fetch('/data/indonesia-boundary.geojson');
  if (!response.ok) {
    throw new Error(
      `Failed to load national boundaries: ${response.statusText}`
    );
  }
  return response.json() as Promise<GeoJSON.GeoJSON>;
};

const MapViewHandler: React.FC<{
  onMapViewChange?: (viewState: MapViewState) => void;
}> = ({ onMapViewChange }) => {
  const map = useMap();

  useEffect(() => {
    if (onMapViewChange) {
      const handleMoveEnd = () => {
        const center = map.getCenter();
        const zoom = map.getZoom();
        onMapViewChange({
          center: [center.lat, center.lng],
          zoom,
        });
      };

      map.on('moveend', handleMoveEnd);
      return () => {
        map.off('moveend', handleMoveEnd);
      };
    }
  }, [map, onMapViewChange]);

  return null;
};

const BoundaryDisplay: React.FC<{
  administrativeLevel: AdministrativeLevel;
  administrativeBoundaryCode?: string;
}> = ({ administrativeLevel, administrativeBoundaryCode }) => {
  const [boundaryData, setBoundaryData] = useState<GeoJSON.GeoJSON | null>(
    null
  );
  const map = useMap();

  useEffect(() => {
    const loadBoundary = async () => {
      try {
        setBoundaryData(
          await loadBoundaryData(
            administrativeLevel,
            administrativeBoundaryCode
          )
        );
      } catch {
        setBoundaryData(null);
      }
    };

    loadBoundary();
  }, [administrativeLevel, administrativeBoundaryCode]);

  useEffect(() => {
    if (boundaryData) {
      const bounds = L.geoJSON(boundaryData).getBounds();
      if (bounds.isValid()) {
        map.fitBounds(bounds, { animate: true, maxZoom: 12 });
      }
    }
  }, [boundaryData, map]);

  if (!boundaryData) {
    return null;
  }

  const boundaryStyle: L.PathOptions = {
    fillColor: '#0d9488',
    weight: 2,
    opacity: 1,
    color: '#065f46',
    dashArray: '3',
    fillOpacity: 0.15,
  };

  return <GeoJSON data={boundaryData} style={boundaryStyle} />;
};

export default function DynamicMap({
  administrativeLevel,
  selectedProductBrand,
  selectedLandType,
  selectedCommodityType,
  year,
  filters,
  onMapViewChange,
}: DynamicMapProps) {
  const { t } = useLingui();
  const [showStallMarkers, setShowStallMarkers] = useState<boolean>(false);
  const [showChoropleth, setShowChoropleth] = useState<boolean>(false);
  const [choroplethLoading, setChoroplethLoading] = useState<boolean>(false);
  const center: [number, number] = [-0.7893, 113.9213];
  const zoom = administrativeLevel === 'regency' ? 10 : 7;

  let administrativeCode: string | undefined;
  if (administrativeLevel !== 'national' && filters?.administrativeRegion) {
    administrativeCode = filters.administrativeRegion;
  }

  return (
    <div className="relative h-full w-full overflow-hidden bg-slate-100">
      <div className="pointer-events-none absolute top-3 right-3 left-3 z-[1000] flex items-start justify-between gap-3">
        <div className="pointer-events-auto hidden items-center gap-2 rounded-lg border border-emerald-300/20 bg-[#082c1d]/90 px-3 py-2 text-white shadow-lg backdrop-blur md:flex">
          <MapIcon className="size-4 text-emerald-300" />
          <span className="font-medium text-xs">Marketing Potential Map</span>
        </div>
        <div className="pointer-events-auto ml-auto flex flex-wrap justify-end gap-2">
          <Button
            aria-pressed={showStallMarkers}
            className={
              showStallMarkers
                ? 'border-emerald-700 bg-[#082c1d] text-emerald-200 hover:bg-[#0d3a25] hover:text-white'
                : 'border-slate-200 bg-white/95 text-slate-700 shadow-md hover:bg-white'
            }
            onClick={() => setShowStallMarkers((v) => !v)}
            size="sm"
            variant="outline"
          >
            <Store className="mr-1.5 size-3.5" />
            {showStallMarkers ? t`Hide Kios` : t`Show Kios`}
          </Button>
          <Button
            aria-pressed={showChoropleth}
            className={
              showChoropleth
                ? 'border-emerald-700 bg-[#082c1d] text-emerald-200 hover:bg-[#0d3a25] hover:text-white'
                : 'border-slate-200 bg-white/95 text-slate-700 shadow-md hover:bg-white'
            }
            onClick={() => setShowChoropleth((v) => !v)}
            size="sm"
            variant="outline"
          >
            <Layers3 className="mr-1.5 size-3.5" />
            {showChoropleth ? t`Hide Potential` : t`Show Potential`}
          </Button>
          {choroplethLoading && (
            <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-white/95 px-3 py-1.5 text-slate-600 text-xs shadow-md">
              <svg aria-hidden height="18" viewBox="0 0 50 50" width="18">
                <title>Loading potential layer</title>
                <circle
                  cx="25"
                  cy="25"
                  fill="none"
                  r="20"
                  stroke="#0ea5a4"
                  strokeDasharray="31.4 31.4"
                  strokeLinecap="round"
                  strokeWidth="4"
                >
                  <animateTransform
                    attributeName="transform"
                    dur="1s"
                    from="0 25 25"
                    repeatCount="indefinite"
                    to="360 25 25"
                    type="rotate"
                  />
                </circle>
              </svg>
              <Trans>Loading...</Trans>
            </div>
          )}
        </div>
      </div>
      <MapContainer
        center={center}
        data-testid="dynamic-map"
        style={{ height: '100%', width: '100%' }}
        zoom={zoom}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <BoundaryDisplay
          administrativeBoundaryCode={administrativeCode}
          administrativeLevel={administrativeLevel}
        />
        {showChoropleth && (
          <ChoroplethMap
            commodityTypeId={selectedCommodityType}
            landTypeId={selectedLandType}
            onLoadingChange={setChoroplethLoading}
            productBrandId={selectedProductBrand}
            year={year}
          />
        )}
        {showStallMarkers && (
          <StallMarkers filters={filters} showStallMarkers={showStallMarkers} />
        )}
        <MapViewHandler onMapViewChange={onMapViewChange} />
      </MapContainer>
    </div>
  );
}
