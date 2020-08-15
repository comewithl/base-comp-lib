import * as React from 'react'
import { Input } from 'antd'
import './index.less'

// export interface EnumItem {
//   code: string
//   name: string
//   value: string
// }

// type EnumMap = Array<EnumItem>

// // 类型别名

// type StringAlias<T> = Array<T>

// const s: StringAlias<string> = ['2', '']

// console.log(s)

// export interface TestComponentProps {
//   name: number
//   value?: string
//   onChange?: () => void
// }

// export interface TestPlusComponentProps extends TestComponentProps {
//   values?: string[]
// }

// interface PaginationProps {
//   pageSize: number
//   current: number
// }

// export interface SearchFun {
//   (values: {}, pagination: PaginationProps): Promise<any>
// }

// const realSearchFun: SearchFun = config => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       console.log(config)
//     })
//   })
// }
class Greeter extends React.Component<TestComponentProps> {
  constructor(props) {
    super(props)
    this.state = {
      value: '',
      list: []
    }
  }
  render() {
    return (
      <div>
        Hello, {this.props.name}
        <Input />{' '}
      </div>
    )
  }
}
// console.log('TestComponent1', TestComponent)

export default Greeter
