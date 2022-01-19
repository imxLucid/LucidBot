const vrchat = require("vrchat");
const config = require("../config.js");

const login = config.vrchatLogin;
const configuration = new vrchat.Configuration({ login });
const AuthenticationApi = new vrchat.AuthenticationApi(configuration);

exports.run = async (client, message, args, level) => {

    //const AvatarsApi = new vrchat.AvatarsApi(login);
    //const SystemApi = new vrchat.SystemApi(login);
    //const UsersApi = new vrchat.UsersApi(login);
    //const WorldsApi = new vrchat.WorldsApi(login);

    console.log(`Using Login Info:\n${login}`);
    console.log(`Passing Login Configuration:\n${configuration}`);

    AuthenticationApi.getCurrentUser()
        .then(resp => {
            console.log(resp.data.list);
            const currentUser = resp.data;
            message.reply({ content: `Logged in as: ${currentUser.displayName}` });
        })
        .catch(error => {
            const err = error.response;
            if (error.response) {
                message.reply({ content: `${err.status} ${err.statusText} - ${err.data.error.message}`});
            }
            else if (error.reqeust) {
                message.reply({ content: `Request timed out!` });
            }
            else { message.reply({ content: `An unexpected error occured during authentication!` });}
        }
    );

};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ["login"],
    permLevel: "Bot Support"
};

exports.help = {
    name: "vrc-login",
    category: "VRChat",
    description: "VRChat API Login",
    usage: "vrc-login"
};