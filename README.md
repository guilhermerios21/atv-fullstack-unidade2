# 🚀 Backend API - Autenticação JWT com MongoDB

## 🎥 Vídeo Demonstrativo

[▶️ Assistir no YouTube](https://youtu.be/1_sYrAeUMDM)

API RESTful desenvolvida com Node.js, TypeScript, Express e MongoDB, implementando autenticação JWT (JSON Web Tokens) e validação de dados.

## ✨ Funcionalidades v2.1.0

### 📋 CRUD de Tarefas (To-Do List)

Sistema completo de gerenciamento de tarefas com as seguintes funcionalidades:

- **Criar tarefas** com título, descrição, status, prioridade, data de vencimento e tags
- **Listar tarefas** com filtros por status, prioridade e tags
- **Buscar tarefa específica** por ID
- **Atualizar tarefas** (completo com PUT ou parcial com PATCH)
- **Deletar tarefas**
- **Estatísticas** de tarefas por status
- **Isolamento por usuário**: cada usuário acessa apenas suas próprias tarefas

#### Campos da Tarefa
- `title` (obrigatório): Título da tarefa (3-200 caracteres)
- `description` (opcional): Descrição detalhada (máx. 1000 caracteres)
- `status`: pending | in_progress | completed | cancelled (padrão: pending)
- `priority`: low | medium | high | urgent (padrão: medium)
- `dueDate` (opcional): Data de vencimento
- `tags` (opcional): Array de strings para categorização

## 🛠️ Tecnologias Utilizadas

- **Node.js** v14+ - Runtime JavaScript
- **TypeScript** v4.9.5 - Linguagem tipada
- **Express** v4.17.1 - Framework web
- **MongoDB** v6 - Banco de dados NoSQL
- **Mongoose** v5.10.9 - ODM para MongoDB
- **JWT** (jsonwebtoken v8.5.1) - Autenticação stateless
- **bcryptjs** v2.4.3 - Hash seguro de senhas
- **Swagger/OpenAPI** - Documentação interativa da API
- **Docker** & **Docker Compose** - Containerização
- **ts-node-dev** - Hot reload em desenvolvimento
- **Vercel** - Deploy serverless em produção

## 📚 Documentação Interativa (Swagger)

A API possui documentação interativa completa através do **Swagger UI**, onde você pode:
- Visualizar todos os endpoints disponíveis
- Ver schemas de requisição e resposta
- Testar os endpoints diretamente no navegador
- Entender os códigos de status HTTP retornados

### Acessar a documentação:
- **Local**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- **Produção**: `https://seu-dominio.vercel.app/api-docs`

**Como usar:**
1. Acesse `/api-docs` no navegador
2. Execute o endpoint `POST /api/login` para obter o token JWT
3. Clique no botão **Authorize** 🔒 no topo da página
4. Cole o token JWT e clique em **Authorize**
5. Agora você pode testar as rotas protegidas diretamente no Swagger!

## � Arquitetura do Projeto

O projeto segue uma **arquitetura em camadas** (Layered Architecture) para separação de responsabilidades:

```
src/
├── config/              # Configurações (DB, variáveis de ambiente)
├── models/              # Schemas do Mongoose (User, Task)
├── repositories/        # Acesso aos dados (CRUD no MongoDB)
├── services/            # Lógica de negócio (autenticação, hash, JWT)
├── controllers/         # Manipulação de requisições HTTP
├── middlewares/         # Interceptadores (auth, erros)
├── routes/              # Definição de rotas da API (auth, users, tasks)
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

### 🔐 Rotas Protegidas (requerem token JWT)

| Método | Rota | Descrição | Header |
|--------|------|-----------|--------|
| `GET` | `/api/protected` | Rota de exemplo protegida | `Authorization: Bearer <token>` |
| `GET` | `/api/users` | Listar todos os usuários | `Authorization: Bearer <token>` |
| `GET` | `/api/users/:id` | Buscar usuário por ID | `Authorization: Bearer <token>` |
| `PUT` | `/api/users/:id` | Atualizar usuário | `Authorization: Bearer <token>` |
| `DELETE` | `/api/users/:id` | Deletar usuário | `Authorization: Bearer <token>` |

#### 📝 Tarefas (To-Do List) — CRUD protegido

| Método | Rota | Descrição |
|--------|------|-----------|
| `POST` | `/api/tasks` | Criar tarefa |
| `GET` | `/api/tasks` | Listar tarefas do usuário |
| `GET` | `/api/tasks?status=pending&priority=high&tags=estudos,backend` | Listar com filtros (status, priority, tags, dueDateFrom/dueDateTo) |
| `GET` | `/api/tasks/:id` | Detalhar tarefa |
| `PUT` | `/api/tasks/:id` | Atualização completa (title, status, priority obrigatórios) |
| `PATCH` | `/api/tasks/:id` | Atualização parcial |
| `DELETE` | `/api/tasks/:id` | Remover tarefa |
| `GET` | `/api/tasks/stats` | Estatísticas por status |

Notas:
- Todas as rotas exigem `Authorization: Bearer <token>`.
- Um usuário não pode acessar/editar/deletar tarefas de outro usuário. Nesses casos a API retorna `403 Forbidden`.

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

### 6. Acessar recursos visuais

#### 📚 Documentação Swagger
Acesse: **http://localhost:3000/api-docs**
- Documentação interativa completa
- Teste os endpoints diretamente no navegador
- Use o botão "Authorize" para adicionar o token JWT

#### 🗄️ Mongo Express (Interface do MongoDB)
Acesse: **http://localhost:8081**
- Usuário: `mongoexpressuser`
- Senha: `mongoexpresspass`
- Visualize e gerencie os dados do banco

## 📡 Códigos de Status HTTP

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
| `403 Forbidden` | Acesso negado | Tentar acessar/alterar recurso de outro usuário |
| `404 Not Found` | Recurso não encontrado | Rota inexistente, recurso não existe |
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