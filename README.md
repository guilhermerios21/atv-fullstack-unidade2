# 🚀 Backend API - Autenticação JWT com MongoDB

API RESTful desenvolvida com Node.js, TypeScript, Express e MongoDB, implementando autenticação completa com JWT (JSON Web Tokens).

## 📋 Características

- ✅ Autenticação JWT com bcrypt para hash de senhas
- ✅ Validação de dados (email, senha forte, campos obrigatórios)
- ✅ Arquitetura em camadas (Controllers, Services, Repositories, Models)
- ✅ TypeScript para tipagem estática
- ✅ MongoDB com Mongoose
- ✅ Middleware de autenticação para rotas protegidas
- ✅ Tratamento de erros centralizado
- ✅ Docker e Docker Compose
- ✅ Deploy no Vercel

## 🛠️ Tecnologias

- **Node.js** - Runtime JavaScript
- **TypeScript** - Superset tipado do JavaScript
- **Express** - Framework web
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM para MongoDB
- **JWT** - Autenticação stateless
- **bcryptjs** - Hash de senhas
- **Docker** - Containerização
- **Vercel** - Deploy serverless

## 📁 Estrutura do Projeto

```
├── src/
│   ├── config/          # Configurações (DB, env)
│   ├── controllers/     # Controladores (lógica de requisição/resposta)
│   ├── middlewares/     # Middlewares (autenticação, erros)
│   ├── models/          # Models do Mongoose
│   ├── repositories/    # Camada de acesso aos dados
│   ├── routes/          # Definição de rotas
│   ├── services/        # Lógica de negócio
│   ├── types/           # Definições de tipos TypeScript
│   ├── utils/           # Utilitários (JWT)
│   ├── app.ts           # Configuração do Express
│   └── server.ts        # Inicialização do servidor
├── docker-compose.yml   # Orquestração de containers
├── Dockerfile           # Imagem Docker da aplicação
├── tsconfig.json        # Configuração TypeScript
├── vercel.json          # Configuração Vercel
└── package.json         # Dependências e scripts
```

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Node.js 14+ instalado
- MongoDB instalado OU Docker instalado
- Git instalado

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/guilhermerios21/atv-fullstack-unidade2.git
cd atv-fullstack-unidade2
```

### 2️⃣ Instale as Dependências

```bash
npm install
```

### 3️⃣ Configure as Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
# Porta do servidor
PORT=3000

# MongoDB (para desenvolvimento local)
MONGODB_URI=mongodb://localhost:27017/backend-db

# JWT Secret (use uma string segura em produção)
JWT_SECRET=seu_secret_super_seguro_aqui_mude_em_producao

# Tempo de expiração do token
JWT_EXPIRES_IN=7d

# Ambiente
NODE_ENV=development
```

### 4️⃣ Inicie o MongoDB

**Opção A: MongoDB Local**
```bash
# Se você tem MongoDB instalado localmente
mongod
```

**Opção B: MongoDB com Docker**
```bash
# Inicie apenas o container do MongoDB
docker run -d -p 27017:27017 --name mongodb mongo:6
```

### 5️⃣ Execute a Aplicação

**Modo Desenvolvimento (com hot reload):**
```bash
npm run dev
```

**Modo Produção:**
```bash
npm run build
npm start
```

A API estará disponível em: `http://localhost:3000`

## 🐳 Rodando com Docker Compose

Se você tem Docker e Docker Compose instalados, pode rodar toda a aplicação (MongoDB + API) com um único comando:

```bash
# Inicie todos os serviços
docker-compose up -d

# Veja os logs
docker-compose logs -f

# Pare os serviços
docker-compose down
```

Isso irá:
- Criar um container MongoDB na porta 27017
- Criar um container da aplicação na porta 3000
- Conectar automaticamente os containers

## 📡 Endpoints da API

### 🔓 Públicos (sem autenticação)

#### Health Check
```http
GET /
```
Resposta:
```json
{
  "message": "🚀 Projeto Backend - Autenticação JWT funcionando!",
  "status": "WORKING"
}
```

#### Registro de Usuário
```http
POST /api/register
Content-Type: application/json

{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Validações:**
- Nome: mínimo 3 caracteres
- Email: formato válido
- Senha: mínimo 6 caracteres

**Respostas:**
- ✅ `201 Created` - Usuário criado com sucesso
- ❌ `422 Unprocessable Entity` - Dados inválidos
- ❌ `400 Bad Request` - Email já cadastrado

#### Login
```http
POST /api/login
Content-Type: application/json

{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Respostas:**
- ✅ `200 OK` - Login realizado, retorna token JWT
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "João Silva",
    "email": "joao@example.com"
  }
}
```
- ❌ `401 Unauthorized` - Credenciais inválidas
- ❌ `422 Unprocessable Entity` - Dados inválidos

### 🔒 Protegidos (requerem autenticação)

#### Rota Protegida (Exemplo)
```http
GET /api/protected
Authorization: Bearer SEU_TOKEN_JWT_AQUI
```

**Respostas:**
- ✅ `200 OK` - Acesso autorizado
```json
{
  "message": "Rota protegida acessada com sucesso",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "joao@example.com"
  }
}
```
- ❌ `401 Unauthorized` - Token ausente, inválido ou expirado

## 🧪 Testando com Insomnia/Postman

### 1. Registre um novo usuário
- Método: `POST`
- URL: `http://localhost:3000/api/register`
- Body (JSON):
```json
{
  "name": "Test User",
  "email": "test@example.com",
  "password": "senha123"
}
```

### 2. Faça login
- Método: `POST`
- URL: `http://localhost:3000/api/login`
- Body (JSON):
```json
{
  "email": "test@example.com",
  "password": "senha123"
}
```
- **Copie o token retornado!**

### 3. Acesse rota protegida
- Método: `GET`
- URL: `http://localhost:3000/api/protected`
- Headers:
  - Key: `Authorization`
  - Value: `Bearer SEU_TOKEN_AQUI`

## 🌐 Deploy no Vercel

### Pré-requisitos

1. **MongoDB Atlas** (MongoDB na nuvem)
   - Crie uma conta grátis em https://www.mongodb.com/cloud/atlas
   - Crie um cluster gratuito
   - Configure Network Access: adicione `0.0.0.0/0` (permite todas as IPs)
   - Copie a connection string: `mongodb+srv://usuario:senha@cluster.mongodb.net/database`

2. **Conta no Vercel**
   - Crie uma conta em https://vercel.com

### Passos para Deploy

#### 1️⃣ Conecte o Repositório no Vercel

1. Acesse o dashboard do Vercel
2. Clique em "New Project"
3. Importe o repositório do GitHub
4. O Vercel detectará automaticamente o `vercel.json`

#### 2️⃣ Configure as Variáveis de Ambiente

No dashboard do Vercel, vá em **Settings → Environment Variables** e adicione:

```
MONGODB_URI = mongodb+srv://usuario:senha@cluster.mongodb.net/backend-db?retryWrites=true&w=majority
JWT_SECRET = seu_secret_super_seguro_de_producao
JWT_EXPIRES_IN = 7d
PORT = 3000
NODE_ENV = production
```

⚠️ **IMPORTANTE:** Use valores seguros em produção, especialmente para `JWT_SECRET`!

#### 3️⃣ Deploy

1. Clique em "Deploy"
2. Aguarde o build finalizar
3. Acesse a URL fornecida pelo Vercel (ex: `https://seu-projeto.vercel.app`)

#### 4️⃣ Teste a API em Produção

```bash
# Health check
curl https://seu-projeto.vercel.app/

# Registro
curl -X POST https://seu-projeto.vercel.app/api/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","password":"senha123"}'

# Login
curl -X POST https://seu-projeto.vercel.app/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"senha123"}'
```

## 🔧 Scripts Disponíveis

```bash
# Desenvolvimento com hot reload
npm run dev

# Build (compilar TypeScript)
npm run build

# Produção (após build)
npm start

# Limpar pasta de build
npm run clean
```

## 📝 Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `PORT` | Porta do servidor | `3000` |
| `MONGODB_URI` | URI de conexão MongoDB | `mongodb://localhost:27017/backend-db` |
| `JWT_SECRET` | Chave secreta para assinar tokens | `meu_secret_super_seguro` |
| `JWT_EXPIRES_IN` | Tempo de expiração do token | `7d`, `24h`, `30m` |
| `NODE_ENV` | Ambiente de execução | `development`, `production` |

## 🐛 Troubleshooting

### Erro: "Cannot connect to MongoDB"
- Verifique se o MongoDB está rodando: `docker ps` ou `mongod`
- Confirme o `MONGODB_URI` no arquivo `.env`
- Se usar Docker Compose, use `mongodb://mongo:27017/backend-db`
- Se usar localmente, use `mongodb://localhost:27017/backend-db`

### Erro: "Port 3000 already in use"
- Outra aplicação está usando a porta 3000
- Mude a porta no `.env`: `PORT=3001`
- Ou pare a outra aplicação: `lsof -ti:3000 | xargs kill -9`

### Erro no Vercel: "Cannot GET /"
- Verifique se `vercel.json` existe na raiz do projeto
- Confirme as variáveis de ambiente no dashboard do Vercel
- Verifique os logs de build no Vercel

### Token JWT inválido
- O token pode ter expirado (verifique `JWT_EXPIRES_IN`)
- O `JWT_SECRET` pode estar diferente entre builds
- Certifique-se de enviar o header: `Authorization: Bearer TOKEN`

## 📚 Recursos Adicionais

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [JWT.io - Debugger](https://jwt.io/)
- [Vercel Documentation](https://vercel.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## 👨‍💻 Autor

Desenvolvido como parte do projeto acadêmico de Desenvolvimento Full Stack.

## 📄 Licença

Este projeto é de código aberto e está disponível sob a [MIT License](LICENSE).

---

**✨ Dica:** Para uma experiência completa, use Insomnia ou Postman para testar todos os endpoints da API!