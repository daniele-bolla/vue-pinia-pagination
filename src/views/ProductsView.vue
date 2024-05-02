<template>
  <div
    class="flex flex-col h-full"
  >
    <div v-if="getCurrentProducts && getCurrentProducts.length">
      <h1 class="text-4xl font-normal text-center pb-3 mb-5">
      Products
      </h1>    
      <div class="grid md:grid-cols-4 gap-6 grid-1">
        <product-card 
          v-for="product in getCurrentProducts" 
          :key="product.id" 
          :product="product"
        ></product-card>
      </div>
      <div class="mt-24">
        <base-pagination 
          :total-items="total" 
          :page-size="size" 
          :current-page="currentPage" 
          @change-page="onChangePage" 
          @change-size="onChangeSize"
        ></base-pagination>
      </div>
    </div>
    <div v-else class="flex flex-col items-center justify-center h-full">
      ...Loading
    </div>
  </div>

</template>

<script setup lang="ts">
 import { useProductsStore } from '@/stores/products'
import { onMounted } from 'vue';
import ProductCard from '@/components/ProductCard.vue'
import BasePagination from '@/components/BasePagination.vue'
import { storeToRefs } from 'pinia';

const { getCurrentProducts, currentPage, total, size} = storeToRefs(useProductsStore());
const { setProducts, setNextProducts } = useProductsStore();

const  onChangePage = async (page:number) =>{
  await setNextProducts(page)
}
const onChangeSize = async (size: number ) =>{
  await setProducts(size)
}

onMounted(async ()=>{
  await setProducts();
})
</script>
