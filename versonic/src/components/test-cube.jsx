import React, { useRef, useState } from 'react'
import { useFrame } from 'react-three-fiber'
import { object } from 'prop-types'

// This component was only needed to get used to react-three-fiber
const TestCube = (props) => {
  const mesh = useRef()

  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  useFrame(() => { mesh.current.rotation.x = mesh.current.rotation.y += 0.01 })

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [3, 3, 3] : [1, 1, 1]}
      onClick={(e) => setActive(!active)}
      onPointerOver={(e) => setHover(true)}
      onPointerOut={(e) => setHover(false)}
      castShadow
    >
      <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
      <meshStandardMaterial attach='material' color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  )
}

TestCube.propTypes = {
  props: object
}

TestCube.defaultProps = {
  props: {}
}

export default TestCube
