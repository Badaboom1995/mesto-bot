
const chats = {
    general:{
        'Mesto.Startups': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
    },
    russia:{
        'Mesto.Samara': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Chelyabinsk': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Saint-Petersburg': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Kazan': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Moscow': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Krasnodar': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Ekaterinburg': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Stavropol': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Orenburg': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Crimea': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Voronezh': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Sochi': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Belgorod': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Rostov': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Novosibirsk': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Irkutsk': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
    },
    world: {
        'Mesto.Poland': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Slovakia': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.China': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Austria': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.France': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.New York': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Brazil': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Kyiv': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Bishkek': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Israel': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Germany': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.California': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Canada': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Europe/CZ': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Belarus': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Georgia': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Armenia': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Kazakhstan': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Turkey': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Italy': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Мesto.Azerbaijan': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Dubai': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Portugal': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Bali': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Singapore': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Spain': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Netherlands': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Serbia': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Moldova': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Thailand': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
        'Mesto.Montenegro': 'https://t.me/joinchat/AAAAAEY0Z0ZjY2Yx',
    }
}

const createNavigation = () => {
    const rusChatsString = Object.keys(chats.russia).reduce((acc, key) => {
        return acc + `🔸<a href="${chats.russia[key]}">${key}</a>\n`
    }, '')
    const worldChatsString = Object.keys(chats.world).reduce((acc, key) => {
        return acc + `🔸<a href="${chats.world[key]}">${key}</a>\n`
    }, '')
    const generalChatsString = Object.keys(chats.general).reduce((acc, key) => {
        return acc + `🔸<a href="${chats.general[key]}">${key}</a>\n`
    },'');

    return `
Общие:
${generalChatsString}
    
Россия:
${rusChatsString}
    
Мир:
${worldChatsString}
    
⚠️Внимание, это приватные ссылки, если войти в чат/канал без авторизации в боте @MestoInfoBot, пользователь будет исключен и получит блокировку.
`
}


module.exports = {createNavigation}


