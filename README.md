# 🚀 Backend API - Autenticação JWT com MongoDB

## 🎥 Vídeo Demonstrativo

[▶️ Assistir no YouTube](https://youtu.be/1_sYrAeUMDM)

API RESTful desenvolvida com Node.js, TypeScript, Express e MongoDB, implementando autenticação JWT (JSON Web Tokens) e validação de dados.

## 🛠️ Tecnologias Utilizadas

- **Node.js** v14+ - Runtime JavaScript
- **TypeScript** v4.9.5 - Linguagem tipada
- **Express** v4.17.1 - Framework web
- **MongoDB** v6 - Banco de dados NoSQL
- **Mongoose** v5.10.9 - ODM para MongoDB
- **JWT** (jsonwebtoken v8.5.1) - Autenticação stateless
- **bcryptjs** v2.4.3 - Hash seguro de senhas
- **Docker** & **Docker Compose** - Containerização
- **ts-node-dev** - Hot reload em desenvolvimento
- **Vercel** - Deploy serverless em produção

## � Arquitetura do Projeto

O projeto segue uma **arquitetura em camadas** (Layered Architecture) para separação de responsabilidades:

```
src/
├── config/              # Configurações (DB, variáveis de ambiente)
├── models/              # Schemas do Mongoose (User)
├── repositories/        # Acesso aos dados (CRUD no MongoDB)
├── services/            # Lógica de negócio (autenticação, hash, JWT)
├── controllers/         # Manipulação de requisições HTTP
├── middlewares/         # Interceptadores (auth, erros)
├── routes/              # Definição de rotas da API
├── types/               # Tipos TypeScript customizados
├── utils/               # Utilitários (JWT helpers)
└── server.ts            # Ponto de entrada da aplicação
```

**Fluxo de requisição:**
```
Cliente → Routes → Middlewares → Controllers → Services → Repositories → MongoDB
```

## � Rotas da API

### 🔓 Rotas Públicas (sem autenticação)

| Método | Rota | Descrição | Body |
|--------|------|-----------|------|
| `GET` | `/` | Health check da API | - |
| `POST` | `/api/register` | Cadastrar novo usuário | `{ name, email, password }` |
| `POST` | `/api/login` | Autenticar usuário | `{ email, password }` |

### � Rotas Protegidas (requerem token JWT)

| Método | Rota | Descrição | Header |
|--------|------|-----------|--------|
| `GET` | `/api/protected` | Rota de exemplo protegida | `Authorization: Bearer <token>` |
| `GET` | `/api/users` | Listar todos os usuários | `Authorization: Bearer <token>` |
| `GET` | `/api/users/:id` | Buscar usuário por ID | `Authorization: Bearer <token>` |
| `PUT` | `/api/users/:id` | Atualizar usuário | `Authorization: Bearer <token>` |
| `DELETE` | `/api/users/:id` | Deletar usuário | `Authorization: Bearer <token>` |

### Validações de Cadastro/Login

- **Nome:** mínimo 3 caracteres
- **Email:** formato válido (contém @)
- **Senha:** mínimo 6 caracteres

## 💻 Como Instalar e Executar

### Pré-requisitos
- Node.js 14+
- Docker e Docker Compose (recomendado)
- Git

### 1. Clonar o repositório
```bash
git clone https://github.com/guilhermerios21/atv-fullstack-unidade2.git
cd atv-fullstack-unidade2
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar variáveis de ambiente
Crie um arquivo `.env` na raiz:
```env
PORT=3000
MONGODB_URI=mongodb://root:example@localhost:27017/backend-db?authSource=admin
JWT_SECRET=seu_secret_super_seguro_aqui
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### 4. Iniciar MongoDB com Docker Compose
```bash
docker compose up -d
```

### 5. Executar a aplicação

**Desenvolvimento (hot reload):**
```bash
npm run dev
```

**Produção:**
```bash
npm run build
npm start
```

A API estará disponível em: **http://localhost:3000**

### 6. Acessar Mongo Express (opcional)
Interface visual do MongoDB: **http://localhost:8081**
- Usuário: `mongoexpressuser`
- Senha: `mongoexpresspass`

## � Códigos de Status HTTP

### ✅ Sucesso
| Código | Significado | Quando ocorre |
|--------|-------------|---------------|
| `200 OK` | Requisição bem-sucedida | Login realizado, rota protegida acessada |
| `201 Created` | Recurso criado com sucesso | Usuário cadastrado |

### ❌ Erros do Cliente (4xx)
| Código | Significado | Quando ocorre |
|--------|-------------|---------------|
| `400 Bad Request` | Requisição malformada | Email já cadastrado, campos faltando |
| `401 Unauthorized` | Não autorizado | Token JWT ausente, inválido ou expirado; credenciais incorretas |
| `404 Not Found` | Recurso não encontrado | Rota inexistente, usuário não existe |
| `422 Unprocessable Entity` | Erro de validação | Email inválido, senha < 6 caracteres, nome < 3 caracteres |

### ⚠️ Erros do Servidor (5xx)
| Código | Significado | Quando ocorre |
|--------|-------------|---------------|
| `500 Internal Server Error` | Erro interno do servidor | Falha na conexão com MongoDB, erro não tratado |

### Exemplos de Respostas de Erro

**401 - Token ausente:**
```json
{
  "message": "No token provided"
}
```

**401 - Credenciais inválidas:**
```json
{
  "message": "Email ou senha inválidos"
}
```

**422 - Validação falhou:**
```json
{
  "message": "Email inválido"
}
```

**422 - Email duplicado:**
```json
{
  "message": "Email já cadastrado"
}
```