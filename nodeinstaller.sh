#!/bin/bash

# Update sistem
sudo apt update && sudo apt upgrade -y

# Hapus Node.js versi lama jika ada
sudo apt remove -y nodejs npm
sudo apt autoremove -y

# Instal Node.js versi terbaru
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# Buat direktori server
mkdir -p /opt/myserver
cd /opt/myserver

# Buat file server.js
cat > server.js << 'EOF'
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
