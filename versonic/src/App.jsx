import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { ambientLight, pointLight, Canvas } from 'react-three-fiber'
import { Button } from '@material-ui/core'
import * as THREE from 'three'
import { hot } from 'react-hot-loader'
import AnimatedSphere from './components/animated-sphere'
import Plane from './components/plane'
import Controls from './components/controls'
import './App.css'

const App = () => {
  const [soundFilePath, setSoundFilePath] = useState(null)

  // select sound File -> Note to my self: this is why javascript sucks sometimes
  const handleSelectSoundFile = e => {
    setSoundFilePath('./assets/sound-files/' + e.target.files[0].name)
  }

  return (
    <div className='App'>
      <Button variant='contained' component='label'>
        PICK A SOUNDFILE
        <input
          id='audio-file-input'
          type='file'
          style={{ display: 'none' }}
          accept='audio/*'
          onChange={handleSelectSoundFile}
        />
      </Button>
      <Canvas
        camera={{ position: [0, 0, 7] }} onCreated={({ gl }) => {
          gl.shadowMap.enabled = true
          gl.shadowMap.type = THREE.PCFSoftShadowMap
        }}
      >
        <Controls />
        <ambientLight intensity={0.3} />
        <spotLight position={[0, 50, 50]} penumbra={100} castShadow intensity={0.4} />
        <pointLight position={[10, 10, 50]} />
        {/* <TestCube position={[0, -2, 0]} /> */}
        <AnimatedSphere audioFile={soundFilePath} />
        <fog attach='fog' args={['white', 5, 30]} />
        <Plane />
      </Canvas>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

export default hot(module)(App)
