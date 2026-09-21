(() => {
  "use strict";
  const storageKey = "hsh-material-receipts-v1";
  const $ = id => document.getElementById(id);
  const today = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };
  const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;", "'":"&#39;", '"':"&quot;"}[ch]));
  const numberText = value => new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 2 }).format(Number(value) || 0);
  let records = [];
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (Array.isArray(saved)) records = saved;
  } catch (_) {}

  function save() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(records));
      return true;
    } catch (_) {
      return false;
    }
  }

  function render() {
    const groups = new Map();
    records.forEach(record => {
      const key = `${record.material}|||${record.unit}`;
      const item = groups.get(key) || { material: record.material, unit: record.unit, quantity: 0, count: 0 };
      item.quantity += Number(record.quantity) || 0;
      item.count += 1;
      groups.set(key, item);
    });
    const summary = $("materialSummary");
    if (summary) {
      summary.innerHTML = groups.size
        ? [...groups.values()].sort((a, b) => a.material.localeCompare(b.material, "vi")).map(item => `<div class="material-summary-row"><span><strong>${escapeHtml(item.material)}</strong><small>${item.count} lần nhập</small></span><b>${numberText(item.quantity)} ${escapeHtml(item.unit)}</b></div>`).join("")
        : `<div class="material-empty"><i class="fas fa-box-open"></i> Chưa có dữ liệu vật tư.</div>`;
    }
    const count = $("materialTotalEntries");
    if (count) count.textContent = records.length;
    const recent = $("materialRecentList");
    if (recent) {
      const list = [...records].sort((a, b) => `${b.date}${b.createdAt}`.localeCompare(`${a.date}${a.createdAt}`));
      recent.innerHTML = list.length
        ? list.slice(0, 30).map(record => `<div class="material-recent-row"><span><strong>${escapeHtml(record.material)}</strong><small>${escapeHtml(record.date)} · ${escapeHtml(record.supplier || "Không ghi nhà cung cấp")}${record.note ? ` · ${escapeHtml(record.note)}` : ""}</small></span><b>${numberText(record.quantity)} ${escapeHtml(record.unit)}</b><button type="button" title="Xóa lần nhập" aria-label="Xóa lần nhập" data-material-delete="${escapeHtml(record.id)}"><i class="fas fa-trash"></i></button></div>`).join("")
        : `<div class="material-empty">Chưa có lần nhập nào.</div>`;
      recent.querySelectorAll("[data-material-delete]").forEach(button => button.addEventListener("click", () => {
        const id = button.dataset.materialDelete;
        if (!confirm("Xóa lần nhập vật tư này?")) return;
        records = records.filter(record => record.id !== id);
        save();
        render();
      }));
    }
  }

  function open() {
    const modal = $("materialQuickModal");
    if (!modal) return;
    $("materialInputDate").value = today();
    $("materialQuickStatus").textContent = "";
    modal.classList.add("active");
    render();
    setTimeout(() => $("materialInputName")?.focus(), 80);
  }
  function close() { $("materialQuickModal")?.classList.remove("active"); }

  $("materialQuickForm")?.addEventListener("submit", event => {
    event.preventDefault();
    const material = $("materialInputName").value.trim();
    const unit = $("materialInputUnit").value.trim();
    const quantity = Number($("materialInputQuantity").value);
    if (!material || !unit || !Number.isFinite(quantity) || quantity <= 0) {
      $("materialQuickStatus").textContent = "Nhập đủ vật tư, số lượng lớn hơn 0 và đơn vị.";
      return;
    }
    records.push({
      id: crypto.randomUUID(),
      date: $("materialInputDate").value || today(),
      material,
      quantity,
      unit,
      supplier: $("materialInputSupplier").value.trim(),
      note: $("materialInputNote").value.trim(),
      createdAt: new Date().toISOString(),
    });
    if (!save()) {
      $("materialQuickStatus").textContent = "Chưa lưu được trên thiết bị. Hãy xuất CSV để giữ dữ liệu.";
      return;
    }
    $("materialQuickStatus").textContent = "Đã lưu lần nhập vật tư.";
    $("materialInputQuantity").value = "";
    $("materialInputSupplier").value = "";
    $("materialInputNote").value = "";
    render();
  });

  window.hshOpenMaterialQuickEntry = open;
  window.hshCloseMaterialQuickEntry = close;
  window.hshExportMaterialSummary = () => {
    const rows = [["Ngày", "Vật tư", "Số lượng", "Đơn vị", "Nhà cung cấp / xe hàng", "Ghi chú"]];
    [...records].sort((a, b) => a.date.localeCompare(b.date)).forEach(record => rows.push([record.date, record.material, record.quantity, record.unit, record.supplier || "", record.note || ""]));
    const csv = "\ufeff" + rows.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const link = document.createElement("a");
    link.href = url;
    link.download = `thong-ke-vat-tu-${today()}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  };
  document.addEventListener("keydown", event => { if (event.key === "Escape") close(); });
  render();
})();
