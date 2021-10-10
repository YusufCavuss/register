const Discord = require("discord.js");
const mongoose = require("mongoose");
const Register = require('../../Models/Register.js');
const ayarlar = require("../../config.json");

exports.execute = async (client, message, args) => {
if(!message.member.roles.cache.has(ayarlar.Rol.Yetkili) && !message.member.permissions.has(8)) return;
let embed = new Discord.MessageEmbed().setAuthor(message.author.username, message.author.avatarURL({ dynamic: true }));
let registerTop = await Register.find({ guildId: message.guild.id }).sort([["totalRegister", "descending"]]).exec();

if(!registerTop.length) return message.channel.send(embed.setDescription(`Herhangi bir kayıt verisi bulunamadı!`))
registerTop = registerTop.filter(x => message.guild.members.cache.has(x.userId)).splice(0, 10)
message.channel.send(embed.setDescription(registerTop.map((x, i) => `\`${i+1}.\` <@${x.userId}> Toplam **${x.totalRegister}** (\`${x.manRegister} Erkek, ${x.womanRegister} Kız\`)`)))

};

exports.conf = {
  command: "Top",
  aliases: ["top","ktop"]
}