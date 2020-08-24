import { hot } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import { VRCanvas } from 'react-xr'
import { ambientLight, pointLight } from 'react-three-fiber'
import TestCube from './components/test-cube'
import './App.css'

const App = () => (
  <div className='App'>
    <VRCanvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <TestCube position={[-1.2, 0, 0]} />
      <TestCube position={[1.2, 0, 0]} />
    </VRCanvas>
  </div>
)

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

export default hot(module)(App)
