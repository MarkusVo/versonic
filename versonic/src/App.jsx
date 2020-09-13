import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import { ambientLight, pointLight, Canvas } from 'react-three-fiber'
import { Button } from '@material-ui/core'
import * as THREE from 'three'
import { hot } from 'react-hot-loader'
import TestCube from './components/test-cube'
import Plane from './components/plane'
import Controls from './components/controls'
import './App.css'

const App = () => {
  const [soundFilePath, setSoundFilePath] = useState(0)
  const [audio, setAudio] = useState(0)
  const [playing, setPlaying] = useState(0)

  // select sound File -> Note to my self: this is why javascript sucks sometimes
  const handleSelectSoundFile = e => {
    setSoundFilePath('./assets/sound-files/' + e.target.files[0].name)
  }

  // Basic Sound controls
  const handlePlayAudio = (audio) => {
    audio.play()
    setPlaying(true)
  }

  const handleStopAudio = (audio) => {
    audio.pause()
    setPlaying(false)
  }

  // set audio with given Filename of the assets folder -> Clientside javascript can't work with files on the client
  if (soundFilePath && !audio) {
    setAudio(new Audio(soundFilePath))
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
        onClick={() => audio ? handlePlayAudio(audio) : console.log('No sound File selected')}
      >
        &#9658;
      </Button>
      <Button
        id='stop-button'
        variant='contained'
        component='label'
        onClick={() => playing ? handleStopAudio(audio) : console.log('No audio playing')}
      >
        &#x025FC;
      </Button>
      <Canvas
        camera={{ position: [0, 0, 5] }} onCreated={({ gl }) => {
          gl.shadowMap.enabled = true
          gl.shadowMap.type = THREE.PCFSoftShadowMap
        }}
      >
        <Controls />
        <ambientLight intensity={0.5} />
        <spotLight position={[15, 20, 5]} penumbra={1} castShadow />
        <pointLight position={[10, 10, 10]} />
        <TestCube position={[0, -2, 0]} />
        <fog attach='fog' args={['white', 10, 15]} />
        <Plane />
      </Canvas>
    </div>
  )
}

const rootElement = document.getElementById('root')
ReactDOM.render(<App />, rootElement)

export default hot(module)(App)
