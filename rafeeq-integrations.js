/**
 * Rafeeq — Integration Map + webhook stubs (Nusuk, Baseer, SEHA, …)
 */
(function () {
  const DEMO_URL = "https://rafeqai.netlify.app/app.html?judge=1";

  const IX = {
    ar: {
      ttl_integrations: "خريطة التكامل — المنظومة الوطنية",
      sub_integrations: "ربط رفيق بالجهات الحكومية وقطاعات الحج والعمرة",
      int_hub: "رفيق — عقدة العمليات الميدانية",
      int_status_live: "مباشر",
      int_status_pilot: "مرحلة تجريبية — واجهة برمجة جاهزة",
      int_status_planned: "مخطط — مرحلة ٢",
      int_in: "وارد",
      int_out: "صادر",
      int_both: "ثنائي",
      int_webhook_log: "سجل طلبات الربط (محاكاة)",
      int_test_all: "اختبار كل القنوات",
      int_clear_log: "مسح السجل",
      int_latency: "زمن",
      int_ok: "٢٠٠ OK",
      int_sector_crowd: "حشود",
      int_sector_health: "صحة",
      int_sector_ops: "تشغيل",
      int_sector_safety: "سلامة",
      int_sector_identity: "هوية",
      int_arch: "معمارية التكامل",
      int_arch_d: "قرار وطني (بصير) → تنفيذ ميداني (رفيق) → تصعيد جهات (نُسك بيزنس، صحة، أمن)",
      int_actions: "إجراءات مرتبطة",
      int_health: "صحة القنوات",
      int_uptime: "نجاح آخر ٢٤ س",
      int_today: "طلبات اليوم",
      int_dash_t: "حالة التكامل الوطني",
      int_dash_sub: "١ مباشر · ٩ تجريبي · ٢ مخطط",
      int_dash_open: "فتح خريطة التكامل",
      int_dash_wh: "طلبات الربط اليوم",
      int_dash_ok: "نجاح القنوات",
      mgr_roi: "تقدير العائد (ROI)",
      mgr_roi_d: "توفير تشغيلي مقارنة بورقة + واتساب",
      mgr_sla: "SLA الامتثال",
      mgr_zones: "توزيع المجموعات — المشاعر",
      mgr_alerts_br: "تفصيل التنبيهات",
      mgr_top_groups: "أفضل المجموعات",
      mgr_int_health: "صحة التكاملات",
      mgr_cost_save: "توفير موسمي تقديري",
      mgr_contract: "جاهزية العقد",
      pt_pdf: "تحميل PDF العرض",
      pt_integrations: "خريطة التكامل",
    },
    en: {
      ttl_integrations: "Integration Map — National Ecosystem",
      sub_integrations: "Rafeeq wired to government & Hajj/Umrah sectors",
      int_hub: "Rafeeq — Field Ops Hub",
      int_status_live: "Live",
      int_status_pilot: "Pilot — API ready",
      int_status_planned: "Planned — Phase 2",
      int_in: "Inbound",
      int_out: "Outbound",
      int_both: "Bidirectional",
      int_webhook_log: "Webhook log (simulated)",
      int_test_all: "Test all channels",
      int_clear_log: "Clear log",
      int_latency: "Latency",
      int_ok: "200 OK",
      int_sector_crowd: "Crowd",
      int_sector_health: "Health",
      int_sector_ops: "Operations",
      int_sector_safety: "Safety",
      int_sector_identity: "Identity",
      int_arch: "Integration architecture",
      int_arch_d: "National decision (Baseer) → field execution (Rafeeq) → sector escalation (Nusuk Business, SEHA, Security)",
      int_actions: "Linked actions",
      int_health: "Channel health",
      int_uptime: "24h success",
      int_today: "Requests today",
      int_dash_t: "National integration status",
      int_dash_sub: "1 live · 9 pilot · 2 planned",
      int_dash_open: "Open integration map",
      int_dash_wh: "Webhook requests today",
      int_dash_ok: "Channel success",
      mgr_roi: "ROI estimate",
      mgr_roi_d: "Operational savings vs paper + WhatsApp",
      mgr_sla: "SLA compliance",
      mgr_zones: "Group distribution — holy sites",
      mgr_alerts_br: "Alert breakdown",
      mgr_top_groups: "Top performing groups",
      mgr_int_health: "Integration health",
      mgr_cost_save: "Est. seasonal savings",
      mgr_contract: "Contract readiness",
      pt_pdf: "Download pitch PDF",
      pt_integrations: "Integration map",
    },
  };

  const ENTITIES = [
    { id: "baseer", ic: "📡", sector: "crowd", status: "pilot", dir: "in", ar: "بصير (SDAIA)", en: "Baseer (SDAIA)", ep: "GET /density/zones", acts: ["crowd", "dash"] },
    { id: "nusuk", ic: "🪪", sector: "identity", status: "pilot", dir: "in", ar: "نُسك — بطاقة الحاج", en: "Nusuk — Pilgrim ID", ep: "POST /verify/nfc", acts: ["scan", "group"] },
    { id: "nbiz", ic: "🏢", sector: "ops", status: "pilot", dir: "out", ar: "نُسك بيزنس", en: "Nusuk Business", ep: "POST /tickets", acts: ["coord", "missing"] },
    { id: "seha", ic: "🫀", sector: "health", status: "pilot", dir: "both", ar: "صحة الافتراضي — مراقبة نبض وتخطيط قلب", en: "SEHA Virtual — RPM/ECG", ep: "POST /rpm/stream", acts: ["wear", "medical"] },
    { id: "band", ic: "⌚", sector: "health", status: "pilot", dir: "in", ar: "سوار SDAIA/STC", en: "SDAIA/STC Band", ep: "WS /vitals", acts: ["wear", "alerts"] },
    { id: "baladi", ic: "🗺️", sector: "crowd", status: "pilot", dir: "in", ar: "بلدي+ / خرائط", en: "Baladi+ / Maps", ep: "GET /routes", acts: ["crowd", "exp"] },
    { id: "sec", ic: "🛡️", sector: "safety", status: "pilot", dir: "out", ar: "أمن المشاعر", en: "Mashaer Security", ep: "POST /missing/alert", acts: ["missing", "alerts"] },
    { id: "src", ic: "🚑", sector: "health", status: "planned", dir: "out", ar: "الهلال الأحمر ٩٩٧", en: "Red Crescent 997", ep: "POST /dispatch", acts: ["medical", "wear"] },
    { id: "mohu", ic: "🏛️", sector: "ops", status: "planned", dir: "out", ar: "وزارة الحج والعمرة", en: "Ministry of Hajj & Umrah", ep: "POST /compliance", acts: ["reports", "manager"] },
    { id: "transport", ic: "🚌", sector: "ops", status: "planned", dir: "both", ar: "النقل الترددي", en: "Shuttle transport", ep: "GET /slots", acts: ["crowd", "exp"] },
    { id: "civil", ic: "🚒", sector: "safety", status: "planned", dir: "out", ar: "الدفاع المدني", en: "Civil Defense", ep: "POST /incident", acts: ["alerts"] },
    { id: "adilla", ic: "👥", sector: "ops", status: "live", dir: "both", ar: "شركات الأدلاء", en: "Adilla companies", ep: "Dashboard API", acts: ["manager", "group"] },
  ];

  const WEBHOOK_MAP = {
    scan: ["nusuk", "adilla"],
    medical: ["seha", "src", "nbiz"],
    missing: ["sec", "nbiz", "band"],
    found: ["nbiz", "adilla"],
    broadcast: ["band", "adilla"],
    route: ["baseer", "baladi"],
    seha: ["seha"],
    sos: ["seha", "src", "sec", "band"],
    coord: ["nbiz", "mohu"],
    export: ["mohu", "adilla"],
    sync: ENTITIES.map((e) => e.id),
  };

  let webhookLog = [];
  let webhookToastBatch = [];
  let webhookToastTimer = null;
  try {
    const saved = localStorage.getItem("rafeeq_webhooks");
    if (saved) webhookLog = JSON.parse(saved).slice(0, 50);
  } catch (e) {}

  function xt(k) {
    return (IX[lang] || IX.en)[k] || k;
  }

  function statusLabel(s) {
    return xt(s === "live" ? "int_status_live" : s === "pilot" ? "int_status_pilot" : "int_status_planned");
  }

  function statusPill(s) {
    const c = s === "live" ? "g" : s === "pilot" ? "a" : "b";
    return `<span class="pill ${c}">${statusLabel(s)}</span>`;
  }

  function dirLabel(d) {
    return xt(d === "in" ? "int_in" : d === "out" ? "int_out" : "int_both");
  }

  function sectorLabel(s) {
    return xt("int_sector_" + s);
  }

  function entityName(e) {
    return lang === "ar" ? e.ar : e.en;
  }

  function persistLog() {
    try {
      localStorage.setItem("rafeeq_webhooks", JSON.stringify(webhookLog.slice(0, 50)));
    } catch (e) {}
  }

  function queueWebhookToast(entry) {
    if (!entry || typeof toast !== "function") return;
    if (typeof curView !== "undefined" && curView === "integrations") return;
    webhookToastBatch.push(entry);
    clearTimeout(webhookToastTimer);
    webhookToastTimer = setTimeout(() => {
      const batch = webhookToastBatch;
      webhookToastBatch = [];
      if (!batch.length) return;
      const names = batch.map((e) => e.name).slice(0, 2);
      const label = names.join(lang === "ar" ? "، " : ", ");
      const extra = batch.length > 2 ? ` +${batch.length - 2}` : "";
      const lat = batch[batch.length - 1].latency;
      toast(
        lang === "ar"
          ? `ربط → ${label}${extra} ✓ ${lat}ms`
          : `Webhook → ${label}${extra} ✓ ${lat}ms`
      );
    }, 150);
  }

  function webhookStub(serviceId, event, payload) {
    const ent = ENTITIES.find((e) => e.id === serviceId);
    if (!ent || ent.status === "planned") {
      return Promise.resolve(null);
    }
    const latency = 40 + Math.floor(Math.random() * 160);
    const entry = {
      t: typeof now === "function" ? now() : new Date().toTimeString().slice(0, 5),
      iso: Date.now(),
      service: serviceId,
      name: ent ? entityName(ent) : serviceId,
      event,
      payload: typeof payload === "string" ? payload : JSON.stringify(payload).slice(0, 120),
      latency,
      code: 200,
    };
    return new Promise((resolve) => {
      setTimeout(() => {
        webhookLog.unshift(entry);
        if (webhookLog.length > 50) webhookLog.length = 50;
        persistLog();
        if (typeof renderIntegrations === "function" && curView === "integrations") renderIntegrations();
        if (typeof renderManager === "function") renderManager();
        if (typeof renderIntStatus === "function") renderIntStatus();
        if (event !== "healthcheck" && event !== "manual_test") queueWebhookToast(entry);
        resolve(entry);
      }, Math.min(latency, 80));
    });
  }

  function fireWebhooksFor(type, desc) {
    const ids = WEBHOOK_MAP[type] || [];
    ids.forEach((id) => {
      webhookStub(id, type, { desc, group: "Rawaf-Mina-45", ts: Date.now() });
    });
  }

  async function testAllWebhooks() {
    const pilots = ENTITIES.filter((e) => e.status !== "planned");
    for (const e of pilots) {
      await webhookStub(e.id, "healthcheck", { ping: true, demo: DEMO_URL });
    }
    toast(lang === "ar" ? `✓ ${pilots.length} قناة — اختبار الربط` : `✓ ${pilots.length} channels — webhook test`);
    renderIntegrations();
  }

  function clearWebhookLog() {
    webhookLog = [];
    persistLog();
    renderIntegrations();
  }

  function integrationStats() {
    const stats = {};
    ENTITIES.forEach((e) => {
      const hits = webhookLog.filter((w) => w.service === e.id);
      stats[e.id] = {
        count: hits.length,
        ok: hits.filter((h) => h.code === 200).length,
        avgLat: hits.length ? Math.round(hits.reduce((a, h) => a + h.latency, 0) / hits.length) : 0,
      };
    });
    return stats;
  }

  function renderIntegrations() {
    const map = document.getElementById("intMap");
    const list = document.getElementById("intList");
    const log = document.getElementById("intLog");
    const health = document.getElementById("intHealth");
    if (!map) return;

    map.innerHTML = `<div class="int-hub-wrap">
      <div class="int-hub-center"><span class="int-hub-ic">ر</span><b>${xt("int_hub")}</b><span class="id">${xt("int_arch_d")}</span></div>
      <div class="int-orbit">${ENTITIES.map((e) => `<div class="int-node st-${e.status}" onclick="goView('${e.acts[0]}')" title="${entityName(e)}">
        <span class="int-node-badge">${e.id.slice(0,2).toUpperCase()}</span><span class="int-node-nm">${entityName(e)}</span>${statusPill(e.status)}
      </div>`).join("")}</div>
    </div>`;

    if (list) {
      list.innerHTML = ENTITIES.map((e) => `<div class="row int-row">
        <span><span style="font-size:18px;margin-inline-end:8px">${e.ic}</span><b>${entityName(e)}</b>
          <div class="id mono">${e.ep} · ${dirLabel(e.dir)} · ${sectorLabel(e.sector)}</div></span>
        <span style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">${statusPill(e.status)}
          <button type="button" class="btn sm ghost" onclick="window._intTest('${e.id}')">${lang === "ar" ? "اختبار" : "Test"}</button></span>
      </div>`).join("");
    }

    if (log) {
      log.innerHTML = webhookLog.length
        ? webhookLog
            .slice(0, 15)
            .map(
              (w) => `<div class="row int-log-row"><span><span class="pill g mono">${w.t}</span> <b>${w.name}</b> · ${w.event}
            <div class="id mono">${w.payload}</div></span><span class="mono" style="font-size:11px;color:var(--muted)">${w.latency}ms · ${xt("int_ok")}</span></div>`
            )
            .join("")
        : `<p class="id">${lang === "ar" ? "لا طلبات بعد — نفّذ إجراءً (مسح، فقد، طبي) أو اضغط «اختبار كل القنوات»" : "No requests yet — run an action (scan, missing, medical) or click Test all channels"}</p>`;
    }

    if (health) {
      const st = integrationStats();
      health.innerHTML = ENTITIES.filter((e) => e.status !== "planned")
        .map((e) => {
          const s = st[e.id];
          const pct = s.count ? Math.round((s.ok / s.count) * 100) : 100;
          return `<div class="row"><span>${e.ic} ${entityName(e)}</span><span><span class="pill ${pct >= 95 ? "g" : "a"}">${pct}%</span> <span class="mono id">${s.count} ${xt("int_today")}</span></span></div>`;
        })
        .join("");
    }
  }

  function renderIntStatus() {
    const el = document.getElementById("intStatusCard");
    if (!el) return;
    const live = ENTITIES.filter((e) => e.status === "live").length;
    const pilot = ENTITIES.filter((e) => e.status === "pilot").length;
    const planned = ENTITIES.filter((e) => e.status === "planned").length;
    const reqToday = webhookLog.length;
    const st = integrationStats();
    const active = ENTITIES.filter((e) => e.status !== "planned");
    const avgPct = active.length
      ? Math.round(
          active.reduce((a, e) => {
            const s = st[e.id];
            return a + (s.count ? Math.round((s.ok / s.count) * 100) : 100);
          }, 0) / active.length
        )
      : 100;

    el.innerHTML = `<h3><span>${xt("int_dash_t")}</span><span class="hint">${xt("int_dash_sub")}</span></h3>
      <div class="grid g3" style="margin-top:8px">
        <div class="kpi" style="padding:12px"><div class="n" style="color:var(--green);font-size:22px">${live}</div><div class="l">${xt("int_status_live")}</div></div>
        <div class="kpi" style="padding:12px"><div class="n" style="color:var(--amber);font-size:22px">${pilot}</div><div class="l">${xt("int_status_pilot")}</div></div>
        <div class="kpi" style="padding:12px"><div class="n" style="color:var(--brand);font-size:22px">${planned}</div><div class="l">${xt("int_status_planned")}</div></div>
      </div>
      <div class="row" style="margin-top:12px">
        <span>${xt("int_dash_wh")}: <b class="mono">${reqToday}</b> · ${xt("int_dash_ok")}: <span class="pill g">${avgPct}%</span></span>
        <button type="button" class="btn sm ghost" onclick="goView('integrations')">${xt("int_dash_open")}</button>
      </div>`;
  }

  window._intTest = (id) => {
    webhookStub(id, "manual_test", { operator: "supervisor", demo: DEMO_URL }).then(() => {
      toast(`${entityName(ENTITIES.find((e) => e.id === id))} ✓`);
    });
  };
  window.testAllWebhooks = testAllWebhooks;
  window.clearWebhookLog = clearWebhookLog;
  window.renderIntegrations = renderIntegrations;
  window.renderIntStatus = renderIntStatus;
  window.fireWebhooksFor = fireWebhooksFor;
  window.getDemoUrl = () => DEMO_URL;
  window.integrationStats = integrationStats;

  // Patch logEvent → webhooks
  const origLog = window.logEvent;
  if (typeof origLog === "function" && !origLog._intPatched) {
    window.logEvent = function (type, desc) {
      origLog(type, desc);
      fireWebhooksFor(type, desc);
    };
    window.logEvent._intPatched = true;
  }

  // Patch SOS / SEHA
  const origSeha = window.escalateSeha;
  if (typeof origSeha === "function" && !origSeha._intPatched) {
    window.escalateSeha = function (i) {
      origSeha(i);
      fireWebhooksFor("seha", nm(P[i]));
    };
    window.escalateSeha._intPatched = true;
  }

  const origSos = window.sosAck;
  if (typeof origSos === "function" && !origSos._intPatched) {
    window.sosAck = function () {
      fireWebhooksFor("sos", "SOS acknowledge");
      origSos();
    };
    window.sosAck._intPatched = true;
  }

  // i18n + titles
  window.initIntegrations = function () {
    if (typeof I18N !== "undefined") {
      Object.assign(I18N.ar, IX.ar);
      Object.assign(I18N.en, IX.en);
    }
    if (typeof TITLES !== "undefined") TITLES.integrations = "ttl_integrations";
    renderIntegrations();
    renderIntStatus();
  };

  if (document.getElementById("intMap") || typeof boot === "function") {
    initIntegrations();
  }
})();
