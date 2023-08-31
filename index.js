// write telegram bot using telegraph
const { Telegraf, Markup, Scenes, session } = require('telegraf');
const {createNavigation} = require('./createNavigation.js');
const {authScene} = require("./scenes/authScene");
const {makeKeyboard} = require("./helpers/MakeInlineKeyboard");
require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const {makeRequest} = require("./helpers/makeRequest");
const {v4: uuid} = require("uuid");
const token = process.env.BOT_TOKEN
const bot = new Telegraf(token);
const {supabase} = require("./helpers/supabase.js");
const {runPrivately} = require("./services/auth");
const stage = new Scenes.Stage([authScene]);

bot.use(session())
bot.use(stage.middleware());

const port = process.env.PORT || 3002;
const app = express();
app.use(bodyParser.json());
bot.telegram.setWebhook(`https://mesto-bot-c5a62508e033.herokuapp.com/bot${token}`);
app.use(bot.webhookCallback(`/bot${token}`));

app.post(`/bot${token}`, (req, res) => {
    res.sendStatus(200);
});

bot.start(async (ctx) => {
    if(ctx.startPayload) {
        const secret = ctx.startPayload.slice(6);
        const email = ctx.session.email;
        const RqUid = uuid();
        const bearer = process.env.BEARER_LONG;
        const body = {
            email,
            secret
        }
        const headers = {
            'authorization': bearer,
            'x-request-id': RqUid
        }
        try {
            await makeRequest(ctx, 'https://api.mesto.co/v1/auth/checkTelegramSecret', "POST", body, headers)
            await ctx.reply('Вы успешно авторизованы', Markup.keyboard([
                [Markup.button.callback(`💬 Чаты`, 'chats'), Markup.button.callback(`📅 События`, 'events'),Markup.button.callback(`👥 Люди`, 'people')],
                [Markup.button.callback(`🏄 Лента`, 'feed'), Markup.button.callback(`⚙️ Личный кабинет`, 'settings'),Markup.button.callback(`❓ FAQ`, 'stats')],
            ]))
            await supabase.from('Users').insert([{chat_id: ctx.message.chat.id, telegram:ctx.message.from.username, email, secret }]).then(res => {
                if(res.error) throw new Error('Ошибка при добавлении пользователя в базу данных')
            })
        } catch(e) {
            await ctx.reply(e.message);
            return ctx.scene.enter('authScene');
        }
        return
    }
    await ctx.reply('Привет! Для начала работы с ботом нужно авторизоваться', makeKeyboard(['Авторизоваться'], 1,'auth'));
});

bot.action(/auth(.+)/, async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.scene.enter('authScene');
})

bot.on('text', (ctx) => {
    if(ctx.message.text === '/start') return
    if(ctx.message.text === 'asd') {
        runPrivately(ctx, () => {ctx.reply("Privately")})
    }
    if(ctx.message.text === `💬 Чаты`) {
        runPrivately(ctx, () => {ctx.replyWithHTML(createNavigation())})
    }
    if(ctx.message.text === `📅 События`){
        ctx.replyWithHTML(`Добавьте себе <a href="https://calendar.google.com/calendar/b/1?cid=Mmk4MDJ0azNpbjdyNG0xZXA0amQ1OWoydG9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ">гугл-календарь</a> с онлайн и офлайн событиями Mesto`)
    }
    if( ctx.message.text === `👥 Люди` || ctx.message.text === `⚙️ Личный кабинет` || ctx.message.text === `❓ FAQ` || ctx.message.text === `🏄 Лента`) {
        ctx.reply('Пока не готово, но скоро будет!')
    }
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
module.exports = {bot};




