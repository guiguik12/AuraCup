# Guia de Testes do AuraCup

Este guia mostra como preparar o ambiente e executar os testes disponíveis na branch `main` atual do AuraCup.

## Visao geral

Hoje a branch `main` possui testes automatizados de backend para a API Laravel/SQLite.

Os testes cobrem:

- Listagem de categorias em `GET /api/categories`.
- Listagem de produtos em `GET /api/products`.
- Persistencia dos campos traduzidos de produto, como `name_en`, `name_pt`, `description_en` e `description_pt`.
- Criacao de pedido em `POST /api/orders`.
- Calculo real do total do pedido a partir dos precos dos produtos.
- Persistencia dos itens em `order_items`.
- Consulta de pedido em `GET /api/orders/{id}`.
- Validacao de payload invalido ao criar pedido.

## Pre-requisitos

Antes de rodar os testes, confirme que voce tem instalado:

- Node.js e npm.
- PHP compativel com o projeto.
- Composer.
- Dependencias do frontend instaladas com `npm install`.
- Dependencias do backend instaladas com `composer install` dentro da pasta `backend`.

## Preparar o ambiente

Na raiz do projeto, instale as dependencias do frontend:

```bash
npm install
```

Depois entre na pasta do backend e instale as dependencias PHP:

```bash
cd backend
composer install
```

Se o backend ainda nao tiver arquivo `.env`, crie a partir do exemplo:

```bash
copy .env.example .env
```

Gere a chave da aplicacao:

```bash
php artisan key:generate
```

Volte para a raiz do projeto:

```bash
cd ..
```

## Rodar os testes de backend

O comando recomendado, a partir da raiz do projeto, e:

```bash
npm run test:backend
```

Esse comando executa:

```bash
cd backend && php artisan test
```

Resultado esperado:

```text
6 testes passaram, 26 assertions
```

## Rodar direto pelo Laravel

Se preferir rodar diretamente dentro do backend:

```bash
cd backend
php artisan test
```

Tambem e possivel usar o script do Composer:

```bash
composer test
```

Se `composer test` der erro de permissao no seu ambiente, use `php artisan test`.

## Validar migrations e seeders

Para recriar o banco e popular os dados padrao do cardapio:

```bash
cd backend
php artisan migrate:fresh --seed
```

Esse comando:

- Apaga as tabelas atuais.
- Recria as tabelas pelas migrations.
- Executa o `DatabaseSeeder`.
- Popula categorias e produtos pelo `MenuSeeder`.

Para testar isso sem depender do banco local, use o ambiente de teste:

```bash
php artisan migrate:fresh --seed --env=testing
```

## Ver rotas da API

Para conferir quais endpoints estao registrados:

```bash
cd backend
php artisan route:list --path=api
```

Rotas esperadas:

```text
GET|HEAD  api/demo
GET|HEAD  api/categories
GET|HEAD  api/products
POST      api/orders
GET|HEAD  api/orders/{id}
```

## Testar o build do frontend

Para verificar se o frontend compila:

```bash
npm run build
```

Resultado esperado:

```text
vite build
✓ built
```

Pode aparecer um aviso sobre chunks maiores que 500 kB. Isso nao significa que o build falhou; e apenas um alerta de otimizacao.

## Sobre os testes Playwright

A branch `main` atual possui a suite Playwright versionada na pasta `testes-playwright`.

O fluxo recomendado e:

```bash
npm run test:e2e
```

Ou, entrando direto na pasta:

```bash
cd testes-playwright
npm test
```

A configuracao esperada e:

- Vite em `http://127.0.0.1:5174`.
- `--strictPort`.
- `--mode test`.
- `reuseExistingServer: false`.
- `.env.test` com `VITE_API_BASE_URL=/api`.

Isso permite que o Playwright intercepte `/api/products`, `/api/orders` e as rotas da area de atendentes de forma deterministica, sem depender do Laravel rodando em `127.0.0.1:8000`.

## Problemas comuns

### `npm run test:backend` nao existe

Confirme se o `package.json` da raiz possui este script:

```json
"test:backend": "cd backend && php artisan test"
```

### Teste Laravel falha em `/` retornando 404

Isso indica que os testes padrao `ExampleTest` voltaram para o projeto.

Eles nao validam a API do AuraCup. Remova os arquivos:

```text
backend/tests/Feature/ExampleTest.php
backend/tests/Unit/ExampleTest.php
```

### Seeder nao encontrado

Confirme se o namespace do seeder esta assim:

```php
namespace Database\Seeders;
```

Arquivo:

```text
backend/database/seeders/MenuSeeder.php
```

### Produto nao salva `name_en` ou `name_pt`

Confirme se o model `Product` possui os campos traduzidos em `$fillable`:

```php
protected $fillable = [
    'category_id',
    'name_en',
    'name_pt',
    'description_en',
    'description_pt',
    'price',
    'image_url',
    'is_available',
];
```

## Sequencia recomendada antes de entregar

Rode estes comandos na raiz do projeto:

```bash
npm run test:backend
npm run test:e2e
npm run build
```

Se os tres passarem, o backend esta validado, o fluxo E2E esta consistente e o frontend esta compilando.
