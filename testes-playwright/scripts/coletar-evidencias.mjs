import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import {
  catalogProducts,
  mockAttendantApi,
  mockMenuApi,
} from '../tests/helpers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..', '..');
const evidenceRoot = path.join(projectRoot, 'docs', 'evidencias-execucao');
const outputDir = path.join(evidenceRoot, '01-navegador');
const traceDir = path.join(evidenceRoot, '06-trace');
const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? 'http://127.0.0.1:5174';

async function ensureOutputDir() {
  await mkdir(outputDir, { recursive: true });
  await mkdir(traceDir, { recursive: true });
}

async function captureMenuAndCart(page) {
  await mockMenuApi(page);
  await page.goto(baseURL);

  await page.screenshot({
    path: path.join(outputDir, '01-home.png'),
    fullPage: true,
  });

  await page.getByRole('button', { name: /view menu/i }).click();

  await page.screenshot({
    path: path.join(outputDir, '02-menu.png'),
    fullPage: true,
  });

  await page
    .getByRole('button', { name: /add to cart/i })
    .first()
    .click();

  await page.screenshot({
    path: path.join(outputDir, '03-carrinho.png'),
    fullPage: true,
  });

  await page.getByLabel(/table number/i).fill('7');
  await page.screenshot({
    path: path.join(outputDir, '04-checkout.png'),
    fullPage: true,
  });

  await page.getByRole('button', { name: /send order/i }).click();

  await page.screenshot({
    path: path.join(outputDir, '05-confirmacao-pedido.png'),
    fullPage: true,
  });
}

async function captureAttendantArea(page) {
  await mockMenuApi(page);
  await mockAttendantApi(page);
  await page.goto(baseURL);

  await page.getByRole('button', { name: /view menu/i }).click();
  await page.getByRole('button', { name: /staff/i }).click();

  await page.screenshot({
    path: path.join(outputDir, '06-login-atendente.png'),
    fullPage: true,
  });

  await page
    .getByRole('textbox', { name: /e-mail/i })
    .fill('atendente@auracup.com');
  await page.getByLabel(/password/i).fill('Auracup@123');
  await page.getByRole('button', { name: /sign in/i }).click();

  await page.screenshot({
    path: path.join(outputDir, '07-area-atendentes.png'),
    fullPage: true,
  });
}

async function captureXssExample(page) {
  await mockMenuApi(page, {
    products: [
      {
        id: 99,
        category_id: 1,
        name_en: '<img src=x onerror=alert(1)>',
        name_pt: '<img src=x onerror=alert(1)>',
        description_en: 'Malicious payload',
        description_pt: 'Carga maliciosa',
        price: 500,
        image_url:
          'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="640" height="360"%3E%3Crect width="640" height="360" fill="%23f3f0ea"/%3E%3C/svg%3E',
        is_available: true,
      },
    ],
  });

  await page.goto(baseURL);
  await page.getByRole('button', { name: /view menu/i }).click();

  await page.screenshot({
    path: path.join(outputDir, '08-xss-escapado.png'),
    fullPage: true,
  });
}

async function main() {
  await ensureOutputDir();

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1600 },
  });

  await context.tracing.start({
    screenshots: true,
    snapshots: true,
    sources: true,
  });

  const page = await context.newPage();
  await captureMenuAndCart(page);
  await page.close();

  const page2 = await context.newPage();
  await captureAttendantArea(page2);
  await page2.close();

  const page3 = await context.newPage();
  await captureXssExample(page3);
  await page3.close();

  await context.tracing.stop({
    path: path.join(traceDir, 'trace-execucao.zip'),
  });

  await browser.close();

  console.log(`Evidencias geradas em: ${outputDir}`);
}

main().catch(error => {
  console.error(error);
  process.exitCode = 1;
});
