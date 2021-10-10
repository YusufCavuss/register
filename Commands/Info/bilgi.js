const Discord = require("discord.js");
const mongoose = require("mongoose");
const Register = require("../../Models/Register.js");
const ayarlar = require("../../config.json");
const db = require('quick.db');

const yetkili = new db.table(`YetkiliKKE`);
const durum = new db.table(`YasaklıDurum`);
const tarih = new db.table(`KayıtTarih`);
exports.execute = async (client, message, args) => {
if(!message.member.roles.cache.has(ayarlar.Rol.Yetkili) && !message.member.permissions.has(8)) return;
let kullanici = message.mentions.users.first() || message.guild.member(args[0]);
if(!kullanici) return message.reply(ayarlar.Hata.Kullanıcı);
if(!kullanici.roles.cache.has(ayarlar.Rol.Erkek) && !kullanici.roles.cache.has(ayarlar.Rol.Kız)) return;
let adam = message.guild.member(kullanici);

let zaman = tarih.get(adam.user.id);
let kyetkili = yetkili.get(adam.user.id);

let embed = new Discord.MessageEmbed()
  .setDescription(`<@!${adam.user.id}> adlı kullanıcının kayıt bilgileri aşağıdadır!`)
  .addField(`Kullanıcı`, `<@!${adam.user.id}>`, true)
  .addField(`Yetkili`, `<@!${kyetkili}>`, true)
  .addField(`Zaman`, zaman, true)
  .setThumbnail(adam.user.avatarURL());
message.channel.send(embed);
};

exports.conf = {
  command: "Bilgi",
  aliases: ["bilgi"]
}