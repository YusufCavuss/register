const Discord = require("discord.js");
const mongoose = require("mongoose");
const Register = require('../../Models/Register.js');
const ayarlar = require("../../config.json");

exports.execute = async (client, message, args) => {
if(!message.member.roles.cache.has(ayarlar.Rol.Yetkili) && !message.member.permissions.has(8)) return;
let registerData = await Register.findOne({ guildId: message.guild.id, userId: message.author.id });
if(!registerData){
let newRegisterData = new Register({
    _id: new mongoose.Types.ObjectId(),
    guildId: message.guild.id,
    userId: message.author.id,
    totalRegister: 0,
    womanRegister: 0,
    manRegister: 0,
    userNames: []
}).save().then(x => {
    return message.channel.send(`Kayıtlı veri bulunamadı!`)})};

let embed = new Discord.MessageEmbed()
    .setDescription(`<@!${message.author.id}> kayıt bilgilerin aşağıdaki gibidir!`)
    .addField(`Toplam`, `${registerData.totalRegister} kişi`, true)
    .addField(`Erkek`, `${registerData.manRegister} kişi`, true)
    .addField(`Kız`, `${registerData.womanRegister} kişi`, true)
message.channel.send(embed)
};

exports.conf = {
  command: "Stat",
  aliases: ["stat","me"]
}