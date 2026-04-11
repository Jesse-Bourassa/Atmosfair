/**
 * Supplier PDF parser for TTI Climatisation and Tecnico Chauffage.
 * Returns { supplier, supplierTotal, items[] }
 * Items have: description, quantity, supplierCost (what dad paid), unitPrice=0 (dad sets client price)
 */

function detectSupplier(text) {
  if (/TTI\s+Climatisation|Jean-Neveu|MONTANT\s+DÛ/i.test(text)) return "tti";
  if (/TECNICO\s+CHAUFFAGE|DE\s+LORIMIER|TVQ\s*:/i.test(text)) return "tecnico";
  return "generic";
}

// ── TTI Climatisation ─────────────────────────────────────────────────────────
// Item lines look like: "1 UN THZE24HPB N UN 980.0000 980.00"
// Description is on the NEXT line: "ZEPHYR 24K CENTRALE INVERTER 1"
function parseTTI(text) {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const items = [];

  // Distinctive TTI pattern: qty + UOM + itemCode + ... + 4-decimal price + 2-decimal total
  const lineRx = /^(\d+)\s+(UN|BT|EA|CS|PR|LT|RL|M|PKG|FT)\s+(\S+)\s+.*?(\d+\.\d{4})\s+([\d,]+\.\d{2})\s*$/i;

  for (let i = 0; i < lines.length; i++) {
    const m = lines[i].match(lineRx);
    if (!m) continue;

    const qty       = parseInt(m[1]);
    const code      = m[3];
    const unitCost  = parseFloat(m[4]);
    const totalCost = parseFloat(m[5].replace(/,/g, ""));

    if (totalCost <= 0) continue;

    // Description is on next line (removes trailing standalone digit like "1")
    let description = code;
    if (i + 1 < lines.length) {
      const next = lines[i + 1].replace(/\s+\d+\s*$/, "").trim();
      if (next.length > 3 && !next.match(/^(\d+)\s+(UN|BT|EA)/i)) {
        description = next;
        i++; // consume the description line
      }
    }

    items.push({ description, quantity: qty, unitPrice: 0, supplierCost: totalCost });
  }

  return items;
}

function extractTTITotal(text) {
  const m = text.match(/MONTANT\s+DÛ[:\s]*([\d,\s]+\.\d{2})/i);
  if (m) return parseFloat(m[1].replace(/[\s,]/g, ""));
  return 0;
}

// ── Tecnico Chauffage ─────────────────────────────────────────────────────────
// Item lines: "TURBOMAX80-5  C.E. INDIRECT INST 80G  1  0.00  0.00  3263.00  3 263.00  FP"
// Note: Tecnico uses spaces as thousands separators in totals (e.g., "3 263.00")
function parseTecnico(text) {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const items = [];

  // End of line: price  space-separated-price  2-letter-code
  // e.g.: "3263.00 3 263.00 FP"
  const lineRx = /^(\S+)\s+(.+?)\s+(\d+)\s+[\d.]+\s+[\d.]+\s+([\d.]+)\s+([\d ]+\.\d{2})\s+([A-Z]{2})\s*$/;

  for (const line of lines) {
    const m = line.match(lineRx);
    if (!m) continue;

    const code      = m[1];
    const rawDesc   = m[2].trim();
    const qty       = parseInt(m[3]);
    const unitCost  = parseFloat(m[4]);
    const totalCost = parseFloat(m[5].replace(/\s/g, ""));

    // Skip lines with zero price (warranty text, notes, etc.)
    if (unitCost <= 0 && totalCost <= 0) continue;
    // Skip obvious header/note lines
    if (/no\s+item|description|qté|prix|comptoir/i.test(rawDesc)) continue;

    const description = rawDesc ? `${rawDesc} (${code})` : code;
    items.push({ description, quantity: qty, unitPrice: 0, supplierCost: totalCost });
  }

  return items;
}

function extractTecnicoTotal(text) {
  const m = text.match(/Total\s*:\s*([\d\s]+\.\d{2})/i);
  if (m) return parseFloat(m[1].replace(/\s/g, ""));
  return 0;
}

// ── Generic fallback ──────────────────────────────────────────────────────────
// Look for any line ending with a price (XX.XX) and extract description + price
function parseGeneric(text) {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const items = [];

  const priceRx = /^(.+?)\s+([\d,]+\.\d{2})\s*$/;
  const skipRx  = /total|sous-total|taxes|montant|tps|tvq|gst|qst|subtotal|tax|page|date|adresse|phone/i;

  for (const line of lines) {
    const m = line.match(priceRx);
    if (!m) continue;
    const desc  = m[1].trim();
    const price = parseFloat(m[2].replace(/,/g, ""));
    if (price <= 0 || desc.length < 4) continue;
    if (skipRx.test(desc)) continue;
    items.push({ description: desc, quantity: 1, unitPrice: 0, supplierCost: price });
  }

  return items;
}

function extractGenericTotal(text) {
  // Try common total patterns
  const patterns = [
    /total\s*:\s*([\d,\s]+\.\d{2})/i,
    /montant\s*dû\s*:\s*([\d,\s]+\.\d{2})/i,
    /total\s+due\s*:\s*([\d,\s]+\.\d{2})/i,
  ];
  for (const rx of patterns) {
    const m = text.match(rx);
    if (m) return parseFloat(m[1].replace(/[\s,]/g, ""));
  }
  return 0;
}

// ── Main export ───────────────────────────────────────────────────────────────
function parsePDF(text) {
  const supplier = detectSupplier(text);

  let items        = [];
  let supplierTotal = 0;

  if (supplier === "tti") {
    items         = parseTTI(text);
    supplierTotal = extractTTITotal(text);
  } else if (supplier === "tecnico") {
    items         = parseTecnico(text);
    supplierTotal = extractTecnicoTotal(text);
  } else {
    items         = parseGeneric(text);
    supplierTotal = extractGenericTotal(text);
  }

  // Fallback: if no items but total found, create one generic line
  if (items.length === 0 && supplierTotal > 0) {
    items = [{ description: "Matériaux et équipement", quantity: 1, unitPrice: 0, supplierCost: supplierTotal }];
  }

  // If supplier total wasn't found from regex, sum items
  if (supplierTotal <= 0 && items.length > 0) {
    supplierTotal = items.reduce((s, i) => s + i.supplierCost, 0);
  }

  const supplierName =
    supplier === "tti"     ? "TTI Climatisation Chauffage" :
    supplier === "tecnico" ? "Tecnico Chauffage" :
    "Fournisseur inconnu";

  return { supplier, supplierName, supplierTotal, items };
}

module.exports = { parsePDF };
