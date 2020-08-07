import React from 'react'
import ReactDOM from 'react-dom'
import { Button } from 'antd'

import { TestComponent } from '../src/index'

const App = () => {
  return (<React.Fragment>
    <Button>Hello World!</Button>
    <TestComponent name={{ test: '1' }} value='name' />
  </React.Fragment>)
}

ReactDOM.render(<App />, document.getElementById('root'));
