import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import BasePagination from '@/components/BasePagination.vue'
import BaseSelect from '@/components/BaseSelect.vue'

describe('BasePagination', () => {
  const wrapper = shallowMount(BasePagination, {
    props: {
      totalItems: 100,
      pageSize: 10,
      currentPage: 1
    }
  })
  it('renders properly', async () => {
    const btnPageFirst = wrapper.find('.btn_page_first')
    const btnPagePrev = wrapper.find('.btn_page_prev')
    const btnPageNext = wrapper.find('.btn_page_next')
    const btnPageLast = wrapper.find('.btn_page_last')
    const pageCount = wrapper.vm.pageCount
    expect(wrapper.isVisible()).toBeTruthy()
    expect(btnPageFirst.exists()).toBeFalsy()
    expect(btnPagePrev.exists()).toBeFalsy()
    expect(btnPageNext.exists()).toBeTruthy()
    expect(btnPageLast.exists()).toBeTruthy()
    expect(pageCount).toBe(10)
  })

  it('emits correct value on change page', async () => {
    const btnPage2 = wrapper.find('.btn_page_3')
    await btnPage2.trigger('click')
    expect(wrapper.emitted('changePage')).toHaveLength(1)
    expect(wrapper.emitted('changePage')).toEqual([[3]])
  })

  it('emits correct value on change size', async () => {
    const pageSizeSelect = wrapper.findComponent(BaseSelect)
    await pageSizeSelect.setValue(3)
    await pageSizeSelect.trigger('click')
    expect(wrapper.emitted('changePage')).toHaveLength(1)
    expect(wrapper.emitted('changePage')).toEqual([[3]])
  })

  it('emits correct value on change size', async () => {
    const wrapper = shallowMount(BasePagination, {
      props: {
        totalItems: 100,
        pageSize: 17,
        currentPage: 1
      }
    })
    const btnPageLast = wrapper.find('.btn_page_last')
    // const btnPageFirst = wrapper.find('.btn_page_first')
    // const btnPagePrev = wrapper.find('.btn_page_prev')
    // const btnPageNext = wrapper.find('.btn_page_next')
    const pageCount = wrapper.vm.pageCount
    const expectedCount = Math.ceil(100 / 17)
    await btnPageLast.trigger('click')
    // expect(btnPageFirst.isVisible()).toBeTruthy()
    // expect(btnPagePrev.isVisible()).toBeTruthy()
    // expect(btnPageNext.exists()).toBeFalsy()
    // expect(btnPageLast.exists()).toBeFalsy()

    expect(pageCount).toBe(expectedCount)
    expect(wrapper.emitted('changePage')).toHaveLength(1)
    expect(wrapper.emitted('changePage')).toEqual([[expectedCount]])
  })
})
