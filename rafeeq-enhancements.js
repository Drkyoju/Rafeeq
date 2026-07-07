/**
 * Rafeeq enhancements — UX pack, alerts inbox, judge/manager modes, onboarding.
 * Loaded after main app script; hooks into global Rafeeq APIs.
 */
(function () {
  const params = new URLSearchParams(location.search);
  const judgeMode = params.get("judge") === "1";
  const managerMode = params.get("manager") === "1";
  const track3Mode = params.get("track3") === "1" || judgeMode;
  if (params.get("lang") === "en" && typeof lang !== "undefined") {
    lang = "en";
    document.documentElement.lang = "en";
    document.documentElement.dir = "ltr";
  }
  if (params.get("lang") === "ar" && typeof lang !== "undefined") {
    lang = "ar";
    document.documentElement.lang = "ar";
    document.documentElement.dir = "rtl";
  }

  const EX = {
    ar: {
      nav_alerts: "تنبيهات",
      ttl_alerts: "صندوق التنبيهات",
      ttl_manager: "لوحة مدير الشركة",
      nav_more: "المزيد",
      more_t: "وحدات إضافية",
      sim_badge: "بيانات تجريبية",
      act_now: "يتطلّب إجراءً",
      act_miss: "مفقودون",
      act_med: "طبي",
      act_drift: "خارج النطاق",
      act_sos: "استغاثة",
      act_scan: "لم يُمسح",
      sos_strip_ack: "استلام",
      sos_strip_loc: "تحديد",
      sos_strip_seha: "صحة",
      heat_score: "مؤشر الإجهاد الحراري",
      heat_high: "مرتفع",
      heat_mid: "متوسط",
      heat_low: "منخفض",
      ritual_behind: "متأخرون عن خطة المناسك",
      mesh_t: "شبكة المشرفين المجاورين",
      mesh_d: "تم إشعار ٦ مشرفين ضمن ٥٠٠م",
      pilot_t: "مؤشرات الأداء التجريبية",
      pilot_reunite: "زمن لمّ الشمل",
      pilot_scan: "نسبة الحضور المؤكد",
      pilot_drift: "كشف الابتعاد مبكرًا",
      qr_t: "امسح لفتح العرض",
      qr_url: "رابط العرض المباشر",
      onboard_1t: "٤٥ حاجًا — نبض واحد",
      onboard_1d: "الخرزات الخضراء = حاضر. البرتقالي = طبي. الأحمر = مفقود.",
      onboard_2t: "امسح للتأكيد",
      onboard_2d: "زر المسح العائم — تأكيد الحضور ببطاقة نُسك في ثانية.",
      onboard_3t: "التنبيهات تجدك",
      onboard_3d: "صندوق التنبيهات يجمع SOS والفقد والطبي والابتعاد.",
      onboard_go: "ابدأ",
      reset_t: "إعادة تعيين البيانات؟",
      reset_d: "سيُحذف كل ما حُفظ محليًا. لا يمكن التراجع.",
      reset_confirm: "نعم، احذف",
      mgr_groups: "مجموعات نشطة",
      mgr_pilgrims: "إجمالي الحجاج",
      mgr_alerts: "تنبيهات اليوم",
      mgr_scan: "متوسط المسح",
      crowd_tab_map: "الخريطة",
      crowd_tab_data: "البيانات",
      crowd_tab_act: "الإجراءات",
      cite_src: "المصدر",
      drift_eta: "يخرج من النطاق خلال ~",
      min: "د",
      msg_broadcast: "بث للمجموعة",
      msg_band: "إرسال للسوار",
      notify_ok: "تم إرسال الإشعار",
      fab_scan: "مسح",
      high_contrast: "تباين عالٍ",
      judge_mode: "وضع التحكيم",
      track3_mode: "مسار ٣ — إدارة الحشود الذكية",
      nav_manager: "مدير الشركة",
      mcit_t: "مطابقة متطلبات MCIT — مسار ٣",
      mcit_sub: "مراقبة · تحليل · إدارة — ذكاء اصطناعي + استشعار + بيانات",
      mcit_url: "code.mcit.gov.sa — تحدي تقنيات الحج والعمرة",
      mgr_roi: "تقدير العائد (ROI)",
      mgr_roi_d: "توفير تشغيلي مقارنة بالورق وواتساب",
      mgr_sla: "الالتزام بمستوى الخدمة",
      mgr_zones: "توزيع المجموعات — المشاعر",
      mgr_alerts_br: "تفصيل التنبيهات",
      mgr_top_groups: "أفضل المجموعات",
      mgr_int_health: "صحة التكاملات",
      mgr_cost_save: "توفير موسمي تقديري",
      mgr_contract: "جاهزية العقد",
    },
    en: {
      nav_alerts: "Alerts",
      ttl_alerts: "Alerts inbox",
      ttl_manager: "Company manager board",
      nav_more: "More",
      more_t: "More modules",
      sim_badge: "Demo data",
      act_now: "Action now",
      act_miss: "Missing",
      act_med: "Medical",
      act_drift: "Off perimeter",
      act_sos: "SOS",
      act_scan: "Unscanned",
      sos_strip_ack: "Acknowledge",
      sos_strip_loc: "Locate",
      sos_strip_seha: "SEHA",
      heat_score: "Heat-stress index",
      heat_high: "High",
      heat_mid: "Medium",
      heat_low: "Low",
      ritual_behind: "Behind ritual schedule",
      mesh_t: "Nearby supervisor mesh",
      mesh_d: "6 supervisors within 500 m notified",
      pilot_t: "Pilot metrics (projected)",
      pilot_reunite: "Reunification time",
      pilot_scan: "Confirmed attendance",
      pilot_drift: "Early drift detection",
      qr_t: "Scan to open demo",
      qr_url: "Live demo URL",
      onboard_1t: "45 pilgrims — one pulse",
      onboard_1d: "Green beads = present. Amber = medical. Red = missing.",
      onboard_2t: "Scan to confirm",
      onboard_2d: "Floating scan button — confirm Nusuk Card in one second.",
      onboard_3t: "Alerts find you",
      onboard_3d: "Alerts inbox merges SOS, missing, medical, and drift.",
      onboard_go: "Get started",
      reset_t: "Reset all data?",
      reset_d: "All locally saved data will be deleted. This cannot be undone.",
      reset_confirm: "Yes, delete",
      mgr_groups: "Active groups",
      mgr_pilgrims: "Total pilgrims",
      mgr_alerts: "Alerts today",
      mgr_scan: "Avg scan rate",
      crowd_tab_map: "Map",
      crowd_tab_data: "Data",
      crowd_tab_act: "Actions",
      cite_src: "Source",
      drift_eta: "Exits perimeter in ~",
      min: "min",
      msg_broadcast: "Broadcast to group",
      msg_band: "Send to band",
      notify_ok: "Notification sent",
      fab_scan: "Scan",
      high_contrast: "High contrast",
      judge_mode: "Judge mode",
      track3_mode: "Track 3 — Smart Crowd Mgmt",
      nav_manager: "Manager",
      mcit_t: "MCIT Track 3 compliance",
      mcit_sub: "Monitor · analyze · manage — AI + sensors + data",
      mcit_url: "code.mcit.gov.sa — Hajj & Umrah Tech Challenge",
      mgr_roi: "ROI estimate",
      mgr_roi_d: "Operational savings vs paper + WhatsApp",
      mgr_sla: "SLA compliance",
      mgr_zones: "Group distribution — holy sites",
      mgr_alerts_br: "Alert breakdown",
      mgr_top_groups: "Top performing groups",
      mgr_int_health: "Integration health",
      mgr_cost_save: "Est. seasonal savings",
      mgr_contract: "Contract readiness",
    },
  };

  const MCIT_REQS = [
    { ar: "مراقبة الحشود — خريطة كثافة + نبض ٤٥ حاجًا + مسح نُسك", en: "Monitor crowds — density map + 45-bead pulse + Nusuk scan", v: "crowd" },
    { ar: "تحليل الحشود — تنبؤ كثافة + اتجاه تدفق دخول/خروج الجمرات", en: "Analyze crowds — density forecast + Jamarat ingress/egress flow", v: "crowd" },
    { ar: "إدارة الحشود — مسار بديل + بث للمشرفين المجاورين + لمّ الشمل", en: "Manage crowds — safe reroute + supervisor broadcast + reunification", v: "missing" },
    { ar: "الذكاء الاصطناعي — مساعد عمليات + تنبؤ + قواعد إنذار مبكر", en: "AI — ops copilot + forecast + early-warning rules", v: "copilot" },
    { ar: "أجهزة الاستشعار — بطاقة نُسك + سوار + صحة الافتراضي (ECG) + بصير", en: "Sensors — Nusuk Card + band + SEHA Virtual (ECG) + Baseer", v: "wear" },
    { ar: "تحليل البيانات — تصدير CSV/JSON + سجل تدقيق + جيوفنس", en: "Data analysis — CSV/JSON export + audit trail + geofence", v: "reports" },
    { ar: "السلامة — طوارئ طبية + SOS + مؤشر إجهاد حراري", en: "Safety — medical incidents + SOS + heat-stress index", v: "medical" },
    { ar: "عربي/إنجليزي + يعمل دون اتصال + موقع إلكتروني", en: "Bilingual AR/EN + offline PWA + Netlify website", v: "pitch" },
  ];

  function xt(k) {
    return (EX[lang] || EX.en)[k] || k;
  }

  function heatStress(p) {
    let s = 0;
    if (p.hr > 100) s += 35;
    else if (p.hr > 90) s += 18;
    if (+p.temp > 37.8) s += 30;
    else if (+p.temp > 37.2) s += 12;
    if (p.spo2 < 94) s += 20;
    if (p.age > 65) s += 15;
    return Math.min(100, s);
  }

  function heatLevel(s) {
    return s >= 55 ? "high" : s >= 30 ? "mid" : "low";
  }

  function heatLabel(s) {
    const l = heatLevel(s);
    return l === "high" ? xt("heat_high") : l === "mid" ? xt("heat_mid") : xt("heat_low");
  }

  function driftEtaMin(p) {
    const c = centroid();
    const d = haversine(c, { lat: p.lat, lng: p.lng });
    const over = Math.max(0, d - FENCE_M * 0.7);
    return Math.max(1, Math.round(over / 18 + 2));
  }

  function pushNotify(title, body) {
    if (!("Notification" in window)) return;
    if (Notification.permission === "granted") {
      try {
        new Notification(title, { body, icon: "./icon.svg" });
      } catch (e) {}
    }
  }

  function haptic() {
    try {
      navigator.vibrate?.(12);
    } catch (e) {}
  }

  function collectAlerts() {
    const items = [];
    if (sosCase.active) {
      items.push({
        sev: "r",
        ic: "🆘",
        title: t("sos_active") + " " + nm(P[sosCase.p]),
        sub: lang === "ar" ? "سوار نُسك — أولوية قصوى" : "Nusuk band — top priority",
        go: () => goView("wear"),
        act: () => sosAck(),
        actL: xt("sos_strip_ack"),
      });
    }
    missing
      .filter((m) => m.open)
      .forEach((m) => {
        items.push({
          sev: "r",
          ic: "🔔",
          title: nm(P[m.p]),
          sub: t("m_lastseen") + ": " + pick(ZONES[m.where]),
          go: () => goView("missing"),
          act: () => markFound(m.p),
          actL: t("found_btn"),
        });
      });
    incidents
      .filter((x) => x.st !== "resolved")
      .forEach((x) => {
        items.push({
          sev: x.sev,
          ic: "🩺",
          title: nm(P[x.p]) + " — " + pick(x.type),
          sub: pick(x.note),
          go: () => goView("medical"),
        });
      });
    driftList().forEach((d) => {
      items.push({
        sev: "a",
        ic: "📍",
        title: nm(d.p),
        sub: `${d.d}${lang === "ar" ? "م" : " m"} · ${xt("drift_eta")}${driftEtaMin(d.p)} ${xt("min")}`,
        go: () => goView("wear"),
        act: () => pingBand(d.p.i),
        actL: t("gf_ping"),
      });
    });
    P.filter((p) => p.cardio && cardioRisk(p) !== "normal").forEach((p) => {
      items.push({
        sev: cardioRisk(p) === "alert" ? "r" : "a",
        ic: "🫀",
        title: nm(p) + " — SEHA",
        sub: t("hr") + " " + p.hr + " · " + t("seha_ecg") + ": " + ecgLabel(p),
        go: () => goView("wear"),
        act: () => escalateSeha(p.i),
        actL: t("seha_escalate"),
      });
    });
    return items;
  }

  function alertCount() {
    return collectAlerts().length;
  }

  function renderActionStrip() {
    const el = document.getElementById("actionStrip");
    if (!el) return;
    const c = counts();
    const drift = driftList().length;
    const unsc = P.filter((p) => !p.scanned).length;
    const chips = [
      [c.miss, xt("act_miss"), "r", () => goView("alerts")],
      [c.med, xt("act_med"), "a", () => goView("alerts")],
      [drift, xt("act_drift"), "a", () => goView("alerts")],
      [sosCase.active ? 1 : 0, xt("act_sos"), "r", () => goView("wear")],
      [unsc, xt("act_scan"), "b", () => goView("scan")],
    ];
    el.innerHTML =
      `<div class="act-label">${xt("act_now")}</div><div class="act-chips">` +
      chips
        .map(
          ([n, lb, col, fn], idx) =>
            `<button type="button" class="act-chip ${col}" onclick="window._actGo(${idx})" ${n ? "" : 'style="opacity:.45"'}><span class="act-n">${n}</span>${lb}</button>`
        )
        .join("") +
      "</div>";
    window._actChips = chips.map((c) => c[3]);
    window._actGo = (i) => window._actChips[i]?.();
  }

  function renderSosStrip() {
    const el = document.getElementById("sosStrip");
    if (!el) return;
    if (!sosCase.active) {
      el.hidden = true;
      el.innerHTML = "";
      return;
    }
    el.hidden = false;
    const p = P[sosCase.p];
    el.innerHTML = `<div class="sos-strip-inner">
      <span>🆘 <b>${t("sos_active")} ${nm(p)}</b> <span class="mono">${p.lat.toFixed(4)}, ${p.lng.toFixed(4)}</span></span>
      <span class="sos-btns">
        <button type="button" class="btn sm" onclick="toast('GPS: ${p.lat.toFixed(4)}, ${p.lng.toFixed(4)}')">${xt("sos_strip_loc")}</button>
        ${p.cardio ? `<button type="button" class="btn sm" onclick="escalateSeha(${p.i})">${xt("sos_strip_seha")}</button>` : ""}
        <button type="button" class="btn sm red" onclick="sosAck()">${xt("sos_strip_ack")}</button>
      </span></div>`;
  }

  function renderAlertsInbox() {
    const el = document.getElementById("alertsList");
    if (!el) return;
    const items = collectAlerts();
    document.getElementById("alertsDot")?.toggleAttribute("hidden", !items.length);
    if (!items.length) {
      el.innerHTML = `<div class="empty"><span class="ei">✓</span>${lang === "ar" ? "لا تنبيهات نشطة — المجموعة مستقرة" : "No active alerts — group is stable"}</div>`;
      return;
    }
    el.innerHTML =
      items
        .map(
          (it, i) => `<div class="alert-row sev-${it.sev}">
      <span class="alert-ic">${it.ic}</span>
      <span class="alert-body" onclick="window._alertGo(${i})"><b>${it.title}</b><div class="id">${it.sub}</div></span>
      ${it.act ? `<button type="button" class="btn sm" onclick="window._alertAct(${i})">${it.actL}</button>` : `<button type="button" class="btn sm ghost" onclick="window._alertGo(${i})">${lang === "ar" ? "فتح" : "Open"}</button>`}
    </div>`
        )
        .join("") +
      `<div class="card" style="margin-top:14px;border-color:var(--brand-soft)"><h3 style="font-size:13px">${xt("mesh_t")}</h3><p class="id">${xt("mesh_d")}</p></div>`;
    window._alertItems = items;
    window._alertGo = (i) => window._alertItems[i]?.go?.();
    window._alertAct = (i) => window._alertItems[i]?.act?.();
  }

  function renderManager() {
    const el = document.getElementById("managerBoard");
    if (!el) return;
    const groups = 48;
    const pilgrims = groups * 45;
    const zones = lang === "ar"
      ? [["منى — المخيمات", 18], ["عرفات", 12], ["مزدلفة", 4], ["المطاف", 8], ["الجمرات", 6]]
      : [["Mina — camps", 18], ["Arafah", 12], ["Muzdalifah", 4], ["Mataf", 8], ["Jamarat", 6]];
    const alertsBr = lang === "ar"
      ? [["فقد", 34, "r"], ["طبي", 28, "a"], ["ابتعاد", 41, "a"], ["SOS", 8, "r"], ["إجهاد حراري", 16, "a"]]
      : [["Missing", 34, "r"], ["Medical", 28, "a"], ["Drift", 41, "a"], ["SOS", 8, "r"], ["Heat", 16, "a"]];
    const topGroups = lang === "ar"
      ? [["مجموعة أ-١٢ · منى", "98%"], ["مجموعة ب-٠٧ · عرفات", "96%"], ["مجموعة ج-٠٣ · المطاف", "95%"], ["مجموعة د-٢١ · الجمرات", "94%"], ["مجموعة ه-٠٩ · منى", "93%"]]
      : [["Group A-12 · Mina", "98%"], ["Group B-07 · Arafah", "96%"], ["Group C-03 · Mataf", "95%"], ["Group D-21 · Jamarat", "94%"], ["Group E-09 · Mina", "93%"]];
    const sla = lang === "ar"
      ? [["زمن لمّ الشمل", "< 15 د", "94%"], ["استجابة طبية", "< 8 د", "91%"], ["تأكيد حضور", "> 90%", "91%"], ["تصعيد صحة الافتراضي", "< 3 د", "100%"], ["مزامنة دون اتصال", "< 60 ث", "99%"]]
      : [["Reunification time", "< 15 min", "94%"], ["Medical response", "< 8 min", "91%"], ["Confirmed attendance", "> 90%", "91%"], ["SEHA escalation", "< 3 min", "100%"], ["Offline sync", "< 60 s", "99%"]];
    const intHealth =
      typeof integrationStats === "function"
        ? integrationStats()
        : {};
    const intRows = ["baseer", "nusuk", "nbiz", "seha", "sec", "adilla"]
      .map((id) => {
        const s = intHealth[id] || { count: 0, ok: 0 };
        const pct = s.count ? Math.round((s.ok / s.count) * 100) : 100;
        const names = { baseer: "Baseer", nusuk: "Nusuk", nbiz: "N.Business", seha: "SEHA", sec: "Security", adilla: "Adilla" };
        return `<div class="row"><span>${names[id]}</span><span class="pill ${pct >= 95 ? "g" : "a"}">${pct}%</span></div>`;
      })
      .join("");
    const maxA = Math.max(...alertsBr.map((x) => x[1]));
    el.innerHTML = `<div class="grid g4">
      <div class="card kpi k-b"><div class="n">${groups}</div><div class="l">${xt("mgr_groups")}</div></div>
      <div class="card kpi k-g"><div class="n">${pilgrims.toLocaleString()}</div><div class="l">${xt("mgr_pilgrims")}</div></div>
      <div class="card kpi k-a"><div class="n">127</div><div class="l">${xt("mgr_alerts")}</div></div>
      <div class="card kpi k-g"><div class="n">91%</div><div class="l">${xt("mgr_scan")}</div></div>
    </div>
    <div class="grid g2" style="margin-top:14px">
      <div class="card"><h3>${xt("mgr_zones")}</h3>
        ${zones.map(([z, n]) => `<div class="row"><span>${z}</span><span><span class="pill b">${n}</span> ${lang === "ar" ? "مجموعة" : "groups"}</span></div>`).join("")}
      </div>
      <div class="card"><h3>${xt("mgr_alerts_br")}</h3>
        ${alertsBr.map(([lb, n, c]) => `<div class="row"><span>${lb}</span><div class="mgr-bar" style="width:120px">${Array.from({ length: 5 }, (_, i) => `<i class="${c}" style="height:${Math.round((n / maxA) * 100 * (0.5 + i * 0.1))}%"></i>`).join("")}</div><span class="pill ${c}">${n}</span></div>`).join("")}
      </div>
    </div>
    <div class="grid g2" style="margin-top:14px">
      <div class="card"><h3>${xt("mgr_sla")}</h3>
        ${sla.map(([a, tgt, pct]) => `<div class="row"><span><b>${a}</b><div class="id">${tgt}</div></span><span class="pill g">${pct}</span></div>`).join("")}
      </div>
      <div class="card"><h3>${xt("mgr_int_health")}</h3>${intRows || `<p class="id">${lang === "ar" ? "نفّذ إجراءً (مسح أو بلاغ) لملء سجل الربط" : "Run an action to populate webhook log"}</p>`}
        <button type="button" class="btn sm ghost" style="margin-top:10px" onclick="goView('integrations')">${lang === "ar" ? "فتح خريطة التكامل" : "Open integration map"}</button>
      </div>
    </div>
    <div class="grid g2" style="margin-top:14px">
      <div class="card"><h3>${xt("pilot_t")}</h3>
        <div class="row"><span>${xt("pilot_reunite")}</span><span><span class="pill r">47m</span> → <span class="pill g">8m</span></span></div>
        <div class="row"><span>${xt("pilot_scan")}</span><span><span class="pill a">62%</span> → <span class="pill g">94%</span></span></div>
        <div class="row"><span>${xt("pilot_drift")}</span><span><span class="pill a">41%</span> → <span class="pill g">73%</span></span></div>
      </div>
      <div class="card"><h3>${xt("mgr_roi")}</h3>
        <p class="id">${xt("mgr_roi_d")}</p>
        <div class="row"><span>${xt("mgr_cost_save")}</span><span class="pill g">≈ 2.4M SAR</span></div>
        <div class="row"><span>${xt("mgr_contract")}</span><span class="pill g">${lang === "ar" ? "جاهز للعقد" : "Contract-ready"}</span></div>
        <h3 style="margin-top:14px">${xt("mgr_top_groups")}</h3>
        ${topGroups.map(([g, s]) => `<div class="row"><span>${g}</span><span class="pill g">${s}</span></div>`).join("")}
      </div>
    </div>`;
  }

  function renderPilotMetrics() {
    const el = document.getElementById("ptPilot");
    if (!el) return;
    el.innerHTML = `<h3 style="margin-bottom:10px">${xt("pilot_t")}</h3>
      <div class="grid g3">
        <div class="card kpi k-g" style="padding:12px"><div class="n" style="font-size:22px">8m</div><div class="l">${xt("pilot_reunite")} <span class="pill g">−83%</span></div></div>
        <div class="card kpi k-b" style="padding:12px"><div class="n" style="font-size:22px">94%</div><div class="l">${xt("pilot_scan")} <span class="pill g">+32pp</span></div></div>
        <div class="card kpi k-a" style="padding:12px"><div class="n" style="font-size:22px">73%</div><div class="l">${xt("pilot_drift")} <span class="pill g">+32pp</span></div></div>
      </div>
      <p class="id" style="margin-top:8px">${lang === "ar" ? "* تقديرات تجريبية لموسم واحد — تُقاس في التجربة الميدانية" : "* Projected from one-season pilot — measured in field trial"}</p>`;
  }

  function renderQrPitch() {
    const el = document.getElementById("ptQr");
    if (!el) return;
    const url = typeof getDemoUrl === "function" ? getDemoUrl() : location.href.split("?")[0] + "?judge=1";
    el.innerHTML = `<div style="display:flex;gap:16px;align-items:center;flex-wrap:wrap">
      <img src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(url)}" width="140" height="140" alt="QR" style="border-radius:10px;border:1px solid var(--line)"/>
      <div><b>${xt("qr_t")}</b><div class="id mono" style="margin-top:6px;word-break:break-all">${url}</div></div>
    </div>`;
  }

  function renderRitualAlert() {
    const el = document.getElementById("ritualAlert");
    if (!el) return;
    const behind = P.filter((p) => !p.rit.tawaf || !p.rit.say);
    if (behind.length < 8) {
      el.hidden = true;
      return;
    }
    el.hidden = false;
    el.innerHTML = `<span>⏱ <b>${xt("ritual_behind")}</b> — ${behind.length} ${lang === "ar" ? "حاجًا" : "pilgrims"} · <button type="button" class="btn sm" onclick="goView('group');gFilter='unscanned';renderGroup()">${lang === "ar" ? "عرض القائمة" : "View list"}</button></span>`;
  }

  function renderCrowdTabLabels() {
    const tabs = [
      ["map", "crowd_tab_map"],
      ["data", "crowd_tab_data"],
      ["act", "crowd_tab_act"],
    ];
    tabs.forEach(([ct, key]) => {
      const btn = document.querySelector(`#crowdTabs button[data-ct="${ct}"]`);
      if (btn) btn.textContent = t(key);
    });
  }
  window.renderCrowdTabLabels = renderCrowdTabLabels;

  function renderMcit() {
    const el = document.getElementById("mcitCheck");
    const urlEl = document.getElementById("mcitUrl");
    if (!el) return;
    el.innerHTML = MCIT_REQS.map((r) => {
      const label = lang === "ar" ? r.ar : r.en;
      return `<div class="mcit-row"><span class="ok">✓</span><span><a href="#" onclick="goView('${r.v}');return false">${label}</a></span></div>`;
    }).join("");
    if (urlEl) {
      urlEl.innerHTML = `<a href="https://code.mcit.gov.sa/ar/bootcamp/HajjUmrahTech-Challenge" target="_blank" rel="noopener">${t("mcit_url")}</a>`;
    }
  }
  window.renderMcit = renderMcit;

  // Export render helpers for main renderAll()
  window.renderActionStrip = renderActionStrip;
  window.renderSosStrip = renderSosStrip;
  window.renderAlertsInbox = renderAlertsInbox;
  window.renderManager = renderManager;
  window.renderPilotMetrics = renderPilotMetrics;
  window.renderQrPitch = renderQrPitch;
  window.renderRitualAlert = renderRitualAlert;
  window.renderHeatPanel = renderHeatPanel;
  window.heatStress = heatStress;

  function renderHeatPanel() {
    const el = document.getElementById("heatPanel");
    if (!el) return;
    const top = P.map((p) => ({ p, s: heatStress(p) }))
      .sort((a, b) => b.s - a.s)
      .slice(0, 5);
    el.innerHTML = `<h3 style="margin-bottom:10px">${xt("heat_score")}</h3>${top
      .map(({ p, s }) => {
        const lv = heatLevel(s);
        return `<div class="row"><span class="pmeta">${av(p)}<span><div class="nm">${nm(p)}</div><div class="id">${t("hr")} ${p.hr} · ${p.temp}°</div></span></span><span class="pill ${lv === "high" ? "r" : lv === "mid" ? "a" : "g"}">${heatLabel(s)} · ${s}</span></div>`;
      })
      .join("")}`;
  }

  function patchMedProto() {
    const proto = document.getElementById("medProto");
    if (!proto || proto.dataset.patched) return;
    proto.dataset.patched = "1";
    proto.innerHTML = proto.innerHTML.replace(
      /نداء ٩٣٧/g,
      '<a href="tel:937" class="tel">937</a>'
    ).replace(
      /call 937/gi,
      '<a href="tel:937" class="tel">937</a>'
    ).replace(
      /اتصال فوري ٩٩٧/g,
      '<a href="tel:997" class="tel">997</a>'
    ).replace(
      /Call 997/gi,
      '<a href="tel:997" class="tel">997</a>'
    );
  }

  function patchCopilotCites() {
    const orig = window.showAiAnswer;
    if (orig._patched) return;
    window.showAiAnswer = function (head, body, act, mode) {
      let cite = "";
      if (mode === "rules") {
        const ctx = buildGroupContext();
        cite = `<p class="mono cite">${xt("cite_src")}: present=${ctx.present}, med=${ctx.medical}, miss=${ctx.missing}, scanned=${ctx.scanned}, drift=${driftList().length}</p>`;
      }
      orig(head, body + cite, act, mode);
    };
    window.showAiAnswer._patched = true;
  }

  function patchForecastExplain() {
    const fc = document.getElementById("forecast");
    if (!fc || fc.dataset.patched) return;
    fc.dataset.patched = "1";
    const note = lang === "ar" ? "المحرك: ساعة اليوم + تقويم المناسك + بيانات تاريخية للمنطقة" : "Engine: time-of-day + ritual calendar + zone historical baseline";
    fc.insertAdjacentHTML("beforeend", `<p class="mono" style="font-size:10.5px;color:var(--muted);margin-top:8px">${note}</p>`);
  }

  function patchNavA11y() {
    document.querySelectorAll(".view").forEach((v) => {
      const on = v.classList.contains("active");
      v.setAttribute("aria-hidden", on ? "false" : "true");
    });
  }

  function openMoreNav() {
    document.getElementById("moreDrawer")?.classList.add("open");
  }
  function closeMoreNav() {
    document.getElementById("moreDrawer")?.classList.remove("open");
  }
  window.openMoreNav = openMoreNav;
  window.closeMoreNav = closeMoreNav;

  function confirmReset() {
    openModal("resetModal");
  }
  window.confirmReset = confirmReset;

  async function doReset() {
    closeModals();
    await resetData();
  }
  window.doReset = doReset;

  function closeOnboard() {
    try {
      localStorage.setItem("rafeeq_onboard", "1");
    } catch (e) {}
    document.getElementById("onboardModal")?.classList.remove("open");
  }
  window.closeOnboard = closeOnboard;

  function toggleHighContrast() {
    document.body.classList.toggle("high-contrast");
    try {
      localStorage.setItem("rafeeq_hc", document.body.classList.contains("high-contrast") ? "1" : "0");
    } catch (e) {}
  }
  window.toggleHighContrast = toggleHighContrast;

  function broadcastToGroup() {
    const msg = prompt(lang === "ar" ? "رسالة للمجموعة (٤٥ حاجًا):" : "Message to group (45 pilgrims):");
    if (!msg) return;
    logEvent("broadcast", (lang === "ar" ? "بث للمجموعة: " : "Group broadcast: ") + msg.slice(0, 80));
    pushNotify("Rafeeq", msg.slice(0, 60));
    toast(xt("notify_ok") + " · " + xt("msg_broadcast"));
  }
  window.broadcastToGroup = broadcastToGroup;

  // Patch core functions
  const origRenderAll = window.renderAll;
  window.renderAll = function () {
    origRenderAll();
    renderActionStrip();
    renderSosStrip();
    renderAlertsInbox();
    renderManager();
    renderPilotMetrics();
    renderQrPitch();
    renderRitualAlert();
    renderHeatPanel();
    renderMcit();
    if (typeof renderIntegrations === "function") renderIntegrations();
    patchMedProto();
    patchForecastExplain();
    patchNavA11y();
    const ac = alertCount();
    const ad = document.getElementById("alertsDot");
    if (ad) ad.hidden = !ac;
  };

  const origGoView = window.goView;
  window.goView = function (v) {
    if (v === "manager") {
      curView = "manager";
      document.querySelectorAll(".view").forEach((el) => {
        const on = el.id === "manager";
        el.classList.toggle("active", on);
        el.setAttribute("aria-hidden", on ? "false" : "true");
      });
      $("#ttl").textContent = xt("ttl_manager");
      renderManager();
      return;
    }
    if (origGoView) origGoView(v);
  };

  const origNavClick = document.querySelectorAll(".rail button[data-v]");
  document.querySelectorAll(".rail button[data-v]").forEach((b) => {
    const orig = b.onclick;
    b.addEventListener("click", () => {
      closeMoreNav();
      patchNavA11y();
    });
  });

  const origMarkScanned = window.markScanned;
  if (typeof origMarkScanned === "function") {
    window.markScanned = function (p) {
      haptic();
      return origMarkScanned(p);
    };
  }

  const origReset = window.resetData;
  window.resetData = async function () {
    await origReset();
  };

  // Replace reset button handler via delegation
  document.addEventListener("click", (e) => {
    if (e.target.closest('[data-i="reset_btn"]') || e.target.getAttribute("data-i") === "reset_btn") {
      e.preventDefault();
      e.stopPropagation();
      confirmReset();
    }
  });

  // Escape closes modals
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeModals();
      closeMoreNav();
    }
  });

  window.initEnhancements = function () {
    if (params.get("embed") === "1") document.body.classList.add("embed-mode");
    document.body.classList.toggle("judge-mode", judgeMode);
    document.body.classList.toggle("track3-mode", track3Mode);
    document.body.classList.toggle("manager-mode", managerMode);
    if (managerMode) {
      curView = "manager";
      document.querySelectorAll(".view").forEach((v) => v.classList.toggle("active", v.id === "manager"));
      document.querySelectorAll(".rail button").forEach((b) => b.classList.toggle("active", b.dataset.v === "dash"));
      $("#ttl").textContent = xt("ttl_manager");
    }
    if (judgeMode) {
      document.getElementById("simBadge")?.removeAttribute("hidden");
      document.getElementById("judgeBadge")?.removeAttribute("hidden");
      if ("Notification" in window && Notification.permission === "default") Notification.requestPermission().catch(() => {});
      setTimeout(() => runDemo(), 1200);
    }
    if (track3Mode) {
      document.getElementById("track3Badge")?.removeAttribute("hidden");
    }
    try {
      if (localStorage.getItem("rafeeq_hc") === "1") document.body.classList.add("high-contrast");
    } catch (e) {}
    if (!judgeMode && !managerMode) {
      try {
        if (!localStorage.getItem("rafeeq_onboard")) document.getElementById("onboardModal")?.classList.add("open");
      } catch (e) {}
    }
    patchCopilotCites();
    TITLES.alerts = "ttl_alerts";
    I18N.ar.ttl_alerts = EX.ar.ttl_alerts;
    I18N.en.ttl_alerts = EX.en.ttl_alerts;
    I18N.ar.nav_alerts = EX.ar.nav_alerts;
    I18N.en.nav_alerts = EX.en.nav_alerts;
    I18N.ar.ttl_manager = EX.ar.ttl_manager;
    I18N.en.ttl_manager = EX.en.ttl_manager;
    I18N.ar.nav_more = EX.ar.nav_more;
    I18N.en.nav_more = EX.en.nav_more;
    I18N.ar.track3_mode = EX.ar.track3_mode;
    I18N.en.track3_mode = EX.en.track3_mode;
    I18N.ar.nav_manager = EX.ar.nav_manager;
    I18N.en.nav_manager = EX.en.nav_manager;
    I18N.ar.mcit_t = EX.ar.mcit_t;
    I18N.en.mcit_t = EX.en.mcit_t;
    I18N.ar.mcit_sub = EX.ar.mcit_sub;
    I18N.en.mcit_sub = EX.en.mcit_sub;
    I18N.ar.mcit_url = EX.ar.mcit_url;
    I18N.en.mcit_url = EX.en.mcit_url;
    patchNavA11y();
    renderActionStrip();
    renderSosStrip();
    renderCrowdTabLabels();
    renderMcit();
    if (typeof renderIntegrations === "function") renderIntegrations();
  };

  // Auto-init when loaded after main app
  if (typeof boot === "function" || document.getElementById("kpis")) {
    initEnhancements();
    if (typeof renderAll === "function") renderAll();
  }
})();
