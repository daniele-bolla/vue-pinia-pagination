import { test, expect } from '@playwright/test'
import { skip0Limit13, skip0Limit5, skip10Limit5, skip26Limit13, skip95Limit5 } from './mocks.js'
test.beforeEach(async ({ page }) => {
  await page.goto('/')
  await page.route('https://dummyjson.com/products?skip=0&limit=5', async (route) => {
    const json = [skip0Limit5]
    await route.fulfill({ json })
  })
  await page.locator('css=div.card').first().waitFor()
})
test('visits the app root url', async ({ page }) => {
  await expect(page.locator('h1')).toHaveText('Products')
})

test('Loads and shows correctly first page of products', async ({ page }) => {
  const count = await page.locator('css=div.card').count()
  const activePageEL = page.locator('css=button.btn_page_active')
  const acitvePage = await activePageEL.innerText()
  expect(count).toBe(5)
  await expect(activePageEL).toHaveClass(/bg-grey-dark/)
  expect(acitvePage).toBe('1')
  await expect(page.locator('css=button.btn_page_first')).toBeHidden()
  await expect(page.locator('css=button.btn_page_prev')).toBeHidden()
  await expect(page.locator('css=button.btn_page_last')).toBeVisible()
  await expect(page.locator('css=button.btn_page_next')).toBeVisible()
})

test('Changes size correctly', async ({ page }) => {
  await page.locator('css=select#item_per_page').selectOption('13')
  await page.route('https://dummyjson.com/products?skip=0&limit=13', async (route) => {
    const json = [skip0Limit13]
    await route.fulfill({ json })
  })
  const activePageEL = page.locator('css=button.btn_page_active')
  await expect(activePageEL).toHaveClass(/bg-grey-dark/)
  await expect(activePageEL).toHaveText('1')
  expect(await page.locator('css=div.card').count()).toBe(13)
})

test('Changes page correctly', async ({ page }) => {
  await page.locator('css=button.btn_page_3').click()
  await page.route('https://dummyjson.com/products?skip=10&limit=5', async (route) => {
    const json = [skip10Limit5]
    await route.fulfill({ json })
  })
  const cards = page.locator('css=div.card')
  const count = await cards.count()
  const activePageEL = page.locator('css=button.btn_page_active')
  expect(count).toBe(5)
  await expect(activePageEL).toHaveText('3')
})

test('Changes size and page correctly', async ({ page }) => {
  await page.locator('css=select#item_per_page').selectOption('13')
  await page.route('https://dummyjson.com/products?skip=0&limit=13', async (route) => {
    const json = [skip0Limit13]
    await route.fulfill({ json })
  })
  await page.locator('css=button.btn_page_3').click()
  await page.route('https://dummyjson.com/products?skip=26&limit=13', async (route) => {
    const json = [skip26Limit13]
    await route.fulfill({ json })
  })
  const cards = page.locator('css=div.card')
  const count = await cards.count()
  const firstCard = cards.first()
  const lastCard = cards.last()
  const activePageEL = page.locator('css=button.btn_page_active')

  expect(count).toBe(13)
  await expect(firstCard).toHaveClass(/card_27/)
  await expect(lastCard).toHaveClass(/card_39/)
  await expect(activePageEL).toHaveText('3')
})

test('Changes page and size correctly', async ({ page }) => {
  await page.locator('css=button.btn_page_last').click()
  await page.route('https://dummyjson.com/products?skip=95&limit=5', async (route) => {
    const json = [skip95Limit5]
    await route.fulfill({ json })
  })
  await page.locator('css=select#item_per_page').selectOption('13')
  await page.route('https://dummyjson.com/products?skip=0&limit=13', async (route) => {
    const json = [skip95Limit5]
    await route.fulfill({ json })
  })
  const cards = page.locator('css=div.card')
  const firstCard = cards.first()
  const lastCard = cards.last()
  const activePageEL = page.locator('css=button.btn_page_active')

  await expect(firstCard).toHaveClass(/card_1/)
  await expect(lastCard).toHaveClass(/card_13/)
  await expect(activePageEL).toHaveText('1')
})

test('Changes to last page correctly', async ({ page }) => {
  await page.locator('css=select#item_per_page').selectOption('7')
  await page.locator('css=button.btn_page_last').click()
  const cards = page.locator('css=div.card')

  const firstCard = cards.first()
  const lastCard = cards.last()

  await expect(firstCard).toHaveClass(/card_99/)
  await expect(lastCard).toHaveClass(/card_100/)
  await expect(page.locator('css=button.btn_page_first')).toBeVisible()
  await expect(page.locator('css=button.btn_page_prev')).toBeVisible()
  await expect(page.locator('css=button.btn_page_last')).toBeHidden()
  await expect(page.locator('css=button.btn_page_next')).toBeHidden()
})
