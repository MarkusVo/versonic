import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from 'react-three-fiber'
import { object, string } from 'prop-types'
import SimplexNoise from 'simplex-noise'

// This component should become a 3d frequency band visualiser
const AnimatedFrequencyBandVisualiser = ({ props, audioFile }) => {
  const [audioData, setAudioData] = useState()
  const audioContext = new AudioContext()
  const audio = new Audio()
  const noise = new SimplexNoise()
  let source
  let analyser

  const mesh = useRef()

  // initialize analyser node audio context 'n stuff
  useEffect(() => {
    if (audioFile) {
      source = audioContext.createMediaElementSource(audio)
      analyser = audioContext.createAnalyser()
      audio.src = audioFile
      analyser.fftSize = '512'
      source.connect(audioContext.destination)
      source.connect(analyser)
      audio.play()
      setAudioData(analyser)
    }
  }, [audioFile])

  let amplitudeDataArray

  if (audioData) {
    const bufferLength = audioData.frequencyBinCount
    amplitudeDataArray = new Uint8Array(bufferLength)
  }

  // extract data for each frame - fml someone could have told me tat this is not possible with preloaded soundData
  useFrame(() => {
    if (audioData) {
      audioData.getByteFrequencyData(amplitudeDataArray)
    }
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      castShadow
    >
      <icosahedronGeometry attach='geometry' args={[4, 4]} />
      <meshLambertMaterial attach='material' wireframe />
    </mesh>
  )
}

AnimatedFrequencyBandVisualiser.propTypes = {
  props: object,
  audioFile: string
}

AnimatedFrequencyBandVisualiser.defaultProps = {
  props: {},
  audioFile: string
}

export default AnimatedFrequencyBandVisualiser
