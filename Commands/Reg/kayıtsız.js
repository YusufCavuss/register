const Discord = require("discord.js");
const ayarlar = require("../../config.json");

exports.execute = async (client, message, args) => {
if(!message.member.roles.cache.has(ayarlar.Rol.Yetkili) && !message.member.permissions.has(8)) return;

let kullanici = message.mentions.users.first() || message.guild.member(args[0]);
if(!kullanici) return message.reply(ayarlar.Hata.Kullanıcı);
let adam = message.guild.member(kullanici);

let embed = new Discord.MessageEmbed()
    .setDescription(`<@!${adam.user.id}> adlı kullanıcıyı kayıtsıza attım!`)
await adam.roles.set([ayarlar.Rol.Kayıtsız]).catch(e => {message.channel.send(`**Hata var!** \nSebebi: **${e}**`)});
await adam.setNickname(`Kayıtsız!`).catch(e => {message.channel.send(`**Hata var!** \nSebebi: **${e}**`)});
await message.channel.send(embed).catch(e => {message.channel.send(`**Hata var!** \nSebebi: **${e}**`)});
};

exports.conf = {
  command: "Kayıtsız",
  aliases: ["kayıtsız"]
}