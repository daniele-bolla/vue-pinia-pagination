<template>
  <nav class="flex w-full justify-center space-x-6 items-center mt-2">
    <base-button
      class="btn_page_prev"
      @click.prevent="onChangePage(currentPage - 1)"
      v-if="currentPage > 1"
    >
      &langle; Previous
    </base-button>
    <base-button class="btn_page_first" @click.prevent="onChangePage(1)" v-if="currentPage > 1">
      First
    </base-button>
    <base-button
      :class="`btn_page_${currentPage - 2}`"
      v-if="currentPage - 1 > 1"
      @click.prevent="onChangePage(currentPage - 2)"
    >
      {{ currentPage - 2 }}
    </base-button>
    <base-button
      :class="`btn_page_${currentPage - 1}`"
      v-if="currentPage > 1"
      @click.prevent="onChangePage(currentPage - 1)"
    >
      {{ currentPage - 1 }}
    </base-button>
    <base-button class="bg-grey-dark btn_page_active" disabled="true">
      {{ currentPage }}
    </base-button>
    <base-button
      :class="`btn_page_${currentPage + 1}`"
      v-if="currentPage + 1 <= pageCount"
      @click.prevent="onChangePage(currentPage + 1)"
    >
      {{ currentPage + 1 }}
    </base-button>
    <base-button
      :class="`btn_page_${currentPage + 2}`"
      v-if="currentPage + 2 <= pageCount"
      @click.prevent="onChangePage(currentPage + 2)"
    >
      {{ currentPage + 2 }}
    </base-button>
    <base-button
      class="btn_page_last"
      @click.prevent="onChangePage(pageCount)"
      v-if="currentPage < pageCount"
    >
      Last
    </base-button>
    <base-button
      class="btn_page_next"
      @click.prevent="onChangePage(currentPage + 1)"
      v-if="currentPage < pageCount"
    >
      Next &rangle; 
    </base-button>
    <base-select
      id="item_per_page"
      :choices="pageSizes"
      @change="onChangeSize"
      :value="pageSize.toString()"
      label-text="Items per page"
    >
    </base-select>
  </nav>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseSelect from '@/components/BaseSelect.vue'

export default defineComponent({
  components: {
    BaseButton,
    BaseSelect
  },
  props: {
    totalItems: {
      type: Number,
      required: true,
      default: () => 0
    },
    pageSize: {
      type: Number,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  emits: ['changePage', 'changeSize'],
  setup(props, { emit }) {
    const pageCount = computed(() => Math.ceil(props.totalItems / props.pageSize))
    const pageSizes = computed(() => {
       return Array.from({ length: 30 }, (_, i) => ({ value: 1 + i, label: (1 + i).toString() }))
     })
    // const pageSizes = computed(() => {
    //   return Array.from({ length: 26 - 5 }, (_, i) => ({ value: 5 + i, label: (5 + i).toString() }))
    // })
    // const pages = computed(() => {
    //   return Array.from({ length: pageCount.value }, (_, i) => {i+1});
    // });

    return {
      pageSizes,
      onChangePage(n: number): void {
        emit('changePage', n)
      },
      onChangeSize(s: number) {
        if(s>25){
          console.warn("pageSize > 25")
          emit('changeSize', 25)
        } else if(s<5){
          console.warn("pageSize < 5")
          emit('changeSize', 5)
        } else {
          emit('changeSize', s)
        }
      },
      pageCount
    }
  }
})
</script>
