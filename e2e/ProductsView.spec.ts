import { test, expect, Route, Page } from '@playwright/test'
import { skip0Limit13, skip0Limit5, skip10Limit5, skip26Limit13, skip95Limit5 } from './mocks.js'

async function fetchApi(page: Page, url: string, data: any) {
  return Promise.all([
    page.route(url, async (route: Route) => {
      const json = [data]
      await route.fulfill({ json })
    }),
    page.locator('div.card').first().waitFor()
  ])
}
test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await fetchApi(page, 'https://dummyjson.com/products?skip=0&limit=5', skip0Limit5)
})
test('visits the app root url', async ({ page }) => {
  await expect(page.locator('h1')).toHaveText('Products')
})

test('Loads and shows correctly first page of products', async ({ page }) => {
  const count = await page.locator('div.card').count()
  const activePageEL = page.locator('button.btn_page_active')
  const acitvePage = await activePageEL.innerText()
  expect(count).toBe(5)
  await expect(activePageEL).toHaveClass(/bg-grey-dark/)
  expect(acitvePage).toBe('1')
  await expect(page.locator('button.btn_page_first')).toBeHidden()
  await expect(page.locator('button.btn_page_prev')).toBeHidden()
  await expect(page.locator('button.btn_page_last')).toBeVisible()
  await expect(page.locator('button.btn_page_next')).toBeVisible()
})

test('Changes size correctly', async ({ page }) => {
  await page.locator('select#item_per_page').selectOption('13')

  await fetchApi(page, 'https://dummyjson.com/products?skip=0&limit=13', skip0Limit13)

  const activePageEL = page.locator('button.btn_page_active')
  await expect(activePageEL).toHaveClass(/bg-grey-dark/)
  await expect(activePageEL).toHaveText('1')
  expect(await page.locator('div.card').count()).toBe(13)
})

test('Changes page correctly', async ({ page }) => {
  await page.locator('button.btn_page_3').waitFor()
  await page.locator('button.btn_page_3').click()
  await fetchApi(page, 'https://dummyjson.com/products?skip=10&limit=5', skip10Limit5)

  const cards = page.locator('div.card')
  const count = await cards.count()
  const activePageEL = page.locator('button.btn_page_active')
  expect(count).toBe(5)
  await expect(activePageEL).toHaveText('3')
})

test('Changes size and page correctly', async ({ page }) => {
  await page.locator('select#item_per_page').selectOption('13')

  await fetchApi(page, 'https://dummyjson.com/products?skip=0&limit=13', skip0Limit13)

  await page.locator('button.btn_page_3').click()

  await fetchApi(page, 'https://dummyjson.com/products?skip=26&limit=13', skip26Limit13)

  const cards = page.locator('div.card')
  const count = await cards.count()
  const firstCard = cards.first()
  const lastCard = cards.last()
  const activePageEL = page.locator('button.btn_page_active')

  expect(count).toBe(13)
  await expect(firstCard).toHaveClass(/card_27/)
  await expect(lastCard).toHaveClass(/card_39/)
  await expect(activePageEL).toHaveText('3')
})

test('Changes page and size correctly', async ({ page }) => {
  await page.locator('button.btn_page_last').click()

  await fetchApi(page, 'https://dummyjson.com/products?skip=95&limit=5', skip95Limit5)

  await page.locator('select#item_per_page').selectOption('13')

  await fetchApi(page, 'https://dummyjson.com/products?skip=0&limit=13', skip0Limit13)

  const cards = page.locator('div.card')
  const firstCard = cards.first()
  const lastCard = cards.last()
  const activePageEL = page.locator('button.btn_page_active')

  await expect(firstCard).toHaveClass(/card_1/)
  await expect(lastCard).toHaveClass(/card_13/)
  await expect(activePageEL).toHaveText('1')
})

test('Changes to last page correctly', async ({ page }) => {
  await page.locator('select#item_per_page').selectOption('7')
  await page.locator('button.btn_page_last').click()
  const cards = page.locator('div.card')

  const firstCard = cards.first()
  const lastCard = cards.last()

  await expect(firstCard).toHaveClass(/card_99/)
  await expect(lastCard).toHaveClass(/card_100/)
  await expect(page.locator('button.btn_page_first')).toBeVisible()
  await expect(page.locator('button.btn_page_prev')).toBeVisible()
  await expect(page.locator('button.btn_page_last')).toBeHidden()
  await expect(page.locator('button.btn_page_next')).toBeHidden()
})
