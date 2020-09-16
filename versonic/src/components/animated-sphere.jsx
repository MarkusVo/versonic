import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from 'react-three-fiber'
import { a } from 'react-spring/three'
import { object, string } from 'prop-types'
import SimplexNoise from 'simplex-noise'

const AnimatedSphere = ({ props, audioFile }) => {
  const [audioData, setAudioData] = useState()
  const audioContext = new AudioContext()
  const audio = new Audio()
  const noise = new SimplexNoise()
  let source
  let analyser

  const mesh = useRef()

  const avg = (array) => array.reduce((a, b) => a + b) / array.length
  const max = (array) => array.reduce((a, b) => { return Math.max(a, b) })

  const fractionate = (val, minVal, maxVal) => {
    return (val - minVal) / (maxVal - minVal)
  }

  const modulate = (val, minVal, maxVal, outMin, outMax) => {
    var fr = fractionate(val, minVal, maxVal)
    var delta = outMax - outMin
    return outMin + (fr * delta)
  }

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

      const lowerHalf = amplitudeDataArray.slice(0, (amplitudeDataArray.length / 2) - 1)
      const upperHalf = amplitudeDataArray.slice((amplitudeDataArray / 2) - 1, amplitudeDataArray.length - 1)

      const lowEndMax = max(lowerHalf)
      const highEndAvg = avg(upperHalf)

      const lowEndMaxFreq = lowEndMax / lowerHalf.length
      const highEndAvgFreq = highEndAvg / upperHalf.length

      const bassFrequency = modulate(Math.pow(lowEndMaxFreq, 0.8), 0, 1, 0, 8)
      const trebleFrequency = modulate(highEndAvgFreq, 0, 1, 0, 4)

      mesh.current.geometry.vertices.forEach(function (vertex, i) {
        var offset = mesh.current.geometry.parameters.radius
        var amp = 7
        var time = window.performance.now()
        vertex.normalize()
        var rf = 0.00001
        var distance = (offset + bassFrequency) + noise.noise3D(vertex.x + time * rf * 7, vertex.y + time * rf * 8, vertex.z + time * rf * 9) * amp * trebleFrequency
        vertex.multiplyScalar(distance)
      })

      mesh.current.geometry.veritcesNeedUpdate = true
      mesh.current.geometry.normalsNeedUpdate = true
      mesh.current.geometry.computeVertexNormals()
      mesh.current.geometry.computeFaceNormals()
    }
  })

  return (
    <a.mesh
      {...props}
      ref={mesh}
      castShadow
    >
      <icosahedronGeometry attach='geometry' args={[4, 4]} />
      <meshLambertMaterial attach='material' wireframe />
    </a.mesh>
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
