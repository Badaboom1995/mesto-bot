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
        const bearer = process.env.BEARER_LONG;
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
            await ctx.reply('Ищем ваш профиль...')
            await makeRequest(ctx, 'https://api.mesto.co/v1/email/sendTelegramLink', "POST", body, headers)
            await ctx.reply('Отправили письмо, проверьте почту')
        } catch (e){
            await ctx.reply('Что-то пошло не так, попробуйте еще раз')
            return ctx.scene.enter('authScene');
        }
        return ctx.scene.leave()
    }
);

module.exports = {authScene};