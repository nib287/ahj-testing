import puppetteer from 'puppeteer';

jest.setTimeout(30000); 
describe('Credit Card Validator form', () => {
  let browser = null;
  let page = null;
  let server = null;
  const baseUrl = 'http://localhost:9000';

  beforeAll(async () => {
    browser = await puppetteer.launch({
      headless: false, // show gui
      slowMo: 250,
      devtools: true, // show devTools
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  test('valid card number', async () => {
    await page.goto(baseUrl);
    const form = await page.$('[data-widget=form]');
    const input = await form.$('[data-id=form__input]');
    await input.type('4000 0012 3456 7899');
    const submit = await form.$('[data-id=form__submit]');
    submit.click();
    await page.waitForSelector('[class=valid]')
  });

  test('invalid card number', async () => {
    await page.goto(baseUrl);
    const form = await page.$('[data-widget=form]');
    const input = await form.$('[data-id=form__input]');
    await input.type('4000 0012 3456');
    const submit = await form.$('[data-id=form__submit]');
    submit.click();
    await page.waitForSelector('[class=invalid]')
  });
});

