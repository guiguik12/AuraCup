# Playwright

Teste E2E da AuraCup.

## Rodar

Na raiz do projeto:

```bash
npm run test:e2e
```

Ou direto na pasta:

```bash
cd testes-playwright
npm test
```

## Configuração

- Vite em `http://127.0.0.1:5174`
- `--strictPort`
- `--mode test`
- `reuseExistingServer: false`
- `.env.test` com `VITE_API_BASE_URL=/api`
