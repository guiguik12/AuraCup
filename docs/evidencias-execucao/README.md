# Evidências de Execução

Pasta organizada conforme a seção "Evidências esperadas" do trabalho avaliativo. Cada subpasta corresponde a um item da lista.

| Item do trabalho | Onde está |
| --- | --- |
| Prints da execução no navegador | `01-navegador/` |
| Prints do relatório HTML do Playwright | `02-relatorio-html/` |
| Prints dos testes passando | `03-terminal/` |
| Prints dos testes falhando e das falhas encontradas | `04-falhas/` |
| Prints do terminal | `03-terminal/` e `04-falhas/` |
| Prints do banco de dados | `05-banco-de-dados/` |
| Trace / relatório HTML | `06-trace/trace-execucao.zip` e `testes-playwright/playwright-report/` |

## 01-navegador — execução no navegador

Fluxo completo do usuário e da área de atendentes, capturado pelo Chromium:

- `01-home.png` — tela inicial.
- `02-menu.png` — cardápio carregado pela API.
- `03-carrinho.png` — item adicionado ao carrinho.
- `04-checkout.png` — mesa informada no checkout.
- `05-confirmacao-pedido.png` — confirmação do pedido enviado.
- `06-login-atendente.png` — tela de login da área restrita.
- `07-area-atendentes.png` — gestão de pedidos após login autorizado.
- `08-xss-escapado.png` — payload `<img src=x onerror=alert(1)>` renderizado como texto, sem execução (CT04).

## 02-relatorio-html — relatório HTML do Playwright

- `01-relatorio-html-visao-geral.png` — 7 testes aprovados, agrupados por arquivo `.spec.js`.
- `02-relatorio-html-detalhe-teste.png` — detalhe dos passos do teste de fluxo completo (CT02).

## 03-terminal — testes passando

- `01-playwright-7-testes-passando.png` — `npm test` na pasta `testes-playwright`: 7 passed.
- `02-phpunit-10-testes-passando.png` — `php artisan test` no backend: 10 passed, 43 assertions.

## 04-falhas — testes falhando e falhas encontradas

- `01-phpunit-falha-inconsistencia-seeder.png` — reprodução real da falha encontrada durante o trabalho (versão antiga dos testes contra o seeder atual): 2 failed.
- `falhas-encontradas.md` — lista das falhas, análise e correções aplicadas.

## 05-banco-de-dados — persistência

- `01-tabelas-categorias-produtos.png` — tabelas `categories` e `products` após `php artisan migrate:fresh --seed`.
- `02-pedido-persistido.png` — tabelas `orders` e `order_items` após criar um pedido real via `POST /api/orders` (total `2100` = 2× Expresso `600` + 1× Café com Leite `900`).

## 06-trace — trace do Playwright

- `trace-execucao.zip` — trace com screenshots, snapshots e fontes; abra com `npx playwright show-trace trace-execucao.zip`.

## Como regenerar

```bash
# prints do navegador + trace (pasta testes-playwright)
node scripts/coletar-evidencias.mjs

# prints de terminal a partir de uma saída capturada
node scripts/print-terminal.mjs <saida.txt> <destino.png> "<titulo>"
```
