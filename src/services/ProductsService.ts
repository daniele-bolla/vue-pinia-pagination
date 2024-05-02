import ApiService from '@/services/ApiService'
import type { ProductsModel } from '@/models/ProductsModel'
import { serializeObj } from '@/utils/serializeObj'

const API_ENDPOINT = '/products'

type FetchAllParams = {
  skip: number
  limit: number
}

type ProductsResponse = {
  limit: number
  products: ProductsModel[]
  skip: number
  total: number
}
async function fetchWithParams(params: FetchAllParams) {
  const urlParams = serializeObj(params)
  const { data } = await ApiService.get<ProductsResponse>(`${API_ENDPOINT}?${urlParams.toString()}`)
  const { products, total } = data
  return { products, total }
}

export default {
  fetchWithParams
}
