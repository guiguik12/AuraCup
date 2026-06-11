// Gera o relatório técnico da atividade em PDF com formatação ABNT
// (A4, margens 3/3/2/2 cm, Times 12, espaçamento 1,5, seções numeradas,
// figuras com legenda e fonte). As evidências PNG são embutidas no PDF.
//
// Uso (na pasta testes-playwright):
//   node scripts/gerar-relatorio-tecnico.mjs
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..', '..');
const evidencias = path.join(projectRoot, 'docs', 'evidencias-execucao');
const outputPath = path.join(projectRoot, 'docs', 'relatorio-tecnico-auracup.pdf');

// Preencha com os dados reais antes da entrega.
const INSTITUICAO = 'Instituto Federal De Educação, Ciência e Tecnologia de Rondonia';
const CURSO = 'Análise e Desenvolvimento de Sistemas — 5º período';
const DISCIPLINA = 'Qualidade e Teste de Software';
const AUTORES = ['Luiz Guilherme Ribeiro da Costa', 'Eduarda Vitória', 'João do Monte', 'Matheus Henrique'];
const CIDADE = 'Porto Velho/RO';
const ANO = '2026';

// Números de página do sumário (confira após alterar o conteúdo).
const SUMARIO = [
  ['1 INTRODUÇÃO', 3],
  ['2 AMBIENTE DE EXECUÇÃO DO SISTEMA', 3],
  ['3 PLANO DE TESTES', 3],
  ['4 ESTRATÉGIA DE AUTOMAÇÃO', 4],
  ['5 EXECUÇÃO E RESULTADOS', 4],
  ['6 FALHAS ENCONTRADAS E CORREÇÕES', 10],
  ['7 CONCLUSÃO', 11],
  ['REFERÊNCIAS', 12],
];

async function img(relativePath) {
  const data = await readFile(path.join(evidencias, relativePath));
  return `data:image/png;base64,${data.toString('base64')}`;
}

function figura(numero, titulo, src) {
  return `
    <div class="figura">
      <p class="figura-titulo">Figura ${numero} — ${titulo}</p>
      <img src="${src}" alt="${titulo}" />
      <p class="figura-fonte">Fonte: elaborada pelos autores (${ANO}).</p>
    </div>`;
}

const planoLinhas = [
  ['CT01', 'Cardápio', 'Funcional / E2E', 'Produtos visíveis ao abrir o menu', 'Aprovado'],
  ['CT02', 'Pedido (fluxo completo)', 'Funcional / E2E', 'Pedido criado e confirmado com número', 'Aprovado'],
  ['CT03', 'Validação de mesa inválida', 'Validação / Negativo', 'Envio bloqueado, sem requisição à API', 'Aprovado'],
  ['CT04', 'Segurança (XSS)', 'Segurança / E2E', 'Script não executa; texto escapado', 'Aprovado'],
  ['CT05', 'Login de atendente', 'Autenticação / E2E', 'Área restrita liberada com pedidos listados', 'Aprovado'],
  ['CT06', 'Acesso indevido', 'Segurança / Autorização', 'Login negado com mensagem de erro', 'Aprovado'],
  ['CT07', 'API de pedidos', 'Validação / API', 'Payload inválido rejeitado com 422', 'Aprovado'],
  ['CT08', 'Cálculo de total', 'Integração / Banco', 'Total calculado pelos preços reais', 'Aprovado'],
  ['CT09', 'Login não autorizado', 'Segurança / API', 'Usuário comum recebe 401', 'Aprovado'],
  ['CT10', 'Gestão de pedidos', 'Funcional / API', 'Atendente edita, conclui e cancela pedido', 'Aprovado'],
  ['CT11', 'Validação de mesa vazia', 'Validação / Negativo', 'Campo obrigatório bloqueia envio', 'Aprovado'],
];

async function buildHtml() {
  const figMenu = await img('01-navegador/02-menu.png');
  const figConfirmacao = await img('01-navegador/05-confirmacao-pedido.png');
  const figAtendentes = await img('01-navegador/07-area-atendentes.png');
  const figXss = await img('01-navegador/08-xss-escapado.png');
  const figRelatorioHtml = await img('02-relatorio-html/01-relatorio-html-visao-geral.png');
  const figTerminalPw = await img('03-terminal/01-playwright-7-testes-passando.png');
  const figTerminalPhp = await img('03-terminal/02-phpunit-10-testes-passando.png');
  const figFalha = await img('04-falhas/01-phpunit-falha-inconsistencia-seeder.png');
  const figBanco = await img('05-banco-de-dados/02-pedido-persistido.png');

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<style>
  * { box-sizing: border-box; }
  body {
    font-family: 'Times New Roman', 'Liberation Serif', serif;
    font-size: 12pt;
    line-height: 1.5;
    color: #000;
    margin: 0;
  }
  p { text-align: justify; text-indent: 1.25cm; margin: 0 0 0.2cm 0; }
  p.sem-recuo { text-indent: 0; }
  h1 {
    font-size: 12pt;
    font-weight: bold;
    text-transform: uppercase;
    margin: 0.8cm 0 0.4cm 0;
  }
  h1.nao-numerada { text-align: center; }
  .capa {
    height: 24.6cm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: center;
    page-break-after: always;
  }
  .capa p { text-align: center; text-indent: 0; }
  .capa .titulo { font-weight: bold; text-transform: uppercase; font-size: 14pt; }
  .sumario { page-break-after: always; }
  .sumario table { width: 100%; border-collapse: collapse; }
  .sumario td { padding: 0.1cm 0; vertical-align: bottom; }
  .sumario td.pagina { text-align: right; width: 1.5cm; }
  .sumario td.linha { border-bottom: 1px dotted #000; }
  table.quadro {
    width: 100%;
    border-collapse: collapse;
    font-size: 10pt;
    margin: 0.2cm 0;
  }
  table.quadro th, table.quadro td {
    border: 1px solid #000;
    padding: 0.12cm 0.18cm;
    text-align: left;
    vertical-align: top;
  }
  table.quadro th { background: #efefef; }
  .quadro-titulo, .figura-titulo {
    text-align: center;
    text-indent: 0;
    font-size: 10pt;
    margin: 0.4cm 0 0.1cm 0;
  }
  .quadro-fonte, .figura-fonte {
    text-align: center;
    text-indent: 0;
    font-size: 10pt;
    margin: 0.1cm 0 0.4cm 0;
  }
  .figura { break-inside: avoid; margin: 0.3cm 0; }
  .figura img {
    display: block;
    max-width: 100%;
    max-height: 9.5cm;
    margin: 0 auto;
    border: 1px solid #999;
  }
  .referencias p { text-indent: 0; margin-bottom: 0.4cm; }
  code { font-family: 'Courier New', monospace; font-size: 10.5pt; }
</style>
</head>
<body>

<div class="capa">
  <div>
    <p>${INSTITUICAO}</p>
    <p>${CURSO}</p>
    <p>${AUTORES.join('<br/>')}</p>
  </div>
  <div>
    <p class="titulo">Relatório Técnico de Testes Automatizados<br/>Sistema AuraCup</p>
    <p>${DISCIPLINA}</p>
  </div>
  <div>
    <p>${CIDADE}</p>
    <p>${ANO}</p>
  </div>
</div>

<div class="sumario">
  <h1 class="nao-numerada">Sumário</h1>
  <table>
    ${SUMARIO.map(
      ([titulo, pagina]) =>
        `<tr><td class="linha">${titulo}</td><td class="linha pagina">${pagina}</td></tr>`
    ).join('\n')}
  </table>
</div>

<h1>1 Introdução</h1>
<p>Este relatório apresenta o planejamento, a automação, a execução e a análise dos testes
aplicados ao sistema AuraCup, um cardápio digital de cafeteria com fluxo de pedidos e área
restrita para atendentes. O sistema é composto por um frontend em React/Vite e por uma API
REST desenvolvida em PHP com o framework Laravel, com persistência em banco de dados SQLite.</p>
<p>O objetivo da atividade não foi desenvolver novas funcionalidades, mas validar comportamentos
do sistema já implementado por meio de testes automatizados, cobrindo funcionalidades, validação
de dados, fluxos de navegação, integração com banco de dados e segurança básica. A automação da
interface foi realizada com a ferramenta Playwright e a validação da API e do banco com PHPUnit.</p>

<h1>2 Ambiente de execução do sistema</h1>
<p>O sistema é executado localmente com as seguintes ferramentas e configurações:</p>
<p class="sem-recuo">a) frontend: Vite em <code>http://127.0.0.1:5174</code> (modo de teste) ou
<code>npm run dev</code> para uso geral;</p>
<p class="sem-recuo">b) backend: Laravel via <code>php artisan serve</code> em
<code>http://127.0.0.1:8000</code>;</p>
<p class="sem-recuo">c) banco de dados: SQLite, arquivo <code>backend/database/database.sqlite</code>,
criado e populado com <code>php artisan migrate:fresh --seed</code> (migrations e
<code>MenuSeeder</code> substituem o arquivo SQL tradicional);</p>
<p class="sem-recuo">d) conexão configurada em <code>backend/.env</code>
(<code>DB_CONNECTION=sqlite</code>);</p>
<p class="sem-recuo">e) testes: <code>npm run test:e2e</code> (Playwright, que sobe o Vite
automaticamente) e <code>npm run test:backend</code> (PHPUnit com banco em memória).</p>
<p>As instruções completas de preparação do ambiente estão no arquivo
<code>docs/guia-testes.md</code> do repositório.</p>

<h1>3 Plano de testes</h1>
<p>O plano de testes completo, com identificador, funcionalidade, objetivo, tipo, dados de
entrada, resultado esperado, prioridade e status final, está documentado em
<code>docs/plano-testes.md</code>. O Quadro 1 resume os onze casos de teste.</p>
<p class="quadro-titulo">Quadro 1 — Resumo dos casos de teste</p>
<table class="quadro">
  <tr><th>ID</th><th>Funcionalidade</th><th>Tipo</th><th>Resultado esperado</th><th>Status</th></tr>
  ${planoLinhas
    .map(linha => `<tr>${linha.map(c => `<td>${c}</td>`).join('')}</tr>`)
    .join('\n  ')}
</table>
<p class="quadro-fonte">Fonte: elaborado pelos autores (${ANO}).</p>

<h1>4 Estratégia de automação</h1>
<p>A cobertura foi dividida em duas camadas complementares. A camada de interface, automatizada
com Playwright (casos CT01 a CT06 e CT11), valida a experiência do usuário: abertura do sistema
com <code>page.goto()</code>, preenchimento de campos com <code>fill()</code>, cliques com
<code>click()</code>, navegação entre telas e validações com <code>expect()</code>. Os testes
estão organizados por funcionalidade nos arquivos <code>cardapio.spec.js</code>,
<code>pedido.spec.js</code> e <code>seguranca.spec.js</code>.</p>
<p>A camada de API e banco, automatizada com PHPUnit (casos CT07 a CT10), valida as rotas
<code>GET /api/categories</code>, <code>GET /api/products</code>, <code>POST /api/orders</code>
e a área de atendentes, incluindo o cálculo do total do pedido a partir dos preços reais, a
persistência nas tabelas <code>orders</code> e <code>order_items</code> e a autorização por
token.</p>
<p>Nos testes E2E, as respostas da API são interceptadas com <code>page.route()</code> para
tornar os cenários determinísticos; a integração real com o banco de dados é exercitada pela
camada PHPUnit, que executa as migrations e o seeder em banco SQLite em memória a cada teste.</p>

<h1>5 Execução e resultados</h1>
<p>As duas suítes foram executadas integralmente, com aprovação em todos os casos: a suíte
Playwright registrou 7 testes aprovados (Figura 1) e a suíte PHPUnit registrou 10 testes
aprovados com 43 asserções (Figura 2).</p>
${figura(1, 'Execução da suíte Playwright no terminal (7 testes aprovados)', figTerminalPw)}
${figura(2, 'Execução da suíte PHPUnit no terminal (10 testes aprovados)', figTerminalPhp)}
<p>O relatório HTML do Playwright consolida a execução por arquivo de teste, conforme a
Figura 3.</p>
${figura(3, 'Relatório HTML do Playwright com os 7 testes aprovados', figRelatorioHtml)}
<p>No fluxo completo do usuário (CT02), esperava-se montar o carrinho, ajustar a quantidade,
informar a mesa e receber a confirmação do pedido; o resultado obtido correspondeu ao esperado,
com o cardápio carregado pela API (Figura 4) e o pedido nº 101 confirmado na interface
(Figura 5). A asserção sobre o payload enviado confirmou mesa 7 e dois itens do produto
selecionado.</p>
${figura(4, 'Cardápio carregado com produtos da API', figMenu)}
${figura(5, 'Confirmação do pedido ao final do fluxo completo do usuário', figConfirmacao)}
<p>Nos casos de validação (CT03 e CT11), esperava-se que mesa inválida ou vazia bloqueasse o
envio; o resultado obtido confirmou que o navegador marca o campo como inválido e que nenhuma
requisição é enviada à API. Na API (CT07), payload inválido foi rejeitado com código 422 e
mensagens de validação.</p>
<p>No teste de segurança (CT04), esperava-se que conteúdo malicioso vindo da API não executasse
JavaScript; o resultado obtido mostrou o payload <code>&lt;img src=x onerror=alert(1)&gt;</code>
renderizado como texto escapado, sem disparo de <code>alert</code> (Figura 6).</p>
${figura(6, 'Payload de XSS exibido como texto escapado, sem execução', figXss)}
<p>Na área restrita (CT05, CT06 e CT09), o login válido de atendente liberou a gestão de
pedidos (Figura 7), enquanto credenciais inválidas e usuários sem perfil de atendente foram
rejeitados com mensagem de erro e resposta 401, sem emissão de token.</p>
${figura(7, 'Gestão de pedidos liberada após autenticação do atendente', figAtendentes)}
<p>Na integração com o banco de dados (CT08), um pedido real criado via
<code>POST /api/orders</code> persistiu com total de R$ 21,00, correspondente a dois Expressos
Artesanais (R$ 6,00) e um Café com Leite (R$ 9,00), conforme as tabelas <code>orders</code> e
<code>order_items</code> na Figura 8.</p>
${figura(8, 'Pedido persistido nas tabelas orders e order_items do SQLite', figBanco)}

<h1>6 Falhas encontradas e correções</h1>
<p>Durante a preparação da suíte foram encontradas três falhas, todas corrigidas na versão
final. A primeira e mais relevante foi a inconsistência entre os testes de API e o seeder do
cardápio: os testes esperavam a categoria “Cafés Especiais” e produtos antigos, enquanto o
sistema atual cadastra as categorias “Especial” e “Para Acompanhar” e o produto “Café com
Leite”. A Figura 9 mostra a reprodução real da falha, com dois testes reprovados
(<code>Unable to find JSON fragment</code> e <code>ModelNotFoundException</code>).</p>
${figura(9, 'Reprodução da falha de inconsistência entre testes e seeder (2 reprovados)', figFalha)}
<p>A correção aplicada alinhou as expectativas dos testes ao cardápio real. As demais falhas
foram: mocks do Playwright desatualizados em relação ao cardápio (produto e total divergentes),
corrigidos em <code>helpers.js</code>; e ausência da pasta <code>backend/tests/Unit</code>,
que causava falha estrutural do PHPUnit e foi adicionada ao repositório. A análise completa,
com sintoma, resultado esperado, resultado obtido e correção de cada falha, está em
<code>docs/evidencias-execucao/04-falhas/falhas-encontradas.md</code>.</p>
<p>Como recomendação de melhoria, sugere-se exibir mensagem de validação própria da aplicação
para o campo de mesa (hoje a validação é a nativa do navegador) e padronizar os textos da
interface em um único idioma.</p>

<h1>7 Conclusão</h1>
<p>Os resultados demonstram que o sistema AuraCup atende aos comportamentos esperados nos
fluxos principais: o cardápio é carregado corretamente, o fluxo completo de pedido funciona de
ponta a ponta, as validações de entrada bloqueiam dados inválidos, o conteúdo malicioso é
neutralizado por escapamento e a área de atendentes é protegida por autenticação e autorização.
A atividade também evidenciou o valor dos testes automatizados com asserções: as falhas de
inconsistência entre testes e dados reais só foram detectadas porque cada caso valida o
comportamento com <code>expect</code>, e não apenas executa ações na interface.</p>

<h1 class="nao-numerada">Referências</h1>
<div class="referencias">
<p>LARAVEL. <b>Laravel Documentation</b>: testing. Disponível em:
https://laravel.com/docs/testing. Acesso em: 11 jun. ${ANO}.</p>
<p>MICROSOFT. <b>Playwright Documentation</b>. Disponível em: https://playwright.dev/docs/intro.
Acesso em: 11 jun. ${ANO}.</p>
<p>OWASP FOUNDATION. <b>Cross Site Scripting (XSS)</b>. Disponível em:
https://owasp.org/www-community/attacks/xss/. Acesso em: 11 jun. ${ANO}.</p>
<p>PHPUNIT. <b>PHPUnit Manual</b>. Disponível em: https://docs.phpunit.de/. Acesso em:
11 jun. ${ANO}.</p>
</div>

</body>
</html>`;
}

const html = await buildHtml();
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setContent(html, { waitUntil: 'load' });
await page.pdf({
  path: outputPath,
  format: 'A4',
  printBackground: true,
  displayHeaderFooter: true,
  headerTemplate: `
    <div style="width:100%; font-family:'Times New Roman', serif; font-size:10px;
                padding-right:2cm; text-align:right;">
      <span class="pageNumber"></span>
    </div>`,
  footerTemplate: '<span></span>',
  margin: { top: '3cm', bottom: '2cm', left: '3cm', right: '2cm' },
});
await browser.close();

console.log(`Relatório gerado em: ${outputPath}`);
