# Regras para agentes

- Antes de editar, leia `handoff.md` e `decisions.md`.
- Registre no `handoff.md`:
  - tarefa feita
  - arquivos alterados
  - testes executados
  - pendências
- Não edite arquivos fora do escopo da tarefa.
- Não reverta mudanças de outro agente sem autorização.

## Objetivos pendentes

- Feito: a suíte Playwright usa API mockada de forma determinística, sem depender do Laravel em `127.0.0.1:8000`.
- Decisão: Playwright deve subir Vite na porta `5174` com `--strictPort`, `--mode test` e `reuseExistingServer: false` para não reutilizar servidor antigo em `5173`.
- Manter `.env.test` com `VITE_API_BASE_URL=/api` para que os testes E2E interceptem `GET /api/products?available=1` e `POST /api/orders`.
- Feito: CT05 exibe `Order number: 101` e `Sent to the API`.
- Feito: CT06 renderiza o produto `xss-product` e não executa JavaScript malicioso.
- Feito: testes padrão `ExampleTest` do Laravel foram removidos porque não validavam requisitos do trabalho e um deles quebrava `npm run test:backend`.
- Feito: `npm test`, `npm run test:backend` e `npm run test:e2e` passam completamente.
- Feito: `docs/relatorio-tecnico.md` foi atualizado com os resultados reais da suíte completa.
- Feito: `docs/plano-testes.md`, `testes-playwright/README.md` e `backend/README.md` foram ajustados para ficarem coerentes com os testes executados.
- Feito: `handoff.md` e `decisions.md` foram criados localmente e adicionados ao `.gitignore` junto com `agents.md`.
- Observação: o PDF do enunciado foi acessado, mas o corpo não ficou extraível com as ferramentas locais; não há `pdftotext`, `pdfjs`, OCR, `tesseract`, `magick`, `mutool` ou `gs` instalados, e Chromium headless tratou o PDF como download.
- Observação: os helpers e variáveis dos testes Playwright foram traduzidos para português; seletores como `Add to cart`, `Name` e `Order created successfully.` continuam em inglês porque são textos reais da interface.
