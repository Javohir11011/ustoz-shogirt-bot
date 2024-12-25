import { config } from "dotenv";
import { Bot } from "grammy";
config();

export const bot = new Bot(process.env.BOT_TOKEN);

bot.command("start", (ctx) => {
  const keyboard = {
    keyboard: [
      [{ text: "Sherik kerak" }, { text: "Ish joyi kerak" }],
      [{ text: "Hodim kerak" }, { text: "Ustoz kerak" }],
      [{ text: "Shogird kerak" }],
    ],
    resize_keyboard: true,
    one_time_keyboard: false,
  };
  return ctx.reply("Salom! Tanlovingizni qilishingiz mumkin.", {
    reply_markup: keyboard,
  });
});

bot.hears("Sherik kerak", async (ctx) => {
  if (!ctx.session) {
    ctx.session = {};
  }
  if (!ctx.session.step) {
    ctx.session.step = "name";
  }

  await ctx.reply(
    "Sherik topish uchun ariza berish\n\nHozir sizga birnecha savollar beriladi.\nHar biriga javob bering.\nOxirida agar hammasi to`g`ri bo`lsa, HA\n tugmasini bosing va arizangiz Adminga yuboriladi."
  );
  await ctx.reply("Ism, familyangizni kiriting?");
});

bot.on("message", async (ctx) => {
  const userMessage = ctx.message?.text;

  if (!ctx.session) {
    ctx.session = { step: "name" };
  }

  if (userMessage) {
    if (ctx.session.step === "name") {
      ctx.session.name = userMessage;
      ctx.session.step = "technology";
      await ctx.reply(
        "📚 Texnologiya:\n\nTalab qilinadigan texnologiyalarni kiriting?\nTexnologiya nomlarini vergul bilan ajrating.\nMasalan,\n\nJava, C++, C#"
      );
    } else if (ctx.session.step === "technology") {
      ctx.session.technology = userMessage;
      ctx.session.step = "phone";
      await ctx.reply(
        "📞 Aloqa:\n\nBog`lanish uchun raqamingizni kiriting?\nMasalan, +998 90 123 45 67"
      );
    } else if (ctx.session.step === "phone") {
      ctx.session.phone = userMessage;
      ctx.session.step = "position";
      await ctx.reply(
        "🌐 Hudud:\n\nQaysi hududdansiz?\nViloyat nomi, Toshkent shahar yoki Respublikani kiriting."
      );
    } else if (ctx.session.step === "position") {
      ctx.session.phone = userMessage;
      ctx.session.step = "price";
      await ctx.reply(
        "💰 Narxi:\n\nTolov qilasizmi yoki Tekinmi?\nKerak bo`lsa, Summani kiriting?"
      );
    } else if (ctx.session.step === "price") {
      ctx.session.phone = userMessage;
      ctx.session.step = "trade";
      await ctx.reply(
        "👨🏻‍💻 Kasbi:\n\nIshlaysizmi yoki o`qiysizmi?\nMasalan, Talaba"
      );
    } else if (ctx.session.step === "trade") {
      ctx.session.phone = userMessage;
      ctx.session.step = "cloc";
      await ctx.reply(
        "🕰 Murojaat qilish vaqti:\n\nQaysi vaqtda murojaat qilish mumkin?\nMasalan, 9:00 - 18:00"
      );
    }
  }
});
