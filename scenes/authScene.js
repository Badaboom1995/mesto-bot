const { Scenes, Markup} = require("telegraf");
const { WizardScene} = Scenes;
const {makeRequest} = require("../helpers/makeRequest");
const {v4: uuid} = require("uuid");

function isValidEmail(email) {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}


const authScene = new WizardScene(
    'authScene',
    async (ctx) => {
        await ctx.reply('Введите email')
        return ctx.wizard.next();
    },
    async (ctx) => {
        if(!isValidEmail(ctx.message.text)) {
            await ctx.reply('Пожалуйста, введите корректный email');
            return ctx.scene.enter('authScene');
        }
        const RqUid = uuid();
        const bearer = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRlZmQxMmFjLTk4NzYtNDA3Ny1hMmI3LTVhOWQyNDBiMmMxNCIsInBlcm1pc3Npb25zIjpbMTNdLCJpYXQiOjE2MzI5NDk5NzYsImV4cCI6MjEwNjMxMzk3Nn0.0XOonPE5a6DpgmPrLTcMhdZCJ16QovyKqTNu8UUxA50'
        const body = {
            email: ctx.message.text,
            prefix: 'prefix'
        }
        const headers = {
            'authorization': bearer,
            'x-request-id': RqUid
        }
        // save to session
        ctx.session.email = ctx.message.text;
        try {
            await makeRequest(ctx, 'https://api.mesto.co/v1/email/sendTelegramLink', "POST", body, headers)
            // await ctx.reply('Вам на почту отправлена ссылка для авторизации, пожалуйста, перейдите по ней')
            await ctx.reply('Введите ключ')
        } catch (e){
            await ctx.reply('Что-то пошло не так, попробуйте еще раз')
            return ctx.scene.enter('authScene');
        }
        return ctx.wizard.next();
    },
    async (ctx) => {
        // https://api.mesto.co/v1/auth/checkTelegramSecret
        ctx.session.password = ctx.message.text;
        const RqUid = uuid();
        const bearer = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRlZmQxMmFjLTk4NzYtNDA3Ny1hMmI3LTVhOWQyNDBiMmMxNCIsInBlcm1pc3Npb25zIjpbMTNdLCJpYXQiOjE2MzI5NDk5NzYsImV4cCI6MjEwNjMxMzk3Nn0.0XOonPE5a6DpgmPrLTcMhdZCJ16QovyKqTNu8UUxA50'
        const body = {
            email: ctx.session.email,
            secret: ctx.message.text
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
        } catch {
            await ctx.reply('Неправильный email или пароль, попробуйте еще раз');
            return ctx.scene.enter('authScene');
        }
    },
);

module.exports = {authScene};