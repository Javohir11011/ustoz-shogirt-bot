import { bot } from "./bot";

bot.hears(
  "Sherik kerak",
  async (ctx) =>
    await ctx.reply(
      "Sherik topish uchun ariza berish\n\nHozir sizga birnecha savollar beriladi.\nHar biriga javob bering.\nOxirida agar hammasi to`g`ri bo`lsa, HA\ntugmasini bosing va arizangiz Adminga\nyuboriladi."
    ),
  await ctx.reply("Ism, familyangizni kiriting?")
);
