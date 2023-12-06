import { write } from 'bun'
import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: false })
  const page = await browser.newPage()
  await page.goto('https://sylabus.sggw.edu.pl/pl/1/19/3/4/40/14/51')

  const ids = await page.evaluate(() => [...document.querySelectorAll<HTMLDivElement>('.syl-get-document.syl-pointer')]
    .map(x => x.id))
  const courses = []

  for (const id of ids) {
    const url = `https://sylabus.sggw.edu.pl/pl/document/${id}.jsonHtml`
    await page.goto(url)
    const content = await page.content()
    await write(`./data/${id}.html`, content)
  }

  console.log(courses)
  await browser.close()
})()
