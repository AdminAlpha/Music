

const Discord = require('discord.js'),
    DisTube = require('distube'),
    client = new Discord.Client(),
    config = {
        prefix: "|",
        token: process.env.TOKEN || "ODUxMTcwODU1NTc2MDEwNzky.YL0YoQ.cE9SSTxQz-xGBDQtT2E9lnymco4"
    };
const talkedRecently = new Set();

const { Node } = require('lavalink');
const voice = new Node({
  // options here
  send(guildID, packet) {
    if (client.guilds.has(guildID)) return client.ws.send(packet);
    throw new Error('attempted to send a packet on the wrong shard');
  }
});

client.on('raw', pk => {
  if (pk.t === 'VOICE_STATE_UPDATE') voice.voiceStateUpdate(pk.d);
  if (pk.t === 'VOICE_SERVER_UPDATE') voice.voiceServerUpdate(pk.d);
});


// Create a new DisTube
const distube = new DisTube(client, { 
    youtubeCookie: "VISITOR_INFO1_LIVE=R1ByVhdSc_0; CONSENT=YES+TH.th+20180529-04-0; _gcl_au=1.1.395198796.1631470435; LOGIN_INFO=AFmmF2swRAIgRBoBroDLQ_-8IyaxU80CSqfZ9JVkJUW6BBKeAGe4o9ACIENYhCUQZ0vuthSosBqin0p4NQUQdQjOV8mXDLrvqOjw:QUQ3MjNmd2hhV3MybVljdWNTajNsY082cURrWll3azBsbnFHX2ItbWZTVW1uazBabVRrVW5TdUhQTlRqcnNlQzJvNmlyYm5yQlBPRHJ4TlpMdDUwbWxTQ2IxbjVzQ2VKSWNfR1ltOTY4NlVxVlFmZzEybUpLbzVPQjVUcS1PN1BaZC05NUZnbFpPd0h5ZDZkTlJVZHpQZWVZcDBmb3NEY2tn; HSID=Azfuoyxd7CTJ54N0J; SSID=A9z7KrXIYJtn1gMmV; APISID=YJTgN6D_Rq3ixkZM/AU1HzvsinnIYeBC0F; SAPISID=kR_kaOXhW3tmWtXa/A8ob4lEL4H3KPmfd5; __Secure-1PAPISID=kR_kaOXhW3tmWtXa/A8ob4lEL4H3KPmfd5; __Secure-3PAPISID=kR_kaOXhW3tmWtXa/A8ob4lEL4H3KPmfd5; SID=CAhsG96nJuzMtv1RE_T1Ko-R0-EKlrFG63p5W4qtriJ2C6mGUG85RL9XRBBTPQPuStIDmQ.; __Secure-1PSID=CAhsG96nJuzMtv1RE_T1Ko-R0-EKlrFG63p5W4qtriJ2C6mGx4OGSn90WdCYEj-jaip5Zg.; __Secure-3PSID=CAhsG96nJuzMtv1RE_T1Ko-R0-EKlrFG63p5W4qtriJ2C6mGGiw2vXJshPFYlxlbBZIdOQ.; PREF=volume=40&f6=81&tz=Asia.Bangkok&al=th&f5=20000&repeat=ONE; YSC=4hdYr76btf4; SIDCC=AJi4QfHXqfS5vs3JR0n7LkZh9acDci2GnXIAPY6KZb26EPAB5E7vwb00GN30JkEKQw9E1liUa5zo; __Secure-3PSIDCC=AJi4QfF1RMUawF3poxrG2kaImXXt5_J2gA8rgwlfLTOcC9mMHvqJ_9yPE4Ryw3ecD8G0mWM-63I",
    searchSongs: false, 
    emitNewSongOnly: false ,
    leaveOnEmpty: true, 
    leaveOnFinish: true, 
    leaveOnStop: true,
    customFilters:
    {
        "clear": "dynaudnorm=f=200",
        "bassboost": "bass=g=20,dynaudnorm=f=200",
        "8d": "apulsator=hz=0.08",
        "vaporwave": "aresample=48000,asetrate=48000*0.8",
        "nightcore": "aresample=48000,asetrate=48000*1.25",
        "phaser": "aphaser=in_gain=0.4",
        "purebass": "bass=g=20,dynaudnorm=f=200,asubboost",
        "tremolo": "tremolo",
        "vibrato": "vibrato=f=6.5",
        "reverse": "areverse",
        "treble": "treble=g=5",
        "surrounding": "surround",
        "pulsator": "apulsator=hz=1",
        "subboost": "asubboost",
        "karaoke": "stereotools=mlev=0.03",
        "flanger": "flanger",
        "gate": "agate",
        "haas": "haas",
        "mcompand": "mcompand"
    }
})

const filters = [
    "mcompand",
    "gate",
    "haas",
    "pulsator",
    "surrounding",
    "clear",
    "8d",
    "bassboost",
    "echo",
    "karaoke",
    "nightcore",
    "vaporwave",
    "flanger",
    "subboost",
    "phaser",
    "tremolo",
    "vibrato",
    "reverse",
    "purebass",
    "treble"
];






client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
client.user.setPresence({
    status: 'online',
    activity: {
        name: '!p',
        type: 'STREAMING',
        url: 'https://www.twitch.tv/monstercat'
    }
})
});

client.on("message", async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g)
    const command = args.shift().toLocaleLowerCase()
if (talkedRecently.has(message.author.id)) {
    message.channel.send("Cooldown 3 sec").then(message =>  {setTimeout(() => message.delete(), 3000)}).catch;
    message.delete();
    return;
  }
  talkedRecently.add(message.author.id);
  setTimeout(() => {
    talkedRecently.delete(message.author.id);
  }, 3000);

    let help = new Discord.MessageEmbed()
    .setTitle('Help Or InviteME')
    .setURL('https://discord.com/oauth2/authorize?client_id=880235570289315931&permissions=8&scope=bot')
    .setColor("RANDOM")
    .setImage('https://cdn.discordapp.com/attachments/864508240717283348/893103621825232896/3.png')
    .setTimestamp()
    .setFooter(`Request By ${message.author.tag}`)

    let filtter = new Discord.MessageEmbed()
    .setTitle('Filters Or InviteME')
    .setURL('https://discord.com/oauth2/authorize?client_id=880235570289315931&permissions=8&scope=bot')
    .setColor("RANDOM")
    .setImage('https://cdn.discordapp.com/attachments/864508240717283348/893095176254390344/2.png')
    .setTimestamp()
    .setFooter(`Request By ${message.author.tag}`)

    let noppp = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('❌ No Music. Pls !p <song>')
        .setFooter(`Request By ${message.author.tag}`)
    
    let nojo = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle('❌ You not join the Voice Channel  ')
    .setFooter(`Request By ${message.author.tag}`)

    





    if (command === 'help'){
        message.channel.send(help)
    }





    if (command === 'filter'){
        message.channel.send(filtter)
    } 




    if (command == "play" || command == "p"){
    
    if (!message.member.voice.channel) return message.channel.send(nojo).then(message => {setTimeout(() => message.delete(), 3000)}).catch;
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(nojo).then(message => { setTimeout(() => message.delete(), 3000)}).catch;    

    distube.play(message, args.join(" "));
        message.channel.send({ embed: {
            "title": `🎶 Play => ${args.join(" ")}`,
            "color": "RANDOM",
            "footer": {
            "text": `Request By ${message.author.tag}`
        },
        }})

    }





    if (["repeat", "loop"].includes(command)){
    if (!message.member.voice.channel) return message.channel.send(nojo).then(message => {setTimeout(() => message.delete(), 3000)}).catch;
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(nojo).then(message => { setTimeout(() => message.delete(), 3000)}).catch;    
    let queue = distube.getQueue(message);
    if (!queue || !queue.playing) return message.channel.send(noppp).then(message => { setTimeout(() => message.delete(), 3000)}).catch;

    let mode = distube.setRepeatMode(message, parseInt(args[0]));
    mode = mode ? mode == 2 ? "Quest" : "Song" : "❌";
    let lop = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle("🔁 Set repeat mode to | `" + mode + "`")
    .setTimestamp()
    .setFooter(`Request By ${message.author.tag}`)
    message.channel.send(lop)

       }

	if (command == "autoplay") {
    if (!message.member.voice.channel) return message.channel.send(nojo).then(message => {setTimeout(() => message.delete(), 3000)}).catch;
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(nojo).then(message => { setTimeout(() => message.delete(), 3000)}).catch;    
    let queue = distube.getQueue(message);
    if (!queue || !queue.playing) return message.channel.send(noppp).then(message => { setTimeout(() => message.delete(), 3000)}).catch;

         let mode = distube.toggleAutoplay(message);
         let ap = new Discord.MessageEmbed()
         .setColor('RANDOM')
         .setTitle("🤖 Set autoplay mode to |  `" + (mode ? "✅" : "❌") + "`")
         .setTimestamp()
    .setFooter(`Request By ${message.author.tag}`)
         message.channel.send(ap)
        }



    if (command == "stop") {
    if (!message.member.voice.channel) return message.channel.send(nojo).then(message => {setTimeout(() => message.delete(), 3000)}).catch;
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(nojo).then(message => { setTimeout(() => message.delete(), 3000)}).catch;    
    let queue = distube.getQueue(message);
    if (!queue || !queue.playing) return message.channel.send(noppp).then(message => { setTimeout(() => message.delete(), 3000)}).catch;

        distube.stop(message);
        let sop = new Discord.MessageEmbed()
         .setColor('RANDOM')
         .setTitle("🛑Stopped the music!🛑")
         .setTimestamp()
    .setFooter(`Request By ${message.author.tag}`)
        message.channel.send(sop);
    }


	if (command == "volume"|| command == "v"){
    if (!message.member.voice.channel) return message.channel.send(nojo).then(message => {setTimeout(() => message.delete(), 3000)}).catch;
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(nojo).then(message => { setTimeout(() => message.delete(), 3000)}).catch;    
    let queue = distube.getQueue(message);
    if (!queue || !queue.playing) return message.channel.send(noppp).then(message => { setTimeout(() => message.delete(), 3000)}).catch;

	let vl = args[0]
    distube.setVolume(message, vl);
    let vol = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle(`🔊 Volume Set To  \`${vl}\``)
        .setTimestamp()
        .setFooter(`Request By ${message.author.tag}`)
	message.channel.send(vol)
}



    if (command == "skip" || command == "s"){
    if (!message.member.voice.channel) return message.channel.send(nojo).then(message => {setTimeout(() => message.delete(), 3000)}).catch;
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(nojo).then(message => { setTimeout(() => message.delete(), 3000)}).catch;    
    let queue = distube.getQueue(message);
    if (!queue || !queue.playing) return message.channel.send(noppp).then(message => { setTimeout(() => message.delete(), 3000)}).catch;
   
    distube.skip(message);
    let sk = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('⏩ Music Skip!')
        .setTimestamp()
        .setFooter(`Request By ${message.author.tag}`)
	message.channel.send(sk)
}



    if (command == "queue" || command == "q") {
    if (!message.member.voice.channel) return message.channel.send(nojo).then(message => {setTimeout(() => message.delete(), 3000)}).catch;
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(nojo).then(message => { setTimeout(() => message.delete(), 3000)}).catch;    
    let queue = distube.getQueue(message);
    if (!queue || !queue.playing) return message.channel.send(noppp).then(message => { setTimeout(() => message.delete(), 3000)}).catch;

    let qu = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('📜 Queue')
        .setDescription(queue.songs.map((song, id) => `**[>] ${id + 1}**. ${song.name} - \`${song.formattedDuration}\``).slice(0, 30).join("\n"))
        .setTimestamp()
        .setFooter(`Request By ${message.author.tag}`)
    message.channel.send(qu);
    }




    if (command == "nowplaying" || command == "np") {
    if (!message.member.voice.channel) return message.channel.send(nojo).then(message => {setTimeout(() => message.delete(), 3000)}).catch;
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(nojo).then(message => { setTimeout(() => message.delete(), 3000)}).catch;    
    let queue = distube.getQueue(message);
    if (!queue || !queue.playing) return message.channel.send(noppp).then(message => { setTimeout(() => message.delete(), 3000)}).catch;

    let ytdl = require('ytdl-core');  
    let qui = queue.songs.map((song, id) => song.url)
    let idv = ytdl.getURLVideoID(qui)

    let nop = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('⭕ Nowplaying')
        .setDescription(queue.songs.map((song, id) => `\`${song.name}\`\n\n🧮 Volume: \`${queue.volume}%\`  |  Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "❌"}\` |  Autoplay: \`${queue.autoplay ? "✅" : "❌"}\`\n \n👻 Requested by:  ${song.user} `).slice(0, 1).join("\n"))
        .setTimestamp()
        .setThumbnail(`https://i.ytimg.com/vi/${idv}/default.jpg`)
        .setFooter(`Request By ${message.author.tag}`)
    message.channel.send(nop)
    
}



    if (filters.includes(command)) {
    if (!message.member.voice.channel) return message.channel.send(nojo).then(message => {setTimeout(() => message.delete(), 3000)}).catch;
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(nojo).then(message => { setTimeout(() => message.delete(), 3000)}).catch;    
    let queue = distube.getQueue(message);
    if (!queue || !queue.playing) return message.channel.send(noppp).then(message => { setTimeout(() => message.delete(), 3000)}).catch;

    let filter = await distube.setFilter(message, command);
    let fil = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle("Adding filter!", `\`${filter}\``)
        .setTimestamp()
        .setFooter(`Request By ${message.author.tag}`)
    await message.channel.send(fil).then(message => { setTimeout(() => message.delete(), 3000)}).catch;
   
        return
    }

    if(command === 'songinfo' || command === 'si') {
    if (!message.member.voice.channel) return message.channel.send(nojo).then(message => {setTimeout(() => message.delete(), 3000)}).catch;
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(nojo).then(message => { setTimeout(() => message.delete(), 3000)}).catch;    
    let queue = distube.getQueue(message);
    if (!queue || !queue.playing) return message.channel.send(noppp).then(message => { setTimeout(() => message.delete(), 3000)}).catch;


    let like = queue.songs.map((song,id) => song.likes)
    let sname = queue.songs.map((song,id) => song.name)
    let dlike = queue.songs.map((song,id) => song.dislikes)
    let viee = queue.songs.map((song,id) => song.views)
    let yii = queue.songs.map((song,id) => song.formattedDuration)
    let tum = queue.songs.map((song,id) => song.isLive)

    let ytdl = require('ytdl-core');  
    let qui = queue.songs.map((song, id) => song.url)
    let idv = ytdl.getURLVideoID(qui)


    let sinno = new Discord.MessageEmbed()
        .setColor('RANDOM') 
        .setTitle(`${sname}`)
        .setURL(`${qui}`)
        .addFields({
                    name: '👍🏽 Likes',
                    value: like,
                    inline: true
        }, {
                    name: '👀 Views',
                    value: viee,
                    inline: true
        }, {
                    name: '👎🏽 Dislike',
                    value: dlike,
                    inline: true
        })
        .addFields({
                    name: '⌚ Time',
                    value: yii,
                    inline: true
        }, {
                    name: '🔴 Live',
                    value: tum,
                    inline: true
        })
       
    .setThumbnail(`https://i.ytimg.com/vi/${idv}/default.jpg`)
    .setFooter(`Request By ${message.author.tag}`)
    message.channel.send(sinno)
    }

    if(command === 'support'){

    let suppo = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle('Support To CJ🎶')
    .addField('**__[1]__**. aa.kxpnn#8905 🤴🏽', '**__[>]__** Support: Youtube Premium Cookie 🍪')
    .setTimestamp()
    .setFooter(`Request By ${message.author.tag}`)
    message.channel.send(suppo)
    }

   
});



      
     client.on('message', message => {

        const args = message.content.slice(config.prefix).trim().split(/ +/);
      
          switch (args[0]) {
            case `${config.prefix}rp` :
                
              rndmessage(message);
      
              function rndmessage(message) {
                var messages = [
    	   'https://www.youtube.com/watch?v=jsHfz2RDi_g',
           'https://www.youtube.com/watch?v=Q2pDJKSaKAg',
           'https://www.youtube.com/watch?v=-TXtyYZIiWc',
           'https://www.youtube.com/watch?v=NQAYb9ok4s0',
           'https://www.youtube.com/watch?v=p-eS-_olx9M',
           'https://www.youtube.com/watch?v=py9uf5DZo0o',
           'https://www.youtube.com/watch?v=Q7HpfFtQceo',
           'https://www.youtube.com/watch?v=0QU3TXS8FjA',
           'https://www.youtube.com/watch?v=dEpVWAqxdYU',
           'https://www.youtube.com/watch?v=OUFuaMj6z-w',
           'https://www.youtube.com/watch?v=OcDrPB5Qa8E',
           'https://www.youtube.com/watch?v=qOfBv91pCjs',
           'https://www.youtube.com/watch?v=p-eS-_olx9M',
           'https://www.youtube.com/watch?v=C8n-VATRG6M',
           'https://www.youtube.com/watch?v=6xPHEUYCylo',
           'https://www.youtube.com/watch?v=o3EX5wsxexA',
           'https://www.youtube.com/watch?v=vfH6a9TuT7M',
           'https://www.youtube.com/watch?v=LggKtEs6ug0',
           'https://www.youtube.com/watch?v=VNdHd1asf9s',
           'https://www.youtube.com/watch?v=Whu6oBYdYvk',
           'https://www.youtube.com/watch?v=glGyTxTp21I',
           'https://www.youtube.com/watch?v=Tkc9RcJtuDU',
           'https://www.youtube.com/watch?v=yeLzT0M21Kk',
           'https://www.youtube.com/watch?v=UZxDLz-li_c',
           'https://www.youtube.com/watch?v=cKoLVNbJCWU',
           'https://www.youtube.com/watch?v=A7ry4cx6HfY',
           'https://www.youtube.com/watch?v=rJS4YuS22Og',
           'https://www.youtube.com/watch?v=HShOMLxQ1Ww',
           'https://www.youtube.com/watch?v=xztbgIbyvsU',
           'https://www.youtube.com/watch?v=CVgPJkbPCqU',
           'https://www.youtube.com/watch?v=cPkE0IbDVs4',
           'https://www.youtube.com/watch?v=-Fyyzhx9uuk',
           'https://www.youtube.com/watch?v=fMtN60SliAs',
           'https://www.youtube.com/watch?v=txdFZexjY1g',
           'https://www.youtube.com/watch?v=DvQ7quafiYY',
           'https://www.youtube.com/watch?v=EKFeH3DTBrY',
           'https://www.youtube.com/watch?v=WXGfU6okltk',
           'https://www.youtube.com/watch?v=HZV-ggoTQ7s',
           'https://www.youtube.com/watch?v=HjsnVY4VONA',
           'https://www.youtube.com/watch?v=c62QP_4V6g4',
           'https://www.youtube.com/watch?v=tdd0k3Hn1pI',
           'https://www.youtube.com/watch?v=RG4abMnBGvg',
           'https://www.youtube.com/watch?v=iP8Lqctrs-E',
           'https://www.youtube.com/watch?v=2x5JCbo3RoE',
           'https://www.youtube.com/watch?v=ZPyxsR9CqUw',
           'https://www.youtube.com/watch?v=O0fnkpnWcxM',
           'https://www.youtube.com/watch?v=qz7tCZE_3wA',
           'https://www.youtube.com/watch?v=-S5O55aTDaY',
           'https://www.youtube.com/watch?v=Nu1oG8yHYxU',
           'https://www.youtube.com/watch?v=IH2Wndn-UCw',
           'https://www.youtube.com/watch?v=K3MRsPVRoA4',
           'https://www.youtube.com/watch?v=3JlATO3oLzA',
           'https://www.youtube.com/watch?v=FYTVZQbB9Es',
           'https://www.youtube.com/watch?v=iRCb_PodGfQ',
           'https://www.youtube.com/watch?v=dKM01WkInaM',
           'https://www.youtube.com/watch?v=V_jHc_n0p9c',
           'https://www.youtube.com/watch?v=k2a27gnrgr4',
           'https://www.youtube.com/watch?v=_mNDYTmTYWY',
           'https://www.youtube.com/watch?v=mMKwM_FYBOo',
           'https://www.youtube.com/watch?v=o3EX5wsxexA',
           'https://www.youtube.com/watch?v=q21CZRd-_s0',
           'https://www.youtube.com/watch?v=auL-tlu_09Y',
           'https://www.youtube.com/watch?v=zwwk-vWmV9U',
           'https://www.youtube.com/watch?v=SXy-v1KbF4k',
           'https://www.youtube.com/watch?v=VEWrvDW3Z8w',
           'https://www.youtube.com/watch?v=Wpob4lOqWJs',
           'https://www.youtube.com/watch?v=B_6y5w7oHCs',
           'https://www.youtube.com/watch?v=Ic_7IUsM9QE',
           'https://www.youtube.com/watch?v=swlbw8N1Bwk',
           'https://www.youtube.com/watch?v=EFkFq6TdNPs',
           'https://www.youtube.com/watch?v=vjZWJcQ27n0',
           'https://www.youtube.com/watch?v=rvAL1pdRLkI',
           'https://www.youtube.com/watch?v=RN81LkdO6O0',
           'https://www.youtube.com/watch?v=ICI3eKRzr6M',
           'https://www.youtube.com/watch?v=DT_JwP5P6n4',
           'https://www.youtube.com/watch?v=bZNo-6Z6ODE',
           'https://www.youtube.com/watch?v=Xq4afhe5o3o',
           'https://www.youtube.com/watch?v=BcUg0XKT3sI',
           'https://www.youtube.com/watch?v=os6C-pAEvfs',
           'https://www.youtube.com/watch?v=psHKqyUh0EY',
           'https://www.youtube.com/watch?v=v4sdDD1ddvo',
           'https://www.youtube.com/watch?v=xxHAADKqG1A',
           'https://www.youtube.com/watch?v=N7Oc3tOjLAA',
           'https://www.youtube.com/watch?v=_8p-y4nCkiU',
           'https://www.youtube.com/watch?v=JrU15mDzVx0',
           'https://www.youtube.com/watch?v=ePdyoX_B-nE',
           'https://www.youtube.com/watch?v=gGfWpLhjCWo',
           'https://www.youtube.com/watch?v=MLKOTCZBbAg',
           'https://www.youtube.com/watch?v=ZvrysfBDzSs',
           'https://www.youtube.com/watch?v=PNSsaoEG2H8',
           'https://www.youtube.com/watch?v=adLGHcj_fmA',
           'https://www.youtube.com/watch?v=CmOARvQO_us',
           'https://www.youtube.com/watch?v=Letk-EylsKM',
           'https://www.youtube.com/watch?v=tm2N4gntigI',
           'https://www.youtube.com/watch?v=eeUyV6Ou8HM',
           'https://www.youtube.com/watch?v=_xtmNARm_wI',
           'https://www.youtube.com/watch?v=n7XNd1zvH_8',
           'https://www.youtube.com/watch?v=RMWRKPNCfJU',
           'https://www.youtube.com/watch?v=7QexQtuM4Jk',
           'https://www.youtube.com/watch?v=uZ8JdsWLDDk',
           'https://www.youtube.com/watch?v=RtAuX0sncZw',
           'https://www.youtube.com/watch?v=FemL1-I3s6w',
           'https://www.youtube.com/watch?v=CMbYwYYFI3Y',
           'https://www.youtube.com/watch?v=UTHLKHL_whs',
           'https://www.youtube.com/watch?v=ahkGRFhyxx4',
           'https://www.youtube.com/watch?v=E8CYKlx3vZ0',
           'https://www.youtube.com/watch?v=JT0gK89SpK4',
           'https://www.youtube.com/watch?v=qNMt6HLMBU8',
           'https://www.youtube.com/watch?v=FUe2_s88P_8',
           'https://www.youtube.com/watch?v=KQwL7ATXIhY',
           'https://www.youtube.com/watch?v=mDd9qGBqY00',
           'https://www.youtube.com/watch?v=2A2bghaygv4',
           'https://www.youtube.com/watch?v=bXcSLI58-h8',
           'https://www.youtube.com/watch?v=q1w2qM0K9TE',
           'https://www.youtube.com/watch?v=M0p7OlWDVPg',
           'https://www.youtube.com/watch?v=aZRB-QWyBUA',
           'https://www.youtube.com/watch?v=mjylSi486E4',
           'https://www.youtube.com/watch?v=6swmTBVI83k',
           'https://www.youtube.com/watch?v=ZwcmNkzm7m0',
           'https://www.youtube.com/watch?v=POMHDe6EJjo',
           'https://www.youtube.com/watch?v=T3ueqEZmSjk',
           'https://www.youtube.com/watch?v=t-810UYwFzU',
           'https://www.youtube.com/watch?v=r7qovpFAGrQ',
           'https://www.youtube.com/watch?v=M7ovvi6UdcI',
           'https://www.youtube.com/watch?v=wf1N1muHxD0',
           'https://www.youtube.com/watch?v=PWLfYp3TcuI',
           'https://www.youtube.com/watch?v=mJklazD2hqU',
           'https://www.youtube.com/watch?v=WsUlfw3mOyQ',
           'https://www.youtube.com/watch?v=XkhNbsz5rDo',
           'https://www.youtube.com/watch?v=5K1moxGyhbk',
           'https://www.youtube.com/watch?v=zp_G_3rofM0'
          ];
               
    var rnd = Math.floor(Math.random() * messages.length);
    
    let dojo = new Discord.MessageEmbed()
    .setColor('RANDOM')
    .setTitle('❌ You not join the Voice Channel  ')
    .setFooter(`Request By ${message.author.tag}`)


    if (!message.member.voice.channel) return message.channel.send(dojo).then(message => {setTimeout(() => message.delete(), 3000)}).catch;
    if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.send(dojo).then(message => { setTimeout(() => message.delete(), 3000)}).catch;    
   
    distube.play(message, messages[rnd]);
            
    let rap = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setTitle('Play Random Music')
        .setTimestamp()
        .setFooter(`Request By ${message.author.tag}`)
    message.channel.send(rap)

    console.log(messages[rnd])
            }
          break;
        }
      })


const status = (queue) => `🧮 Volume: \`${queue.volume}%\`  |  Loop: \`${queue.repeatMode ? queue.repeatMode == 2 ? "All Queue" : "This Song" : "❌"}\` |  Autoplay: \`${queue.autoplay ? "✅" : "❌"}\``

// DisTube event listeners, more in the documentation page
distube
    .on("initQueue", queue => { queue.autoplay = false; queue.volume = 100;})
    
    .on("addSong", (message, queue, song) => message.channel.send({ embed: {
        "thumbnail": song.thumbnail,
        "color": "RANDOM",
        "title": `➕ ${song.name} ${song.formattedDuration}`,
        "footer": {
            "text": `Request By ${message.author.tag}`
        },
    }}))

    
    .on("playList", (message, queue, playlist, song) => message.channel.send({ embed: {
        "title": "PlayList",
        "color": "RANDOM",
        "description":`🎶 \`${playlist.name}\` playlist (${playlist.songs.length} songs).\n⭕ Now playing \`${song.name}\` - \`${song.formattedDuration}\`\n${status(queue)}\n \n👻 Requested by:  ${song.user}`,
        "footer": {
            "text": `Request By ${message.author.tag}`
        },
    }}
    ))
    
    .on("addList", (message, queue, playlist, song) => {
        try{    return embedbuilder(client, message, "#fffff0", "Added a Playling!", `Playlist: [\`${playlist.name}\`](${playlist.url})  -  \`${playlist.songs.length} songs\` \n\nRequested by: ${song.user}`, playlist.thumbnail)
    }catch (error){
        console.error
     }
    })
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0;
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`);
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", (message) => message.channel.send(`Searching canceled`))
    
    .on("error", (message, err) => {
        try {
            message.react("❌")
        } catch (error) {
            console.error(error)    
        }
       console.log(err);
        try{   
    }catch (error){
        console.error
     }
    })
    .on("finish", message => {
        try{ message.channel.send({ embed: {
            "title": "Music Just Finish",
            "color": "RANDOM",
            "description": "I will leave the channel",
        "footer": {
            "text": `Request By ${message.author.tag}`
        },
        }})
    }catch (error){
        console.error
     }
    })
    .on("empty", message => {

        try{  
    }catch (error){
        console.error
     }
    })
    .on("noRelated", message => {
        try{   
    }catch (error){
        console.error
     }
    })
    
    


client.login(config.token);