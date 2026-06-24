/**
 * marketing-map-page.tsx
 *
 * Satu file berisi semua komponen:
 *  - Navbar
 *  - MapControlPanel (sidebar)
 *  - DynamicMap
 *  - MarketingMapPage (root, gabungkan semuanya)
 *
 * Cara pakai: render <MarketingMapPage /> di route /map kamu.
 * Sesuaikan import path geojson-utils, administrative-boundaries-service,
 * choropleth-map, dan stall-markers dengan struktur proyekmu.
 */

import type React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { GeoJSON, MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Trans, useLingui } from '@lingui/react/macro';
import { Link, useLocation } from '@tanstack/react-router';
import L from 'leaflet';
import {
  loadProvinceGeoJSON,
  loadRegencyGeoJSON,
} from '../../../lib/utils/geojson-utils';
import type { AdministrativeLevel } from '../-app/administrative-boundaries-service';
import ChoroplethMap from './choropleth-map';
import StallMarkers from './stall-markers';

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

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

// ─────────────────────────────────────────────────────────────────────────────
// Root page — wires everything together
// ─────────────────────────────────────────────────────────────────────────────

export default function MarketingMapPage() {
  const [year, setYear] = useState('2026');
  const [administrativeLevel, setAdministrativeLevel] =
    useState<AdministrativeLevel>('national');
  const [filterBy, setFilterBy] = useState('Product Brand');
  const [selectedProductBrand, setSelectedProductBrand] =
    useState('NPK Phonska Cair');
  // useMemo so the filters object reference stays stable across renders
  const filters = useMemo<FilterCriteria>(() => ({}), []);
  const lastUpdated = 'Jun 23, 2026 · 01:01 PM';
  const handleSignOut = useCallback(() => console.log('sign out'), []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Navbar onSignOut={handleSignOut} username="adminmpb" />
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <MapControlPanel
          administrativeLevel={administrativeLevel}
          filterBy={filterBy}
          lastUpdated={lastUpdated}
          onAdminLevelChange={setAdministrativeLevel}
          onFilterByChange={setFilterBy}
          onProductBrandChange={setSelectedProductBrand}
          onYearChange={setYear}
          selectedProductBrand={selectedProductBrand}
          year={year}
        />
        <DynamicMap
          administrativeLevel={administrativeLevel}
          filters={filters}
          selectedProductBrand={selectedProductBrand}
          year={year}
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Navbar
// ─────────────────────────────────────────────────────────────────────────────

function Navbar({
  username = 'adminmpb',
  onSignOut,
}: {
  username?: string;
  onSignOut?: () => void;
}) {
  const { t } = useLingui();
  const location = useLocation();

  const initials = username
    .split(/[^a-zA-Z]/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');

  return (
    <nav
      style={{
        background: '#022c22',
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        height: 54,
        flexShrink: 0,
      }}
    >
      {/* Logo */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          marginRight: 32,
        }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            background: '#0d9488',
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <IconMap color="#fff" size={17} />
        </div>
        <div>
          <div
            style={{
              fontSize: 15,
              fontWeight: 500,
              color: '#fff',
              lineHeight: 1.2,
            }}
          >
            PasarPupuk
          </div>
          <div
            style={{
              fontSize: 10,
              color: '#5eead4',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              lineHeight: 1,
            }}
          >
            Marketing Intelligence
          </div>
        </div>
      </div>

      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'stretch', height: '100%' }}>
        <NavLink
          active={location.pathname === '/'}
          icon={<IconHome />}
          label={t`Home`}
          to="/"
        />
        <NavLink
          active={location.pathname.startsWith('/map')}
          icon={<IconMap color="currentColor" size={14} />}
          label={t`Potential Maps`}
          to="/map"
        />
      </div>

      <div style={{ flex: 1 }} />

      {/* Right controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {/* Language */}
        <button style={navBtnStyle}>
          <IconGlobe /> EN
          <IconChevron />
        </button>

        {/* Admin panel */}
        <Link
          style={{
            ...navBtnStyle,
            color: '#fbbf24',
            borderColor: 'rgba(251,191,36,0.25)',
            textDecoration: 'none',
          }}
          to="/admin"
        >
          <IconShield /> {t`Admin Panel`}
        </Link>

        {/* User */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '4px 10px 4px 5px',
            border: '0.5px solid rgba(255,255,255,0.12)',
            borderRadius: 20,
            cursor: 'pointer',
          }}
        >
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: '#0d9488',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontWeight: 500,
              color: '#fff',
            }}
          >
            {initials || username.slice(0, 2).toUpperCase()}
          </div>
          <span style={{ fontSize: 12, color: '#e2e8f0' }}>{username}</span>
          <IconChevron />
        </div>

        {/* Sign out */}
        <button
          onClick={onSignOut}
          style={{
            ...navBtnStyle,
            color: '#f87171',
            borderColor: 'rgba(248,113,113,0.3)',
          }}
        >
          <IconLogout /> {t`Sign Out`}
        </button>
      </div>
    </nav>
  );
}

const navBtnStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 5,
  padding: '5px 10px',
  background: 'transparent',
  border: '0.5px solid rgba(255,255,255,0.15)',
  borderRadius: 6,
  fontSize: 12,
  color: '#94a3b8',
  cursor: 'pointer',
};

function NavLink({
  to,
  label,
  active,
  icon,
}: {
  to: string;
  label: string;
  active: boolean;
  icon: React.ReactNode;
}) {
  return (
    <Link
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        padding: '0 16px',
        fontSize: 13,
        color: active ? '#5eead4' : '#94a3b8',
        textDecoration: 'none',
        borderBottom: `2px solid ${active ? '#0d9488' : 'transparent'}`,
      }}
      to={to}
    >
      {icon} {label}
    </Link>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Sidebar / Map control panel
// ─────────────────────────────────────────────────────────────────────────────

const COMMODITIES = [
  'Rice',
  'Corn',
  'Soybeans',
  'Peanuts',
  'Cassava',
  'Cabbage',
  'Mustard greens',
  'Potatoes',
  'Tomatoes',
  'Chili',
  'Shallots',
  'Melons',
  'Watermelon',
  'Sugarcane',
];

function MapControlPanel({
  year,
  onYearChange,
  administrativeLevel,
  onAdminLevelChange,
  filterBy,
  onFilterByChange,
  selectedProductBrand,
  onProductBrandChange,
  lastUpdated,
}: {
  year: string;
  onYearChange: (v: string) => void;
  administrativeLevel: AdministrativeLevel;
  onAdminLevelChange: (v: AdministrativeLevel) => void;
  filterBy: string;
  onFilterByChange: (v: string) => void;
  selectedProductBrand?: string;
  onProductBrandChange?: (v: string) => void;
  lastUpdated?: string;
}) {
  const { t } = useLingui();

  return (
    <aside
      style={{
        width: 230,
        background: '#022c22',
        display: 'flex',
        flexDirection: 'column',
        flexShrink: 0,
        overflowY: 'auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '18px 18px 14px',
          borderBottom: '0.5px solid rgba(255,255,255,0.08)',
        }}
      >
        <div
          style={{
            fontSize: 11,
            fontWeight: 500,
            color: '#5eead4',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            display: 'flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <IconSliders /> {t`Map Controls`}
        </div>
      </div>

      {/* Fields */}
      <div
        style={{
          padding: 16,
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
        }}
      >
        <FieldGroup icon={<IconCalendar />} label={t`Year`}>
          <SidebarSelect
            onChange={(e) => onYearChange(e.target.value)}
            options={['2024', '2025', '2026']}
            value={year}
          />
        </FieldGroup>

        <FieldGroup icon={<IconMapPin />} label={t`Administrative Level`}>
          <SidebarSelect
            labels={[t`National`, t`Province`, t`Regency`]}
            onChange={(e) =>
              onAdminLevelChange(e.target.value as AdministrativeLevel)
            }
            options={['national', 'province', 'regency']}
            value={administrativeLevel}
          />
        </FieldGroup>

        <div
          style={{ height: '0.5px', background: 'rgba(255,255,255,0.08)' }}
        />

        <FieldGroup icon={<IconFilter />} label={t`Filter by`}>
          <SidebarSelect
            onChange={(e) => onFilterByChange(e.target.value)}
            options={['Product Brand', 'Land Type', 'Commodity Type']}
            value={filterBy}
          />
        </FieldGroup>

        {filterBy === 'Product Brand' && (
          <FieldGroup icon={<IconPackage />} label={t`Product Brand`}>
            <SidebarSelect
              onChange={(e) => onProductBrandChange?.(e.target.value)}
              options={['NPK Phonska Cair', 'Urea', 'ZA']}
              value={selectedProductBrand ?? ''}
            />
          </FieldGroup>
        )}
      </div>

      <div style={{ height: '0.5px', background: 'rgba(255,255,255,0.08)' }} />

      {/* Commodities */}
      <div style={{ padding: 16 }}>
        <div
          style={{
            fontSize: 11,
            color: '#64748b',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: 10,
            display: 'flex',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <IconPlant />
          <Trans>{COMMODITIES.length} Commodities</Trans>
        </div>
        <div
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5 }}
        >
          {COMMODITIES.map((c) => (
            <div
              key={c}
              style={{
                background: 'rgba(13,148,136,0.1)',
                border: '0.5px solid rgba(13,148,136,0.25)',
                borderRadius: 5,
                padding: '5px 7px',
                fontSize: 11,
                color: '#5eead4',
              }}
            >
              {c}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: 'auto',
          padding: '12px 16px',
          borderTop: '0.5px solid rgba(255,255,255,0.08)',
        }}
      >
        <div
          style={{
            fontSize: 10,
            color: '#475569',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
          }}
        >
          <IconClock />
          {lastUpdated ? (
            <Trans>Last updated: {lastUpdated}</Trans>
          ) : (
            <Trans>Last updated: —</Trans>
          )}
        </div>
      </div>
    </aside>
  );
}

function FieldGroup({
  label,
  icon,
  children,
}: {
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div
        style={{
          fontSize: 11,
          color: '#64748b',
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          gap: 5,
        }}
      >
        {icon} {label}
      </div>
      {children}
    </div>
  );
}

function SidebarSelect({
  value,
  onChange,
  options,
  labels,
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  labels?: string[];
}) {
  return (
    <select
      onChange={onChange}
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '0.5px solid rgba(255,255,255,0.12)',
        borderRadius: 8,
        padding: '8px 28px 8px 10px',
        fontSize: 13,
        color: '#e2e8f0',
        cursor: 'pointer',
        width: '100%',
        appearance: 'none',
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 10px center',
      }}
      value={value}
    >
      {options.map((opt, i) => (
        <option key={opt} style={{ background: '#022c22' }} value={opt}>
          {labels?.[i] ?? opt}
        </option>
      ))}
    </select>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Dynamic Map
// ─────────────────────────────────────────────────────────────────────────────

function MapViewHandler({
  onMapViewChange,
}: {
  onMapViewChange?: (v: MapViewState) => void;
}) {
  const map = useMap();
  // Keep latest callback in a ref so the effect never needs to re-subscribe
  const cbRef = useRef(onMapViewChange);
  useEffect(() => {
    cbRef.current = onMapViewChange;
  }, [onMapViewChange]);

  useEffect(() => {
    const handleMoveEnd = () => {
      if (!cbRef.current) return;
      const center = map.getCenter();
      cbRef.current({ center: [center.lat, center.lng], zoom: map.getZoom() });
    };
    map.on('moveend', handleMoveEnd);
    return () => {
      map.off('moveend', handleMoveEnd);
    };
  }, [map]); // map is stable; no need to re-subscribe when callback changes
  return null;
}

// Stable style object outside component — prevents Leaflet from seeing a new
// object reference on every render and triggering a redraw loop.
const BOUNDARY_STYLE: L.PathOptions = {
  fillColor: '#0d9488',
  weight: 2,
  opacity: 1,
  color: '#065f46',
  dashArray: '3',
  fillOpacity: 0.15,
};

function BoundaryDisplay({
  administrativeLevel,
  administrativeBoundaryCode,
}: {
  administrativeLevel: AdministrativeLevel;
  administrativeBoundaryCode?: string;
}) {
  const [boundaryData, setBoundaryData] = useState<any>(null);
  const map = useMap();
  // Prevent fitBounds from firing more than once per boundary load
  const fittedRef = useRef(false);

  useEffect(() => {
    fittedRef.current = false; // reset when inputs change
    setBoundaryData(null);
    const load = async () => {
      try {
        if (administrativeLevel === 'province' && administrativeBoundaryCode) {
          setBoundaryData(
            await loadProvinceGeoJSON(administrativeBoundaryCode)
          );
        } else if (
          administrativeLevel === 'regency' &&
          administrativeBoundaryCode
        ) {
          setBoundaryData(await loadRegencyGeoJSON(administrativeBoundaryCode));
        } else if (administrativeLevel === 'national') {
          const res = await fetch('/data/indonesia-boundary.geojson');
          if (!res.ok) throw new Error(res.statusText);
          setBoundaryData(await res.json());
        }
      } catch (err) {
        console.error('Failed to load boundary:', err);
      }
    };
    load();
  }, [administrativeLevel, administrativeBoundaryCode]);

  useEffect(() => {
    if (!boundaryData || fittedRef.current) return;
    try {
      const bounds = L.geoJSON(boundaryData).getBounds();
      if (bounds.isValid()) {
        fittedRef.current = true;
        map.fitBounds(bounds, { animate: true, maxZoom: 12 });
      }
    } catch (err) {
      console.error('Error fitting bounds:', err);
    }
  }, [boundaryData, map]);

  if (!boundaryData) return null;

  // Pass the stable constant — not an inline object literal
  return <GeoJSON data={boundaryData} style={BOUNDARY_STYLE} />;
}

function DynamicMap({
  administrativeLevel,
  selectedProductBrand,
  selectedLandType,
  selectedCommodityType,
  year,
  filters,
  onMapViewChange,
}: {
  administrativeLevel: AdministrativeLevel;
  selectedProductBrand?: string;
  selectedLandType?: string;
  selectedCommodityType?: string;
  year?: string;
  filters?: FilterCriteria;
  onMapViewChange?: (v: MapViewState) => void;
}) {
  const { t } = useLingui();
  const [showStallMarkers, setShowStallMarkers] = useState(false);
  const [showChoropleth, setShowChoropleth] = useState(false);
  const [choroplethLoading, setChoroplethLoading] = useState(false);

  const center: [number, number] = [-0.7893, 113.9213];
  const zoom = administrativeLevel === 'regency' ? 10 : 7;
  const administrativeCode =
    administrativeLevel !== 'national'
      ? filters?.administrativeRegion
      : undefined;

  return (
    <div style={{ position: 'relative', flex: 1, overflow: 'hidden' }}>
      {/* Floating header */}
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
            background: 'rgba(2,44,34,0.88)',
            border: '0.5px solid rgba(94,234,212,0.25)',
            borderRadius: 8,
            padding: '7px 14px',
            pointerEvents: 'auto',
          }}
        >
          <IconMap color="#5eead4" size={16} />
          <span style={{ fontSize: 13, fontWeight: 500, color: '#fff' }}>
            Marketing Map
          </span>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 6, pointerEvents: 'auto' }}>
          <button
            aria-pressed={showStallMarkers}
            onClick={() => setShowStallMarkers((v) => !v)}
            style={mapBtnStyle(showStallMarkers)}
          >
            {showStallMarkers ? t`Hide Kios` : t`Show Kios`}
          </button>
          <button
            aria-pressed={showChoropleth}
            onClick={() => setShowChoropleth((v) => !v)}
            style={mapBtnStyle(showChoropleth)}
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

function mapBtnStyle(active: boolean): React.CSSProperties {
  return {
    background: active ? '#022c22' : 'rgba(255,255,255,0.93)',
    border: active ? '1px solid #0d9488' : '0.5px solid rgba(0,0,0,0.15)',
    borderRadius: 7,
    padding: '6px 14px',
    fontSize: 12,
    fontWeight: 500,
    color: active ? '#5eead4' : '#1e293b',
    cursor: 'pointer',
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// SVG Icons (inline, no dependency)
// ─────────────────────────────────────────────────────────────────────────────

const ic: React.CSSProperties = { display: 'inline-block', flexShrink: 0 };

function IconMap({
  color = '#0d9488',
  size = 14,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <svg
      aria-hidden
      fill="none"
      height={size}
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={ic}
      viewBox="0 0 24 24"
      width={size}
    >
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
      <line x1="9" x2="9" y1="3" y2="18" />
      <line x1="15" x2="15" y1="6" y2="21" />
    </svg>
  );
}
function IconHome() {
  return (
    <svg
      aria-hidden
      fill="none"
      height="14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={ic}
      viewBox="0 0 24 24"
      width="14"
    >
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}
function IconGlobe() {
  return (
    <svg
      aria-hidden
      fill="none"
      height="14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={ic}
      viewBox="0 0 24 24"
      width="14"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg
      aria-hidden
      fill="none"
      height="14"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={ic}
      viewBox="0 0 24 24"
      width="14"
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
function IconLogout() {
  return (
    <svg
      aria-hidden
      fill="none"
      height="13"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={ic}
      viewBox="0 0 24 24"
      width="13"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  );
}
function IconChevron() {
  return (
    <svg
      aria-hidden
      fill="none"
      height="12"
      stroke="#64748b"
      strokeLinecap="round"
      strokeWidth="2"
      style={ic}
      viewBox="0 0 24 24"
      width="12"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
function IconSliders() {
  return (
    <svg
      aria-hidden
      fill="none"
      height="12"
      stroke="#0d9488"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={ic}
      viewBox="0 0 24 24"
      width="12"
    >
      <line x1="4" x2="4" y1="21" y2="14" />
      <line x1="4" x2="4" y1="10" y2="3" />
      <line x1="12" x2="12" y1="21" y2="12" />
      <line x1="12" x2="12" y1="8" y2="3" />
      <line x1="20" x2="20" y1="21" y2="16" />
      <line x1="20" x2="20" y1="12" y2="3" />
      <line x1="1" x2="7" y1="14" y2="14" />
      <line x1="9" x2="15" y1="8" y2="8" />
      <line x1="17" x2="23" y1="16" y2="16" />
    </svg>
  );
}
function IconCalendar() {
  return (
    <svg
      aria-hidden
      fill="none"
      height="13"
      stroke="#0d9488"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={ic}
      viewBox="0 0 24 24"
      width="13"
    >
      <rect height="18" rx="2" ry="2" width="18" x="3" y="4" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  );
}
function IconMapPin() {
  return (
    <svg
      aria-hidden
      fill="none"
      height="13"
      stroke="#0d9488"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={ic}
      viewBox="0 0 24 24"
      width="13"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}
function IconFilter() {
  return (
    <svg
      aria-hidden
      fill="none"
      height="13"
      stroke="#0d9488"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={ic}
      viewBox="0 0 24 24"
      width="13"
    >
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
  );
}
function IconPackage() {
  return (
    <svg
      aria-hidden
      fill="none"
      height="13"
      stroke="#0d9488"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={ic}
      viewBox="0 0 24 24"
      width="13"
    >
      <line x1="16.5" x2="7.5" y1="9.4" y2="4.21" />
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" x2="12" y1="22.08" y2="12" />
    </svg>
  );
}
function IconPlant() {
  return (
    <svg
      aria-hidden
      fill="none"
      height="13"
      stroke="#0d9488"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={ic}
      viewBox="0 0 24 24"
      width="13"
    >
      <path d="M12 22V12" />
      <path d="M12 12C12 7 7 4 3 6c0 4 3 7 9 6" />
      <path d="M12 12c0-5 5-8 9-6 0 4-3 7-9 6" />
    </svg>
  );
}
function IconClock() {
  return (
    <svg
      aria-hidden
      fill="none"
      height="12"
      stroke="#0d9488"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      style={ic}
      viewBox="0 0 24 24"
      width="12"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}
