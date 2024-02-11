# Tasks API

## Estrutura de uma task

Toda task deve conter os seguintes campos:

- `id`: Identificador único de cada task
- `title`: Título da task
- `description`: Descrição detalhada da task
- `completed_at`: Data de quando a task foi concluída. O valor inicial deve ser
`null`
- `created_at`: Data de quando a task foi criada
- `updated_at`: Data de quando a task foi atualizada pela última vez. O valor
inicial deve ser `null`

## Rotas

* `GET - /tasks`
* `POST - /tasks`
* `PUT - /tasks/:id`
* `PATCH - /tasks/:id/complete`
* `DELETE - /tasks/:id`

## Requisitos funcionais

- [x] Criação de uma task
- [x] Listagem de todas as tasks
- [ ] Atualização de uma task pelo `id`
- [x] Remover uma task pelo `id`
- [x] Marcar pelo `id` uma task completa
- [ ] Importar tasks em massa de um arquivo CSV

## Regras de negócio

* GET:
  - [x] Deve ser possível listar todas as tasks salvas no banco de dados
  - [x] Também deve ser possível realizar uma busca, filtrando as tasks pelo
  `title` e `description`
* POST:
  - [x] Deve ser possível criar uma task no banco de dados enviando os campos
  `title` e `description` por meio do `body` da requisição
  - [x] Ao criar uma task, os campos `id`, `created_at`, `updated_at` e
  `completed_at` devem ser preenchidos automaticamente conforme a orientação
  das propriedades a cima
  - [x] Deve ser validado de as propriedades `title` e `description` estão
  presentes no `body` da requisição
* PUT:
  - [ ] Deve ser possível atualizar uma task pelo `id`
  - [ ] No `body` da requisição, deve receber somente o `title` e/ou `description`
  para serem atualizados
  - [ ] Se for enviado somente `title`, significa que o `description` não pode
  ser atualizado e vice-versa
  - [ ] Antes de realizar a atualização deve ser feito uma validação se o `id`
  pertence a uma task já salva o banco de dados. Caso o atributo `id` não exista
  no banco de dados deve ser retornado uma mensagem informando que o registro
  não existe
  - [ ] O atributo `updated_at` deve ser atualizado sempre após essa rota ser
  chamada
  - [ ] Deve ser validado de as propriedades `title` e `description` estão
  presentes no `body` da requisição
* PATCH:
  - [x] Deve ser possível marcar ou desmarcar uma task como completa
  - [x] Antes da alteração deve ser feito uma validação se o `id` pertence
  a alguma task salva no banco. Caso o atributo `id` não exista
  no banco de dados deve ser retornado uma mensagem informando que o registro
  não existe
  - [x] O atributo `updated_at` deve ser atualizado sempre após essa rota ser
  chamada
* DELETE:
  - [x] Deve ser possível remover uma task pelo `id`
  - [x] Antes de realizar a remoção deve ser feito uma validação se o `id` pertence
  a alguma task salva no banco. Caso o atributo `id` não exista
  no banco de dados deve ser retornado uma mensagem informando que o registro
  não existe
