import React, { useRef, useState, useEffect } from 'react'
import { useFrame } from 'react-three-fiber'
import { object, bool, string } from 'prop-types'

let audio;

const AnimatedSphere = ({ props, audioFile, playing, paused }) => {
  const mesh = useRef()

  useEffect(() => {
    if (audioFile) {
      audio = new Audio(audioFile)
    }
  }, [audioFile])

  if (audio) {
    audio.load()

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
