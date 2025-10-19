FROM node:18

# Define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos de configuração e dependências
COPY package*.json ./
COPY tsconfig.json ./
COPY .env.example ./

# Instala as dependências
RUN npm install

# Copia o restante do código-fonte
COPY . .

# Compila o código TypeScript
RUN npm run build

# Expõe a porta que o servidor irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "start"]