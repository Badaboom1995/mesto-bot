const {supabase} = require("../helpers/supabase");
const {makeKeyboard} = require("../helpers/MakeInlineKeyboard");

const runPrivately = async (ctx, func) => {
    const currentChatId = ctx.message.chat.id;
    const res = await supabase.from('Users').select('chat_id').eq('chat_id', currentChatId).single()
    if(res?.error) {
        await ctx.reply('Авторизуйтесь, чтобы пользоваться этой функцией', makeKeyboard(['Авторизоваться'], 1,'auth'))
        return
    }
    func()
    console.log(res)
}

module.exports = {runPrivately}