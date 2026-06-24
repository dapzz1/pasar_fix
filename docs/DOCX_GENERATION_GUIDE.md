# DOCX Generation Guide

## Prerequisites

- Python 3.10+
- `python-docx` library

## Setup

```bash
pip install python-docx
```

## Generate the DOCX

```bash
python scripts/build-final-report.py
```

Output: `laporan_magang_final.docx` in project root (~5.7 MB).

## What It Does

1. **Front matter**: Cover, Lembar Pengesahan, Daftar Riwayat Hidup, Kata Pengantar, Daftar Isi (placeholder), Daftar Gambar (placeholder), Daftar Tabel (placeholder)
2. **BAB I–IV**: Reads markdown files from `docs/`, converts headings/paragraphs/tables to python-docx elements
3. **Images**: Inserts 40 screenshots + 15 diagrams at correct sub-BAB positions with captions (Gambar 2.1–2.2, 3.1–3.53)
4. **Daftar Pustaka**: Extracts from `BAGIAN_AWAL.md` with hanging indent
5. **Lampiran**: Reads `LAMPIRAN.md`

## Post-Processing in Microsoft Word

After opening the DOCX:

1. **Generate Daftar Isi**: References → Table of Contents → Automatic Table
2. **Generate Daftar Gambar**: References → Insert Table of Figures
3. **Generate Daftar Tabel**: References → Insert Table of Figures (caption label: "Tabel")
4. **Adjust page margins** and numbering as needed

## File Structure

```
docs/
  BAGIAN_AWAL.md          — Front matter + daftar pustaka
  BAB_I_PENDAHULUAN.md    — Chapter 1
  BAB_II_GAMBARAN_UMUM.md — Chapter 2
  BAB_III_BAGIAN_1.md     — Chapter 3 (sections 3.1–3.4)
  BAB_III_BAGIAN_2.md     — Chapter 3 (sections 3.5–3.7)
  BAB_III_BAGIAN_3.md     — Chapter 3 (sections 3.8–3.12)
  BAB_IV_KESIMPULAN.md    — Chapter 4
  LAMPIRAN.md             — Appendices
screenshots/
  bab2/       — 2 screenshots
  bab3/       — 38 screenshots (subdirectories by module)
diagrams/
  diagram_01.png – diagram_15.png
```

## Image Insertion Reference

See `docs/REPORT_IMAGE_MAPPING.md` for the full screenshot-to-section mapping.
See `docs/DOCX_ASSEMBLY_CHECKLIST.md` for the diagram/screenshot/table placement checklist.
