const { Client, Collection } = require("discord.js");
const client = global.client = new Client({ fetchAllMembers: true });
const config = require("./config.json");
const mongoose = require("mongoose")
const fs = require("fs");


client.login(config.Bot.Token).then(c => console.log(`Discord API bağlantısı başarılı!`))
.catch(err => console.error(`Discord API bağlantısı başarısız!`));

mongoose.connect(config.MongoDB.URL,{useUnifiedTopology: true,useNewUrlParser: true});
mongoose.connection.on("connected", () => {console.log("MongoDB bağlantısı başarılı!")});
mongoose.connection.on("error", () => {console.error("MongoDB bağlantısı başarısız!")});

client.commands = new Collection();
client.aliases = new Collection();

fs.readdirSync("./Commands/Info").filter(file => file.endsWith(".js")).forEach(file => {
    let command = require(`./Commands/Info/${file}`);
    client.commands.set(command.conf.command, command);
    console.log(`[Komut INFO] ${file.replace(".js", "")}`);
    command.conf.aliases.forEach(aliases => {
    client.aliases.set(aliases, command)  
    });
});
fs.readdirSync("./Commands/Reg").filter(file => file.endsWith(".js")).forEach(file => {
    let command = require(`./Commands/Reg/${file}`);
    client.commands.set(command.conf.command, command);
    console.log(`[Komut REG] ${file.replace(".js", "")}`);
    command.conf.aliases.forEach(aliases => {
    client.aliases.set(aliases, command)  
    });
});

fs.readdirSync("./Events").filter(file => file.endsWith(".js")).forEach(file => {
    let event = require(`./Events/${file}`);
    client.on(event.conf.event, event.execute);
    console.log(`[Event] ${file.replace(".js", "")}`);
});

client.on("userUpdate", async (eski, yeni) => {
    var sunucu = client.guilds.cache.get(config.Sunucu.ID); 
    var uye = sunucu.members.cache.get(yeni.id);
    var tag = (config.Sunucu.Tag); 
    var tagrol = (config.Rol.Taglı); 
    let kanal = sunucu.channels.cache.get(config.Kanal.TagLog);
      
    if (!sunucu.members.cache.has(yeni.id) || yeni.bot || eski.username === yeni.username) return; 
    if ((yeni.username).includes(tag) && !uye.roles.cache.has(tagrol)) {
        try {
        await uye.roles.add(tagrol);
        await kanal.send(`<@${uye.id}> adlı kullanıcı tagımızı alarak ailemize katıldı!`);
        } catch (err) { console.error(err) };
    };
    if (!(yeni.username).includes(tag) && uye.roles.cache.has(tagrol)) {
        try {
        await uye.roles.remove(uye.roles.cache.filter(rol => rol.position >= sunucu.roles.cache.get(tagrol).position));
        await kanal.send(`<@${uye.id}> adlı kullanıcı tagımızı çıkararak ailemizden ayrıldı!`);
        } catch(err) { console.error(err) };
    };
    });