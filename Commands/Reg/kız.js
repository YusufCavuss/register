const Discord = require("discord.js");
const mongoose = require("mongoose");
const Register = require("../../Models/Register.js");
const ayarlar = require("../../config.json");
const db = require('quick.db');
const moment = require('moment');
moment.locale(`tr`);

const yetkili = new db.table(`YetkiliKKE`);
const durum = new db.table(`YasaklıDurum`);
const tarih = new db.table(`KayıtTarih`);
exports.execute = async (client, message, args) => {
if(!message.member.roles.cache.has(ayarlar.Rol.Yetkili) && !message.member.permissions.has(8)) return;

let kullanici = message.mentions.users.first() || message.guild.member(args[0]);
let isim = args[1];
let yas = args[2];
if(!kullanici) return message.reply(ayarlar.Hata.Kullanıcı);
if(durum.get(kullanici.id, `yasakli`)) return message.reply(`Kullanıcı kayıt sistemlerinden yasaklı`)
if(!isim) return message.reply(ayarlar.Hata.Isim);
if(!isNaN(isim)) return message.reply(ayarlar.Hata.IsimKarakter);
if(!yas) return message.reply(ayarlar.Hata.Yaş);
if(isNaN(yas)) return message.reply(ayarlar.Hata.YaşKaraker);
let adam = message.guild.member(kullanici);

const log = message.guild.channels.cache.get(ayarlar.Kanal.KayıtLog);
const genelchat = message.guild.channels.cache.get(ayarlar.Kanal.GenelChat);
let embed = new Discord.MessageEmbed()
    .setDescription(`<@!${adam.user.id}> adlı kullanıcıyı kız olarak kayıt edildi!`)
    .addField(`Kullanıcı`, `<@!${adam.user.id}>`, true)
    .addField(`Yetkili`, `<@!${message.author.id}>`, true)
    .setFooter(`• ${message.member.displayName}`, message.author.avatarURL());

if(yas >= 18) adam.roles.add(ayarlar.Rol.Yetişkin);
adam.roles.add(ayarlar.Rol.Kız).catch(e => {message.channel.send(`**Hata var!** \nSebebi: **${e}**`)});
adam.roles.remove(ayarlar.Rol.Kayıtsız).catch(e => {message.channel.send(`**Hata var!** \nSebebi: **${e}**`)});
adam.setNickname(`${ayarlar.Sunucu.Tag} ${isim.charAt(0).toUpperCase() + isim.slice(1).toLowerCase()}・${yas}`).catch(e => {message.channel.send(`**Hata var!** \nSebebi: **${e}**`)});
message.react(ayarlar.Emoji.Onay).catch(e => {message.channel.send(`**Hata var!** \nSebebi: **${e}**`)});
log.send(embed);
genelchat.send(`**<@!${adam.user.id}> aramıza katıldı!**`).catch(e => {message.channel.send(`**Hata var!** \nSebebi: **${e}**`)});

yetkili.set(adam.user.id, message.author.id);
tarih.set(adam.user.id, `${moment().format('D MMMM YYYY')}`)
let registerData = await Register.findOne({ guildId: message.guild.id, userId: adam.user.id });
let staffData = await Register.findOne({ guildId: message.guild.id, userId: message.author.id });
if(!staffData){
let newStaffData = new Register({
    _id: new mongoose.Types.ObjectId(), guildId: message.guild.id,
    userId: message.author.id, totalRegister: 1,
    womanRegister: 1, manRegister: 0, userNames: []
    }).save()} else {
    staffData.totalRegister++
    staffData.womanRegister++
    staffData.save()};
if(!registerData){
    let newRegisterData = new Register({
    _id: new mongoose.Types.ObjectId(), guildId: message.guild.id,
    userId: adam.user.id, totalRegister: 0,
    womanRegister: 0, manRegister: 0,
    userNames: [{ nick: `${isim.charAt(0).toUpperCase() + isim.slice(1).toLowerCase()}・${yas}`, type: `Kız`}]
    }).save()} else {
    registerData.userNames.push({ nick: `${isim.charAt(0).toUpperCase() + isim.slice(1).toLowerCase()}・${yas}`, type: `Kız`})
    registerData.save()};
};

exports.conf = {
  command: "Kız",
  aliases: ["kız","k","woman"]
}