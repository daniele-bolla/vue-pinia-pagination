<template>
  <div
    :class="`card_${product.id}`"
    class="card p-5 w-full h-full flex flex-col rounded-md bg-grey"
  >
    <div class="flex flex-col items-center flex-1">
      <figure class="h-[200px] w-full mb-5">
        <img class="object-cover h-full w-full rounded-md" v-lazy="thumbnail" alt="" />
      </figure>
      <div>
        <p class="line-clamp-5 text-justify">{{ product.description }}</p>
      </div>
    </div>
    <div class="flex justify-end pt-4">
      <span class="text-right">Price £{{ product.price }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import type { ProductsModel } from '@/models/ProductsModel'
import { type PropType, defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    product: { type: Object as PropType<ProductsModel>, required: true }
  },
  setup(props) {
    const thumbnail = computed(() => props.product.images[props.product.images.length - 1])
    return {
      thumbnail
    }
  }
})
</script>
