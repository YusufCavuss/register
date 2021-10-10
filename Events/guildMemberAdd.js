const Discord = require("discord.js");
const mongoose = require("mongoose");
const client = global.client;
const ayarlar = require('../config.json');
const moment = require('moment');
moment.locale('tr');

exports.execute = async (member) => {
let channel = member.guild.channels.cache.get(ayarlar.Kanal.KayıtChat);
member.roles.add(ayarlar.Rol.Kayıtsız).catch(e => {channel.send(`**Hata var!** \nSebebi: **${e}**`)});

channel.send(`**Sunucumuza Hoş Geldin <@${member.user.id}>!**
Hesabın **${moment(member.user.createdTimestamp).format(`Do MMMM YYYY, h:mm`)}** tarihinde (${moment(member.user.createdAt).add(5, 'days').fromNow().replace("birkaç saniye önce", " ")}) oluşturulmuştur.

Sunucu kurallarımız <#${ayarlar.Kanal.Rules}> kanalında belirtilmiştir. Unutma sunucu içerisinde ki ceza işlemlerin kuralları okuduğunu varsayarak gerçekleştirilecek.

Seninle beraber **${member.guild.memberCount}** kişi olduk! Tagımızı alarak bizlere destek olabilirsin! 
Kayıt olmak için teyit odalarına girip ses teyit vermen gerekiyor <@&${ayarlar.Rol.Yetkili}> rolündeki yetkililerimiz seninle ilgilenecektir!
`)


};

exports.conf = {
  event: "guildMemberAdd"
};