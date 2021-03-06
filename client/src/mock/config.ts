import Mock from 'mockjs'
import { Response } from '../api/request'

Mock.setup({
  timeout: 300
})

// Mock the real back-end api structure.
export function intercepter<T>(data: T): Response<T> {
  return {
    status: 200,
    message: '成功',
    data: data
  }
}

export const mock = Mock
