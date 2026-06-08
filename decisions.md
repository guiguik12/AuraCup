# Decisões dos agentes

- `agents.md`, `handoff.md` e `decisions.md` são arquivos locais de coordenação entre agentes e ficam no `.gitignore`.
- A suíte Playwright deve rodar o Vite em `http://127.0.0.1:5174`, com `--strictPort`, `--mode test` e `reuseExistingServer: false`.
- `.env.test` deve usar `VITE_API_BASE_URL=/api` para permitir mocks determinísticos em `/api/products?available=1` e `/api/orders`.
- Os testes padrão `ExampleTest` do Laravel foram removidos porque não validavam requisitos do trabalho avaliativo.
- O relatório técnico deve refletir somente resultados reexecutados após as correções.
- A suite Playwright ficou em `testes-playwright`, com `npm test` local e `npm run test:e2e` na raiz.
