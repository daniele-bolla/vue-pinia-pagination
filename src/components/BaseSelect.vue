<template>
    <label :for="id">
      <select  
      :id="id" 
      class="p-4 text-black  hover:bg-grey-dark bg-grey"
      :aria-label="labelText"
      aria-describedby="desc"
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
      <span class="ml-4">{{labelText}}</span>
      <span id="desc" class=" sr-only">{{description || labelText}}</span>

    </label>
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
    labelText: {
      type: String,
      default: "",
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
