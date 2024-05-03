import { describe, it, expect } from 'vitest'

import { shallowMount } from '@vue/test-utils'
import BaseSelect from '@/components/BaseSelect.vue'

describe('BaseSelect', () => {
  const wrapper = shallowMount(BaseSelect, {
    props: {
      id: 'someid',
      value: '1',
      choices: [
        { value: 1, label: '1' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' }
      ]
    }
  })
  it('renders properly', async () => {
    const options = wrapper.findAll('option')
    expect(wrapper.isVisible()).toBeTruthy()
    expect(options).toHaveLength(4)
  })

  it('emits correct value on selected', async () => {
    const select = wrapper.find('select')
    await select.setValue(3)
    expect(select.element.value).toBe('3')
    expect(wrapper.emitted('change')).toHaveLength(1)
    expect(wrapper.emitted('change')).toEqual([[3]])
  })
})
