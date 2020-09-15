import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from 'react-three-fiber'
import { object, string } from 'prop-types'

const AnimatedSphere = ({ props, audioFile }) => {
  const [audioData, setAudioData] = useState()
  const audioContext = new AudioContext()
  const audio = new Audio()
  let source
  let analyser

  const mesh = useRef()

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

  useFrame(() => {
    if (audioData) {
      const bufferLength = audioData.frequencyBinCount
      const amplitudeArray = new Uint8Array(bufferLength)
      audioData.getByteFrequencyData(amplitudeArray)
      console.log(amplitudeArray)
    }
  })

  return (
    <mesh
      {...props}
      ref={mesh}
      castShadow
    >
      <icosahedronGeometry attach='geometry' args={[1, 1, 1]} />
      <meshLambertMaterial attach='material' wireframe />
    </mesh>
  )
}

AnimatedSphere.propTypes = {
  props: object,
  audioFile: string
}

AnimatedSphere.defaultProps = {
  props: {},
  audioFile: string
}

export default AnimatedSphere
