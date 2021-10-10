const Discord = require("discord.js");
const db = require('quick.db');
const ayarlar = require("../../config.json");

const durum = new db.table(`YasaklıDurum`);
exports.execute = async (client, message, args) => {
if(!message.member.roles.cache.has(ayarlar.Rol.Yetkili) && !message.member.permissions.has(8)) return;

let kullanici = message.mentions.users.first() || message.guild.member(args[0]);
if(!kullanici) return message.reply(ayarlar.Hata.Kullanıcı);
let adam = message.guild.member(kullanici);

if(durum.get(adam.user.id) === `yasakli`){
var emojiembed = await message.channel.send(new Discord.MessageEmbed()
    .setDescription(`<@!${adam.user.id}> adlı kullanıcı kayıt sisteminden yasaklanmış!
    Kullanıcının yasağını kaldırmak için aşağıdaki emojiye basman yeterli`));
let collector = emojiembed.createReactionCollector((reaction, user) => user.id === message.author.id);
await emojiembed.react(`✅`);
await emojiembed.react(`❌`);
collector.on("collect", async(reaction, user) => {
await emojiembed.reactions.removeAll()
if(reaction.emoji.name === `✅`){
durum.delete(adam.user.id)
emojiembed.edit(new Discord.MessageEmbed()
.setDescription(`<@!${adam.user.id}> adlı kullanıcının kayıt yasağı kaldırıldı!`));
}
if(reaction.emoji.name === `❌`){
emojiembed.embed.edit(new Discord.MessageEmbed()
.setDescription(`<@!${adam.user.id}> adlı kullanıcının kayıt yasağı kaldırılmadı!`))
}})};
if(durum.get(adam.user.id) !== `yasakli`){
let embed = await message.channel.send(new Discord.MessageEmbed()
.setDescription(`<@!${adam.user.id}> adlı kullanıcı kayıt sistemlerinden yasaklandı!`));
durum.set(adam.user.id, `yasakli`)
};

};

exports.conf = {
  command: "Yasakla",
  aliases: ["yasakla","kban"]
}