const Discord = require("discord.js");
const ayarlar = require("../config.json");
const client = global.client;

exports.execute = async () => {
client.user.setPresence({ activity: { name: ayarlar.Bot.Oynuyor}, status: ayarlar.Bot.Activity });
};

exports.conf = {
  event: "ready"
};
