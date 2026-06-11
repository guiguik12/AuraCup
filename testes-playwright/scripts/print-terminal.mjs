// Renderiza a saida de um comando de terminal como print PNG para as
// evidencias da atividade. Uso:
//   node scripts/print-terminal.mjs <arquivo-de-texto> <saida.png> [titulo]
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';

const [, , inputFile, outputFile, title = ''] = process.argv;

if (!inputFile || !outputFile) {
  console.error(
    'Uso: node scripts/print-terminal.mjs <arquivo-de-texto> <saida.png> [titulo]'
  );
  process.exit(1);
}

function escapeHtml(text) {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

// Remove codigos ANSI de cor para o texto ficar legivel no print.
function stripAnsi(text) {
  // eslint-disable-next-line no-control-regex
  return text.replace(/\[[0-9;]*m/g, '');
}

const raw = await readFile(inputFile, 'utf8');
const content = escapeHtml(stripAnsi(raw).trimEnd());

const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body {
        margin: 0;
        background: #1e1e2e;
        font-family: 'Cascadia Code', 'Fira Code', Menlo, Consolas, monospace;
      }
      .titlebar {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        background: #181825;
        color: #a6adc8;
        font-size: 13px;
      }
      .dot { width: 12px; height: 12px; border-radius: 50%; }
      .red { background: #f38ba8; }
      .yellow { background: #f9e2af; }
      .green { background: #a6e3a1; }
      pre {
        margin: 0;
        padding: 18px 22px;
        color: #cdd6f4;
        font-size: 13px;
        line-height: 1.5;
        white-space: pre-wrap;
        word-break: break-word;
      }
    </style>
  </head>
  <body>
    <div class="titlebar">
      <span class="dot red"></span>
      <span class="dot yellow"></span>
      <span class="dot green"></span>
      <span>${escapeHtml(title)}</span>
    </div>
    <pre>${content}</pre>
  </body>
</html>`;

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 1100, height: 700 } });
await page.setContent(html);
await page.screenshot({ path: path.resolve(outputFile), fullPage: true });
await browser.close();

console.log(`Print gerado em: ${outputFile}`);
