#!/bin/bash

# Update sistem
sudo apt update && sudo apt upgrade -y

# Instal Node.js dan npm
sudo apt install -y nodejs npm

# Buat direktori server
mkdir -p /opt/myserver
cd /opt/myserver

# Buat file server.js
cat <<EOF > server.js
const express = require('express');
const app = express();
const port = 3000;
const hostname = require('os').hostname();

app.get('/', (req, res) => {
    res.send('Server berjalan di port 3000!');
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Server berjalan di http://${hostname}:${port}`);
});
EOF

# Inisialisasi npm dan instal Express
npm init -y
npm install express

# Instal PM2 untuk menjalankan server secara otomatis
sudo npm install -g pm2
pm2 start server.js --name myserver
pm2 startup
pm2 save

# Informasi selesai
echo "Server Node.js telah terinstal dan berjalan di port 3000 pada $(hostname)."
