import React, { useRef } from 'react'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useThree, extend, useFrame } from 'react-three-fiber'

extend({ OrbitControls })

const Controls = () => {
  const {
    camera,
    gl: { domElement }
  } = useThree()

  const controls = useRef()

  useFrame((state) => controls.current.update())

  return <orbitControls ref={controls} args={[camera, domElement]} />
}

export default Controls
