import * as React from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'
import { sss } from './tes'
import { TestComponent } from '../src'

const so: sss = {
  name: '11',
  value: 11
}

console.log('1', so)

const App = () => {
  console.log('TestComponent', TestComponent)
  return (
    <React.Fragment>
      <Button>Hello World!</Button>
      <TestComponent name={11} />
    </React.Fragment>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
