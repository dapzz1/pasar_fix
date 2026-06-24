#!/usr/bin/env python3
"""Build laporan_magang_final.docx from markdown sources and assets."""

from __future__ import annotations

import os
import re
import sys

from docx import Document
from docx.shared import Pt, Cm, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

# ─── Paths ───────────────────────────────────────────────────────────────────

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOCS = os.path.join(ROOT, "docs")
OUTPUT = os.path.join(ROOT, "laporan_magang_final.docx")

# ─── Insertion maps ─────────────────────────────────────────────────────────
# Each entry: section -> list of (gambar_number, relative_path, caption)

SCREENSHOT_MAP: dict[str, list[tuple[str, str, str]]] = {
    "2.2": [
        ("2.1", "screenshots/bab2/screenshot_09.png",
         "Gambar 2.1 Program kerja Departemen Manajemen Produk Baru"),
    ],
    "2.4": [
        ("2.2", "screenshots/bab2/screenshot_40.png",
         "Gambar 2.2 Dependency utama aplikasi pada package.json"),
    ],
    "3.1": [
        ("3.16", "screenshots/bab3/setup/screenshot_01.png",
         "Gambar 3.16 Proses menjalankan development server"),
    ],
    "3.2": [
        ("3.17", "screenshots/bab3/survei/screenshot_03.png",
         "Gambar 3.17 Data survei lapangan kios dalam format Excel"),
    ],
    "3.4": [
        ("3.18", "screenshots/bab3/dashboard/screenshot_11.png",
         "Gambar 3.18 Sidebar navigasi panel admin"),
        ("3.19", "screenshots/bab3/database/screenshot_30.png",
         "Gambar 3.19 Struktur file schema Drizzle ORM"),
    ],
    "3.5": [
        ("3.20", "screenshots/bab3/database/screenshot_31.png",
         "Gambar 3.20 Definisi tabel autentikasi pada schema Drizzle"),
        ("3.21", "screenshots/bab3/database/screenshot_32.png",
         "Gambar 3.21 Seluruh tabel database pada Drizzle Studio"),
        ("3.22", "screenshots/bab3/database/screenshot_33.png",
         "Gambar 3.22 Entity Relationship Diagram 22 tabel database"),
    ],
    "3.6": [
        ("3.23", "screenshots/bab3/api/screenshot_34.png",
         "Gambar 3.23 Struktur router oRPC utama"),
    ],
    "3.7": [
        ("3.24", "screenshots/bab3/auth/screenshot_04.png",
         "Gambar 3.24 Halaman login pengguna"),
        ("3.25", "screenshots/bab3/auth/screenshot_06.png",
         "Gambar 3.25 Halaman admin setelah login berhasil"),
        ("3.26", "screenshots/bab3/auth/screenshot_07.png",
         "Gambar 3.26 Cookie session Better Auth pada browser"),
        ("3.27", "screenshots/bab3/auth/screenshot_37.png",
         "Gambar 3.27 Implementasi route guard pada halaman admin"),
        ("3.28", "screenshots/bab3/auth/screenshot_38.png",
         "Gambar 3.28 Konfigurasi Better Auth dengan adapter Drizzle"),
    ],
    "3.8.1": [
        ("3.29", "screenshots/bab3/wilayah/screenshot_12.png",
         "Gambar 3.29 Daftar data provinsi pada panel admin"),
        ("3.30", "screenshots/bab3/wilayah/screenshot_13.png",
         "Gambar 3.30 Form penambahan data provinsi"),
        ("3.31", "screenshots/bab3/wilayah/screenshot_14.png",
         "Gambar 3.31 Daftar data kabupaten dengan relasi provinsi"),
    ],
    "3.8.3": [
        ("3.32", "screenshots/bab3/komoditas/screenshot_15.png",
         "Gambar 3.32 Daftar jenis komoditas dengan filter jenis lahan"),
        ("3.33", "screenshots/bab3/komoditas/screenshot_16.png",
         "Gambar 3.33 Data komoditas tingkat provinsi (read-only)"),
        ("3.34", "screenshots/bab3/komoditas/screenshot_17.png",
         "Gambar 3.34 Data komoditas tingkat kabupaten dengan CRUD penuh"),
    ],
    "3.8.4": [
        ("3.35", "screenshots/bab3/produk/screenshot_18.png",
         "Gambar 3.35 Daftar brand produk yang direferensikan oleh seluruh modul"),
        ("3.36", "screenshots/bab3/produk/screenshot_19.png",
         "Gambar 3.36 Daftar dosis produk untuk setiap brand dan komoditas"),
    ],
    "3.8.5": [
        ("3.37", "screenshots/bab3/potensi/screenshot_20.png",
         "Gambar 3.37 Data potensi provinsi (read-only)"),
    ],
    "3.8.6": [
        ("3.38", "screenshots/bab3/penjualan/screenshot_21.png",
         "Gambar 3.38 Data realisasi penjualan dengan metrik RKAP dan YTD"),
        ("3.39", "screenshots/bab3/penjualan/screenshot_22.png",
         "Gambar 3.39 Data penjualan harian per brand produk"),
    ],
    "3.8.7": [
        ("3.40", "screenshots/bab3/stall/screenshot_23.png",
         "Gambar 3.40 Daftar kios pada modul Stall"),
        ("3.41", "screenshots/bab3/stall/screenshot_24.png",
         "Gambar 3.41 Form penambahan data kios"),
        ("3.42", "screenshots/bab3/stall/screenshot_25.png",
         "Gambar 3.42 Modal assignment brand produk ke kios"),
        ("3.43", "screenshots/bab3/stall/screenshot_26.png",
         "Gambar 3.43 Halaman detail kios publik"),
    ],
    "3.8.8": [
        ("3.44", "screenshots/bab3/user/screenshot_27.png",
         "Gambar 3.44 Daftar pengguna dengan role masing-masing"),
    ],
    "3.8.9": [
        ("3.45", "screenshots/bab3/dashboard/screenshot_10.png",
         "Gambar 3.45 Dashboard admin dengan ringkasan data"),
    ],
    "3.8.10": [
        ("3.46", "screenshots/bab3/peta/screenshot_28.png",
         "Gambar 3.46 Peta interaktif dengan batas wilayah Indonesia"),
        ("3.47", "screenshots/bab3/peta/screenshot_29.png",
         "Gambar 3.47 Visualisasi choropleth data potensi pasar"),
    ],
    "3.8.11": [
        ("3.48", "screenshots/bab3/dashboard/screenshot_08.png",
         "Gambar 3.48 Halaman utama Satu Peta Pasar"),
    ],
    "3.9": [
        ("3.49", "screenshots/bab3/auth/screenshot_05.png",
         "Gambar 3.49 Pesan error saat login gagal"),
        ("3.50", "screenshots/bab3/api/screenshot_35.png",
         "Gambar 3.50 Response endpoint health check"),
        ("3.51", "screenshots/bab3/api/screenshot_36.png",
         "Gambar 3.51 Response validasi error dari Zod"),
    ],
    "3.10": [
        ("3.52", "screenshots/bab3/deployment/screenshot_39.png",
         "Gambar 3.52 Konfigurasi deployment Netlify"),
    ],
    "3.12": [
        ("3.53", "screenshots/bab3/kontribusi/screenshot_02.png",
         "Gambar 3.53 Detail commit pengembangan modul Stall"),
    ],
}

DIAGRAM_MAP: dict[str, list[tuple[str, str, str]]] = {
    "3.2": [
        ("3.15", "diagrams/diagram_15.png",
         "Gambar 3.15 Diagram alur data survei lapangan ke dalam sistem"),
    ],
    "3.3": [
        ("3.1", "diagrams/diagram_01.png",
         "Gambar 3.1 Diagram arsitektur full-stack monolith Satu Peta Pasar"),
    ],
    "3.4": [
        ("3.2", "diagrams/diagram_02.png",
         "Gambar 3.2 Diagram struktur direktori dan pembagian layer proyek"),
    ],
    "3.5": [
        ("3.3", "diagrams/diagram_03.png",
         "Gambar 3.3 Entity Relationship Diagram 22 tabel database"),
    ],
    "3.6": [
        ("3.6", "diagrams/diagram_06.png",
         "Gambar 3.6 Sequence diagram alur query dan mutation API"),
    ],
    "3.7": [
        ("3.4", "diagrams/diagram_04.png",
         "Gambar 3.4 Sequence diagram alur login pengguna"),
        ("3.5", "diagrams/diagram_05.png",
         "Gambar 3.5 Diagram authentication dan route guard"),
    ],
    "3.8.1": [
        ("3.7", "diagrams/diagram_07.png",
         "Gambar 3.7 Diagram alur CRUD modul wilayah"),
    ],
    "3.8.3": [
        ("3.8", "diagrams/diagram_08.png",
         "Gambar 3.8 Diagram modul komoditas dengan status read-only"),
    ],
    "3.8.4": [
        ("3.9", "diagrams/diagram_09.png",
         "Gambar 3.9 Diagram alur CRUD Product Brand dan modul dependen"),
        ("3.10", "diagrams/diagram_10.png",
         "Gambar 3.10 Diagram alur CRUD Product Dosage"),
    ],
    "3.8.5": [
        ("3.11", "diagrams/diagram_11.png",
         "Gambar 3.11 Diagram penyajian data Province Potential (read-only)"),
    ],
    "3.8.6": [
        ("3.12", "diagrams/diagram_12.png",
         "Gambar 3.12 Diagram alur CRUD Sales Realization"),
        ("3.13", "diagrams/diagram_13.png",
         "Gambar 3.13 Diagram alur CRUD Daily Sales"),
    ],
    "3.8.7": [
        ("3.14", "diagrams/diagram_14.png",
         "Gambar 3.14 Diagram alur CRUD Stall dan assignment Product Brand"),
    ],
}


def _merge_maps(*maps: dict[str, list[tuple[str, str, str]]],
                prefix: str = "") -> dict[str, list[tuple[str, str, str]]]:
    """Merge multiple insertion maps, concatenating lists for the same key."""
    result: dict[str, list[tuple[str, str, str]]] = {}
    for m in maps:
        for k, v in m.items():
            if prefix and not k.startswith(prefix):
                continue
            result.setdefault(k, []).extend(v)
    return result


# ─── Helpers ─────────────────────────────────────────────────────────────────

def section_key(sec: str) -> tuple[int, ...]:
    """Convert '3.8.1' -> (3, 8, 1) for comparison."""
    return tuple(int(p) for p in sec.split("."))


def is_parent_or_same(new: str, current: str) -> bool:
    """True if *new* is a parent section or same depth as *current*."""
    nk = section_key(new)
    ck = section_key(current)
    return len(nk) <= len(ck) and nk == ck[:len(nk)]


def add_image_with_caption(doc, file_path: str, caption: str) -> None:
    """Insert an image centred with a caption below."""
    abs_path = os.path.join(ROOT, file_path) if not os.path.isabs(file_path) else file_path
    if not os.path.exists(abs_path):
        p = doc.add_paragraph(f"[FILE TIDAK DITEMUKAN: {abs_path}]")
        return

    para = doc.add_paragraph()
    para.alignment = WD_ALIGN_PARAGRAPH.CENTER
    run = para.add_run()
    run.add_picture(abs_path, width=Cm(14))

    cap = doc.add_paragraph()
    cap.alignment = WD_ALIGN_PARAGRAPH.CENTER
    cap.paragraph_format.space_before = Pt(4)
    cap.paragraph_format.space_after = Pt(12)
    r = cap.add_run(caption)
    r.font.size = Pt(10)
    r.font.italic = True
    r.bold = True


def set_cell_shading(cell, color: str) -> None:
    """Set background colour on a table cell."""
    from docx.oxml.ns import qn
    shading = cell._tc.get_or_add_tcPr()
    shd = shading.makeelement(qn("w:shd"), {
        qn("w:fill"): color,
        qn("w:val"): "clear",
    })
    shading.append(shd)


def add_table_from_markdown(doc, lines: list[str]) -> None:
    """Parse pipe-table lines and add to document."""
    if len(lines) < 2:
        return
    headers = [c.strip() for c in lines[0].strip("|").split("|")]
    rows = []
    for line in lines[2:]:
        line = line.strip()
        if not line or not line.startswith("|"):
            continue
        cells = [c.strip() for c in line.strip("|").split("|")]
        if cells:
            rows.append(cells)

    if not rows:
        return

    table = doc.add_table(rows=1 + len(rows), cols=len(headers))
    table.style = "Table Grid"

    for i, h in enumerate(headers):
        if i >= len(table.rows[0].cells):
            break
        cell = table.rows[0].cells[i]
        cell.text = h
        for p in cell.paragraphs:
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            for r in p.runs:
                r.bold = True
                r.font.size = Pt(9)
        set_cell_shading(cell, "D9E2F3")

    for ri, row in enumerate(rows, 1):
        for ci, val in enumerate(row):
            if ci >= len(headers):
                break
            cell = table.rows[ri].cells[ci]
            cell.text = val
            for p in cell.paragraphs:
                for r in p.runs:
                    r.font.size = Pt(9)
    doc.add_paragraph()  # spacer


def add_heading_para(doc, title: str, level: int) -> None:
    """Add a heading using a built-in Word heading style."""
    # Map our level (1=h1, 2=h2, 3=h3) to Word style names
    style_map = {1: "Heading 1", 2: "Heading 2", 3: "Heading 3"}
    style_name = style_map.get(level, "Heading 2")
    p = doc.add_heading(title, level=level)
    # Override font to Times New Roman
    for run in p.runs:
        run.font.name = "Times New Roman"
        run.font.color.rgb = RGBColor(0, 0, 0)
        if level == 1:
            run.font.size = Pt(14)
        elif level == 2:
            run.font.size = Pt(12)
        else:
            run.font.size = Pt(11)
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER if level == 1 else WD_ALIGN_PARAGRAPH.LEFT
    p.paragraph_format.space_before = Pt(12)
    p.paragraph_format.space_after = Pt(6)


def extract_section(text: str, section_title: str) -> str:
    """Extract content under a '# section_title' heading."""
    pat = re.compile(
        rf"^# {re.escape(section_title)}\n(.+?)(?=\n# |\Z)",
        re.DOTALL | re.MULTILINE,
    )
    m = pat.search(text)
    return m.group(1).strip() if m else ""


# ─── Markdown parser ─────────────────────────────────────────────────────────

def add_markdown_content(
    doc,
    file_path: str,
    insertion_map: dict[str, list[tuple[str, str, str]]] | None = None,
    skip_h1: bool = True,
) -> None:
    """Parse a markdown file and add paragraphs/images/tables to the doc.

    Args:
        file_path: Relative or absolute path to the .md file.
        insertion_map: Maps section numbers -> list of (num, path, caption).
        skip_h1: If True, skip the first H1 heading in the file.
    """
    abs_path = os.path.join(ROOT, file_path) if not os.path.isabs(file_path) else file_path
    if not os.path.exists(abs_path):
        doc.add_paragraph(f"[FILE TIDAK DITEMUKAN: {abs_path}]")
        return

    with open(abs_path, encoding="utf-8") as f:
        text = f.read()

    lines = text.split("\n")

    # Which sections have images to insert?
    insertions = insertion_map or {}

    # Track sections we have already inserted images for
    did_insert: set[str] = set()

    def emit_insertions(sec: str) -> None:
        if sec in did_insert:
            return
        did_insert.add(sec)
        items = insertions.get(sec)
        if not items:
            return
        doc.add_paragraph()  # spacer before insertions
        for _num, path, caption in items:
            add_image_with_caption(doc, path, caption)
            print(f"    [OK] {caption}")

    # ── Section stack tracking ──────────────────────────────────────
    # Stack of (section_id, heading_level) currently open.
    section_stack: list[tuple[str, int]] = []

    def close_sections(level: int) -> None:
        """Pop sections whose level >= *level*, emitting images for each."""
        while section_stack and section_stack[-1][1] >= level:
            sec, _ = section_stack.pop()
            if sec:
                emit_insertions(sec)

    def open_section(sec: str, level: int) -> None:
        close_sections(level)
        section_stack.append((sec, level))

    # ── Line processing ─────────────────────────────────────────────
    buf: list[str] = []
    in_code_block = False
    in_table = False
    table_lines: list[str] = []
    skipped_h1 = False

    def flush_text() -> None:
        if not buf:
            return
        content = "\n".join(buf).strip()
        if content:
            # Bold for **text**
            parts = re.split(r"(\*\*[^*]+\*\*)", content)
            para = doc.add_paragraph()
            for part in parts:
                if part.startswith("**") and part.endswith("**"):
                    r = para.add_run(part[2:-2])
                    r.bold = True
                else:
                    para.add_run(part)
        buf.clear()

    for raw in lines:
        line = raw.rstrip()

        # Code block
        if line.startswith("```"):
            if in_code_block:
                in_code_block = False
                buf.append("[code block]")
            else:
                in_code_block = True
            continue

        if in_code_block:
            continue

        # Horizontal rule
        if line.strip() == "---":
            flush_text()
            # no-op in body (used as section separator in front matter)
            continue

        # Headings
        h_match = re.match(r"^(#{1,3})\s+(.+)$", line)
        if h_match:
            flush_text()
            level = len(h_match.group(1))
            title = h_match.group(2).strip()

            # Skip the first H1 in chapter files
            if skip_h1 and level == 1 and not skipped_h1:
                print(f"  (skip H1: {title})")
                skipped_h1 = True
                continue

            # Extract section number from title (e.g. "3.1" from "## 3.1 Section")
            sec_match = re.match(r"^(\d+(?:\.\d+)*)\s", title)
            section_id = sec_match.group(1) if sec_match else ""

            # Manage section stack
            if section_id:
                open_section(section_id, level)
            else:
                # For non-numeric headings, close all subsections
                close_sections(level + 1)

            # bold for **headings**
            clean_title = title.replace("**", "")
            add_heading_para(doc, clean_title, level)
            print(f"  -> {clean_title}")
            continue

        # Table lines
        if line.startswith("|") and line.endswith("|"):
            if not in_table:
                flush_text()
                in_table = True
                table_lines = [line]
            else:
                table_lines.append(line)
            continue
        else:
            if in_table:
                # End of table
                in_table = False
                # Filter out separator lines (e.g. |---|---|)
                data_lines = [l for l in table_lines if not re.match(r"^\|[-\s|]+\|$", l)]
                if data_lines:
                    add_table_from_markdown(doc, data_lines)
                table_lines = []
                continue

        # Empty line
        if not line.strip():
            buf.append("")
            continue

        # Regular text
        buf.append(line)

    # End of file: flush remaining text and close all sections
    flush_text()
    while section_stack:
        sec, _ = section_stack.pop()
        if sec:
            emit_insertions(sec)


# ─── Document builder ────────────────────────────────────────────────────────

def build() -> Document:
    doc = Document()

    # ── Page setup ────────────────────────────────────────────────────
    section = doc.sections[0]
    section.page_width = Cm(21)
    section.page_height = Cm(29.7)
    section.top_margin = Cm(2.5)
    section.bottom_margin = Cm(2.5)
    section.left_margin = Cm(3)
    section.right_margin = Cm(2.5)

    style = doc.styles["Normal"]
    font = style.font
    font.name = "Times New Roman"
    font.size = Pt(12)
    pf = style.paragraph_format
    pf.line_spacing = 1.5

    print("\n=== BUILDING REPORT ===\n")

    # ══════════════════════════════════════════════════════════════════
    # COVER
    # ══════════════════════════════════════════════════════════════════
    print("-- Cover --")
    for _ in range(6):
        doc.add_paragraph()
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run("LAPORAN KERJA PRAKTEK")
    r.bold = True
    r.font.size = Pt(18)

    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(
        "PENGEMBANGAN BACKEND SISTEM INFORMASI MANAJEMEN PRODUK BARU\n"
        "(Satu Peta Pasar / PASAR)\n"
        "PT Petrokimia Gresik"
    )
    r.font.size = Pt(14)

    for _ in range(4):
        doc.add_paragraph()
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run("Henokh Yeremia Olbrain Perangin Angin")
    r.font.size = Pt(13)
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run("NBI: 1462300075")
    r.font.size = Pt(12)

    for _ in range(4):
        doc.add_paragraph()
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run("PROGRAM STUDI TEKNIK INFORMATIKA\n[UNIVERSITAS]\n2026")
    r.font.size = Pt(12)

    doc.add_page_break()

    # ══════════════════════════════════════════════════════════════════
    # PENGESAHAN
    # ══════════════════════════════════════════════════════════════════
    print("-- Lembar Pengesahan --")
    for _ in range(3):
        doc.add_paragraph()
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run("LEMBAR PENGESAHAN")
    r.bold = True
    r.font.size = Pt(14)

    doc.add_paragraph()
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    r = p.add_run(
        "Laporan Kerja Praktek dengan judul:\n\n"
        '"PENGEMBANGAN BACKEND SISTEM INFORMASI MANAJEMEN PRODUK BARU"\n\n'
        "telah disetujui dan disahkan pada tanggal ………………………"
    )
    r.font.size = Pt(12)

    for _ in range(4):
        doc.add_paragraph()
    p = doc.add_paragraph()
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p.add_run("Menyetujui,\n\n").font.size = Pt(12)
    p.add_run("Pembimbing Lapangan,\n\n\n\n\n").font.size = Pt(12)
    p.add_run("(…………………………………)\n\n").font.size = Pt(12)
    p.add_run("Mengetahui,\n\n").font.size = Pt(12)
    p.add_run("Dosen Pembimbing,\n\n\n\n\n").font.size = Pt(12)
    p.add_run("(…………………………………)").font.size = Pt(12)

    doc.add_page_break()

    # ══════════════════════════════════════════════════════════════════
    # DAFTAR RIWAYAT HIDUP
    # ══════════════════════════════════════════════════════════════════
    print("-- Daftar Riwayat Hidup --")
    with open(os.path.join(DOCS, "BAGIAN_AWAL.md"), encoding="utf-8") as f:
        awal = f.read()
    rh = extract_section(awal, "DAFTAR RIWAYAT HIDUP")
    if rh:
        add_heading_para(doc, "DAFTAR RIWAYAT HIDUP", 1)
        for line in rh.split("\n"):
            line = line.strip()
            if not line:
                continue
            parts = re.split(r"(\*\*[^*]+\*\*)", line)
            para = doc.add_paragraph()
            for part in parts:
                if part.startswith("**") and part.endswith("**"):
                    r = para.add_run(part[2:-2])
                    r.bold = True
                else:
                    r = para.add_run(part)
                    if part.startswith("- "):
                        para.paragraph_format.left_indent = Cm(1)
    else:
        doc.add_paragraph("[Bagian Daftar Riwayat Hidup belum diisi]")

    doc.add_page_break()

    # ══════════════════════════════════════════════════════════════════
    # KATA PENGANTAR
    # ══════════════════════════════════════════════════════════════════
    print("-- Kata Pengantar --")
    kp = extract_section(awal, "KATA PENGANTAR")
    if kp:
        add_heading_para(doc, "KATA PENGANTAR", 1)
        for line in kp.split("\n"):
            line = line.strip()
            if not line:
                continue
            if line == "---":
                continue
            if "**" in line:
                # Plain text with bold support
                parts = re.split(r"(\*\*[^*]+\*\*)", line)
                para = doc.add_paragraph()
                for part in parts:
                    if part.startswith("**") and part.endswith("**"):
                        r = para.add_run(part[2:-2])
                        r.bold = True
                    else:
                        para.add_run(part)
            else:
                doc.add_paragraph(line)

    doc.add_page_break()

    # ══════════════════════════════════════════════════════════════════
    # DAFTAR ISI (placeholder)
    # ══════════════════════════════════════════════════════════════════
    print("-- Daftar Isi --")
    add_heading_para(doc, "DAFTAR ISI", 1)

    p = doc.add_paragraph()
    r = p.add_run(
        "[Daftar isi akan digenerate otomatis oleh Microsoft Word\n"
        "setelah seluruh konten selesai. Gunakan:\n"
        "References -> Table of Contents -> Automatic Table.]"
    )
    r.italic = True

    # Also add the TOC content from BAGIAN_AWAL.md
    toc = extract_section(awal, "DAFTAR ISI")
    if toc:
        for line in toc.split("\n"):
            line = line.strip()
            if not line or line == "---":
                continue
            doc.add_paragraph(line)
            doc.add_paragraph()

    doc.add_page_break()

    # ══════════════════════════════════════════════════════════════════
    # DAFTAR GAMBAR (placeholder)
    # ══════════════════════════════════════════════════════════════════
    print("-- Daftar Gambar --")
    add_heading_para(doc, "DAFTAR GAMBAR", 1)

    p = doc.add_paragraph()
    r = p.add_run(
        "[Daftar gambar akan digenerate otomatis oleh Microsoft Word\n"
        "setelah seluruh gambar dan caption disisipkan. Gunakan:\n"
        "References -> Insert Table of Figures.]"
    )
    r.italic = True

    dg = extract_section(awal, "DAFTAR GAMBAR")
    if dg:
        for line in dg.split("\n"):
            line = line.strip()
            if not line or line == "---" or line.startswith("*["):
                continue
            doc.add_paragraph(line)

    doc.add_page_break()

    # ══════════════════════════════════════════════════════════════════
    # DAFTAR TABEL (placeholder)
    # ══════════════════════════════════════════════════════════════════
    print("-- Daftar Tabel --")
    add_heading_para(doc, "DAFTAR TABEL", 1)

    p = doc.add_paragraph()
    r = p.add_run(
        "[Daftar tabel akan digenerate otomatis oleh Microsoft Word\n"
        "setelah seluruh tabel dan caption disisipkan. Gunakan:\n"
        "References -> Insert Table of Figures dengan caption label 'Tabel'.]"
    )
    r.italic = True

    dt = extract_section(awal, "DAFTAR TABEL")
    if dt:
        for line in dt.split("\n"):
            line = line.strip()
            if not line or line == "---" or line.startswith("*["):
                continue
            doc.add_paragraph(line)

    doc.add_page_break()

    # ══════════════════════════════════════════════════════════════════
    # BAB I — PENDAHULUAN (no images)
    # ══════════════════════════════════════════════════════════════════
    print("\n-- BAB I --")
    add_markdown_content(doc, "docs/BAB_I_PENDAHULUAN.md", skip_h1=True)
    doc.add_page_break()

    # ══════════════════════════════════════════════════════════════════
    # BAB II — GAMBARAN UMUM
    # ══════════════════════════════════════════════════════════════════
    print("\n-- BAB II --")
    bab2_map = _merge_maps(SCREENSHOT_MAP, DIAGRAM_MAP, prefix="2.")
    add_markdown_content(doc, "docs/BAB_II_GAMBARAN_UMUM.md", skip_h1=True,
                         insertion_map=bab2_map)
    doc.add_page_break()

    # ══════════════════════════════════════════════════════════════════
    # BAB III — PELAKSANAAN KERJA PRAKTEK
    # ══════════════════════════════════════════════════════════════════
    bab3_map = _merge_maps(SCREENSHOT_MAP, DIAGRAM_MAP, prefix="3.")

    print("\n-- BAB III (Bagian 1: 3.1-3.4) --")
    add_markdown_content(doc, "docs/BAB_III_BAGIAN_1.md", skip_h1=True,
                         insertion_map=bab3_map)

    print("\n-- BAB III (Bagian 2: 3.5-3.7) --")
    add_markdown_content(doc, "docs/BAB_III_BAGIAN_2.md", skip_h1=True,
                         insertion_map=bab3_map)

    print("\n-- BAB III (Bagian 3: 3.8-3.12) --")
    add_markdown_content(doc, "docs/BAB_III_BAGIAN_3.md", skip_h1=True,
                         insertion_map=bab3_map)

    doc.add_page_break()

    # ══════════════════════════════════════════════════════════════════
    # BAB IV — KESIMPULAN DAN SARAN (no images)
    # ══════════════════════════════════════════════════════════════════
    print("\n-- BAB IV --")
    add_markdown_content(doc, "docs/BAB_IV_KESIMPULAN.md", skip_h1=True)
    doc.add_page_break()

    # ══════════════════════════════════════════════════════════════════
    # DAFTAR PUSTAKA
    # ══════════════════════════════════════════════════════════════════
    print("\n-- Daftar Pustaka --")
    add_heading_para(doc, "DAFTAR PUSTAKA", 1)

    dp = extract_section(awal, "DAFTAR PUSTAKA")
    if dp:
        for line in dp.split("\n"):
            line = line.strip()
            if not line:
                continue
            # Hanging indent for bibliography
            para = doc.add_paragraph(line)
            para.paragraph_format.left_indent = Cm(1)
            para.paragraph_format.first_line_indent = Cm(-1)
            for r in para.runs:
                r.font.size = Pt(11)
        print("  [OK] Daftar Pustaka disisipkan")

    doc.add_page_break()

    # ══════════════════════════════════════════════════════════════════
    # LAMPIRAN
    # ══════════════════════════════════════════════════════════════════
    print("\n-- Lampiran --")
    add_markdown_content(doc, "docs/LAMPIRAN.md", skip_h1=False)

    # ── Save ─────────────────────────────────────────────────────────
    print(f"\n=== MENYIMPAN KE {OUTPUT} ===\n")
    doc.save(OUTPUT)
    return doc


# ─── Entry point ─────────────────────────────────────────────────────────────

if __name__ == "__main__":
    build()
    size_kb = os.path.getsize(OUTPUT) / 1024
    print(f"\n[OK] Output: {OUTPUT}")
    print(f"  Ukuran: {size_kb:.1f} KB")
