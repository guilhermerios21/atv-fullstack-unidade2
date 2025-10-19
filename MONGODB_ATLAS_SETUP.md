# 🔧 Configuração MongoDB Atlas - Guia Rápido

## Problema Comum: "(Unauthorized) not authorized on admin to execute command"

Este erro ocorre quando:
1. O usuário do MongoDB Atlas não tem permissões corretas
2. A string de conexão está incorreta
3. O banco de dados especificado não existe

## ✅ Solução Passo a Passo

### 1. Criar Usuário com Permissões Corretas

1. Acesse https://cloud.mongodb.com
2. Vá em **Database Access** (menu lateral)
3. Clique em **Add New Database User**
4. Configure:
   - **Authentication Method**: Password
   - **Username**: `backend-user` (ou o nome que preferir)
   - **Password**: Gere uma senha forte (ex: `SenhaForte123!`)
   - **Database User Privileges**: Selecione **"Read and write to any database"** ou **"Atlas admin"**
   
   ⚠️ **IMPORTANTE**: Não use "Only read any database", precisa ter permissão de WRITE!

5. Clique em **Add User**

### 2. Configurar Network Access (Liberar IPs)

1. Vá em **Network Access** (menu lateral)
2. Clique em **Add IP Address**
3. Escolha uma opção:
   - **Allow Access from Anywhere**: `0.0.0.0/0` (mais fácil para desenvolvimento e Vercel)
   - **Add Current IP Address**: Apenas seu IP atual
4. Clique em **Confirm**

### 3. Obter a Connection String Correta

1. Vá em **Database** (menu lateral)
2. Clique no botão **Connect** do seu cluster
3. Escolha **Connect your application**
4. Copie a connection string:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/<database>?retryWrites=true&w=majority
   ```

5. **Substitua os valores:**
   - `<username>`: seu usuário (ex: `backend-user`)
   - `<password>`: sua senha (ex: `SenhaForte123!`)
   - `<database>`: nome do banco (ex: `backend-db`)

### 4. Atualizar seu .env

**Para desenvolvimento local (testando Atlas):**
```env
MONGODB_URI=mongodb+srv://backend-user:SenhaForte123!@cluster0.xxxxx.mongodb.net/backend-db?retryWrites=true&w=majority
JWT_SECRET=seu_secret_aqui
JWT_EXPIRES_IN=7d
PORT=3000
NODE_ENV=development
```

**Para produção (Vercel):**
- Configure as mesmas variáveis no dashboard do Vercel:
  - Settings → Environment Variables
  - Adicione `MONGODB_URI` com a string completa do Atlas

### 5. Testar a Conexão

```bash
# Parar o servidor se estiver rodando
# Ctrl+C no terminal

# Iniciar novamente para carregar o novo .env
npm run dev
```

Você deve ver:
```
MongoDB connected successfully
Server is running on http://localhost:3000
```

### 6. Verificar no Atlas

1. Acesse o dashboard do MongoDB Atlas
2. Vá em **Database** → **Browse Collections**
3. Após fazer um POST /api/register, você verá:
   - Database: `backend-db` (ou o nome que você escolheu)
   - Collection: `users`
   - Documentos: os usuários cadastrados

## 🔍 Troubleshooting

### Erro: "bad auth : Authentication failed"
- ✅ Verifique se o username e password estão corretos
- ✅ Certifique-se de que a senha não tem caracteres especiais não encodados (use URL encoding se necessário)
- ✅ Exemplo: `senha@123` → `senha%40123`

### Erro: "not authorized on admin to execute command"
- ✅ O usuário precisa ter permissão **"Read and write to any database"** ou **"Atlas admin"**
- ✅ Vá em Database Access e edite o usuário para adicionar a permissão correta

### Erro: "connection timed out"
- ✅ Verifique se o IP está liberado em Network Access
- ✅ Adicione `0.0.0.0/0` para permitir de qualquer lugar

### Erro: "Server selection timed out"
- ✅ Verifique se a connection string está correta
- ✅ Confirme que o cluster está ativo (não pausado)

## 📋 Checklist Final

- [ ] Usuário criado no MongoDB Atlas com permissão "Read and write to any database"
- [ ] Network Access configurado (0.0.0.0/0 para desenvolvimento/Vercel)
- [ ] Connection string copiada e atualizada no .env
- [ ] Username, password e database substituídos na string
- [ ] Servidor reiniciado para carregar novo .env
- [ ] Teste POST /api/register funcionando
- [ ] Verificado no Atlas que o usuário foi criado na collection

## 🎯 String de Conexão Completa (Exemplo)

```
mongodb+srv://backend-user:SenhaForte123!@cluster0.abc123.mongodb.net/backend-db?retryWrites=true&w=majority&authSource=admin
```

**Componentes:**
- `mongodb+srv://` - Protocolo (sempre assim para Atlas)
- `backend-user` - Seu username
- `SenhaForte123!` - Sua senha
- `@cluster0.abc123.mongodb.net` - Endereço do seu cluster
- `/backend-db` - Nome do banco de dados
- `?retryWrites=true&w=majority` - Opções recomendadas
- `&authSource=admin` - (opcional) Especifica o banco de autenticação

---

**Feito isso, seu erro deve estar resolvido!** ✅
