# Imagem oficial do Node.js
FROM node:20-slim

WORKDIR /app

# Copia arquivos de gerenciamento de pacotes
COPY package*.json ./

# Instala as dependências do Node
RUN npm install

# Copia todo o código do frontend
COPY . .

EXPOSE 5173

# Roda o servidor de desenvolvimento do Vite aceitando conexões externas
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]