# 🧠 Pareidolia API

> API REST para registro e análise clínica de casos de pareidolia, desenvolvida como projeto acadêmico na disciplina de Desenvolvimento Web III.

Pareidolia é o fenômeno psicológico em que o cérebro humano reconhece padrões familiares — como rostos e figuras — em estímulos visuais aleatórios, como nuvens, manchas ou sombras. Essa API permite que profissionais da área da saúde registrem, classifiquem e acompanhem esses casos de forma estruturada e segura.

---

## 🛠 Tecnologias

- **Node.js + Express** — servidor e roteamento da API
- **MongoDB + Mongoose** — banco de dados e modelagem dos dados
- **JWT (JSON Web Token)** — autenticação e controle de acesso
- **bcrypt** — criptografia de senhas
- **dotenv** — gerenciamento de variáveis de ambiente
- **nodemon** — reinicialização automática em desenvolvimento

---

## ⚙️ Como funciona

### Autenticação

O sistema utiliza autenticação baseada em **JWT**. O fluxo é o seguinte:

1. O profissional se cadastra com nome, e-mail e senha
2. A senha é criptografada com **bcrypt** antes de ser salva no banco
3. Ao fazer login, o sistema valida as credenciais e retorna um **token JWT** com validade de 48 horas
4. Esse token deve ser enviado no header de todas as requisições às rotas de casos:
```
Authorization: Bearer <token>
```
5. O middleware `Auth.js` intercepta cada requisição e valida o token antes de liberar o acesso

Sem um token válido, qualquer tentativa de acessar os casos retorna erro `401 - Não autorizado`.

---

### Registro de casos

Após autenticado, o profissional pode registrar casos de pareidolia. Cada caso armazena as seguintes informações:

| Campo | Descrição |
|-------|-----------|
| `nomePaciente` | Nome do paciente que relatou a percepção |
| `oQueViu` | O que o paciente disse ter visto (ex: "Rosto em nuvem") |
| `oQueEraRealidade` | O que o estímulo realmente era (ex: "Formação em nuvem") |
| `categoriaVisual` | Categoria da cena observada (ex: Natureza, Ambiente doméstico) |
| `tipoReconhecimento` | **Conceitual** — qualquer pessoa reconheceria / **Contextual** — depende do ângulo ou contexto |
| `anguloEspecifico` | Se a percepção só ocorre de um ângulo específico |
| `nivelClareza` | Intensidade da percepção relatada pelo paciente (escala de 1 a 10) |
| `observacoesClinicas` | Notas adicionais do profissional sobre o caso |
| `status` | **Pendente** (padrão ao criar) ou **Analisado** (após revisão) |

---

### Fluxo completo da aplicação

```
Cadastro → Login → Token JWT → Acesso às rotas de casos
                                      ↓
                          Criar / Listar / Visualizar
                          Atualizar status / Deletar
```

---

## 📌 Endpoints


## 👤 Usuários

### POST /user
Cadastra um novo profissional.

**Parâmetros:**
- email
- password

**Exemplo de requisição:**
```json
{
  "email": "teste@email.com",
  "password": "123456"
}
````

**Respostas:**

* **201 Created**

* **500 Internal Server Error**

```json
{
  "err": "Erro ao criar usuário!"
}
```

---

### POST /auth

Realiza login e retorna o token JWT.

**Parâmetros:**

* email
* password

**Exemplo de requisição:**

```json
{
  "email": "teste@email.com",
  "password": "123456"
}
```

**Respostas:**

* **200 OK**

```json
{
  "token": "jwt_token_aqui"
}
```

* **401 Unauthorized**

```json
{
  "err": "Credenciais inválidas!"
}
```

---

## 🧠 Casos (Requer autenticação)

### GET /casos

Retorna todos os casos cadastrados.

**Parâmetros:**
Nenhum (necessário token)

**Respostas:**

* **200 OK**

```json
{
  "casos": [
    {
      "_id": "123",
      "nomePaciente": "João",
      "oQueViu": "Rosto na nuvem",
      "categoriaVisual": "Natureza",
      "historicoObservacoes": []
    }
  ]
}
```

* **500 Internal Server Error**

```json
{
  "err": "Erro interno do servidor!"
}
```

---

### GET /casos/:id

Retorna um caso específico.

**Parâmetros:**

* id

**Respostas:**

* **200 OK**

```json
{
  "caso": {
    "_id": "123",
    "nomePaciente": "João",
    "oQueViu": "Rosto na nuvem"
  }
}
```

* **404 Not Found**

```json
{
  "err": "Caso não encontrado!"
}
```

* **400 Bad Request**

```json
{
  "err": "ID inválido!"
}
```

---

### POST /casos

Cria um novo caso.

**Parâmetros:**

* nomePaciente
* oQueViu
* oQueEraRealidade
* categoriaVisual
* tipoReconhecimento
* historicoObservacoes (opcional)

**Exemplo de requisição:**

```json
{
  "nomePaciente": "João M.",
  "oQueViu": "Rosto em nuvem",
  "oQueEraRealidade": "Formação em nuvem",
  "categoriaVisual": "Natureza",
  "tipoReconhecimento": "Conceitual",
  "historicoObservacoes": [
    {
      "texto": "Paciente relatou visão nítida",
      "profissional": "Dr. Silva"
    }
  ]
}
```

**Respostas:**

* **201 Created**

* **500 Internal Server Error**

```json
{
  "err": "Erro interno do servidor!"
}
```

---

### PUT /casos/:id

Atualiza um caso existente.

**Parâmetros:**

* id
* campos opcionais

**Exemplo de requisição:**

```json
{
  "categoriaVisual": "Objetos",
  "nivelClareza": 8
}
```

**Respostas:**

* **200 OK**

```json
{
  "msg": "Caso atualizado com sucesso!"
}
```

* **400 Bad Request**

```json
{
  "err": "Dados inválidos!"
}
```

* **500 Internal Server Error**

```json
{
  "err": "Erro interno do servidor!"
}
```

---

### DELETE /casos/:id

Remove um caso do sistema.

**Parâmetros:**

* id

**Respostas:**

* **204 No Content**

* **400 Bad Request**

```json
{
  "err": "ID inválido!"
}
```

* **500 Internal Server Error**

```json
{
  "err": "Erro interno do servidor!"
}
```



---

## 📁 Estrutura do projeto

```
api-pareidolia/
├── controllers/    → recebe as requisições e retorna as respostas
├── services/       → contém as regras de negócio e acesso ao banco
├── models/         → define os schemas do MongoDB (Casos e Users)
├── routes/         → mapeia as URLs para os controllers
├── middleware/     → validação do token JWT
└── index.js        → inicializa o servidor e a conexão com o banco
```

