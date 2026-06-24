import type React from 'react';
import { useEffect, useState } from 'react';
import { GeoJSON, MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Trans, useLingui } from '@lingui/react/macro';
import L from 'leaflet';
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

const MapViewHandler: React.FC<{
  onMapViewChange?: (viewState: MapViewState) => void;
}> = ({ onMapViewChange }) => {
  const map = useMap();

  useEffect(() => {
    if (onMapViewChange) {
      const handleMoveEnd = () => {
        const center = map.getCenter();
        const zoom = map.getZoom();
        onMapViewChange({ center: [center.lat, center.lng], zoom });
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
  const [boundaryData, setBoundaryData] = useState<any>(null);
  const map = useMap();

  useEffect(() => {
    const loadBoundary = async () => {
      if (administrativeLevel === 'province' && administrativeBoundaryCode) {
        try {
          const geojsonData = await loadProvinceGeoJSON(
            administrativeBoundaryCode
          );
          setBoundaryData(geojsonData);
        } catch (error) {
          console.error('Failed to load province boundary:', error);
        }
      } else if (
        administrativeLevel === 'regency' &&
        administrativeBoundaryCode
      ) {
        try {
          const geojsonData = await loadRegencyGeoJSON(
            administrativeBoundaryCode
          );
          setBoundaryData(geojsonData);
        } catch (error) {
          console.error('Failed to load regency boundary:', error);
        }
      } else if (administrativeLevel === 'national') {
        try {
          const response = await fetch('/data/indonesia-boundary.geojson');
          if (!response.ok)
            throw new Error(
              `Failed to load national boundaries: ${response.statusText}`
            );
          const boundaries = await response.json();
          setBoundaryData(boundaries);
        } catch (error) {
          console.error('Failed to load national boundary:', error);
        }
      }
    };
    loadBoundary();
  }, [administrativeLevel, administrativeBoundaryCode]);

  useEffect(() => {
    if (boundaryData) {
      try {
        const geoJsonLayer = L.geoJSON(boundaryData);
        const bounds = geoJsonLayer.getBounds();
        if (bounds.isValid()) {
          map.fitBounds(bounds, { animate: true, maxZoom: 12 });
        } else {
          console.warn('Invalid bounds for the loaded boundary data');
        }
      } catch (error) {
        console.error('Error calculating bounds for boundary data:', error);
      }
    }
  }, [boundaryData, map]);

  if (!boundaryData) return null;

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
  const zoom =
    administrativeLevel === 'national'
      ? 7
      : administrativeLevel === 'province'
        ? 7
        : 10;

  let administrativeCode: string | undefined;
  if (administrativeLevel !== 'national' && filters?.administrativeRegion) {
    administrativeCode = filters.administrativeRegion;
  }

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      {/* Floating map title + controls */}
      <div
        style={{
          position: 'absolute',
          top: 12,
          left: 12,
          right: 12,
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          pointerEvents: 'none',
        }}
      >
        {/* Title pill */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'rgba(2, 44, 34, 0.88)',
            border: '0.5px solid rgba(94, 234, 212, 0.25)',
            borderRadius: 8,
            padding: '7px 14px',
            backdropFilter: 'blur(8px)',
            pointerEvents: 'auto',
          }}
        >
          <svg
            fill="none"
            height="16"
            stroke="#5eead4"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            width="16"
          >
            <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
            <line x1="9" x2="9" y1="3" y2="18" />
            <line x1="15" x2="15" y1="6" y2="21" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 500, color: '#fff' }}>
            Marketing Map
          </span>
        </div>

        {/* Map control buttons (unchanged per request) */}
        <div style={{ display: 'flex', gap: 6, pointerEvents: 'auto' }}>
          <button
            aria-pressed={showStallMarkers}
            onClick={() => setShowStallMarkers((v) => !v)}
            style={{
              background: showStallMarkers
                ? '#022c22'
                : 'rgba(255,255,255,0.93)',
              border: showStallMarkers
                ? '1px solid #0d9488'
                : '0.5px solid rgba(0,0,0,0.15)',
              borderRadius: 7,
              padding: '6px 14px',
              fontSize: 12,
              fontWeight: 500,
              color: showStallMarkers ? '#5eead4' : '#1e293b',
              cursor: 'pointer',
            }}
          >
            {showStallMarkers ? t`Hide Kios` : t`Show Kios`}
          </button>
          <button
            aria-pressed={showChoropleth}
            onClick={() => setShowChoropleth((v) => !v)}
            style={{
              background: showChoropleth ? '#022c22' : 'rgba(255,255,255,0.93)',
              border: showChoropleth
                ? '1px solid #0d9488'
                : '0.5px solid rgba(0,0,0,0.15)',
              borderRadius: 7,
              padding: '6px 14px',
              fontSize: 12,
              fontWeight: 500,
              color: showChoropleth ? '#5eead4' : '#1e293b',
              cursor: 'pointer',
            }}
          >
            {showChoropleth ? t`Hide Potential` : t`Show Potential`}
          </button>

          {choroplethLoading && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                background: 'rgba(255,255,255,0.93)',
                padding: '6px 10px',
                borderRadius: 7,
                border: '0.5px solid rgba(0,0,0,0.1)',
              }}
            >
              <svg aria-hidden height="16" viewBox="0 0 50 50" width="16">
                <circle
                  cx="25"
                  cy="25"
                  fill="none"
                  r="20"
                  stroke="#0d9488"
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
              <span style={{ fontSize: 12, color: '#475569' }}>
                <Trans>Loading...</Trans>
              </span>
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
