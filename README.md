# 🧠 Pareidolia API

> API REST para registro e análise clínica de casos de pareidolia, desenvolvida como projeto acadêmico na disciplina de Desenvolvimento Web III.

Pareidolia é o fenômeno psicológico em que o cérebro humano reconhece padrões familiares — como rostos e figuras — em estímulos visuais aleatórios, como nuvens, manchas ou sombras. Essa API permite que profissionais da área da saúde registrem, classifiquem e acompanhem esses casos de forma estruturada e segura.

---

## Endpoints de Usuários
 
### POST /user
 
Esse endpoint é responsável por cadastrar um novo profissional no banco de dados.
 
**Parâmetros:**
- `name`: Nome do profissional.
- `email`: E-mail do profissional.
- `password`: Senha do profissional (será criptografada com bcrypt).
 
Exemplo de requisição:
 
```json
{
    "name": "Dr. Silva",
    "email": "dr.silva@email.com",
    "password": "123456"
}
```
 
**Respostas:**
 
✅ Criado! `201`
 
Caso essa resposta aconteça, o usuário foi cadastrado com sucesso.
 
Exemplo de resposta:
 
```json
{
    "message": "Usuário clínico cadastrado com sucesso!"
}
```
 
❌ Erro Interno do Servidor! `500`
 
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.
 
Exemplo de resposta:
 
```json
{
    "error": "Erro ao cadastrar usuário."
}
```
 
---
 
### POST /auth
 
Esse endpoint é responsável por autenticar um profissional e retornar um token JWT.
 
**Parâmetros:**
- `email`: E-mail do profissional.
- `password`: Senha do profissional.
 
Exemplo de requisição:
 
```json
{
    "email": "dr.silva@email.com",
    "password": "123456"
}
```
 
**Respostas:**
 
✅ OK! `200`
 
Caso essa resposta aconteça, o login foi realizado com sucesso e o token JWT foi retornado.
 
Exemplo de resposta:
 
```json
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "message": "Login realizado!"
}
```
 
❌ Não Autorizado! `401`
 
Caso essa resposta aconteça, significa que o e-mail ou senha estão incorretos.
 
Exemplo de resposta:
 
```json
{
    "error": "Credenciais inválidas."
}
```
 
❌ Erro Interno do Servidor! `500`
 
Exemplo de resposta:
 
```json
{
    "error": "Erro no login."
}
```
 
---
 
## Endpoints de Casos
 
> ⚠️ Todos os endpoints de casos requerem autenticação. Envie o token no header da requisição:
> `Authorization: Bearer <token>`
 
---
 
### GET /casos
 
Esse endpoint é responsável por retornar a listagem de todos os casos cadastrados no banco de dados.
 
**Parâmetros:** Nenhum
 
**Respostas:**
 
✅ OK! `200`
 
Caso essa resposta aconteça, você vai receber a listagem de todos os casos.
 
Exemplo de resposta:
 
```json
{
    "casos": [
        {
            "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
            "nomePaciente": "João M.",
            "oQueViu": "Rosto em nuvem",
            "oQueEraRealidade": "Formação em nuvem",
            "categoriaVisual": "Natureza",
            "tipoReconhecimento": "Conceitual",
            "anguloEspecifico": false,
            "nivelClareza": 7,
            "observacoesClinicas": "Paciente relatou visão clara",
            "historicoObservacoes": [
                {
                    "texto": "Paciente relatou visão muito nítida",
                    "data": "2024-01-15T10:30:00.000Z",
                    "profissional": "Dr. Silva"
                }
            ],
            "status": "Pendente",
            "createdAt": "2024-01-15T10:30:00.000Z"
        }
    ]
}
```
 
❌ Não Autorizado! `401`
 
Caso essa resposta aconteça, significa que o token não foi enviado ou é inválido.
 
Exemplo de resposta:
 
```json
{
    "error": "Acesso não autorizado. Faça login para continuar."
}
```
 
❌ Erro Interno do Servidor! `500`
 
Exemplo de resposta:
 
```json
{
    "error": "Erro ao listar casos."
}
```
 
---
 
### GET /casos/:id
 
Esse endpoint é responsável por retornar as informações de um caso específico pelo seu ID.
 
**Parâmetros:**
- `id`: ID do caso a ser consultado.
 
**Respostas:**
 
✅ OK! `200`
 
Caso essa resposta aconteça, você vai receber as informações do caso solicitado.
 
Exemplo de resposta:
 
```json
{
    "caso": {
        "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
        "nomePaciente": "João M.",
        "oQueViu": "Rosto em nuvem",
        "oQueEraRealidade": "Formação em nuvem",
        "categoriaVisual": "Natureza",
        "tipoReconhecimento": "Conceitual",
        "anguloEspecifico": false,
        "nivelClareza": 7,
        "observacoesClinicas": "Paciente relatou visão clara",
        "historicoObservacoes": [
            {
                "texto": "Paciente relatou visão muito nítida",
                "data": "2024-01-15T10:30:00.000Z",
                "profissional": "Dr. Silva"
            }
        ],
        "status": "Pendente"
    }
}
```
 
❌ Não Encontrado! `404`
 
Caso essa resposta aconteça, significa que o caso com o ID fornecido não foi encontrado.
 
Exemplo de resposta:
 
```json
{
    "error": "Caso não encontrado."
}
```
 
❌ Requisição Inválida! `400`
 
Caso essa resposta aconteça, significa que o ID fornecido é inválido.
 
Exemplo de resposta:
 
```json
{
    "error": "ID inválido."
}
```
 
❌ Erro Interno do Servidor! `500`
 
Exemplo de resposta:
 
```json
{
    "error": "Erro ao buscar caso."
}
```
 
---
 
### POST /casos
 
Esse endpoint é responsável por cadastrar um novo caso clínico no banco de dados.
 
**Parâmetros:**
- `nomePaciente`: Nome do paciente.
- `oQueViu`: O que o paciente relatou ter visto.
- `oQueEraRealidade`: O que o estímulo realmente era.
- `categoriaVisual`: Categoria visual da cena observada.
- `tipoReconhecimento`: Tipo de reconhecimento — `Conceitual` ou `Contextual`.
- `anguloEspecifico`: Se a percepção depende de um ângulo específico (opcional).
- `nivelClareza`: Nível de clareza percebida de 1 a 10 (opcional).
- `observacoesClinicas`: Notas adicionais do profissional (opcional).
- `historicoObservacoes`: Array de observações aninhadas (opcional).
 
Exemplo de requisição:
 
```json
{
    "nomePaciente": "João M.",
    "oQueViu": "Rosto em nuvem",
    "oQueEraRealidade": "Formação em nuvem",
    "categoriaVisual": "Natureza",
    "tipoReconhecimento": "Conceitual",
    "anguloEspecifico": false,
    "nivelClareza": 7,
    "observacoesClinicas": "Paciente relatou visão clara",
    "historicoObservacoes": [
        {
            "texto": "Paciente relatou visão muito nítida",
            "profissional": "Dr. Silva"
        }
    ]
}
```
 
**Respostas:**
 
✅ Criado! `201`
 
Caso essa resposta aconteça, o novo caso foi registrado com sucesso.
 
Exemplo de resposta:
 
```json
{
    "message": "Caso registrado!",
    "caso": {
        "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
        "nomePaciente": "João M.",
        "status": "Pendente"
    }
}
```
 
❌ Erro Interno do Servidor! `500`
 
Exemplo de resposta:
 
```json
{
    "error": "Erro ao registrar caso."
}
```
 
---
 
### PUT /casos/:id
 
Esse endpoint é responsável por atualizar as informações de um caso específico pelo seu ID.
 
**Parâmetros:**
- `id`: ID do caso a ser atualizado.
- Qualquer campo do caso pode ser atualizado (todos opcionais).
 
Exemplo de requisição:
 
```json
{
    "status": "Analisado",
    "observacoesClinicas": "Caso revisado pelo Dr. Silva"
}
```
 
**Respostas:**
 
✅ OK! `200`
 
Caso essa resposta aconteça, o caso foi atualizado com sucesso.
 
Exemplo de resposta:
 
```json
{
    "message": "Caso atualizado!",
    "caso": {
        "_id": "64f1a2b3c4d5e6f7a8b9c0d1",
        "nomePaciente": "João M.",
        "status": "Analisado",
        "observacoesClinicas": "Caso revisado pelo Dr. Silva"
    }
}
```
 
❌ Não Encontrado! `404`
 
Exemplo de resposta:
 
```json
{
    "error": "Caso não encontrado."
}
```
 
❌ Requisição Inválida! `400`
 
Exemplo de resposta:
 
```json
{
    "error": "ID inválido."
}
```
 
❌ Erro Interno do Servidor! `500`
 
Exemplo de resposta:
 
```json
{
    "error": "Erro ao atualizar caso."
}
```
 
---
 
### DELETE /casos/:id
 
Esse endpoint é responsável por deletar um caso específico pelo seu ID.
 
**Parâmetros:**
- `id`: ID do caso a ser deletado.
 
**Respostas:**
 
✅ Sem Conteúdo! `204`
 
Caso essa resposta aconteça, o caso foi deletado com sucesso e não há conteúdo para retornar.
 
Exemplo de resposta: Nenhum conteúdo retornado.
 
❌ Requisição Inválida! `400`
 
Caso essa resposta aconteça, significa que o ID fornecido é inválido.
 
Exemplo de resposta:
 
```json
{
    "error": "ID inválido."
}
```
 
❌ Erro Interno do Servidor! `500`
 
Exemplo de resposta:
 
```json
{
    "error": "Erro ao deletar caso."
}
```

