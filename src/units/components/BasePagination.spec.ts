import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import BasePagination from '@/components/BasePagination.vue'

describe('BasePagination', () => {
  it('renders properly', async () => {
    const wrapper = shallowMount(BasePagination, {
      props: {
        totalItems: 100,
        pageSize: 10,
        currentPage: 1
      }
    })
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
    const wrapper = shallowMount(BasePagination, {
      props: {
        totalItems: 100,
        pageSize: 10,
        currentPage: 1
      }
    })
    const btnPage2 = wrapper.find('.btn_page_3')
    await btnPage2.trigger('click')
    expect(wrapper.emitted('changePage')).toHaveLength(1)
    expect(wrapper.emitted('changePage')).toEqual([[3]])
  })

  it('emits changeSize 25 when size selected is greater then 25', async () => {
    const wrapper = shallowMount(BasePagination, {
      props: {
        totalItems: 100,
        pageSize: 10,
        currentPage: 1
      }
    })
    wrapper.vm.onChangeSize(30)
    expect(wrapper.emitted('changeSize')).toHaveLength(1)
    expect(wrapper.emitted('changeSize')).toEqual([[25]])
  })
  it('emits changeSize 5 when size selected is less then 5', async () => {
    const wrapper = shallowMount(BasePagination, {
      props: {
        totalItems: 100,
        pageSize: 10,
        currentPage: 1
      }
    })
    wrapper.vm.onChangeSize(4)
    expect(wrapper.emitted('changeSize')).toHaveLength(1)
    expect(wrapper.emitted('changeSize')).toEqual([[5]])
  })
})
