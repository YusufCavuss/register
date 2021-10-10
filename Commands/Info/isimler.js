const Discord = require("discord.js");
const mongoose = require("mongoose");
const Register = require('../../Models/Register.js');
const ayarlar = require("../../config.json");

exports.execute = async (client, message, args) => {
if(!message.member.roles.cache.has(ayarlar.Rol.Yetkili) && !message.member.permissions.has(8)) return;
let kullanici = message.mentions.users.first() || message.guild.member(args[0]);
if(!kullanici) return message.reply(ayarlar.Hata.Kullanıcı);
let adam = message.guild.member(kullanici);

let registerData = await Register.findOne({ guildId: message.guild.id, userId: adam.user.id });
let embed = new Discord.MessageEmbed().setAuthor(adam.user.username, adam.user.avatarURL({ dynamic: true }));

if(!registerData){
let newRegisterData = new Register({
    _id: new mongoose.Types.ObjectId(),
    guildId: message.guild.id,
    userId: adam.user.id,
    totalRegister: 0,
    womanRegister: 0,
    manRegister: 0,
    userNames: []
}).save().then(x => {
    return message.channel.send(embed.setDescription(`**${kullanici.user.tag}** adlı kullanıcının **${registerData.userNames.length} adet** isim kaydı bulundu! \n\n${registerData.userNames.map(x => `\`• ${x.nick}\` (${x.type.replace(`Erkek`, `<@&${ayarlar.Rol.Erkek}>`).replace(`Kız`, `${ayarlar.Rol.Kız}`)})`)}`))
})};
message.channel.send(embed.setDescription(`**${kullanici.user.tag}** adlı kullanıcının **${registerData.userNames.length} adet** kaydı bulundu! \n\n${registerData.userNames.map(x => `\`• ${x.nick}\` (${x.type.replace(`Erkek`, `<@&${ayarlar.Rol.Erkek}>`).replace(`Kız`, `<@&${ayarlar.Rol.Kız}>`)})`).join("\n ")}`))

};

exports.conf = {
  command: "isimler",
  aliases: ["isimler"]
}