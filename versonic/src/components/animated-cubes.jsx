import React, { useRef, useState, useEffect} from 'react'
import { useFrame } from 'react-three-fiber'
import { object, string } from 'prop-types'

const AnimatedCubes = ({ props, audioFile }) => {
  const [audioData, setAudioData] = useState()
  const audioContext = new AudioContext()
  const audio = new Audio()
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
  const average = (array) => array.reduce((a, b) => a + b) / array.length

  if (audioData) {
    const bufferLength = audioData.frequencyBinCount
    amplitudeDataArray = new Uint8Array(bufferLength)
  }

  console.log(mesh)

  // extract data for each frame - fml someone could have told me tat this is not possible with preloaded soundData
  useFrame(() => {
    if (audioData) {
      audioData.getByteFrequencyData(amplitudeDataArray)

      const lowEnd = amplitudeDataArray.slice(0, (amplitudeDataArray.length / 2) - 1)
      const highEnd = amplitudeDataArray.slice((amplitudeDataArray.length / 2) - 1, amplitudeDataArray.length - 1)
      const lowEndAvg = average(lowEnd)
      const highEndAvg = average(highEnd)

      mesh.current.rotation.x = mesh.current.rotation.x += lowEndAvg * 0.001
      mesh.current.rotation.y = mesh.current.rotation.y += highEndAvg * 0.001
    }
  })

  return (
    <mesh
      ref={mesh}
      castShadow
    >
      <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
      <meshStandardMaterial attach='material' color='#700020' />
    </mesh>
  )
}

AnimatedCubes.propTypes = {
  props: object,
  audioFile: string
}

AnimatedCubes.defaultProps = {
  props: {},
  audioFile: string
}

export default AnimatedCubes
