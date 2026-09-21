(() => {
  "use strict";
  const storageKey = "hsh-material-receipts-v1";
  const $ = id => document.getElementById(id);
  const today = () => { const d = new Date(); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`; };
  const escapeHtml = value => String(value ?? "").replace(/[&<>'"]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;", "'":"&#39;", '"':"&quot;"}[ch]));
  const numberText = value => new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 2 }).format(Number(value) || 0);
  const steelKgPerMetre = phi => (Number(phi) * Number(phi)) / 162;
  const isPlainSteel = phi => [6, 8].includes(Number(phi));
  const materialPresets = {
    sand_yellow: { material: "Cát vàng", unit: "m³", group: "Bê tông & xây" },
    sand_black: { material: "Cát đen", unit: "m³", group: "Bê tông & xây" },
    cement_pcb40: { material: "Xi măng PCB40", unit: "bao", group: "Bê tông & xây" },
    cement_pcb30: { material: "Xi măng PCB30", unit: "bao", group: "Bê tông & xây" },
    concrete_m250: { material: "Bê tông thương phẩm M250", unit: "m³", group: "Bê tông & xây" },
    concrete_m300: { material: "Bê tông thương phẩm M300", unit: "m³", group: "Bê tông & xây" },
    stone_1x2: { material: "Đá 1x2", unit: "m³", group: "Bê tông & xây" },
    brick: { material: "Gạch", unit: "viên", group: "Bê tông & xây" },
    roof: { material: "Tôn", unit: "m²", group: "Hoàn thiện" },
  };
  let records = [];
  try { const saved = JSON.parse(localStorage.getItem(storageKey) || "[]"); if (Array.isArray(saved)) records = saved; } catch (_) {}
  function save() { try { localStorage.setItem(storageKey, JSON.stringify(records)); return true; } catch (_) { return false; } }
  function getSteelConversion() {
    const phi = Number($("materialInputPhi")?.value || 16), length = Number($("materialInputSteelLength")?.value || 11.7);
    const kgPerPiece = steelKgPerMetre(phi) * length;
    return { phi, length, kgPerPiece, specification: `Phi ${phi} · ${String(length).replace(".", ",")} m/cây` };
  }
  function syncForm() {
    const type = $("materialInputType")?.value || "steel", steel = type === "steel", preset = materialPresets[type];
    $("materialSteelFields").hidden = !steel; $("materialOtherWrap").hidden = type !== "other";
    const unit = $("materialInputUnit");
    if (steel) {
      const conversion = getSteelConversion(), plain = isPlainSteel(conversion.phi);
      [...unit.options].forEach(option => { option.hidden = plain ? !["kg", "m"].includes(option.value) : option.value !== "cây"; });
      unit.disabled = !plain; unit.value = plain ? (unit.value === "m" ? "m" : "kg") : "cây";
      $("materialInputConversionLabel").textContent = plain ? "Khối lượng theo mét" : "Kg/cây tự tính";
      $("materialInputKgPerPiece").value = plain ? `${numberText(steelKgPerMetre(conversion.phi))} kg/m` : `${numberText(conversion.kgPerPiece)} kg`;
      const quantity = Number($("materialInputQuantity")?.value || 0);
      if (plain) $("materialConversionHint").textContent = `Sắt trơn Phi ${conversion.phi}: ${numberText(steelKgPerMetre(conversion.phi))} kg/m. Nhập theo kg hoặc mét dài, không tính cây 11,7 m. ${quantity > 0 ? (unit.value === "kg" ? `Tổng hiện tại: ${numberText(quantity)} kg ≈ ${numberText(quantity / steelKgPerMetre(conversion.phi))} m.` : `Tổng hiện tại: ${numberText(quantity)} m ≈ ${numberText(quantity * steelKgPerMetre(conversion.phi))} kg.`) : "Nhập khối lượng kg hoặc mét dài."}`;
      else $("materialConversionHint").textContent = `Thép Phi ${conversion.phi}: ${numberText(steelKgPerMetre(conversion.phi))} kg/m × ${String(conversion.length).replace(".", ",")} m = ${numberText(conversion.kgPerPiece)} kg/cây. ${quantity > 0 ? `Tổng hiện tại: ${numberText(quantity)} cây ≈ ${numberText(quantity * conversion.kgPerPiece)} kg.` : "Nhập số cây, hệ thống tự tính kg."}`;
    } else {
      [...unit.options].forEach(option => { option.hidden = false; }); unit.disabled = false; if (preset) unit.value = preset.unit;
      $("materialConversionHint").textContent = preset ? `Đơn vị mặc định: ${preset.unit}. Có thể đổi nếu phiếu giao hàng dùng đơn vị khác.` : "Nhập vật tư và đơn vị theo phiếu giao hàng.";
    }
  }
  function getEntry() {
    const type = $("materialInputType").value, quantity = Number($("materialInputQuantity").value), steel = type === "steel", conversion = steel ? getSteelConversion() : null, plain = steel && isPlainSteel(conversion.phi), preset = materialPresets[type];
    const material = plain ? `Sắt trơn Phi ${conversion.phi}` : steel ? `Thép Phi ${conversion.phi}` : type === "other" ? $("materialInputOther").value.trim() : preset.material;
    const unit = steel ? (plain ? $("materialInputUnit").value : "cây") : $("materialInputUnit").value;
    if (!material || !unit || !Number.isFinite(quantity) || quantity <= 0) return null;
    const convertedQuantity = !steel ? null : plain ? (unit === "kg" ? quantity / steelKgPerMetre(conversion.phi) : quantity * steelKgPerMetre(conversion.phi)) : quantity * conversion.kgPerPiece;
    const convertedUnit = !steel ? "" : plain ? (unit === "kg" ? "m" : "kg") : "kg";
    return { id: crypto.randomUUID(), date: $("materialInputDate").value || today(), tag: $("materialInputTag").value.trim(), material, group: steel ? "Kết cấu" : preset?.group || "Khác", specification: plain ? `${numberText(steelKgPerMetre(conversion.phi))} kg/m` : steel ? conversion.specification : "", quantity, unit, convertedQuantity, convertedUnit, conversionNote: steel ? (plain ? `${numberText(steelKgPerMetre(conversion.phi))} kg/m` : `${numberText(conversion.kgPerPiece)} kg/cây`) : "", supplier: $("materialInputSupplier").value.trim(), note: $("materialInputNote").value.trim(), createdAt: new Date().toISOString() };
  }
  function render() {
    const groups = new Map();
    records.forEach(record => { const key = `${record.material}|||${record.unit}|||${record.convertedUnit || ""}`; const item = groups.get(key) || { material: record.material, unit: record.unit, quantity: 0, convertedQuantity: 0, convertedUnit: record.convertedUnit || "", count: 0 }; item.quantity += Number(record.quantity) || 0; item.convertedQuantity += Number(record.convertedQuantity) || 0; item.count += 1; groups.set(key, item); });
    const summary = $("materialSummary");
    if (summary) summary.innerHTML = groups.size ? [...groups.values()].sort((a, b) => a.material.localeCompare(b.material, "vi")).map(item => `<div class="material-summary-row"><span><strong>${escapeHtml(item.material)}</strong><small>${item.count} lần nhập</small></span><b>${numberText(item.quantity)} ${escapeHtml(item.unit)}${item.convertedUnit ? ` ≈ ${numberText(item.convertedQuantity)} ${escapeHtml(item.convertedUnit)}` : ""}</b></div>`).join("") : `<div class="material-empty"><i class="fas fa-box-open"></i> Chưa có dữ liệu vật tư.</div>`;
    const count = $("materialTotalEntries"); if (count) count.textContent = records.length;
    const recent = $("materialRecentList");
    if (recent) {
      const list = [...records].sort((a, b) => `${b.date}${b.createdAt || ""}`.localeCompare(`${a.date}${a.createdAt || ""}`));
      recent.innerHTML = list.length ? list.slice(0, 30).map(record => `<div class="material-recent-row"><span><strong>${escapeHtml(record.material)}${record.tag ? ` <em class="material-tag">#${escapeHtml(record.tag)}</em>` : ""}</strong><small>${escapeHtml(record.date)} · ${escapeHtml(record.group || "Khác")} · ${escapeHtml(record.supplier || "Không ghi nhà cung cấp")}${record.note ? ` · ${escapeHtml(record.note)}` : ""}</small></span><b>${numberText(record.quantity)} ${escapeHtml(record.unit)}${record.convertedUnit ? ` ≈ ${numberText(record.convertedQuantity)} ${escapeHtml(record.convertedUnit)}` : ""}</b><button type="button" title="Xóa lần nhập" aria-label="Xóa lần nhập" data-material-delete="${escapeHtml(record.id)}"><i class="fas fa-trash"></i></button></div>`).join("") : `<div class="material-empty">Chưa có lần nhập nào.</div>`;
      recent.querySelectorAll("[data-material-delete]").forEach(button => button.addEventListener("click", () => { if (!confirm("Xóa lần nhập vật tư này?")) return; records = records.filter(record => record.id !== button.dataset.materialDelete); save(); render(); }));
    }
  }
  function open() { const modal = $("materialQuickModal"); if (!modal) return; $("materialInputDate").value = today(); $("materialQuickStatus").textContent = ""; modal.classList.add("active"); syncForm(); render(); setTimeout(() => $("materialInputType")?.focus(), 80); }
  function close() { $("materialQuickModal")?.classList.remove("active"); }
  $("materialInputType")?.addEventListener("change", syncForm); $("materialInputPhi")?.addEventListener("change", syncForm); $("materialInputSteelLength")?.addEventListener("change", syncForm); $("materialInputQuantity")?.addEventListener("input", syncForm);
  $("materialQuickForm")?.addEventListener("submit", event => { event.preventDefault(); const entry = getEntry(); if (!entry) { $("materialQuickStatus").textContent = "Nhập đủ loại vật tư, số lượng lớn hơn 0 và đơn vị."; return; } records.push(entry); if (!save()) { $("materialQuickStatus").textContent = "Chưa lưu được trên thiết bị. Hãy xuất CSV để giữ dữ liệu."; return; } $("materialQuickStatus").textContent = entry.convertedUnit ? `Đã lưu: ${numberText(entry.quantity)} ${entry.unit} = ${numberText(entry.convertedQuantity)} ${entry.convertedUnit}.` : "Đã lưu lần nhập vật tư."; $("materialInputQuantity").value = ""; $("materialInputTag").value = ""; $("materialInputSupplier").value = ""; $("materialInputNote").value = ""; render(); });
  window.hshOpenMaterialQuickEntry = open; window.hshCloseMaterialQuickEntry = close;
  window.hshExportMaterialSummary = () => { const rows = [["STT", "Ngày nhập", "Tag", "Nhóm", "Vật tư", "Quy cách", "Số lượng nhập", "Đơn vị nhập", "Khối lượng quy đổi", "Đơn vị quy đổi", "Nhà cung cấp / xe hàng", "Ghi chú"]]; [...records].sort((a, b) => a.date.localeCompare(b.date)).forEach((record, index) => rows.push([index + 1, record.date, record.tag || "", record.group || "Khác", record.material, record.specification || "", record.quantity, record.unit, record.convertedQuantity ?? "", record.convertedUnit || "", record.supplier || "", record.note || ""])); const csv = "\ufeff" + rows.map(row => row.map(value => `"${String(value).replaceAll('"', '""')}"`).join(",")).join("\n"); const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" })); const link = document.createElement("a"); link.href = url; link.download = `thong-ke-vat-tu-${today()}.csv`; link.click(); URL.revokeObjectURL(url); };
  document.addEventListener("keydown", event => { if (event.key === "Escape") close(); });
  syncForm(); render();
})();
