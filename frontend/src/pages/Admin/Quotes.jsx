import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box, Button, Chip, CircularProgress, Container, Dialog, DialogActions,
  DialogContent, DialogTitle, Divider, FormControl, Grid, IconButton,
  InputLabel, MenuItem, Paper, Select, Skeleton, Stack, Table, TableBody,
  TableCell, TableContainer, TableHead, TableRow, TextField, Tooltip,
  Typography,
} from "@mui/material";
import AddIcon          from "@mui/icons-material/Add";
import CloseIcon        from "@mui/icons-material/Close";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import PrintIcon        from "@mui/icons-material/Print";
import VisibilityIcon   from "@mui/icons-material/Visibility";
import dayjs from "dayjs";
import { apiUrl } from "../../lib/api";

// ── Constants ─────────────────────────────────────────────────────────────────

const cardSx = {
  p: { xs: 2, md: 3 },
  borderRadius: 3,
  bgcolor: "rgba(17,25,40,0.55)",
  backdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.10)",
  boxShadow: "0 18px 60px rgba(0,0,0,0.55)",
};

const STATUS_META = {
  draft:    { label: "Brouillon", color: "rgba(255,255,255,0.5)",  bg: "rgba(255,255,255,0.08)" },
  sent:     { label: "Envoyé",   color: "#2196f3",                bg: "rgba(33,150,243,0.15)"  },
  accepted: { label: "Accepté",  color: "#43a047",                bg: "rgba(67,160,71,0.15)"   },
  declined: { label: "Refusé",   color: "#f44336",                bg: "rgba(244,67,54,0.15)"   },
};

const SERVICE_TYPES = ["repair", "maintenance", "installation", "other"];
const SERVICE_FR    = { repair: "Réparation", maintenance: "Entretien", installation: "Installation", other: "Autre" };
const SERVICE_EN    = { repair: "Repair",     maintenance: "Maintenance", installation: "Installation", other: "Other" };

const darkFieldSx = {
  "& input, & textarea": { color: "#fff" },
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.2)" },
  "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.4)" },
  "& .MuiInputLabel-root": { color: "rgba(255,255,255,0.5)" },
};
const darkSelectSx = {
  color: "#fff",
  "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.2)" },
  "& .MuiSvgIcon-root": { color: "rgba(255,255,255,0.5)" },
};

// ── Helpers ───────────────────────────────────────────────────────────────────

function calcTotals(items) {
  const subtotal = items.reduce(
    (s, i) => s + (parseFloat(i.quantity) || 0) * (parseFloat(i.unitPrice) || 0),
    0,
  );
  return {
    subtotal,
    tps:   subtotal * 0.05,
    tvq:   subtotal * 0.09975,
    total: subtotal * (1 + 0.05 + 0.09975),
  };
}

function fmt(n) {
  return (parseFloat(n) || 0).toLocaleString("fr-CA", { style: "currency", currency: "CAD" });
}

function last12Months() {
  return Array.from({ length: 12 }, (_, i) => {
    const d = dayjs().subtract(i, "month");
    return { value: d.format("YYYY-MM"), label: d.format("MMMM YYYY") };
  });
}

function printQuote(quote, lang) {
  const fr   = lang !== "en";
  const date = dayjs(quote.createdAt).format("YYYY-MM-DD");
  const svc  = fr ? SERVICE_FR[quote.serviceType] : SERVICE_EN[quote.serviceType];

  const rows = quote.items.map(
    (item) =>
      `<tr>
        <td>${item.description}</td>
        <td class="r">${item.quantity}</td>
        <td class="r">${fmt(item.unitPrice)}</td>
        <td class="r">${fmt(item.quantity * item.unitPrice)}</td>
      </tr>`,
  ).join("");

  const stamp =
    quote.status === "accepted"
      ? `<span class="stamp accepted">${fr ? "ACCEPTÉ" : "ACCEPTED"}</span>`
      : quote.status === "declined"
      ? `<span class="stamp declined">${fr ? "REFUSÉ" : "DECLINED"}</span>`
      : "";

  const html = `<!DOCTYPE html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<title>${fr ? "Soumission" : "Quote"} ${quote.quoteNumber}</title>
<style>
  *{box-sizing:border-box;margin:0;padding:0}
  body{font-family:Arial,sans-serif;color:#222;padding:40px;font-size:13px}
  .header{text-align:center;margin-bottom:28px}
  .co{font-size:26px;font-weight:bold;letter-spacing:2px}
  .co-sub{font-size:12px;color:#666;margin-top:4px}
  .tax-nums{font-size:11px;color:#888;margin-top:6px}
  hr{border:none;border-top:2px solid #222;margin:14px 0}
  .meta{display:flex;justify-content:space-between;margin-bottom:20px}
  .lbl{font-size:10px;text-transform:uppercase;letter-spacing:1px;color:#888;display:block;margin-bottom:3px}
  table{width:100%;border-collapse:collapse;margin:18px 0}
  th{background:#f5f5f5;padding:7px 10px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:.5px;border-bottom:2px solid #ddd}
  td{padding:7px 10px;border-bottom:1px solid #eee}
  .r{text-align:right}
  .tot{width:260px;margin-left:auto;margin-top:12px}
  .tot td{border:none;padding:3px 6px}
  .tot-final{font-size:15px;font-weight:bold;border-top:2px solid #222!important;padding-top:7px!important}
  .notes{margin-top:20px;padding:10px 14px;background:#f9f9f9;border-left:3px solid #ddd}
  .footer{margin-top:36px;padding-top:14px;border-top:1px solid #eee;font-size:11px;color:#888;text-align:center}
  .stamp{display:inline-block;padding:3px 10px;border:2px solid;border-radius:3px;font-weight:bold;font-size:11px;margin-left:10px;vertical-align:middle}
  .accepted{color:#43a047;border-color:#43a047}
  .declined{color:#f44336;border-color:#f44336}
</style>
</head>
<body>
<div class="header">
  <div class="co">ATMOSFAIR</div>
  <div class="co-sub">Services HVAC / HVAC Services</div>
  ${quote.companyTPS ? `<div class="tax-nums">TPS/GST&nbsp;: ${quote.companyTPS} &nbsp;|&nbsp; TVQ/QST&nbsp;: ${quote.companyTVQ}</div>` : ""}
</div>
<hr>
<div class="meta">
  <div>
    <span class="lbl">${fr ? "Soumission" : "Quote"}</span>
    <span style="font-size:18px;font-weight:bold">#${quote.quoteNumber}</span>
    ${stamp}
  </div>
  <div style="text-align:right">
    <span class="lbl">${fr ? "Date" : "Date"}</span>
    <span>${date}</span>
    ${svc ? `<br><span style="color:#666;font-size:12px">${svc}</span>` : ""}
  </div>
</div>
<div style="margin-bottom:20px">
  <span class="lbl">${fr ? "Client" : "Customer"}</span>
  <div>${quote.customerName}</div>
  ${quote.customerPhone  ? `<div>${quote.customerPhone}</div>`  : ""}
  ${quote.customerEmail  ? `<div>${quote.customerEmail}</div>`  : ""}
  ${quote.customerAddress ? `<div>${quote.customerAddress}</div>` : ""}
</div>
<table>
  <thead>
    <tr>
      <th>${fr ? "Description" : "Description"}</th>
      <th class="r">${fr ? "Qté" : "Qty"}</th>
      <th class="r">${fr ? "Prix unitaire" : "Unit Price"}</th>
      <th class="r">Total</th>
    </tr>
  </thead>
  <tbody>${rows}</tbody>
</table>
<table class="tot">
  <tr><td>${fr ? "Sous-total" : "Subtotal"}</td><td class="r">${fmt(quote.subtotal)}</td></tr>
  <tr><td>TPS (5 %)</td><td class="r">${fmt(quote.tps)}</td></tr>
  <tr><td>TVQ (9,975 %)</td><td class="r">${fmt(quote.tvq)}</td></tr>
  <tr><td class="tot-final">Total</td><td class="r tot-final">${fmt(quote.total)}</td></tr>
</table>
${quote.notes ? `<div class="notes"><strong>${fr ? "Notes" : "Notes"} :</strong> ${quote.notes}</div>` : ""}
<div class="footer">${fr ? "Merci de votre confiance. — Atmosfair" : "Thank you for your business. — Atmosfair"}</div>
</body>
</html>`;

  const win = window.open("", "_blank", "width=820,height=940");
  win.document.write(html);
  win.document.close();
  win.onload = () => win.print();
}

function exportCSV(quotes, month) {
  const BOM  = "\uFEFF";
  const hdrs = ["Soumission #", "Client", "Date", "Service", "Sous-total", "TPS", "TVQ", "Total", "Statut"];
  const rows = quotes.map((q) => [
    q.quoteNumber,
    q.customerName,
    dayjs(q.createdAt).format("YYYY-MM-DD"),
    SERVICE_FR[q.serviceType] || q.serviceType || "",
    q.subtotal.toFixed(2),
    q.tps.toFixed(2),
    q.tvq.toFixed(2),
    q.total.toFixed(2),
    STATUS_META[q.status]?.label || q.status,
  ]);
  const csv  = BOM + [hdrs, ...rows].map((r) => r.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(",")).join("\r\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement("a");
  a.href     = url;
  a.download = `atmosfair-soumissions-${month || "tout"}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// ── Small UI pieces ───────────────────────────────────────────────────────────

const StatusChip = ({ status }) => {
  const m = STATUS_META[status] ?? STATUS_META.draft;
  return (
    <Chip
      label={m.label}
      size="small"
      sx={{ bgcolor: m.bg, color: m.color, fontWeight: 700, fontSize: "0.7rem", border: `1px solid ${m.color}44`, height: 22 }}
    />
  );
};

const HC = (props) => (
  <TableCell
    {...props}
    sx={{
      fontWeight: 700, fontSize: "0.72rem", textTransform: "uppercase",
      letterSpacing: 0.8, color: "rgba(255,255,255,0.5)",
      bgcolor: "rgba(10,10,20,0.85)", borderColor: "rgba(255,255,255,0.07)", py: 1.2,
      ...props.sx,
    }}
  />
);

const BC = (props) => (
  <TableCell
    {...props}
    sx={{ color: "rgba(255,255,255,0.78)", py: 1.1, fontSize: "0.82rem", borderColor: "rgba(255,255,255,0.05)", ...props.sx }}
  />
);

// ── Form helpers ──────────────────────────────────────────────────────────────

const emptyItem = () => ({ description: "", quantity: 1, unitPrice: "" });
const emptyForm = () => ({
  customerName: "", customerEmail: "", customerPhone: "", customerAddress: "",
  serviceType: "", language: "fr", notes: "", status: "draft",
  items: [emptyItem()],
});

// ── Main component ────────────────────────────────────────────────────────────

const Quotes = () => {
  const navigate = useNavigate();
  const token    = localStorage.getItem("token");

  const [quotes,       setQuotes]      = useState([]);
  const [loading,      setLoading]     = useState(true);
  const [filterMonth,  setFilterMonth] = useState(dayjs().format("YYYY-MM"));
  const [filterStatus, setFilterStatus]= useState("");
  const [viewQuote,    setViewQuote]   = useState(null);
  const [printLang,    setPrintLang]   = useState("fr");
  const [createOpen,   setCreateOpen]  = useState(false);
  const [saving,       setSaving]      = useState(false);
  const [form,         setForm]        = useState(emptyForm());

  useEffect(() => {
    document.body.classList.add("bg-admin");
    document.body.classList.remove("bg-public");
    return () => document.body.classList.remove("bg-admin");
  }, []);

  useEffect(() => {
    if (!token) { navigate("/login"); return; }
    fetchQuotes();
  }, [navigate]); // eslint-disable-line react-hooks/exhaustive-deps

  async function fetchQuotes() {
    setLoading(true);
    try {
      const res  = await fetch(apiUrl("/api/quotes"), { headers: { Authorization: `Bearer ${token}` } });
      const data = await res.json();
      setQuotes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Failed to fetch quotes", err);
    } finally {
      setLoading(false);
    }
  }

  // Filtered quotes (client-side for speed)
  const filtered = useMemo(() => {
    let q = quotes;
    if (filterMonth)  q = q.filter((x) => dayjs(x.createdAt).format("YYYY-MM") === filterMonth);
    if (filterStatus) q = q.filter((x) => x.status === filterStatus);
    return q;
  }, [quotes, filterMonth, filterStatus]);

  // Monthly summary totals
  const summary = useMemo(
    () => filtered.reduce(
      (s, q) => ({ count: s.count + 1, subtotal: s.subtotal + q.subtotal, tps: s.tps + q.tps, tvq: s.tvq + q.tvq, total: s.total + q.total }),
      { count: 0, subtotal: 0, tps: 0, tvq: 0, total: 0 },
    ),
    [filtered],
  );

  // Status change (inline from table row)
  async function changeStatus(id, status) {
    try {
      await fetch(apiUrl(`/api/quotes/${id}`), {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      setQuotes((prev) => prev.map((q) => (q._id === id ? { ...q, status } : q)));
      if (viewQuote?._id === id) setViewQuote((prev) => ({ ...prev, status }));
    } catch (err) {
      console.error("Failed to update status", err);
    }
  }

  async function deleteQuote(id) {
    if (!window.confirm("Supprimer cette soumission ?")) return;
    try {
      await fetch(apiUrl(`/api/quotes/${id}`), { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      setQuotes((prev) => prev.filter((q) => q._id !== id));
      if (viewQuote?._id === id) setViewQuote(null);
    } catch (err) {
      console.error("Failed to delete quote", err);
    }
  }

  // Form item helpers
  const setItem = (idx, field, value) =>
    setForm((prev) => {
      const items = [...prev.items];
      items[idx]  = { ...items[idx], [field]: value };
      return { ...prev, items };
    });

  const addItem    = () => setForm((prev) => ({ ...prev, items: [...prev.items, emptyItem()] }));
  const removeItem = (idx) => setForm((prev) => ({ ...prev, items: prev.items.filter((_, i) => i !== idx) }));

  const formTotals = useMemo(() => calcTotals(form.items), [form.items]);

  async function submitQuote() {
    if (!form.customerName.trim()) return;
    setSaving(true);
    try {
      const payload = {
        ...form,
        items: form.items.map((i) => ({
          description: i.description,
          quantity:    parseFloat(i.quantity)  || 1,
          unitPrice:   parseFloat(i.unitPrice) || 0,
        })),
      };
      const res  = await fetch(apiUrl("/api/quotes"), {
        method: "POST",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const newQ = await res.json();
      setQuotes((prev) => [newQ, ...prev]);
      setCreateOpen(false);
      setForm(emptyForm());
    } catch (err) {
      console.error("Failed to create quote", err);
    } finally {
      setSaving(false);
    }
  }

  const months = last12Months();

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <Box sx={{ minHeight: "100vh", pt: { xs: 10, md: 11 }, pb: { xs: 4, md: 6 } }}>
      <Container maxWidth={false} disableGutters sx={{ px: { xs: 2, md: 3 }, maxWidth: 2200, mx: "auto" }}>

        {/* Header */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 3 }}>
          <Stack spacing={0.4}>
            <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: 0.2 }}>Soumissions</Typography>
            <Typography sx={{ color: "rgba(255,255,255,0.45)", fontSize: "0.88rem" }}>
              Créez, gérez et imprimez les soumissions clients.
            </Typography>
          </Stack>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setCreateOpen(true)}
            sx={{ borderRadius: 2, textTransform: "none", fontWeight: 700, bgcolor: "#2196f3", "&:hover": { bgcolor: "#1976d2" } }}
          >
            Nouvelle soumission
          </Button>
        </Stack>

        {/* Filter bar */}
        <Paper sx={{ ...cardSx, p: 2, mb: 3 }}>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} alignItems="center" flexWrap="wrap">
            <FormControl size="small" sx={{ minWidth: 180 }}>
              <InputLabel sx={{ color: "rgba(255,255,255,0.5)" }}>Mois</InputLabel>
              <Select value={filterMonth} label="Mois" onChange={(e) => setFilterMonth(e.target.value)} sx={darkSelectSx}>
                <MenuItem value="">Toutes les dates</MenuItem>
                {months.map((m) => <MenuItem key={m.value} value={m.value}>{m.label}</MenuItem>)}
              </Select>
            </FormControl>

            <Stack direction="row" spacing={1} flexWrap="wrap">
              {[["", "Tous"], ...Object.entries(STATUS_META).map(([k, v]) => [k, v.label])].map(([val, label]) => (
                <Chip
                  key={val}
                  label={label}
                  size="small"
                  onClick={() => setFilterStatus(val)}
                  variant={filterStatus === val ? "filled" : "outlined"}
                  sx={{
                    cursor: "pointer", fontWeight: 600, fontSize: "0.72rem",
                    borderColor: val ? `${STATUS_META[val]?.color}66` : "rgba(255,255,255,0.25)",
                    color: val && filterStatus === val ? "#fff" : val ? STATUS_META[val]?.color : "rgba(255,255,255,0.6)",
                    bgcolor: val && filterStatus === val ? STATUS_META[val]?.bg : "transparent",
                  }}
                />
              ))}
            </Stack>

            <Box sx={{ flex: 1 }} />

            <Tooltip title="Exporter CSV">
              <span>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<FileDownloadIcon />}
                  onClick={() => exportCSV(filtered, filterMonth)}
                  disabled={filtered.length === 0}
                  sx={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.7)", textTransform: "none" }}
                >
                  CSV
                </Button>
              </span>
            </Tooltip>
          </Stack>
        </Paper>

        {/* Quotes table */}
        <Paper sx={{ ...cardSx, mb: 3 }}>
          {loading ? (
            <Stack spacing={1.5} sx={{ p: 2 }}>
              {[...Array(5)].map((_, i) => <Skeleton key={i} variant="rounded" height={40} sx={{ bgcolor: "rgba(255,255,255,0.06)" }} />)}
            </Stack>
          ) : filtered.length === 0 ? (
            <Stack alignItems="center" sx={{ py: 6 }}>
              <Typography sx={{ color: "rgba(255,255,255,0.3)", fontSize: "0.9rem" }}>Aucune soumission trouvée.</Typography>
            </Stack>
          ) : (
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <HC>N°</HC>
                    <HC>Client</HC>
                    <HC>Date</HC>
                    <HC>Service</HC>
                    <HC sx={{ textAlign: "right" }}>Total</HC>
                    <HC>Statut</HC>
                    <HC sx={{ textAlign: "right" }}>Actions</HC>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filtered.map((q) => (
                    <TableRow key={q._id} sx={{ "&:hover": { bgcolor: "rgba(33,150,243,0.06)" } }}>
                      <BC sx={{ fontFamily: "monospace", color: "rgba(255,255,255,0.45)", fontSize: "0.75rem" }}>{q.quoteNumber}</BC>
                      <BC sx={{ fontWeight: 600 }}>{q.customerName}</BC>
                      <BC sx={{ color: "rgba(255,255,255,0.5)" }}>{dayjs(q.createdAt).format("DD MMM YYYY")}</BC>
                      <BC sx={{ color: "rgba(255,255,255,0.5)", fontSize: "0.75rem" }}>{SERVICE_FR[q.serviceType] || "—"}</BC>
                      <BC sx={{ textAlign: "right", fontWeight: 700, color: "#43a047" }}>{fmt(q.total)}</BC>
                      <BC>
                        <Select
                          value={q.status}
                          onChange={(e) => changeStatus(q._id, e.target.value)}
                          size="small"
                          variant="standard"
                          disableUnderline
                          sx={{ fontSize: "0.75rem", color: STATUS_META[q.status]?.color, "& .MuiSelect-icon": { color: "rgba(255,255,255,0.3)" } }}
                        >
                          {Object.entries(STATUS_META).map(([k, v]) => (
                            <MenuItem key={k} value={k} sx={{ fontSize: "0.8rem" }}>{v.label}</MenuItem>
                          ))}
                        </Select>
                      </BC>
                      <BC sx={{ textAlign: "right" }}>
                        <Tooltip title="Voir / Imprimer">
                          <IconButton
                            size="small"
                            onClick={() => { setViewQuote(q); setPrintLang(q.language || "fr"); }}
                            sx={{ color: "#2196f3" }}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </BC>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>

        {/* Monthly summary */}
        {!loading && filtered.length > 0 && (
          <Paper sx={{ ...cardSx, p: 2.5 }}>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={3} alignItems="center" justifyContent="space-between" flexWrap="wrap">
              <Stack direction="row" spacing={{ xs: 2, md: 4 }} flexWrap="wrap">
                {[
                  ["Soumissions", summary.count,    "#2196f3"],
                  ["Sous-total",  summary.subtotal,  "rgba(255,255,255,0.8)"],
                  ["TPS",         summary.tps,       "rgba(255,255,255,0.8)"],
                  ["TVQ",         summary.tvq,       "rgba(255,255,255,0.8)"],
                  ["Total",       summary.total,     "#43a047"],
                ].map(([label, val, color]) => (
                  <Box key={label}>
                    <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: 0.8 }}>
                      {label}
                    </Typography>
                    <Typography sx={{ fontSize: "1.4rem", fontWeight: 800, color }}>
                      {label === "Soumissions" ? val : fmt(val)}
                    </Typography>
                  </Box>
                ))}
              </Stack>
              <Button
                variant="outlined"
                startIcon={<FileDownloadIcon />}
                onClick={() => exportCSV(filtered, filterMonth)}
                sx={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.7)", textTransform: "none", borderRadius: 2 }}
              >
                Exporter CSV
              </Button>
            </Stack>
          </Paper>
        )}

        {/* ── View / Print dialog ─────────────────────────────────────────── */}
        <Dialog open={!!viewQuote} onClose={() => setViewQuote(null)} maxWidth="md" fullWidth PaperProps={{ sx: { ...cardSx, borderRadius: 3 } }}>
          {viewQuote && (
            <>
              <DialogTitle sx={{ pb: 1 }}>
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Typography sx={{ fontWeight: 700, fontSize: "1rem" }}>
                      Soumission #{viewQuote.quoteNumber}
                    </Typography>
                    <StatusChip status={viewQuote.status} />
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {/* FR / EN toggle */}
                    <Stack direction="row" spacing={0.5}>
                      {["fr", "en"].map((l) => (
                        <Chip
                          key={l}
                          label={l.toUpperCase()}
                          size="small"
                          onClick={() => setPrintLang(l)}
                          variant={printLang === l ? "filled" : "outlined"}
                          sx={{
                            cursor: "pointer", fontWeight: 700, fontSize: "0.68rem",
                            bgcolor: printLang === l ? "#2196f3" : "transparent",
                            borderColor: "#2196f344",
                            color: printLang === l ? "#fff" : "rgba(255,255,255,0.5)",
                          }}
                        />
                      ))}
                    </Stack>
                    <Button
                      variant="contained"
                      startIcon={<PrintIcon />}
                      size="small"
                      onClick={() => printQuote(viewQuote, printLang)}
                      sx={{ bgcolor: "#2196f3", textTransform: "none", fontWeight: 700, borderRadius: 2 }}
                    >
                      Imprimer
                    </Button>
                    <IconButton onClick={() => setViewQuote(null)} size="small" sx={{ color: "rgba(255,255,255,0.5)" }}>
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </Stack>
              </DialogTitle>

              <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

              <DialogContent sx={{ pt: 2.5 }}>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, color: "rgba(255,255,255,0.4)", mb: 0.5 }}>
                      Client
                    </Typography>
                    <Typography sx={{ fontWeight: 600 }}>{viewQuote.customerName}</Typography>
                    {viewQuote.customerPhone   && <Typography sx={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)" }}>{viewQuote.customerPhone}</Typography>}
                    {viewQuote.customerEmail   && <Typography sx={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)" }}>{viewQuote.customerEmail}</Typography>}
                    {viewQuote.customerAddress && <Typography sx={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.55)" }}>{viewQuote.customerAddress}</Typography>}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, color: "rgba(255,255,255,0.4)", mb: 0.5 }}>
                      Détails
                    </Typography>
                    <Typography sx={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)" }}>
                      Date&nbsp;: {dayjs(viewQuote.createdAt).format("DD MMMM YYYY")}
                    </Typography>
                    {viewQuote.serviceType && (
                      <Typography sx={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)" }}>
                        Service&nbsp;: {SERVICE_FR[viewQuote.serviceType]}
                      </Typography>
                    )}
                  </Grid>
                </Grid>

                <Divider sx={{ my: 2.5, borderColor: "rgba(255,255,255,0.08)" }} />

                {/* Line items */}
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <HC>Description</HC>
                        <HC sx={{ textAlign: "right" }}>Qté</HC>
                        <HC sx={{ textAlign: "right" }}>Prix unitaire</HC>
                        <HC sx={{ textAlign: "right" }}>Total</HC>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {viewQuote.items.map((item, i) => (
                        <TableRow key={i}>
                          <BC>{item.description}</BC>
                          <BC sx={{ textAlign: "right" }}>{item.quantity}</BC>
                          <BC sx={{ textAlign: "right" }}>{fmt(item.unitPrice)}</BC>
                          <BC sx={{ textAlign: "right", fontWeight: 600 }}>{fmt(item.quantity * item.unitPrice)}</BC>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* Totals */}
                <Stack alignItems="flex-end" spacing={0.5} sx={{ mt: 2 }}>
                  {[["Sous-total", viewQuote.subtotal], ["TPS (5 %)", viewQuote.tps], ["TVQ (9,975 %)", viewQuote.tvq]].map(([lbl, val]) => (
                    <Stack key={lbl} direction="row" spacing={4}>
                      <Typography sx={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", minWidth: 110, textAlign: "right" }}>{lbl}</Typography>
                      <Typography sx={{ fontSize: "0.82rem", minWidth: 90, textAlign: "right" }}>{fmt(val)}</Typography>
                    </Stack>
                  ))}
                  <Divider sx={{ width: 220, borderColor: "rgba(255,255,255,0.15)" }} />
                  <Stack direction="row" spacing={4}>
                    <Typography sx={{ fontWeight: 700, minWidth: 110, textAlign: "right" }}>Total</Typography>
                    <Typography sx={{ fontWeight: 800, fontSize: "1rem", color: "#43a047", minWidth: 90, textAlign: "right" }}>{fmt(viewQuote.total)}</Typography>
                  </Stack>
                </Stack>

                {viewQuote.notes && (
                  <Box sx={{ mt: 2.5, p: 2, bgcolor: "rgba(255,255,255,0.04)", borderRadius: 2, borderLeft: "3px solid rgba(255,255,255,0.15)" }}>
                    <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, color: "rgba(255,255,255,0.4)", mb: 0.5 }}>Notes</Typography>
                    <Typography sx={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.7)" }}>{viewQuote.notes}</Typography>
                  </Box>
                )}

                <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
                  <Button
                    size="small"
                    startIcon={<DeleteOutlineIcon />}
                    onClick={() => deleteQuote(viewQuote._id)}
                    sx={{ textTransform: "none", color: "#f44336", fontSize: "0.78rem" }}
                  >
                    Supprimer
                  </Button>
                </Stack>
              </DialogContent>
            </>
          )}
        </Dialog>

        {/* ── Create quote dialog ─────────────────────────────────────────── */}
        <Dialog
          open={createOpen}
          onClose={() => { setCreateOpen(false); setForm(emptyForm()); }}
          maxWidth="md"
          fullWidth
          PaperProps={{ sx: { ...cardSx, borderRadius: 3 } }}
        >
          <DialogTitle>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography sx={{ fontWeight: 700 }}>Nouvelle soumission</Typography>
              <IconButton onClick={() => { setCreateOpen(false); setForm(emptyForm()); }} size="small" sx={{ color: "rgba(255,255,255,0.5)" }}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Stack>
          </DialogTitle>
          <Divider sx={{ borderColor: "rgba(255,255,255,0.08)" }} />

          <DialogContent sx={{ pt: 2.5 }}>
            <Grid container spacing={2}>
              {/* Customer section */}
              <Grid item xs={12}>
                <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, color: "rgba(255,255,255,0.4)", mb: 0.5 }}>
                  Informations client
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth required size="small" label="Nom du client *" value={form.customerName}
                  onChange={(e) => setForm((p) => ({ ...p, customerName: e.target.value }))} sx={darkFieldSx} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth size="small" label="Téléphone" value={form.customerPhone}
                  onChange={(e) => setForm((p) => ({ ...p, customerPhone: e.target.value }))} sx={darkFieldSx} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth size="small" label="Courriel" value={form.customerEmail}
                  onChange={(e) => setForm((p) => ({ ...p, customerEmail: e.target.value }))} sx={darkFieldSx} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth size="small" label="Adresse" value={form.customerAddress}
                  onChange={(e) => setForm((p) => ({ ...p, customerAddress: e.target.value }))} sx={darkFieldSx} />
              </Grid>
              <Grid item xs={12} sm={5}>
                <FormControl fullWidth size="small">
                  <InputLabel sx={{ color: "rgba(255,255,255,0.5)" }}>Type de service</InputLabel>
                  <Select value={form.serviceType} label="Type de service"
                    onChange={(e) => setForm((p) => ({ ...p, serviceType: e.target.value }))} sx={darkSelectSx}>
                    {SERVICE_TYPES.map((t) => <MenuItem key={t} value={t}>{SERVICE_FR[t]}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={3}>
                <FormControl fullWidth size="small">
                  <InputLabel sx={{ color: "rgba(255,255,255,0.5)" }}>Langue</InputLabel>
                  <Select value={form.language} label="Langue"
                    onChange={(e) => setForm((p) => ({ ...p, language: e.target.value }))} sx={darkSelectSx}>
                    <MenuItem value="fr">Français</MenuItem>
                    <MenuItem value="en">English</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={6} sm={4}>
                <FormControl fullWidth size="small">
                  <InputLabel sx={{ color: "rgba(255,255,255,0.5)" }}>Statut</InputLabel>
                  <Select value={form.status} label="Statut"
                    onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
                    sx={{ ...darkSelectSx, color: STATUS_META[form.status]?.color || "#fff" }}>
                    {Object.entries(STATUS_META).map(([k, v]) => <MenuItem key={k} value={k}>{v.label}</MenuItem>)}
                  </Select>
                </FormControl>
              </Grid>

              {/* Line items */}
              <Grid item xs={12}>
                <Divider sx={{ borderColor: "rgba(255,255,255,0.08)", mt: 1, mb: 2 }} />
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 1 }}>
                  <Typography sx={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.8, color: "rgba(255,255,255,0.4)" }}>
                    Postes / Travaux
                  </Typography>
                  <Button size="small" startIcon={<AddIcon />} onClick={addItem}
                    sx={{ textTransform: "none", fontSize: "0.78rem", color: "#2196f3" }}>
                    Ajouter
                  </Button>
                </Stack>
                {form.items.map((item, idx) => (
                  <Stack key={idx} direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                    <TextField
                      label="Description" size="small" value={item.description}
                      onChange={(e) => setItem(idx, "description", e.target.value)}
                      sx={{ ...darkFieldSx, flex: 4 }}
                    />
                    <TextField
                      label="Qté" size="small" type="number" value={item.quantity}
                      onChange={(e) => setItem(idx, "quantity", e.target.value)}
                      inputProps={{ min: 0 }}
                      sx={{ ...darkFieldSx, flex: 1 }}
                    />
                    <TextField
                      label="Prix ($)" size="small" type="number" value={item.unitPrice}
                      onChange={(e) => setItem(idx, "unitPrice", e.target.value)}
                      inputProps={{ min: 0, step: "0.01" }}
                      sx={{ ...darkFieldSx, flex: 2 }}
                    />
                    <Typography sx={{ minWidth: 72, textAlign: "right", color: "#43a047", fontWeight: 700, fontSize: "0.82rem" }}>
                      {fmt((parseFloat(item.quantity) || 0) * (parseFloat(item.unitPrice) || 0))}
                    </Typography>
                    <IconButton size="small" onClick={() => removeItem(idx)} disabled={form.items.length === 1}
                      sx={{ color: "rgba(255,255,255,0.25)", "&:hover": { color: "#f44336" } }}>
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                ))}
              </Grid>

              {/* Live totals preview */}
              <Grid item xs={12}>
                <Stack alignItems="flex-end" spacing={0.5} sx={{ p: 2, bgcolor: "rgba(255,255,255,0.03)", borderRadius: 2 }}>
                  {[["Sous-total", formTotals.subtotal], ["TPS (5 %)", formTotals.tps], ["TVQ (9,975 %)", formTotals.tvq]].map(([lbl, val]) => (
                    <Stack key={lbl} direction="row" spacing={4}>
                      <Typography sx={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.5)", minWidth: 110, textAlign: "right" }}>{lbl}</Typography>
                      <Typography sx={{ fontSize: "0.82rem", minWidth: 90, textAlign: "right" }}>{fmt(val)}</Typography>
                    </Stack>
                  ))}
                  <Divider sx={{ width: 220, borderColor: "rgba(255,255,255,0.15)" }} />
                  <Stack direction="row" spacing={4}>
                    <Typography sx={{ fontWeight: 700, minWidth: 110, textAlign: "right" }}>Total</Typography>
                    <Typography sx={{ fontWeight: 800, fontSize: "1.1rem", color: "#43a047", minWidth: 90, textAlign: "right" }}>
                      {fmt(formTotals.total)}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>

              {/* Notes */}
              <Grid item xs={12}>
                <TextField fullWidth size="small" label="Notes (optionnel)" multiline rows={3} value={form.notes}
                  onChange={(e) => setForm((p) => ({ ...p, notes: e.target.value }))} sx={darkFieldSx} />
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2.5 }}>
            <Button onClick={() => { setCreateOpen(false); setForm(emptyForm()); }}
              sx={{ textTransform: "none", color: "rgba(255,255,255,0.5)" }}>
              Annuler
            </Button>
            <Button
              variant="contained"
              onClick={submitQuote}
              disabled={saving || !form.customerName.trim()}
              sx={{ bgcolor: "#2196f3", textTransform: "none", fontWeight: 700, borderRadius: 2, "&:hover": { bgcolor: "#1976d2" } }}
            >
              {saving ? <CircularProgress size={18} sx={{ color: "#fff" }} /> : "Créer la soumission"}
            </Button>
          </DialogActions>
        </Dialog>

      </Container>
    </Box>
  );
};

export default Quotes;
