const Discord = require("discord.js");
const ayarlar = require('../../config.json');

exports.execute = async (client, message, args) => {
let embed = new Discord.MessageEmbed()
    .setDescription(`Komutların kullanımı aşağıda verilmiştir!`)
    .addField(`${ayarlar.Bot.Prefix}bilgi`,`Kayıtlı kullanıcı hakkında bilgi verir`,true)
    .addField(`${ayarlar.Bot.Prefix}isimler`,`Kullanıcının daha önce kullandığı isimleri listeler`,true)
    .addField(`${ayarlar.Bot.Prefix}top`,`En çok kayıt yapan yetkilileri listeler`,true)
    .addField(`${ayarlar.Bot.Prefix}stat`,`Kayıtlarınız hakkında bilgi alırsınız`,true)
    .addField(`${ayarlar.Bot.Prefix}erkek`,`Kullanıcıyı erkek olarak kaydedersiniz`,true)
    .addField(`${ayarlar.Bot.Prefix}isim`,`Kullanıcının ismini değiştirmenizi sağlar`,true)
    .addField(`${ayarlar.Bot.Prefix}kayıtsız`,`Kayıtlı kullanıcıyı kayıtsıza atarsınız`,true)
    .addField(`${ayarlar.Bot.Prefix}kız`,`Kullanıcıyı kız olarak kaydedersiniz`,true)
    .addField(`${ayarlar.Bot.Prefix}yasakla`,`Kullanıcıyı kayıt sistemlerinden yasaklarsınız`,true)
message.channel.send(embed)  
};

exports.conf = {
  command: "Yardım",
  description: "Komutlar hakkında yardım alırsınız.",
  aliases: ["yardım"]
}