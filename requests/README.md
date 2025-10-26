# 📬 Requisições para Teste da API

Este diretório agora contém duas opções de coleção para clientes HTTP:

- Postman: use o arquivo `requests.postman_collection.json` (formato oficial do Postman v2.1)
- Insomnia/Outros: o arquivo `requests.yml` pode não ser suportado pelo Postman. Prefira o JSON acima quando usar Postman.

## 📥 Como Importar

### No Postman (recomendado para este projeto):
1. Abra o Postman
2. Clique em **Import** (canto superior esquerdo)
3. Selecione o arquivo `requests.postman_collection.json`
4. Clique em **Import**

### No Insomnia:
1. Abra o Insomnia
2. Clique em **Create** → **Import From** → **File**
3. Selecione o arquivo `requests.yml` ou `requests.postman_collection.json`

## 🔧 Configurar Variáveis

Após importar, você verá duas variáveis:

| Variável | Valor Padrão | Descrição |
|----------|--------------|-----------|
| `{{base_url}}` | `http://localhost:3000` | URL base da API |
| `{{auth_token}}` | (vazio) | Token JWT (preenchido automaticamente após o Login) |

### Para testar em produção (Vercel):
1. No Postman, clique na aba do ambiente (canto superior direito) → **Edit**
2. Crie/edite o ambiente e defina: `base_url = https://SEU-DOMINIO.vercel.app`
3. Selecione esse ambiente antes de executar as requisições

## 📋 Grupos de Requisições na Coleção JSON

- 0. Health
  - GET `/`
- 1. Auth
  - POST `/api/register`
  - POST `/api/login` (salva o token automaticamente em `{{auth_token}}`)
- 2. Protected
  - GET `/api/protected` (usa Bearer `{{auth_token}}`)
- 3. Tasks (todas autenticadas)
  - POST `/api/tasks` (criar)
  - GET `/api/tasks` (listar)
  - GET `/api/tasks/:taskId` (buscar por id)
  - PUT `/api/tasks/:taskId` (atualizar completo)
  - PATCH `/api/tasks/:taskId` (atualizar parcial)
  - DELETE `/api/tasks/:taskId` (deletar)
  - GET `/api/tasks/stats` (estatísticas)

## 🐛 Dúvidas comuns

- “Postman disse que não suporta .yml” → Use o `requests.postman_collection.json`. O Postman só importa coleções em JSON/arquivo Postman, não YAML.
- “Token não aparece na variável” → Execute primeiro o Login. O script de teste da requisição salva `token` em `{{auth_token}}`.
- “Erro 401 na rota /api/tasks” → Verifique se o header Authorization está presente. No Postman, isso é configurado pela autenticação Bearer nos requests da coleção.

---

✨ Dica: Execute na ordem Auth → Protected → Tasks para um fluxo mais suave.
