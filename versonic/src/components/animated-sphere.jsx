import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from 'react-three-fiber'
import { object, bool, string } from 'prop-types'

const audioContext = new AudioContext()
let audio

const AnimatedSphere = ({ props, audioFile, playing, paused }) => {
  const mesh = useRef()
  let src
  let analyser
  let bufferLength
  let dataArray

  // Fucking shit stateManagment with the WebAudio API is tricky
  useEffect(() => {
    if (audioFile) {
      //still no idea what should happen here but i guess this is the setup of the web audio api
      audio = new Audio(audioFile)
      audio.load()/* 
      src = audioContext.createMediaElementSource(audio)
      analyser = audioContext.createAnalyser()
      src.connect(analyser)
      analyser.connect(audioContext.destination)
      analyser.fftSize = '512'
      bufferLength = analyser.frequencyBinCount
      dataArray = new Uint8Array(bufferLength)
      analyser.getByteFrequencyData(dataArray) */
    }
  }, [audioFile])

  if (audio) {
    if (playing && !paused) {
      audio.play()
    }

    if (paused) {
      audio.pause()
    } 
  }

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
  audioFile: string,
  playing: bool,
  paused: bool
}

AnimatedSphere.defaultProps = {
  props: {},
  audioFile: string,
  playing: false,
  paused: false
}

export default AnimatedSphere
