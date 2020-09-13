import React, { useRef, useState } from 'react'
import { useFrame } from 'react-three-fiber'
import { object } from 'prop-types'

const TestCube = (props) => {
  // This reference will give us direct access to the mesh
  const mesh = useRef()

  // Set up state for the hovered and active state
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)

  // Rotate mesh every frame, this is outside of React without overhead
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
