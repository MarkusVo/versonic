import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from 'react-three-fiber'
import { object, string, array } from 'prop-types'

const colors = [
  '#03b6fc',
  '#03fc67',
  '#cafc03',
  '#fce303',
  '#fca903',
  '#fc4103',
  '#fc03be',
  '#a503fc',
  '#02b6fc',
  '#02fc67',
  '#cbfc03',
  '#fbe303',
  '#fba903',
  '#fb4103',
  '#fb03be',
  '#a603fc'
]

const AnimatedFrequencyBand = ({ props, audioFile }) => {
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

  if (audioData) {
    const bufferLength = audioData.frequencyBinCount
    amplitudeDataArray = new Uint8Array(bufferLength)
  }

  const average = (array) => array.reduce((a, b) => a + b) / array.length

  // Extract Sounddata for each Frame
  useFrame(() => {
    if (audioData) {
      audioData.getByteFrequencyData(amplitudeDataArray)

      mesh.current.children.map((item, index) => {
        const blockSize = amplitudeDataArray.length / 16
        const blockStart = index * blockSize
        const blockEnd = (index + 1) * blockSize
        const blockedAmplitudeData = amplitudeDataArray.slice(blockStart, blockEnd)
        const averageBlockFrequency = average(blockedAmplitudeData)
        item.scale.y = averageBlockFrequency * 0.05
      })
    }
  })

  const frequencyBandParts = () => {
    const parts = []

    for (let i = 0; i < 16; i++) {
      parts.push(
        <mesh
          position={[-8 + i, -2, 1]}
          castShadow
        >
          <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
          <meshStandardMaterial attach='material' color={colors[i]} />
        </mesh>
      )
    }

    return parts
  }

  return (
    <group
      ref={mesh}
      castShadow
    >
      {frequencyBandParts()}
    </group>
  )
}

AnimatedFrequencyBand.propTypes = {
  props: object,
  audioFile: string
}

AnimatedFrequencyBand.defaultProps = {
  props: {},
  audioFile: string
}

export default AnimatedFrequencyBand
