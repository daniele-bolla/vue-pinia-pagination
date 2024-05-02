import type { ProductsModel } from '@/models/ProductsModel'
import ProductsService from '@/services/ProductsService'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

interface ProductsStore {
  products: Map<string, ProductsModel[]>
  total: number
  size: number
}

export const useProductsStore = defineStore('products', () => {
  const products = ref<Map<string, ProductsModel[]>>(new Map())
  const total = ref<number>(0)
  const size = ref<number>(0)
  const currentPage = ref<number>(1)

  function getProducts(key: string) {
    return products.value.get(key)
  }

  const getCurrentProducts = computed(() => {
    const key = `page-${currentPage.value}`
    return products.value.get(key)
  })

  async function setProducts(pageSize: number = 5): Promise<void | ProductsStore['products']> {
    const key = `page-1`
    if (products.value.has(key)) {
      products.value = new Map()
    }
    const data = await ProductsService.fetchWithParams({
      skip: 0,
      limit: pageSize
    })
    products.value.set(key, data.products)
    total.value = data.total
    size.value = pageSize
    currentPage.value = 1
  }

  async function setNextProducts(page: number): Promise<void | ProductsStore['products']> {
    const key = `page-${page}`
    if (!products.value.has(key)) {
      const skip = size.value * (page - 1)
      const data = await ProductsService.fetchWithParams({
        skip,
        limit: size.value
      })
      products.value.set(key, data.products)
    }
    currentPage.value = page
  }

  return {
    products,
    total,
    size,
    currentPage,
    getCurrentProducts,
    setProducts,
    getProducts,
    setNextProducts
  }
})
