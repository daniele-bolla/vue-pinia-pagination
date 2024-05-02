<template>
  <component
    :is="element"
    class="px-5 py-3 text-black  rounded-3xl hover:bg-grey-dark bg-grey "
  >
    <slot />
  </component>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {

    element: { type: String, default: () => "button" },
  },
});
</script>