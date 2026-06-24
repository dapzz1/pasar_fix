import { Trans } from '@lingui/react/macro';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { orpc } from '@/lib/orpc/client';

export const Route = createFileRoute('/')({
  component: HomePage,
});

function HomePage() {
  const { data: provinces } = useQuery(
    orpc.admin.region.province.get.queryOptions({ input: {} })
  );
  const { data: commodities } = useQuery(
    orpc.admin.commodity.commodity_type.get.queryOptions({ input: {} })
  );
  const { data: productBrands } = useQuery(
    orpc.admin.product.product_brand.get.queryOptions({ input: {} })
  );
  const { data: stalls } = useQuery(
    orpc.admin.stall.get.queryOptions({ input: {} })
  );

  const statsRaw = [
    {
      value: provinces?.data?.length ?? 0,
      label: <Trans>Provinsi</Trans>,
      sub: <Trans>Wilayah terdaftar</Trans>,
    },
    {
      value: commodities?.data?.length ?? 0,
      label: <Trans>Komoditas</Trans>,
      sub: <Trans>Aktif di pasar</Trans>,
    },
    {
      value: productBrands?.data?.length ?? 0,
      label: <Trans>Brand Produk</Trans>,
      sub: <Trans>Dalam portofolio</Trans>,
    },
    {
      value: stalls?.data?.length ?? 0,
      label: <Trans>Kios</Trans>,
      sub: <Trans>Jaringan distribusi</Trans>,
    },
  ];

  const programs = [
    {
      no: '01',
      title: <Trans>Peta Pasar & Strategi Penjualan</Trans>,
      desc: (
        <Trans>
          Identifikasi kebutuhan konsumen dan pemetaan sales channel untuk
          produk baru.
        </Trans>
      ),
    },
    {
      no: '02',
      title: <Trans>Roadshow Customer</Trans>,
      desc: (
        <Trans>
          Kunjungan end user, monitoring pasar, dan penguatan jaringan
          distribusi lapangan.
        </Trans>
      ),
    },
    {
      no: '03',
      title: <Trans>Sosialisasi & Demplot</Trans>,
      desc: (
        <Trans>
          Penguatan brand awareness dan edukasi produk melalui demonstrasi plot
          aktif.
        </Trans>
      ),
    },
  ];

  const monitoring = [
    {
      icon: '🌾',
      title: <Trans>Monitoring Pasar Produk Baru</Trans>,
      where: <Trans>Jawa & Bali</Trans>,
      when: <Trans>Juni – September 2026</Trans>,
    },
    {
      icon: '🤝',
      title: <Trans>Monitoring Kerjasama Demplot</Trans>,
      where: <Trans>Biofertil & Petro Gladiator</Trans>,
      when: <Trans>Februari 2026</Trans>,
    },
    {
      icon: '🐠',
      title: <Trans>Penetrasi Pasar Petro Fish</Trans>,
      where: <Trans>Usaha tambak skala menengah–besar</Trans>,
      when: <Trans>April – Mei 2026</Trans>,
    },
  ];

  const duties = [
    <Trans>Pemetaan pasar dan pengembangan produk baru</Trans>,
    <Trans>Memastikan target penjualan & evaluasi pencapaian</Trans>,
    <Trans>Mengembangkan strategi penjualan yang adaptif</Trans>,
    <Trans>Sosialisasi change management internal & eksternal</Trans>,
    <Trans>Memenuhi aspek legal & good corporate governance</Trans>,
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=Inter:wght@400;500;600&display=swap');

        html {
          scroll-behavior: smooth;
        }

        .mpb-root {
          font-family: 'Inter', sans-serif;
          background: #F5F0E8;
          color: #1a2e24;
          min-height: 100vh;
        }

        /* ── HERO ── */
        .mpb-hero {
          background-color: #0A2A1A;
          position: relative;
          overflow: hidden;
          padding: 80px 24px 72px;
        }
        .mpb-hero::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(
              -55deg,
              transparent,
              transparent 38px,
              rgba(76,175,114,0.06) 38px,
              rgba(76,175,114,0.06) 40px
            );
          pointer-events: none;
        }
        .mpb-hero-inner {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
          position: relative;
        }
        .mpb-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(76,175,114,0.12);
          border: 1px solid rgba(76,175,114,0.3);
          border-radius: 999px;
          padding: 6px 16px 6px 8px;
          margin-bottom: 32px;
        }
        .mpb-eyebrow-dot {
          width: 8px; height: 8px;
          border-radius: 50%;
          background: #4CAF72;
          animation: pulse 2.4s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        .mpb-eyebrow span {
          font-size: 12px;
          font-weight: 500;
          color: rgba(255,255,255,0.7);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }
        .mpb-hero h1 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(2.4rem, 6vw, 4.2rem);
          font-weight: 800;
          color: #ffffff;
          line-height: 1.08;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
        }
        .mpb-hero h1 em {
          font-style: normal;
          color: #4CAF72;
        }
        .mpb-hero p {
          font-size: clamp(1rem, 2vw, 1.15rem);
          color: rgba(255,255,255,0.6);
          max-width: 560px;
          margin: 0 auto 40px;
          line-height: 1.7;
        }
        .mpb-cta-group {
          display: flex;
          justify-content: center;
          gap: 12px;
          flex-wrap: wrap;
        }
        .mpb-btn-primary {
          background: #4CAF72;
          color: #0A2A1A;
          font-weight: 600;
          font-size: 14px;
          padding: 12px 28px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          text-decoration: none;
          display: inline-block;
        }
        .mpb-btn-primary:hover {
          background: #5DC882;
          transform: translateY(-1px);
        }
        .mpb-btn-ghost {
          background: transparent;
          color: rgba(255,255,255,0.75);
          font-weight: 500;
          font-size: 14px;
          padding: 12px 28px;
          border-radius: 8px;
          border: 1px solid rgba(255,255,255,0.2);
          cursor: pointer;
          transition: border-color 0.2s, color 0.2s;
          text-decoration: none;
          display: inline-block;
        }
        .mpb-btn-ghost:hover {
          border-color: rgba(255,255,255,0.5);
          color: #fff;
        }

        /* ── STATS STRIP ── */
        .mpb-stats {
          background: #ffffff;
          border-bottom: 1px solid #e4ddd1;
        }
        .mpb-stats-inner {
          max-width: 960px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          padding: 0 24px;
        }
        @media (max-width: 680px) {
          .mpb-stats-inner { grid-template-columns: repeat(2, 1fr); }
        }
        .mpb-stat-item {
          padding: 36px 20px;
          text-align: center;
          position: relative;
        }
        .mpb-stat-item + .mpb-stat-item::before {
          content: '';
          position: absolute;
          left: 0; top: 28px; bottom: 28px;
          width: 1px;
          background: #e4ddd1;
        }
        .mpb-stat-num {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 3.2rem;
          font-weight: 800;
          color: #0A2A1A;
          line-height: 1;
          letter-spacing: -0.03em;
          display: block;
        }
        .mpb-stat-label {
          font-weight: 600;
          font-size: 13px;
          color: #1B5E38;
          margin-top: 6px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          display: block;
        }
        .mpb-stat-sub {
          font-size: 12px;
          color: #8a8070;
          margin-top: 2px;
          display: block;
        }

        /* ── SECTIONS ── */
        .mpb-section {
          max-width: 960px;
          margin: 0 auto;
          padding: 80px 24px;
        }
        .mpb-section-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #4CAF72;
          margin-bottom: 14px;
          display: block;
        }
        .mpb-section-title {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.8rem, 4vw, 2.6rem);
          font-weight: 700;
          color: #0A2A1A;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 48px;
          max-width: 520px;
        }

        /* ── PROGRAMS ── */
        .mpb-programs {
          background: #ffffff;
        }
        .mpb-programs-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1px;
          background: #e4ddd1;
          border: 1px solid #e4ddd1;
          border-radius: 16px;
          overflow: hidden;
        }
        @media (max-width: 680px) {
          .mpb-programs-grid { grid-template-columns: 1fr; }
        }
        .mpb-program-card {
          background: #ffffff;
          padding: 36px 28px;
          transition: background 0.2s;
        }
        .mpb-program-card:hover {
          background: #f9f6f1;
        }
        .mpb-program-no {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 2.4rem;
          font-weight: 800;
          color: #e4ddd1;
          line-height: 1;
          margin-bottom: 20px;
          display: block;
        }
        .mpb-program-title {
          font-weight: 600;
          font-size: 15px;
          color: #0A2A1A;
          line-height: 1.4;
          margin-bottom: 10px;
        }
        .mpb-program-desc {
          font-size: 13.5px;
          color: #5a6b61;
          line-height: 1.65;
        }

        /* ── MONITORING ── */
        .mpb-monitoring-list {
          display: flex;
          flex-direction: column;
          gap: 0;
          border: 1px solid #e4ddd1;
          border-radius: 16px;
          overflow: hidden;
        }
        .mpb-monitoring-item {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          padding: 28px 32px;
          background: #ffffff;
          border-bottom: 1px solid #f0ebe3;
          transition: background 0.18s;
        }
        .mpb-monitoring-item:last-child {
          border-bottom: none;
        }
        .mpb-monitoring-item:hover {
          background: #f9f6f1;
        }
        .mpb-monitoring-icon {
          font-size: 1.75rem;
          flex-shrink: 0;
          margin-top: 2px;
          line-height: 1;
        }
        .mpb-monitoring-body {}
        .mpb-monitoring-title {
          font-weight: 600;
          font-size: 15px;
          color: #0A2A1A;
          margin-bottom: 4px;
        }
        .mpb-monitoring-meta {
          font-size: 13px;
          color: #8a8070;
        }
        .mpb-monitoring-meta strong {
          color: #4CAF72;
          font-weight: 600;
        }

        /* ── ORG ── */
        .mpb-org {
          background: #0A2A1A;
          position: relative;
          overflow: hidden;
        }
        .mpb-org::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(
              -55deg,
              transparent,
              transparent 38px,
              rgba(76,175,114,0.04) 38px,
              rgba(76,175,114,0.04) 40px
            );
          pointer-events: none;
        }
        .mpb-org .mpb-section-label { color: #4CAF72; }
        .mpb-org .mpb-section-title { color: #ffffff; }
        .mpb-leaders {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 48px;
        }
        @media (max-width: 560px) {
          .mpb-leaders { grid-template-columns: 1fr; }
        }
        .mpb-leader-card {
          border-radius: 12px;
          padding: 28px 24px;
          border: 1px solid rgba(76,175,114,0.2);
          position: relative;
        }
        .mpb-leader-card:first-child {
          background: rgba(76,175,114,0.1);
        }
        .mpb-leader-card:last-child {
          background: rgba(255,255,255,0.04);
        }
        .mpb-leader-role {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #4CAF72;
          margin-bottom: 10px;
          display: block;
        }
        .mpb-leader-name {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 1.4rem;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.2;
          margin-bottom: 4px;
        }
        .mpb-leader-title {
          font-size: 13px;
          color: rgba(255,255,255,0.5);
        }
        .mpb-duties-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.4);
          margin-bottom: 20px;
          display: block;
          border-top: 1px solid rgba(255,255,255,0.08);
          padding-top: 36px;
        }
        .mpb-duties-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        @media (max-width: 560px) {
          .mpb-duties-grid { grid-template-columns: 1fr; }
        }
        .mpb-duty-item {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 8px;
          padding: 16px 18px;
        }
        .mpb-duty-check {
          width: 18px; height: 18px;
          border-radius: 50%;
          background: #1B5E38;
          color: #4CAF72;
          font-size: 10px;
          font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }
        .mpb-duty-text {
          font-size: 13.5px;
          color: rgba(255,255,255,0.65);
          line-height: 1.55;
        }

        /* ── CTA FOOTER ── */
        .mpb-footer-cta {
          background: #F5F0E8;
          border-top: 1px solid #e4ddd1;
        }
        .mpb-footer-cta-inner {
          max-width: 960px;
          margin: 0 auto;
          padding: 80px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 32px;
          flex-wrap: wrap;
        }
        .mpb-footer-cta h2 {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.6rem, 3.5vw, 2.2rem);
          font-weight: 700;
          color: #0A2A1A;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }
        .mpb-footer-cta p {
          font-size: 14px;
          color: #6b7c72;
          margin-top: 8px;
          max-width: 380px;
        }
        .mpb-btn-dark {
          background: #0A2A1A;
          color: #ffffff;
          font-weight: 600;
          font-size: 14px;
          padding: 13px 28px;
          border-radius: 8px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: background 0.2s, transform 0.15s;
          white-space: nowrap;
        }
        .mpb-btn-dark:hover {
          background: #1B5E38;
          transform: translateY(-1px);
        }
      `}</style>

      <div className="mpb-root">
        {/* ── HERO ── */}
        <section className="mpb-hero">
          <div className="mpb-hero-inner">
            <div className="mpb-eyebrow">
              <div className="mpb-eyebrow-dot" />
              <span>
                <Trans>Desember 2025 · Komp. Mitra Bisnis</Trans>
              </span>
            </div>
            <h1>
              <Trans>Manajemen</Trans>
              <br />
              <em>
                <Trans>Produk Baru</Trans>
              </em>
            </h1>
            <p>
              <Trans>
                Pemasaran, market intelligence, dan brand awareness untuk produk
                baru Petrokimia Gresik.
              </Trans>
            </p>
            <div className="mpb-cta-group">
              <Link to="/map">
                <a className="mpb-btn-primary">
                  <Trans>Lihat Peta Pemasaran</Trans>
                </a>
              </Link>
              <a
                className="mpb-btn-ghost"
                href="#program"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById('program')
                    ?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <Trans>Program Kerja</Trans>
              </a>
            </div>
          </div>
        </section>

        {/* ── STATS STRIP ── */}
        <div className="mpb-stats">
          <div className="mpb-stats-inner">
            {statsRaw.map((s, i) => (
              <div className="mpb-stat-item" key={i}>
                <span className="mpb-stat-num">{s.value}</span>
                <span className="mpb-stat-label">{s.label}</span>
                <span className="mpb-stat-sub">{s.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── PROGRAM KERJA ── */}
        <div className="mpb-programs" id="program">
          <div className="mpb-section">
            <span className="mpb-section-label">
              <Trans>Program Kerja Utama</Trans>
            </span>
            <div className="mpb-section-title">
              <Trans>Tiga Pilar Kegiatan Pemasaran</Trans>
            </div>
            <div className="mpb-programs-grid">
              {programs.map((p, i) => (
                <div className="mpb-program-card" key={i}>
                  <span className="mpb-program-no">{p.no}</span>
                  <div className="mpb-program-title">{p.title}</div>
                  <div className="mpb-program-desc">{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── MONITORING ── */}
        <div style={{ background: '#F5F0E8' }}>
          <div className="mpb-section">
            <span className="mpb-section-label">
              <Trans>Monitoring & Penetrasi 2026</Trans>
            </span>
            <div className="mpb-section-title">
              <Trans>Program Lapangan Prioritas</Trans>
            </div>
            <div className="mpb-monitoring-list">
              {monitoring.map((m, i) => (
                <div className="mpb-monitoring-item" key={i}>
                  <div className="mpb-monitoring-icon">{m.icon}</div>
                  <div className="mpb-monitoring-body">
                    <div className="mpb-monitoring-title">{m.title}</div>
                    <div className="mpb-monitoring-meta">
                      <strong>{m.where}</strong> · {m.when}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── ORGANISASI ── */}
        <div className="mpb-org">
          <div className="mpb-section" style={{ position: 'relative' }}>
            <span className="mpb-section-label">
              <Trans>Struktur Organisasi</Trans>
            </span>
            <div className="mpb-section-title">
              <Trans>Tim Manajemen Produk Baru 2025</Trans>
            </div>
            <div className="mpb-leaders">
              <div className="mpb-leader-card">
                <span className="mpb-leader-role">
                  <Trans>PM — Pimpinan</Trans>
                </span>
                <div className="mpb-leader-name">Achmad Zaid</div>
                <div className="mpb-leader-title">
                  <Trans>PM Manajemen Produk Baru</Trans>
                </div>
              </div>
              <div className="mpb-leader-card">
                <span className="mpb-leader-role">
                  <Trans>SMD I — Wakil</Trans>
                </span>
                <div className="mpb-leader-name">Erwin Indra P</div>
                <div className="mpb-leader-title">
                  <Trans>SMD I Manajemen Produk Baru</Trans>
                </div>
              </div>
            </div>
            <span className="mpb-duties-label">
              <Trans>Tanggung Jawab Utama</Trans>
            </span>
            <div className="mpb-duties-grid">
              {duties.map((d, i) => (
                <div className="mpb-duty-item" key={i}>
                  <div className="mpb-duty-check">✓</div>
                  <div className="mpb-duty-text">{d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── FOOTER CTA ── */}
        <div className="mpb-footer-cta">
          <div className="mpb-footer-cta-inner">
            <div>
              <h2>
                <Trans>Jelajahi Peta Pemasaran</Trans>
              </h2>
              <p>
                <Trans>
                  Lihat persebaran pasar dan potensi produk baru Petrokimia
                  Gresik secara visual dan interaktif.
                </Trans>
              </p>
            </div>
            <Link to="/map">
              <a className="mpb-btn-dark">
                <Trans>Buka Peta →</Trans>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
