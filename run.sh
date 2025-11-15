# Instalar dependencias Node
npm install

# Descargar .env
wget --no-check-certificate \
  "https://drive.google.com/uc?export=download&id=1iYT3l6WHUIL0M1S3XwkPbDL3c2ud_8Ne" \
  -O .env

# Instalar Cloudflared (local)
wget https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -O cloudflared
chmod +x cloudflared
mkdir -p ~/bin
mv cloudflared ~/bin/

# Login a Cloudflare (solo 1 vez)
~/bin/cloudflared tunnel login

# Iniciar servidor node en background
cd src
nohup npm run dev > servicio-node.log 2>&1 &
sleep 5

# INICIAR TÚNEL TEMPORAL
~/bin/cloudflared tunnel --url http://localhost:4000