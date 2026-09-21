(() => {
  "use strict";
  const storageKey = "hsh-diary-reminder-v1";
  const $ = id => document.getElementById(id);
  const getSettings = () => { try { return { enabled: false, time: "07:30", ...(JSON.parse(localStorage.getItem(storageKey) || "{}")) }; } catch (_) { return { enabled: false, time: "07:30" }; } };
  const setSettings = value => localStorage.setItem(storageKey, JSON.stringify(value));
  const status = text => { if ($("diaryReminderStatus")) $("diaryReminderStatus").textContent = text; };
  const today = () => new Date().toISOString().slice(0, 10);
  const nativeNotifications = () => window.Capacitor?.Plugins?.LocalNotifications;
  let settings = getSettings();
  function updateUi() {
    if ($("diaryReminderTime")) $("diaryReminderTime").value = settings.time || "07:30";
    if (settings.enabled) status(window.Notification?.permission === "granted" ? `Đang bật · nhắc lúc ${settings.time}` : "Đã bật, chờ cấp quyền thông báo");
    else status("Chưa bật thông báo");
  }
  async function enable() {
    const native = nativeNotifications();
    if (native) {
      const permission = await native.requestPermissions();
      if (permission.display !== "granted") { status("Chưa được cấp quyền thông báo Android"); return; }
      const [hour, minute] = String($("diaryReminderTime")?.value || "07:30").split(":").map(Number);
      await native.cancel({ notifications: [{ id: 730 }] }).catch(() => {});
      await native.schedule({ notifications: [{ id: 730, title: "Nhắc báo cáo nhật ký", body: "Đã đến 07:30. Hãy nhập báo cáo nhật ký công trình hôm nay.", schedule: { on: { hour, minute }, allowWhileIdle: true } }] });
      settings = { ...settings, enabled: true, time: $("diaryReminderTime")?.value || "07:30" };
      setSettings(settings); updateUi(); status(`Đã lên lịch Android · nhắc lúc ${settings.time}`); return;
    }
    if (!("Notification" in window)) { status("Thiết bị không hỗ trợ thông báo web"); return; }
    const permission = Notification.permission === "granted" ? "granted" : await Notification.requestPermission();
    if (permission !== "granted") { status("Chưa được cấp quyền thông báo"); return; }
    settings = { ...settings, enabled: true, time: $("diaryReminderTime")?.value || "07:30" };
    setSettings(settings); updateUi();
    status(`Đã bật trên máy · nhắc lúc ${settings.time}`);
  }
  function test() {
    const native = nativeNotifications();
    if (native) { native.schedule({ notifications: [{ id: 731, title: "Nhắc báo cáo nhật ký", body: "Đây là thông báo thử.", schedule: { at: new Date(Date.now() + 1200) } }] }); return; }
    if (!("Notification" in window) || Notification.permission !== "granted") { status("Hãy bấm Bật nhắc 07:30 trước"); return; }
    new Notification("Nhắc báo cáo nhật ký", { body: "Đây là thông báo thử. Hằng ngày hệ thống sẽ nhắc lúc 07:30.", icon: "./assets/app/icon-192.png", tag: "hsh-diary-test" });
  }
  function localReminderCheck() {
    if (nativeNotifications()) return;
    if (!settings.enabled || !("Notification" in window) || Notification.permission !== "granted") return;
    const [hour, minute] = String(settings.time || "07:30").split(":").map(Number), now = new Date(), stamp = `${today()} ${settings.time}`, nowMinutes = now.getHours() * 60 + now.getMinutes(), targetMinutes = hour * 60 + minute;
    if (nowMinutes >= targetMinutes && nowMinutes < targetMinutes + 30 && localStorage.getItem("hsh-diary-reminder-last") !== stamp) {
      localStorage.setItem("hsh-diary-reminder-last", stamp);
      new Notification("Nhắc báo cáo nhật ký", { body: "Đã đến giờ nhập báo cáo nhật ký công trình hôm nay.", icon: "./assets/app/icon-192.png", tag: "hsh-diary-daily" });
    }
  }
  document.addEventListener("DOMContentLoaded", () => {
    updateUi();
    $("btnEnableDiaryReminder")?.addEventListener("click", enable);
    $("btnTestDiaryReminder")?.addEventListener("click", test);
    $("diaryReminderTime")?.addEventListener("change", () => { settings = { ...settings, time: $("diaryReminderTime").value || "07:30" }; setSettings(settings); updateUi(); });
    setInterval(localReminderCheck, 30000); localReminderCheck();
  });
})();
