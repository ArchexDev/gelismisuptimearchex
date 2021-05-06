const moment = require("moment");
moment.locale("tr");
require("moment-duration-format");
const db = require("quick.dba");
const Discord = require("discord.js");
const dbl = require("dblapi.js");
const client = new Discord.Client({ disableEveryone: true });
client.login(process.env.token);
const fetch = require("node-fetch");
const fs = require("fs");

require("express")().listen(1343);

const express = require("express");
const app = express(); ////Erdem Çakıroğlu
const http = require("http");
app.get("/", (request, response) => {
  console.log("Pinglenmedi.");
  response.sendStatus(200);
}); ////Erdem Çakıroğlu

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

client.on("ready", () => {
  console.log(`[BOT]: ${client.user.tag} ismiyle bağlandım!`);
  client.user.setPresence({
    activity: {
      name: `Archéx <3`,
           url: "https://www.twitch.tv/archexkaan",
      type: "idle"
    },
    status: "idle"
  });
});

setInterval(() => {
  var links = db.get("linkler");
  if (!links) return;
  var linkA = links.map(c => c.url);
  linkA.forEach(link => {
    try {
      fetch(link);
    } catch (e) {
      console.log("" + e);
    }
  });
  console.log("Pinglendi.");
}, 60000);

client.on("ready", () => {
 if (!Array.isArray(db.get("linkler"))) {
    db.set("linkler", []);
  }
});


   client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!link-add") {
    const DBL = require("dblapi.js")
      const dbl = new DBL(process.env.dbltoken, client);
 dbl.hasVoted(message.author.id).then(oyvermedi => {
  if (!oyvermedi) { message.channel.send(new Discord.MessageEmbed().setColor("RED").setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setThumbnail(message.author.displayAvatarURL({dynamic:true})).setDescription(`<:red:822398531725164564> Bu komutu kullanmadan önce [oy vermen](https://top.gg/bot/797803769801736192/vote) gerek. Oy verdikten sonra 3-5 dakika bekle ve tekrar dene!`).setFooter(
      `© ${client.user.username} 2021-2022`,
      client.user.displayAvatarURL({ dynamic: true })
    )); 
   } else {
    var link = spl[1];
    fetch(link)
      .then(() => {
        if (
          db
            .get("linkler")
            .map(Revenge => Revenge.url)
            .includes(link)
        )
          
          return message.channel.send(
            new Discord.MessageEmbed()
              .setFooter(
                `© ${client.user.username} 2021-2022`,
                client.user.displayAvatarURL({ dynamic: true })
              )
          
              .setColor("#660099")
              .setDescription(
                "**<a:emoji_44:810056691382747197> Projeniz sistemimizde zaten bulunuyor eğer şüpheniz varsa [sahibim](https://discord.com/channels/@me/770202714758971413)e ulaşabilirsin.**"
              )
          );
    
        message.channel.send(
          new Discord.MessageEmbed()
            .setFooter(
              `© ${client.user.username} 2021-2022`,
              client.user.displayAvatarURL({ dynamic: true })
            )
            .setColor("#660099")
            .setTitle("Projeniz Sistemimize Başarıyla Eklendi")
            .setTitle("**Lütfen Okumadan Geçme Ağlar :D**")
            .setDescription(
              "**<:emoji_7:808237433912950805> Projeniz sisteme eklendi, eklediğin link sayısına bakmak için `!show` yaz.** Ayrıca sistemimizi kullandığın için teşekkürler, unutma eğer botun normalde hatalıysa veya aktif olmuyorsa sisteme eklesen bile aktif olmaz"
            )
            .setImage(
              "https://cdn.discordapp.com/attachments/800381147376386059/800988506821230622/standard_3.gif"
            )
        );
        db.push("linkler", { url: link, owner: message.author.id });
        db.push(`Projesis_${message.author.id}`, link);
      })
      .catch(e => {
        return message.channel.send(
          new Discord.MessageEmbed()
            .setFooter(
              `© ${client.user.username} 2021-2022`,
              client.user.displayAvatarURL({ dynamic: true })
            )
            .setColor("#660099")
            .setDescription(
              "**<:BugHunter:788489065900277830> Lütfen mutlak bir URL giriniz.**"
            )
            .setImage(
              "https://cdn.discordapp.com/attachments/808696295094878208/810543929262342154/unknown.png"
           )
          
        );
      });
  }})};
});

  

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!show") {
    var link = spl[1];
    message.channel.send(
      new Discord.MessageEmbed()
        .setFooter(
          `© ${client.user.username} 2021-2022`,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setColor("#660099")
        .setDescription(
          ` <a:yldz:800373667228811294> **${
            db.get("linkler").length
           || 0}** tane proje anlık olarak aktif tutuluyor!`
        )
    );
  }
});



client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!yardım") {
    var link = spl[1];
    const help = new Discord.MessageEmbed()
      .setFooter(
        `© ${client.user.username} 2021-2022`,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setColor("#660099")
      .setThumbnail(
        "https://cdn.discordapp.com/icons/736517069876494398/a_effe1e6002647f245db0a74589ddbbfd.gif"
      )
      .setDescription(
        `**<a:B_Seviye:788489359883894784> Selamlar, botunu uptime etmek için yapman gereken adımları sana söyleyeceğim.** \n\n  **<a:blueate:801014403905617940>  Artık kolay bir şekilde botunu 7/24 aktif edebilirsin! **\n\n **<a:yldz:800373667228811294> \`!link-add\` yazıp botunu uptime edebilirsin.** \n\n  **<:Tatli:788489005775323166> \`!show\` yazarak toplam uptime sayısını görebilirsin.** \n\n  **<a:alertred:801014497540177930> Eğer botunu uptimeden kaldırmak istiyorsan kurucumuza ulaşabilirsin. **\n\n  ** <a:emoji_18:808237782089728041>  \`!invite\` yazarak botu sunucuna davet edebilirsin. **\n\n ** <:emoji_30:810054036534329344> \`!erişim-kontrol\` yazarak bota erişiminizin olup olmadığını kontrol edebilirsin.** **\n\n <:emoji_1:808237255860420678> \`!stats\` yazarak bot istatistiklerini öğrenebilirsin.** **\n\n <a:B_Dikkat:788488894068686908> \`!youtube\` yazarak sahiplermin YouTube kanallarına erişebilirsin.** **\n\n<:emoji_8:808237461733376040> \`!linkler\` yazarak __yeni eklenen__ linklerinizi görüntüleyebilirsiniz.** \n\n **<:cute_pepe:811846054840369172> \`!status\` Yazarak Hangi Tür Linkleri Ekleyebildiğini Ve Aktifliğini Görüntülüyebilirsiniz !**`
      )
      .setImage(
        "https://cdn.discordapp.com/attachments/815255024006332438/822195535427403827/cf42a37b168e166528a6072b105e8338.gif"
      );
    message.channel.send(help);
  }
});   
   
client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" "); // lan napıyosun it melih
  if (spl[0] == "!invite") {
    var link = spl[1];
    message.channel.send(
      new Discord.MessageEmbed()
        .setFooter(
          `© ${client.user.username} 2021-2022`,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setColor("#11657d")
        .setDescription(
          `» Botu eklemek için **[Tıkla!](https://discord.com/api/oauth2/authorize?client_id=797806715201912853&permissions=8&scope=bot)**`
        )
    );
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!stats") {
    let asdiscord = new Discord.MessageEmbed()
      .setAuthor(`» ${client.user.username} | İstatistik Komutu`)
      .setTitle(`Discord Sunucumuz`)
      .setURL(`https://discord.gg/JEaeASeRrr`)
      .addField(
        `» Çalışma Süresi:`,
        `${moment
          .duration(client.uptime)
          .format("D [gün], H [saat], m [dakika], s [saniye]")}`
      )
      .addField(`»<a:tik:829313072618799104>  Ping:`, `${client.ws.ping} ms`, true)
      .addField(`» <a:tik:829313072618799104> Sunucular:`, `${client.guilds.cache.array().length}`, true)
      .addField(
        `» <a:tik:829313072618799104> Kullanıcılar:`,
        `${client.guilds.cache
          .reduce((a, b) => a + b.memberCount, 0)
          .toLocaleString()}`,
        true
      )
      .addField(`» Kanallar:`, `${client.channels.cache.array().length}`, true)
      .addField(
        `» <a:tik:829313072618799104> Sahiplerim`,
        `<@696407272145813505> , <@760421959556792320>`,
        true
      )
      .addField(
        `» <a:tik:829313072618799104> Ghost Bot`,
        `[Tıkla!](https://discord.com/oauth2/authorize?client_id=797803769801736192&scope=bot&permissions=0)`,
        true
      )

      .setFooter(
        `© ${client.user.username} 2021-2022`,
        client.user.displayAvatarURL({ dynamic: true })
      )
      .setColor("#11657d");
    message.channel.send(asdiscord);
  }
});

client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!erişim-kontrol") {
    var link = spl[1];
    message.channel.send(
      new Discord.MessageEmbed()
        .setFooter(
          `© ${client.user.username} 2021-2022`,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setColor("#11657d")
        .setDescription(
          `**» <a:emoji_36:810054393017008128>  Bota erişiminiz aktif! Botumuzda Database Bulunmamaktadır Herhangi Bir Çalınma Durumu Olmaz Botlarınızı Güvenle Uptime Edebilirsiniz !**`
        )
    );
  }
});
client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!youtube") {
    var link = spl[1];
    message.channel.send(
      new Discord.MessageEmbed()
        .setFooter(
          `© ${client.user.username} 2021-2022`,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setColor("#11657d")
        .setDescription(`**» <a:emoji_36:810054393017008128> Sahiplerimin kanalına abone olursan destek sunucumda benim altyapıma sahip olabilirsin.** 
        **» <a:emoji_36:810054393017008128> Sahibim Kaan'ın kanalı için [Tıkla!](https://www.youtube.com/channel/UC9HFT7vVnIgf_w9kr41OIuA)**
        **» <a:emoji_36:810054393017008128> Sahibim Melih'in kanalı için [Tıkla!](https://m.youtube.com/channel/UCxg9MaK4kCIlhf9AJIHiEzQ)**`)
    );
  }
});
client.on("message", async message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!linkler") {
        const DBL = require("dblapi.js")
      const dbl = new DBL(process.env.dbltoken, client);
 dbl.hasVoted(message.author.id).then(oyvermedi => {
  if (!oyvermedi) { message.channel.send(new Discord.MessageEmbed().setColor("RED").setAuthor(message.author.username, message.author.displayAvatarURL({dynamic:true})).setThumbnail(message.author.displayAvatarURL({dynamic:true})).setDescription(`<:red:822398531725164564> Bu komutu kullanmadan önce [oy vermen](https://top.gg/bot/797803769801736192/vote) gerek. Oy verdikten sonra 3-5 dakika bekle ve tekrar dene!`).setFooter(
      `© ${client.user.username} 2021-2022`,
      client.user.displayAvatarURL({ dynamic: true })
    )); 
   } else {
    const Linkler = db.fetch(`Projesis_${message.author.id}`);
    if (
      !db
        .get("linkler")
        .map(Revenge => Revenge.owner)
        .includes(message.author.id)
    )
      return message.channel.send(
        new Discord.MessageEmbed()
          .setColor("#20aaba")
          .setDescription(
            `**» Hiç link eklememişsin, link eklemek için \`!link-add\` yazman yeterli.**`
          )
          .setFooter(
            `© ${client.user.username} 2021-2022`,
            client.user.displayAvatarURL({ dynamic: true })
          )
      );
    message.channel.send(
      new Discord.MessageEmbed()
        .setColor("#20aaba")
        .setDescription(
          `**» Uptime etmekte olduğun linkler direkt mesajlarına gönderildi, direkt mesajlarını kontrol et.**`
        )
        .setFooter(
          `© ${client.user.username} 2021-2022`,
          client.user.displayAvatarURL({ dynamic: true })
        )
    );
    message.author.send(
      new Discord.MessageEmbed()
        .setColor("#20aaba")
        .setDescription(`**» Normal Linklerin:** \n` + Linkler.join("\n") + ``) // linkelri olmıcak linkler olcak
        .setFooter(
          `© ${client.user.username} 2021-2022`,
          client.user.displayAvatarURL({ dynamic: true })
        )
    );
  }})};
});
client.on("message", message => {
  if (message.author.bot) return;
  var spl = message.content.split(" ");
  if (spl[0] == "!status") {
    var link = spl[1];
    message.channel.send(
      new Discord.MessageEmbed()
        .setFooter(
          `© ${client.user.username} 2021-2022`,
          client.user.displayAvatarURL({ dynamic: true })
        )
        .setColor("#11657d")
        .setDescription(
          `** Archex Uptime Links Status \n\n<:emoji_8:808237461733376040>  İstatistiklerimi Görüntülemek İçin;**  \n\`\`\`!stats\`\`\`\n**<:onn:813380798040244225>  » On | Glitch Links Uptime\n<:off:813380829921148989>  » Off | Bdfd Links Uptime\n<:off:813380829921148989>  » Off | Goormide Links Uptime\n<:onn:813380798040244225>  » On | Uptime Database Actived\n<:onn:813380798040244225>  » On | Pre Database Actived\n<:onn:813380798040244225>  » On | Vds Actived\n<:off:813380829921148989>  » Off | Ghost Uptime AI Not Actived\n<:onn:813380798040244225>  » On | In a System Off State**`
        )
        .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
        .setImage(
          "https://cdn.discordapp.com/attachments/800381147376386059/800988506821230622/standard_3.gif"
        )
    );
  }
});

