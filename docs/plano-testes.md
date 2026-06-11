# Plano de Testes do AuraCup

Este plano documenta os casos de teste usados para validar o sistema AuraCup na atividade avaliativa de Qualidade e Teste de Software. Os casos cobrem fluxo do usuario, validacao de dados, seguranca, autenticacao, integracao com API e persistencia no banco.

## Escopo

- Frontend React/Vite com fluxo de cardapio, carrinho, pedidos e area de atendentes.
- API Laravel com endpoints de categorias, produtos, pedidos e atendentes.
- Testes E2E automatizados com Playwright na pasta `testes-playwright/tests`.
- Testes de backend com PHPUnit na pasta `backend/tests/Feature`.

## Casos de teste

| ID   | Funcionalidade        | Objetivo                                                                                                       | Tipo                           | Dados de entrada                                                                            | Resultado esperado                                                                                                        | Prioridade | Status final                                   |
| ---- | --------------------- | -------------------------------------------------------------------------------------------------------------- | ------------------------------ | ------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ---------- | ---------------------------------------------- |
| CT01 | Cardapio              | Verificar se o usuario consegue abrir o cardapio e visualizar produtos carregados pela API.                    | Funcional / E2E                | Acessar `/`, clicar em `View Menu`, API mockada com produtos validos.                       | A tela `MENU` aparece, o produto `Espresso Artesanal` fica visivel e o botao de adicionar ao carrinho existe.             | Alta       | Aprovado - automatizado em `cardapio.spec.js`  |
| CT02 | Pedido                | Validar o fluxo completo de usuario para montar o carrinho, ajustar quantidade, informar mesa e enviar pedido. | Funcional / E2E                | Produto disponivel, item adicionado duas vezes, mesa `7`, resposta da API com pedido `101`. | O carrinho mostra `2 items`, o pedido e criado com sucesso e o numero `101` e apresentado ao usuario.                     | Alta       | Aprovado - automatizado em `pedido.spec.js`    |
| CT03 | Validacao de pedido   | Garantir que numero de mesa invalido bloqueia o envio do pedido.                                               | Validacao / Negativo / E2E     | Produto no carrinho, mesa `0`.                                                              | O navegador marca o campo como invalido, nenhuma requisicao de pedido e enviada e nenhuma confirmacao de sucesso aparece. | Alta       | Aprovado - automatizado em `pedido.spec.js`    |
| CT04 | Seguranca no cardapio | Verificar se conteudo malicioso vindo da API nao executa JavaScript na tela.                                   | Seguranca / XSS / E2E          | Produto com nome `<img src=x onerror=alert(1)>`.                                            | O texto malicioso aparece escapado como texto, nenhum `alert` e disparado e a interface continua funcional.               | Alta       | Aprovado - automatizado em `seguranca.spec.js` |
| CT05 | Area de atendentes    | Validar login de atendente autorizado e listagem de pedidos restritos.                                         | Funcional / Autenticacao / E2E | E-mail `atendente@auracup.com`, senha `Auracup@123`, API mockada com pedido `#7`.           | A tela `Order Management` aparece, a secao `In progress` fica visivel e o pedido `#7` e listado.                          | Alta       | Aprovado - automatizado em `seguranca.spec.js` |
| CT06 | Acesso indevido       | Garantir que credenciais invalidas nao liberam a area de pedidos.                                              | Seguranca / Autorizacao / E2E  | E-mail `cliente@auracup.com`, senha `senha-incorreta`, resposta `401` da API.               | Mensagem de erro de login e exibida, o formulario continua visivel e a lista de pedidos nao aparece.                      | Alta       | Aprovado - automatizado em `seguranca.spec.js` |
| CT07 | API de pedidos        | Verificar se a API rejeita payload invalido ao criar pedido.                                                   | Validacao / API / Negativo     | `table_number` textual, `product_id` inexistente e quantidade `0`.                          | A API retorna `422` e informa erros de validacao para mesa, produto e quantidade.                                         | Alta       | Coberto por PHPUnit em `OrderApiTest.php`      |
| CT08 | Calculo de total      | Validar que o total do pedido e calculado a partir dos precos reais dos produtos.                              | Integracao / API / Banco       | Dois expressos e um cappuccino usando produtos cadastrados pelo seeder.                     | A API retorna pedido criado, total correto e itens persistidos em `orders` e `order_items`.                               | Alta       | Coberto por PHPUnit em `OrderApiTest.php`      |
| CT09 | Login nao autorizado  | Garantir que usuario comum nao acessa login de atendente.                                                      | Seguranca / API / Autorizacao  | Usuario com `is_attendant = false`, e-mail `cliente@auracup.com`, senha valida.             | A API retorna `401 Unauthorized` e nao gera token de atendente.                                                           | Alta       | Coberto por PHPUnit em `AttendantApiTest.php`  |
| CT10 | Gestao de pedidos     | Verificar se atendente autenticado consegue editar, concluir e cancelar pedido.                                | Funcional / API / Integracao   | Token de atendente, pedido pendente, nova mesa `9`, status `preparando`, novos itens.       | Pedido e atualizado com novo total; depois muda para `entregue` e, em seguida, para `cancelado`.                          | Media      | Coberto por PHPUnit em `AttendantApiTest.php`  |
| CT11 | Validacao de pedido   | Garantir que o envio do pedido seja bloqueado quando a mesa nao for informada.                                 | Validacao / Negativo / E2E     | Produto no carrinho, campo de mesa vazio.                                                   | O navegador aponta o campo como obrigatorio, nenhuma requisicao de pedido e enviada e nenhuma confirmacao aparece.        | Alta       | Aprovado - automatizado em `pedido.spec.js`    |

## Relacao com os requisitos minimos

| Requisito                                          | Atendimento no plano |
| -------------------------------------------------- | -------------------- |
| 11 casos documentados                              | CT01 a CT11          |
| 6 testes automatizados com Playwright              | CT01 a CT06          |
| 2 testes de validacao de dados                     | CT03 e CT11          |
| 1 teste de seguranca                               | CT04                 |
| 1 fluxo completo do usuario                        | CT02                 |
| 1 teste de acesso indevido ou fluxo nao autorizado | CT06 e CT09          |
| Uso de `expect` nos testes Playwright              | CT01 a CT06 e CT11   |

## Comandos relacionados

```bash
npm run test:e2e
```

Executa os casos Playwright CT01 a CT06 e CT11.

```bash
npm run test:backend
```

Executa os casos de API/backend CT07 a CT10 e outros testes de regressao do Laravel.
