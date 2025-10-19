# 📬 Requisições para Teste da API

Este diretório contém o arquivo `requests.json` (Postman Collection) que pode ser importado no **Insomnia** ou **Postman** para testar todos os endpoints da API.

## 📥 Como Importar

### No Insomnia:
1. Abra o Insomnia
2. Clique em **Create** → **Import From** → **File**
3. Selecione o arquivo `requests.json` desta pasta
4. Todas as 13 requisições serão importadas automaticamente

### No Postman:
1. Abra o Postman
2. Clique em **Import** (canto superior esquerdo)
3. Arraste o arquivo `requests.json` ou clique em **Upload Files**
4. Clique em **Import**

## 🔧 Configurar Variáveis

Após importar, você verá duas variáveis:

| Variável | Valor Padrão | Descrição |
|----------|--------------|-----------|
| `{{base_url}}` | `http://localhost:3000` | URL base da API |
| `{{auth_token}}` | (vazio) | Token JWT (preenchido automaticamente) |

### Para testar em produção (Vercel):
1. No Insomnia/Postman, vá em **Environments**
2. Crie um novo ambiente chamado "Production"
3. Defina: `base_url = https://seu-dominio.vercel.app`
4. Selecione o ambiente "Production" antes de testar

## 📋 Requisições Disponíveis (Total: 13)

### 0️⃣ Health Check (1 requisição)
- ✅ **Health Check - API Rodando** → `GET /`

### 1️⃣ Cadastro - Register (5 requisições)

1. ✅ **Cadastro Bem-Sucedido**
   - Email: `joao.silva@example.com`
   - Senha: `senha123`
   - **Esperado:** Status 201

2. ❌ **Cadastro - Email Repetido**
   - Tenta cadastrar mesmo email novamente
   - **Esperado:** Status 400/422

3. ❌ **Cadastro - Senha Inválida**
   - Senha com apenas 3 caracteres
   - **Esperado:** Status 422

4. ❌ **Cadastro - Email Inválido**
   - Email sem @
   - **Esperado:** Status 422

5. ❌ **Cadastro - Requisição Mal Formatada**
   - Faltando campos obrigatórios
   - **Esperado:** Status 400/422

### 2️⃣ Login (5 requisições)

6. ✅ **Login Bem-Sucedido**
   - Email: `joao.silva@example.com`
   - Senha: `senha123`
   - **Esperado:** Status 200 + token JWT
   - **⚠️ O token é salvo automaticamente em `{{auth_token}}`**

7. ❌ **Login - Credenciais Inválidas**
   - Senha incorreta
   - **Esperado:** Status 401

8. ❌ **Login - Senha Inválida (Formato)**
   - Senha com menos de 6 caracteres
   - **Esperado:** Status 422

9. ❌ **Login - Email Inválido (Formato)**
   - Email sem @
   - **Esperado:** Status 422

10. ❌ **Login - Requisição Mal Formatada**
    - Faltando campo password
    - **Esperado:** Status 400/422

### 3️⃣ Rota Protegida (3 requisições)

11. ✅ **Acesso com Token Válido**
    - Usa `{{auth_token}}` automaticamente
    - **Esperado:** Status 200

12. ❌ **Acesso SEM Token**
    - Sem header Authorization
    - **Esperado:** Status 401

13. ❌ **Acesso com Token Inválido**
    - Token malformado
    - **Esperado:** Status 401

## 🎯 Fluxo de Teste Recomendado (Para o Vídeo)

### Passo 1: Health Check
```
GET / → Verifica se API está rodando
```

### Passo 2: Cadastro
```
1. ✅ Cadastro Bem-Sucedido → Cria usuário
2. ❌ Cadastro - Email Repetido → Tenta duplicar
3. ❌ Cadastro - Senha Inválida → Senha fraca
4. ❌ Cadastro - Email Inválido → Email sem @
5. ❌ Cadastro - Requisição Mal Formatada → Campos faltando
```

### Passo 3: Login
```
6. ✅ Login Bem-Sucedido → Retorna token JWT (salvo automaticamente)
7. ❌ Login - Credenciais Inválidas → Senha errada
8. ❌ Login - Senha Inválida (Formato) → Senha curta
9. ❌ Login - Email Inválido (Formato) → Email sem @
10. ❌ Login - Requisição Mal Formatada → Campos faltando
```

### Passo 4: Rota Protegida
```
11. ✅ Acesso com Token Válido → Usa token salvo, sucesso
12. ❌ Acesso SEM Token → Sem autenticação, falha
13. ❌ Acesso com Token Inválido → Token fake, falha
```

## 🎥 Dica para Gravação do Vídeo

1. **Mostre o ambiente Local primeiro**
   - `{{base_url}}` = `http://localhost:3000`
   - Execute as 13 requisições
   - Mostre MongoDB local (Mongo Express em http://localhost:8081)

2. **Depois mostre Produção (Vercel)**
   - Troque para ambiente "Production"
   - `{{base_url}}` = `https://seu-dominio.vercel.app`
   - Execute as mesmas 13 requisições
   - Mostre MongoDB Atlas (cloud)

3. **Explique enquanto executa**
   - "Agora vou testar o cadastro bem-sucedido..."
   - "Como esperado, retornou 201..."
   - "Vou tentar cadastrar email repetido, deve dar erro 422..."

## 📊 Resultados Esperados

| Requisição | Status | Descrição |
|------------|--------|-----------|
| Health Check | 200 | API funcionando |
| Cadastro OK | 201 | Usuário criado |
| Email repetido | 400/422 | Conflito |
| Senha inválida | 422 | Validação |
| Email inválido | 422 | Validação |
| Mal formatada | 400/422 | Bad Request |
| Login OK | 200 | Token retornado |
| Senha errada | 401 | Não autorizado |
| Protected OK | 200 | Acesso autorizado |
| Sem token | 401 | Não autorizado |
| Token inválido | 401 | Não autorizado |

## 🐛 Troubleshooting

### Erro de conexão recusada
- Verifique se o servidor está rodando: `npm run dev`
- Confirme a porta no `.env`: `PORT=3000`

### Token não salvo automaticamente
- No Postman, vá em **Tests** da requisição "Login Bem-Sucedido"
- Verifique se o script de salvar token está presente
- Manualmente: copie o token da resposta e cole em `{{auth_token}}`

### Erro 401 na rota protegida
- Execute primeiro "Login Bem-Sucedido" para gerar o token
- Verifique se `{{auth_token}}` tem valor
- No Insomnia: vá em **Auth** → **Bearer Token** → `{{auth_token}}`

### Erro 422 quando deveria funcionar
- Verifique se o email já existe no banco
- Use MongoDB Compass ou Mongo Express para verificar
- Delete o usuário de teste e tente novamente

## 📚 Recursos

- [Insomnia Download](https://insomnia.rest/download)
- [Postman Download](https://www.postman.com/downloads/)
- [Documentação Postman Collections](https://learning.postman.com/docs/getting-started/importing-and-exporting-data/)
- [Documentação Insomnia Import](https://docs.insomnia.rest/insomnia/import-export-data)

---

✨ **Dica:** Execute as requisições na ordem para garantir que os dados de teste existam!
