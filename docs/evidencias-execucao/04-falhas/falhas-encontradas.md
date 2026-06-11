# Falhas encontradas e sugestões de correção

Durante a preparação da suite de testes foram encontradas as falhas abaixo. Todas já foram corrigidas na versão atual da branch, e o print `01-phpunit-falha-inconsistencia-seeder.png` mostra a reprodução real da execução com falha (rodando a versão antiga dos testes contra o sistema atual).

## F01 — Testes de API inconsistentes com o seeder do cardápio

- **Onde:** `backend/tests/Feature/MenuApiTest.php` e `backend/tests/Feature/OrderApiTest.php`.
- **Sintoma:** `php artisan test` falhava com `Unable to find JSON fragment: [{"name":"Cafés Especiais"}]` e `ModelNotFoundException`, pois os testes esperavam a categoria `Cafés Especiais` e produtos antigos, enquanto o `MenuSeeder` atual cadastra as categorias `Especial` e `Para Acompanhar` e o produto `Café com Leite`.
- **Resultado esperado:** testes alinhados aos dados reais do cardápio, validando categorias e produtos efetivamente cadastrados.
- **Resultado obtido (antes da correção):** 2 testes falhando, 8 passando.
- **Correção aplicada:** expectativas dos testes atualizadas para o cardápio atual (`Especial`, `Para Acompanhar`, `Café com Leite`, preços reais).

## F02 — Mocks do Playwright desatualizados em relação ao cardápio real

- **Onde:** `testes-playwright/tests/helpers.js`.
- **Sintoma:** os mocks usavam o produto `Cappuccino Classic` (R$ 12,50), que não existe mais no cardápio; o produto real é `Café com Leite` (R$ 9,00), gerando totais divergentes na área de atendentes.
- **Correção aplicada:** catálogo mockado e pedidos da área de atendentes alinhados ao seeder, com recálculo do total (`1850` → `2100`).

## F03 — PHPUnit falhava por ausência da pasta `tests/Unit`

- **Onde:** `backend/phpunit.xml` referencia a suite `Unit` em `tests/Unit`.
- **Sintoma:** falha estrutural do PHPUnit quando a pasta não existia.
- **Correção aplicada:** pasta `backend/tests/Unit` adicionada ao repositório.

## Validações que bloquearam entradas inválidas (comportamento correto)

Os testes negativos confirmaram que o sistema bloqueia corretamente:

- Pedido com mesa inválida (`0`) ou vazia — nenhuma requisição é enviada à API (CT03 e CT11).
- Payload inválido em `POST /api/orders` — a API responde `422` com erros de validação (CT07).
- Login de atendente com credenciais inválidas ou usuário comum — `401` sem token (CT06 e CT09).
- Conteúdo malicioso (`<img src=x onerror=alert(1)>`) vindo da API — renderizado escapado, sem execução de script (CT04).
