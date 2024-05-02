<template>
  <fieldset>
    <label :for="id">
      <select  
      :id="id" 
      class="p-4 text-black  hover:bg-grey-dark bg-grey"
      @change="handleChange"
      >
      <option
          v-for="choice in choices"
          :key="choice.value"
          :value="choice.value"
          :selected="choice.value == value"

        >
          {{ choice.label }}
        </option>    
      </select>
      <span class="ml-4">Items per page</span>

    </label>

  </fieldset>
</template>

<script lang="ts">

import { defineComponent, type PropType } from "vue";
interface Choice {
  label: string;
  value?: string | number;
}
export default defineComponent({
  props: {
    choices: {
      type: Array as PropType<Choice[]>,
      default: () => [],
    },
    id: {
      type: String,
      default: () => "",
    },
    value: {
      type: [String, Object] as PropType<string | Choice>,
      default: () => undefined,
    },
    description: {
      type: String,
      default: "",
    },
  },
  emits: ['change'],
  setup(props, { emit }) {

    return {
      handleChange(event: Event): void {
        const value = (event.target as HTMLSelectElement).value;
        if (value) {
          const selected = props.choices.find((choice: Choice) => {
            return choice.value == value;
          });
          emit("change", selected?.value);
        }
      },
    };
  },
});
</script>
