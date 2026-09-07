import jsPDF from "jspdf";
import type { LayerKey } from "./data";
import { LAYERS, layerLabel, layerMessage, overallStatus, STRENGTH_MESSAGES, IMPROVE_MESSAGES, EXPOSED_MESSAGES, ROADMAPS, type Pathway } from "./data";
import rbLogoAsset from "@/assets/rb-logo.png.asset.json";

async function loadWhiteLogo(): Promise<string | null> {
  try {
    const res = await fetch(rbLogoAsset.url);
    const blob = await res.blob();
    const bitmap = await createImageBitmap(blob);
    const canvas = document.createElement("canvas");
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    const ctx = canvas.getContext("2d")!;
    ctx.drawImage(bitmap, 0, 0);
    const img = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      if (d[i + 3] > 0) { d[i] = 255; d[i + 1] = 255; d[i + 2] = 255; }
    }
    ctx.putImageData(img, 0, 0);
    return canvas.toDataURL("image/png");
  } catch {
    return null;
  }
}

type ResultPayload = {
  name: string;
  company: string;
  scores: Record<LayerKey, number>;
  total: number;
  strongest: LayerKey;
  exposed: LayerKey;
  improvements: LayerKey[];
  patterns: { title: string; message: string }[];
  pathway: Pathway;
};

const BERRY: [number, number, number] = [156, 27, 47];
const NAVY: [number, number, number] = [22, 32, 60];
const SOFT: [number, number, number] = [240, 240, 245];
const GOLD: [number, number, number] = [184, 145, 76];

export async function downloadBlueprintPdf(r: ResultPayload) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 48;

  const whiteLogo = await loadWhiteLogo();

  // ----- COVER -----
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, pageW, pageH, "F");
  doc.setFillColor(...BERRY);
  doc.rect(0, pageH - 220, pageW, 220, "F");
  doc.setFillColor(...GOLD);
  doc.rect(margin, margin + 70, 36, 4, "F");

  if (whiteLogo) {
    doc.addImage(whiteLogo, "PNG", margin, margin - 8, 110, 44, undefined, "FAST");
  } else {
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("RED BERRY", margin, margin + 28);
  }
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.text("Ambition Infrastructure", margin, margin + 96);


  doc.setFont("helvetica", "bold");
  doc.setFontSize(34);
  const title = doc.splitTextToSize("The Ambition Infrastructure Blueprint", pageW - margin * 2);
  doc.text(title, margin, pageH / 2 - 40);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(12);
  doc.setTextColor(220, 220, 230);
  doc.text("A private diagnostic of the structure behind your ambition.", margin, pageH / 2 + 10);

  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  const date = new Date().toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });
  doc.text(`Prepared for: ${r.name || "—"}`, margin, pageH - 140);
  doc.text(`Company: ${r.company || "—"}`, margin, pageH - 122);
  doc.text(`Date: ${date}`, margin, pageH - 104);

  doc.setFontSize(9);
  doc.setTextColor(255, 255, 255);
  doc.text("Red Berry  |  Ambition Infrastructure", margin, pageH - 30);

  // ----- PAGE 2: SUMMARY -----
  doc.addPage();
  let y = margin;
  doc.setTextColor(...NAVY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text("Overall Infrastructure Status", margin, y);
  y += 24;

  const status = overallStatus(r.total);
  doc.setFillColor(...BERRY);
  doc.rect(margin, y, pageW - margin * 2, 60, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text(status.status, margin + 16, y + 26);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(`Total Score: ${r.total} / 60`, margin + 16, y + 46);
  y += 80;

  doc.setTextColor(60, 60, 75);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  const statusLines = doc.splitTextToSize(status.message, pageW - margin * 2);
  doc.text(statusLines, margin, y);
  y += statusLines.length * 14 + 18;

  // Layer scorecards
  doc.setTextColor(...NAVY);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Four Infrastructure Layers", margin, y);
  y += 16;

  const colW = (pageW - margin * 2 - 16) / 2;
  let col = 0;
  let rowY = y;
  for (const layer of LAYERS) {
    const sc = r.scores[layer.key];
    const lbl = layerLabel(sc);
    const x = margin + col * (colW + 16);
    doc.setFillColor(...SOFT);
    doc.rect(x, rowY, colW, 86, "F");
    doc.setFillColor(...(lbl.tone === "strong" ? GOLD : lbl.tone === "developing" ? NAVY : BERRY));
    doc.rect(x, rowY, 4, 86, "F");
    doc.setTextColor(...NAVY);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(layer.title, x + 14, rowY + 20);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(90, 90, 110);
    doc.text(lbl.label, x + 14, rowY + 36);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.setTextColor(...NAVY);
    doc.text(`${sc}`, x + 14, rowY + 70);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 135);
    doc.text("/ 15", x + 40, rowY + 70);
    col++;
    if (col === 2) {
      col = 0;
      rowY += 100;
    }
  }
  y = rowY + (col === 0 ? 0 : 100) + 10;

  // ----- PAGE 3: INSIGHTS -----
  doc.addPage();
  y = margin;
  const section = (title: string, body: string) => {
    if (y > pageH - 120) { doc.addPage(); y = margin; }
    doc.setTextColor(...BERRY);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(title, margin, y);
    y += 16;
    doc.setTextColor(50, 50, 65);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10.5);
    const lines = doc.splitTextToSize(body, pageW - margin * 2);
    doc.text(lines, margin, y);
    y += lines.length * 13 + 14;
  };

  section("What Your Business Is Already Doing Well", STRENGTH_MESSAGES[r.strongest]);

  if (r.improvements.length) {
    for (const k of r.improvements) section(`Improvement Area — ${LAYERS.find(l => l.key === k)!.title}`, IMPROVE_MESSAGES[k]);
  }

  section("Your Most Exposed Infrastructure Layer", EXPOSED_MESSAGES[r.exposed]);

  for (const p of r.patterns) section(`Pattern — ${p.title}`, p.message);

  const rm = ROADMAPS[r.exposed];
  section(`Recommended Roadmap — ${rm.title}`, `${rm.recommendation}\n\nFocus areas:\n• ${rm.focus.join("\n• ")}`);
  section(`Recommended Red Berry Pathway — ${r.pathway.name}`, r.pathway.message);

  if (y > pageH - 140) { doc.addPage(); y = margin; }
  doc.setFillColor(...NAVY);
  doc.rect(margin, y, pageW - margin * 2, 100, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Request a Private Infrastructure Review", margin + 18, y + 28);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const ctaLines = doc.splitTextToSize(
    "Your Blueprint has shown where your business is strong, where it needs improvement, and where it may be exposed. The next step is to review the structure behind the score.",
    pageW - margin * 2 - 36,
  );
  doc.text(ctaLines, margin + 18, y + 48);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(...GOLD);
  doc.text("Tell us what you are building. We will show you what it needs.", margin + 18, y + 88);

  // ----- LAST PAGE: CONTACT -----
  doc.addPage();
  doc.setFillColor(...NAVY);
  doc.rect(0, 0, pageW, pageH, "F");
  doc.setFillColor(...BERRY);
  doc.rect(0, pageH - 160, pageW, 160, "F");
  doc.setFillColor(...GOLD);
  doc.rect(margin, margin + 70, 36, 4, "F");

  if (whiteLogo) {
    doc.addImage(whiteLogo, "PNG", margin, margin - 8, 110, 44, undefined, "FAST");
  }

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.text("Let's Talk", margin, margin + 150);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(220, 220, 230);
  const introLines = doc.splitTextToSize(
    "Reach out to Red Berry to review your Blueprint privately with an advisor and architect the next step.",
    pageW - margin * 2,
  );
  doc.text(introLines, margin, margin + 178);

  let cy = margin + 230;
  const row = (label: string, value: string) => {
    doc.setTextColor(...GOLD);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text(label.toUpperCase(), margin, cy);
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(13);
    doc.text(value, margin, cy + 18);
    cy += 50;
  };
  row("Phone", "+971 4 385 1002");
  row("Email", "info@redberry.ae");
  row("Address", "1408, Opal Tower, Business Bay, Dubai, UAE");
  row("Web", "redberry.ae");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(11);
  doc.text("RED BERRY CORPORATE SERVICE PROVIDER LLC", margin, pageH - 60);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(240, 220, 225);
  doc.text("Ambition Infrastructure · Private Advisory", margin, pageH - 42);



  // Footer on every page
  const pages = doc.getNumberOfPages();
  for (let i = 1; i <= pages; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(140, 140, 155);
    doc.setFont("helvetica", "normal");
    if (i > 1) doc.text("Red Berry  |  Ambition Infrastructure", margin, pageH - 20);
    doc.text(`${i} / ${pages}`, pageW - margin, pageH - 20, { align: "right" });
  }

  const safe = (r.company || r.name || "blueprint").replace(/[^a-z0-9]+/gi, "-").toLowerCase();
  doc.save(`red-berry-blueprint-${safe}.pdf`);
}
