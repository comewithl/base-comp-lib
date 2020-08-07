import React from 'react'
import { Input } from 'antd'

export interface TestComponentProps {
  name: number,
  value?: string,
  onChange?: () => void
}

export interface TestPlusComponentProps extends TestComponentProps {
  values?: Array<string>
}

interface PaginationProps {
  pageSize: number,
  current: number
}

export interface SearchFun {
  (values: {}, pagination: PaginationProps): Promise<any>
}

const realSearchFun: SearchFun = config => {
  return new Promise((resolve, reject) => {
    setTimeout(() => { console.log(config) })
  })
}

const TestComponent: React.FunctionComponent<TestPlusComponentProps> = (props: TestPlusComponentProps) => {
  realSearchFun('2', { pageSize: 20, current: 1 })
  return <Input />
}

export default TestComponent
