// write telegram bot using telegraph
const { Telegraf, Markup, Scenes, session } = require('telegraf');
const {createNavigation} = require('./createNavigation.js');
const {authScene} = require("./scenes/authScene");
const {makeKeyboard} = require("./helpers/MakeInlineKeyboard");


const express = require('express');
const bodyParser = require('body-parser');
const token = '6047089461:AAFLLPE_DHV8XuKP0FRaOhFj15u_QzWTvxc'
const bot = new Telegraf(token);

const stage = new Scenes.Stage([authScene]);
bot.use(session())
bot.use(stage.middleware());

bot.telegram.setWebhook(`https://mesto-bot-c5a62508e033.herokuapp.com/bot${token}`);
const port = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.json());
app.use(bot.webhookCallback(`/bot${token}`));

app.post(`/bot${token}`, (req, res) => {
    res.sendStatus(200);
});
bot.start(async (ctx) => {
    await ctx.reply('Привет! Для начала работы с ботом нужно авторизоваться', makeKeyboard(['Авторизоваться'], 1,'auth'));
});
bot.action(/auth(.+)/, async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.scene.enter('authScene');
})
// createNavigation()
bot.on('text', (ctx) => {
    if(ctx.message.text === '/start') return
    if(ctx.message.text === `💬 Чаты`) {
        ctx.replyWithHTML(createNavigation())
    }
    if(ctx.message.text === `📅 События`){
        ctx.replyWithHTML(`Добавьте себе <a href="https://calendar.google.com/calendar/b/1?cid=Mmk4MDJ0azNpbjdyNG0xZXA0amQ1OWoydG9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ">гугл-календарь</a> с онлайн и офлайн событиями Mesto`)
    }
    if( ctx.message.text === `👥 Люди` || ctx.message.text === `⚙️ Личный кабинет` || ctx.message.text === `❓ FAQ` || ctx.message.text === `🏄 Лента`) {
        ctx.reply('Пока не готово, но скоро будет!')
    }
    // console.log(ctx.message.from.id);
    // const userId = ctx.message.from.id;
    // bot.telegram.sendMessage(userId, `${ctx.message.text} from ${ctx.message.from.first_name} in chat ${ctx.message.chat.title}`);
    // ctx.deleteMessage(ctx.message.message_id)
    // block user from sending messages
    // ctx.restrictChatMember(ctx.message.from.id, {can_send_messages: false});
    // ctx.reply(ctx.message.text);
});

bot.on('new_chat_members', (ctx) => {
    const chatId = ctx.chat.id;
    const userId = ctx.message.new_chat_members[0].id;
    const username = ctx.message.new_chat_members[0].username;
})

app.listen(port, () => {
    console.log(`Express server is listening on ${port}`);
});

// bot.launch();




