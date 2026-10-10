import { world, system } from "@minecraft/server";
import { ActionFormData, ModalFormData, MessageFormData } from "@minecraft/server-ui";

/*
 * AIZEN CLIENT Tools
 * In a world that has this Behavior Pack enabled, type !aizen in chat.
 * This script cannot inject a button into the official Bedrock chat UI or
 * operate on a third-party server unless that server itself runs this pack.
 */

const COMMANDS = [
  { title: "Pay", template: "/pay <player> <amount>", help: "اكتب اسم اللاعب والمبلغ ثم أرسل الأمر يدويًا." },
  { title: "Sell", template: "/sell", help: "قد يختلف أمر البيع حسب السيرفر." },
  { title: "Home", template: "/home", help: "الانتقال إلى منزلك إذا كان الأمر مدعومًا." },
  { title: "Set Home", template: "/sethome", help: "حفظ منزلك إذا كان الأمر مدعومًا." },
  { title: "Spawn", template: "/spawn", help: "العودة إلى السبون إذا كان الأمر مدعومًا." },
  { title: "RTP", template: "/rtp", help: "الانتقال العشوائي إذا كان الأمر مدعومًا." },
  { title: "Auction House", template: "/ah", help: "فتح المزاد إذا كان الأمر مدعومًا." },
  { title: "Shop", template: "/shop", help: "فتح المتجر إذا كان الأمر مدعومًا." },
  { title: "Balance", template: "/bal", help: "عرض الرصيد إذا كان الأمر مدعومًا." },
  { title: "Sell Hand", template: "/sell hand", help: "مثال فقط؛ تأكد من صيغة السيرفر." },
  { title: "Message", template: "/msg <player> <message>", help: "مراسلة لاعب." },
  { title: "TPA", template: "/tpa <player>", help: "طلب الانتقال إلى لاعب." }
];

function tell(player, text) {
  try { player.sendMessage("§6[AIZEN] §r" + text); } catch {}
}

async function showMenu(player) {
  const form = new ActionFormData()
    .title("§l§6AIZEN CLIENT")
    .body("§fأدوات مساعدة. اختصارات الأوامر تعرض القالب فقط؛ لا ترسل الأوامر تلقائيًا.\n\nاختر أداة:")
    .button("🧮 حاسبة التجارة")
    .button("💬 قائمة الأوامر المحفوظة")
    .button("📦 حاسبة سعر القطعة")
    .button("ℹ️ حدود الميزات");

  try {
    const result = await form.show(player);
    if (result.canceled) return;
    if (result.selection === 0) return showCalculator(player);
    if (result.selection === 1) return showCommands(player);
    if (result.selection === 2) return showUnitPrice(player);
    if (result.selection === 3) return showLimits(player);
  } catch (e) {
    tell(player, "تعذر فتح القائمة. تأكد أن الحزمة مفعّلة وأن واجهات Script API متاحة في هذا العالم.");
  }
}

async function showCalculator(player) {
  const form = new ModalFormData()
    .title("AIZEN • حاسبة الربح")
    .textField("سعر الشراء الإجمالي", "مثال: 120000", "0")
    .textField("سعر البيع الإجمالي", "مثال: 150000", "0")
    .textField("عدد القطع (اختياري)", "مثال: 64", "1");
  try {
    const r = await form.show(player);
    if (r.canceled) return showMenu(player);
    const buy = Number(r.formValues?.[0]);
    const sell = Number(r.formValues?.[1]);
    const qty = Number(r.formValues?.[2] ?? 1);
    if (![buy, sell, qty].every(Number.isFinite) || buy < 0 || sell < 0 || qty <= 0) {
      tell(player, "أدخل أرقامًا صحيحة، ويجب أن يكون عدد القطع أكبر من صفر.");
      return showCalculator(player);
    }
    const profit = sell - buy;
    const pct = buy === 0 ? (sell === 0 ? 0 : Infinity) : (profit / buy) * 100;
    const per = profit / qty;
    const pctText = Number.isFinite(pct) ? pct.toFixed(2) + "%" : "غير محددة (سعر الشراء صفر)";
    tell(player, "النتيجة — صافي " + (profit >= 0 ? "الربح: " : "الخسارة: ") + fmt(Math.abs(profit)) +
      " | النسبة: " + pctText + " | لكل قطعة: " + fmt(per));
    const again = new ActionFormData().title("نتيجة الحاسبة").body(
      "الشراء: " + fmt(buy) + "\nالبيع: " + fmt(sell) + "\nالفرق: " + fmt(profit) +
      "\nالربح لكل قطعة: " + fmt(per) + "\nنسبة الربح: " + pctText
    ).button("حساب جديد").button("القائمة الرئيسية");
    const choice = await again.show(player);
    if (!choice.canceled && choice.selection === 0) return showCalculator(player);
    if (!choice.canceled && choice.selection === 1) return showMenu(player);
  } catch {
    tell(player, "تعذر فتح الحاسبة في هذه البيئة.");
  }
}

async function showUnitPrice(player) {
  const form = new ModalFormData()
    .title("AIZEN • سعر القطعة")
    .textField("السعر الإجمالي", "مثال: 50000", "0")
    .textField("عدد القطع", "مثال: 64", "64");
  try {
    const r = await form.show(player);
    if (r.canceled) return showMenu(player);
    const total = Number(r.formValues?.[0]);
    const qty = Number(r.formValues?.[1]);
    if (![total, qty].every(Number.isFinite) || total < 0 || qty <= 0) {
      tell(player, "أدخل سعرًا صحيحًا وعدد قطع أكبر من صفر.");
      return showUnitPrice(player);
    }
    tell(player, "سعر القطعة الواحدة = " + fmt(total / qty));
  } catch {
    tell(player, "تعذر فتح حاسبة سعر القطعة.");
  }
}

async function showCommands(player) {
  const form = new ActionFormData()
    .title("AIZEN • الأوامر المحفوظة")
    .body("اختر أمرًا لعرض صيغته. اضغط مطولًا أو انسخها يدويًا حسب إمكانات جهازك، ثم أرسلها في الشات. الأوامر تختلف من سيرفر لآخر.");
  for (const c of COMMANDS) form.button(c.title + "\n§7" + c.template);
  form.button("رجوع");
  try {
    const r = await form.show(player);
    if (r.canceled || r.selection === COMMANDS.length) return showMenu(player);
    const c = COMMANDS[r.selection];
    if (!c) return;
    const detail = new MessageFormData()
      .title("AIZEN • " + c.title)
      .body("الأمر:\n§e" + c.template + "\n\n" + c.help + "\n\nتنبيه: هذه القائمة لا ترسل الأمر تلقائيًا.")
      .button1("عرض القائمة")
      .button2("الرئيسية");
    const d = await detail.show(player);
    if (!d.canceled && d.selection === 0) return showCommands(player);
    if (!d.canceled && d.selection === 1) return showMenu(player);
  } catch {
    tell(player, "تعذر فتح قائمة الأوامر.");
  }
}

async function showLimits(player) {
  const form = new MessageFormData()
    .title("AIZEN • معلومات")
    .body("هذا Behavior Pack يعمل فقط في عالم يشغّله ويدعم Script API.\n\nلا يمكنه إضافة زر داخل واجهة الشات الأصلية أو تشغيل سكربت محلي داخل DonutSMP ما لم يشغّل السيرفر الإضافة.\n\nSTEAL/STORE التلقائي وREPEAT التلقائي غير متاحين من Resource Pack وحده.")
    .button1("القائمة")
    .button2("إغلاق");
  try {
    const r = await form.show(player);
    if (!r.canceled && r.selection === 0) return showMenu(player);
  } catch {}
}

function fmt(n) {
  if (!Number.isFinite(n)) return String(n);
  return n.toLocaleString("en-US", { maximumFractionDigits: 2 });
}

world.beforeEvents.chatSend.subscribe((ev) => {
  const message = ev.message.trim().toLowerCase();
  if (message !== "!aizen" && message !== "!aizen menu") return;
  ev.cancel = true;
  system.run(() => showMenu(ev.sender));
});

world.afterEvents.playerSpawn.subscribe((ev) => {
  if (ev.initialSpawn) {
    tell(ev.player, "أدوات AIZEN جاهزة في هذا العالم. اكتب !aizen لفتح الحاسبة وقائمة الأوامر.");
  }
});
