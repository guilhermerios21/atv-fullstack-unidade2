#!/bin/bash

# Script de teste do CRUD de Tarefas
# Como usar: chmod +x test-tasks.sh && ./test-tasks.sh

BASE_URL="http://localhost:3000"
echo "🚀 Testando CRUD de Tarefas na API..."
echo "Base URL: $BASE_URL"
echo ""

# 1. Health Check
echo "1️⃣  Health Check"
curl -s $BASE_URL/ | jq
echo ""

# 2. Cadastrar usuário
echo "2️⃣  Cadastrando usuário de teste..."
REGISTER_RESPONSE=$(curl -s -X POST $BASE_URL/api/register \
  -H 'Content-Type: application/json' \
  -d '{
    "name": "Teste Tasks",
    "email": "teste.tasks@example.com",
    "password": "senha123"
  }')
echo $REGISTER_RESPONSE | jq
echo ""

# 3. Fazer login
echo "3️⃣  Fazendo login..."
LOGIN_RESPONSE=$(curl -s -X POST $BASE_URL/api/login \
  -H 'Content-Type: application/json' \
  -d '{
    "email": "teste.tasks@example.com",
    "password": "senha123"
  }')
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')
echo "Token: ${TOKEN:0:50}..."
echo ""

if [ "$TOKEN" == "null" ] || [ -z "$TOKEN" ]; then
  echo "❌ Falha ao obter token. Tentando login com usuário existente..."
  LOGIN_RESPONSE=$(curl -s -X POST $BASE_URL/api/login \
    -H 'Content-Type: application/json' \
    -d '{
      "email": "teste.tasks@example.com",
      "password": "senha123"
    }')
  TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token')
fi

# 4. Criar primeira tarefa
echo "4️⃣  Criando primeira tarefa..."
CREATE_RESPONSE=$(curl -s -X POST $BASE_URL/api/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "Estudar Node.js",
    "description": "Revisar Express e MongoDB",
    "status": "pending",
    "priority": "high",
    "tags": ["estudos", "backend"]
  }')
echo $CREATE_RESPONSE | jq
TASK_ID=$(echo $CREATE_RESPONSE | jq -r '.task._id')
echo "Task ID: $TASK_ID"
echo ""

# 5. Criar segunda tarefa
echo "5️⃣  Criando segunda tarefa..."
curl -s -X POST $BASE_URL/api/tasks \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "Comprar leite",
    "priority": "low"
  }' | jq
echo ""

# 6. Listar todas as tarefas
echo "6️⃣  Listando todas as tarefas..."
curl -s $BASE_URL/api/tasks \
  -H "Authorization: Bearer $TOKEN" | jq
echo ""

# 7. Buscar tarefa por ID
echo "7️⃣  Buscando tarefa por ID ($TASK_ID)..."
curl -s $BASE_URL/api/tasks/$TASK_ID \
  -H "Authorization: Bearer $TOKEN" | jq
echo ""

# 8. Atualizar parcialmente (PATCH)
echo "8️⃣  Atualizando status para 'in_progress' (PATCH)..."
curl -s -X PATCH $BASE_URL/api/tasks/$TASK_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{"status": "in_progress"}' | jq
echo ""

# 9. Atualizar completamente (PUT)
echo "9️⃣  Atualizando tarefa completamente (PUT)..."
curl -s -X PUT $BASE_URL/api/tasks/$TASK_ID \
  -H "Authorization: Bearer $TOKEN" \
  -H 'Content-Type: application/json' \
  -d '{
    "title": "Estudar Node.js - Completo",
    "description": "Revisar Express, MongoDB e JWT",
    "status": "completed",
    "priority": "urgent"
  }' | jq
echo ""

# 10. Listar com filtro
echo "🔟 Listando tarefas com status=completed..."
curl -s "$BASE_URL/api/tasks?status=completed" \
  -H "Authorization: Bearer $TOKEN" | jq
echo ""

# 11. Estatísticas
echo "1️⃣1️⃣ Obtendo estatísticas..."
curl -s $BASE_URL/api/tasks/stats \
  -H "Authorization: Bearer $TOKEN" | jq
echo ""

# 12. Deletar tarefa
echo "1️⃣2️⃣ Deletando tarefa ($TASK_ID)..."
curl -s -X DELETE $BASE_URL/api/tasks/$TASK_ID \
  -H "Authorization: Bearer $TOKEN" | jq
echo ""

# 13. Tentar acessar sem token (deve dar 401)
echo "1️⃣3️⃣ Testando acesso SEM token (deve retornar 401)..."
curl -s -i $BASE_URL/api/tasks | head -n 1
echo ""

# 14. Tentar acessar com token inválido (deve dar 401)
echo "1️⃣4️⃣ Testando acesso com token INVÁLIDO (deve retornar 401)..."
curl -s -i $BASE_URL/api/tasks \
  -H "Authorization: Bearer token_invalido_xyz" | head -n 1
echo ""

echo "✅ Testes concluídos!"
