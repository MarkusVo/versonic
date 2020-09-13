import React from 'react'
import ReactDOM from 'react-dom'
import { ambientLight, pointLight, Canvas } from 'react-three-fiber'
import * as THREE from 'three'
import { hot } from 'react-hot-loader'
import TestCube from './components/test-cube'
import Plane from './components/plane'
import Controls from './components/controls'
import './App.css'

const App = () => (
  <div className='App'>
    <Canvas onCreated={({ gl }) => {
      gl.shadowMap.enabled = true
      gl.shadowMap.type = THREE.PCFSoftShadowMap
    }}
    >
      <Controls />
      <ambientLight />
      <spotLight position={[0, 5, 10]} penumbra={5} castShadow />
      <pointLight position={[10, 10, 10]} />
      <TestCube position={[0, 0, 0]} />
      <Plane />
    </Canvas>
  </div>
)

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

export default hot(module)(App)
