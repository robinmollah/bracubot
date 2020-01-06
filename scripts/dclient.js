const Discord = require('discord.js');
const client = new Discord.Client();
const people = require('./people.json');
const Events = require('events');
const events = new Events();
const md5 = require('md5');

client.on('ready', () => {
    console.log('Connected to Discord.');

    const getChannel = target =>
        client.channels.array().filter(
        channel => channel instanceof Discord.TextChannel && channel.name.toLowerCase().indexOf(target.toLowerCase()) > -1
    )[0];

    const getMember = (target, channel) =>
        channel.members.filter(
            m =>
        (`${m.nickname} ${m.displayName}`).toLowerCase().indexOf(target.toLowerCase()) > -1).array()[0];

    const getSender = (channel, auth) =>{
        for(let member of channel.members.array()){
            console.log(member.displayName + " : " + md5(member.displayName + process.env.MD5_SALT) + " : " + auth);
            if(md5(member.displayName + process.env.MD5_SALT) == auth){
                return member;
            }
        }
        return null;
    };


    getChannel("random").members.map(m =>
        console.log("name: " + m.displayName + ", auth: " + md5(m.displayName + process.env.MD5_SALT))
    );
    events.emit('ready', getChannel, getMember, getSender);
});

client.login(process.env.DISCORD_CLIENT_ID).then(msg => {}).catch(e => console.log("Failed to login: " + e));

module.exports = events;

module.exports.discordClient = client;