import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { ambientLight, pointLight, Canvas } from 'react-three-fiber'
import { Button } from '@material-ui/core'
import * as THREE from 'three'
import { hot } from 'react-hot-loader'
import TestCube from './components/test-cube'
import AnimatedSphere from './components/animated-sphere'
import Plane from './components/plane'
import Controls from './components/controls'
import './App.css'

const App = () => {
  const [soundFilePath, setSoundFilePath] = useState('')
  const [playing, setPlaying] = useState(false)
  const [paused, setPaused] = useState(false)

  // select sound File -> Note to my self: this is why javascript sucks sometimes
  const handleSelectSoundFile = e => {
    setSoundFilePath('./assets/sound-files/' + e.target.files[0].name)
  }

  // Basic Sound controls
  const handlePlayAudio = () => {
    setPlaying(true)
    setPaused(false)
  }

  const handlePauseAudio = () => {
    setPlaying(false)
    setPaused(true)
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
      <Button
        id='play-button'
        variant='contained'
        component='label'
        onClick={() => handlePlayAudio() }
      >
        &#9658;
      </Button>
      <Button
        id='stop-button'
        variant='contained'
        component='label'
        onClick={() => handlePauseAudio() }
      >
        &#x025FC;
      </Button>
      <Canvas
        camera={{ position: [0, 0, 7] }} onCreated={({ gl }) => {
          gl.shadowMap.enabled = true
          gl.shadowMap.type = THREE.PCFSoftShadowMap
        }}
      >
        <Controls />
        <ambientLight intensity={0.3} />
        <spotLight position={[0, 50, 50]} penumbra={100} castShadow intensity={0.4}/>
        <pointLight position={[10, 10, 50]} />
        {/* <TestCube position={[0, -2, 0]} /> */}
        <AnimatedSphere audioFile={soundFilePath ? soundFilePath : 'cock'} playing={playing} paused={paused} />
        <fog attach='fog' args={['white', 5, 30]}/>
        <Plane />
      </Canvas>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

export default hot(module)(App)
