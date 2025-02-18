const { Telegraf } = require('telegraf');
const axios = require('axios');

const bot = new Telegraf('YOUR_TELEGRAM_BOT_TOKEN');
const SECRET_KEY = 'SECRETKEY';

// Daftar server yang bisa dikontrol
const SERVERS = {
    'kancil1': 'http://web1.com:3000/cmd',
    'kancil2': 'http://web2.com:3000/cmd',
    'kancil3': 'http://web3.com:3000/cmd'
};

bot.command('cmd', async (ctx) => {
    const args = ctx.message.text.split(' ');
    if (args.length < 3) {
        ctx.reply('Gunakan format: /cmd <server> <perintah>\nContoh: /cmd kancil1 ls -lah');
        return;
    }

    const serverKey = args[1];
    const command = args.slice(2).join(' ');

    if (!SERVERS[serverKey]) {
        ctx.reply(`Server ${serverKey} tidak ditemukan! Pilih dari: ${Object.keys(SERVERS).join(', ')}`);
        return;
    }

    const SERVER_URL = SERVERS[serverKey];

    try {
        const response = await axios.get(`${SERVER_URL}?key=${SECRET_KEY}&cmd=${encodeURIComponent(command)}`);
        ctx.reply(`Output dari ${serverKey}:\n${response.data}`);
    } catch (error) {
        ctx.reply(`Gagal eksekusi perintah di ${serverKey}.`);
    }
});

bot.launch();
