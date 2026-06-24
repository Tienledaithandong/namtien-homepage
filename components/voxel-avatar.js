import { useState, useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'

function easeOutCirc(x) {
  return Math.sqrt(1 - Math.pow(x - 1, 4))
}

const VoxelAvatar = () => {
  const refContainer = useRef()
  const [loading, setLoading] = useState(true)
  const refRenderer = useRef()

  const handleWindowResize = useCallback(() => {
    const { current: renderer } = refRenderer
    const { current: container } = refContainer
    if (container && renderer) {
      const scW = container.clientWidth
      const scH = container.clientHeight

      renderer.setSize(scW, scH)
    }
  }, [])

  useEffect(() => {
    const { current: container } = refContainer
    if (container) {
      const scW = container.clientWidth
      const scH = container.clientHeight

      const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
      })
      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(scW, scH)
      renderer.outputEncoding = THREE.sRGBEncoding
      container.appendChild(renderer.domElement)
      refRenderer.current = renderer

      const scene = new THREE.Scene()
      const target = new THREE.Vector3(0, 0, 0)
      const initialCameraPosition = new THREE.Vector3(
        20 * Math.sin(0.2 * Math.PI),
        10,
        20 * Math.cos(0.2 * Math.PI)
      )

      const camera = new THREE.PerspectiveCamera(
        75,
        scW / scH,
        0.1,
        1000
      )
      camera.position.copy(initialCameraPosition)
      camera.lookAt(target)

      const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
      scene.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
      directionalLight.position.set(10, 10, 5)
      scene.add(directionalLight)

      // Create voxel avatar with random colors
      const colors = [
        0xff6b6b, 0x4ecdc4, 0x45b7d1, 0xf7b731, 0x5f27cd,
        0x00d2d3, 0xff9ff3, 0x54a0ff, 0x48dbfb, 0x1dd1a1
      ]
      
      const randomColor = colors[Math.floor(Math.random() * colors.length)]
      const accentColor = colors[Math.floor(Math.random() * colors.length)]

      // Create head (cube)
      const headGeometry = new THREE.BoxGeometry(2, 2.5, 2)
      const headMaterial = new THREE.MeshPhongMaterial({ 
        color: randomColor,
        shininess: 100
      })
      const head = new THREE.Mesh(headGeometry, headMaterial)
      head.position.set(0, 1.5, 0)
      scene.add(head)

      // Create body (larger cube)
      const bodyGeometry = new THREE.BoxGeometry(2, 3, 1.2)
      const bodyMaterial = new THREE.MeshPhongMaterial({ 
        color: accentColor,
        shininess: 100
      })
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial)
      body.position.set(0, -1, 0)
      scene.add(body)

      // Create left arm
      const armGeometry = new THREE.BoxGeometry(0.8, 2.5, 0.8)
      const armMaterial = new THREE.MeshPhongMaterial({ 
        color: randomColor,
        shininess: 100
      })
      const leftArm = new THREE.Mesh(armGeometry, armMaterial)
      leftArm.position.set(-1.5, -0.5, 0)
      leftArm.rotation.z = 0.3
      scene.add(leftArm)

      // Create right arm
      const rightArm = new THREE.Mesh(armGeometry, armMaterial)
      rightArm.position.set(1.5, -0.5, 0)
      rightArm.rotation.z = -0.3
      scene.add(rightArm)

      // Create left leg
      const legGeometry = new THREE.BoxGeometry(0.8, 2.5, 0.8)
      const legMaterial = new THREE.MeshPhongMaterial({ 
        color: accentColor,
        shininess: 100
      })
      const leftLeg = new THREE.Mesh(legGeometry, legMaterial)
      leftLeg.position.set(-0.7, -3.5, 0)
      scene.add(leftLeg)

      // Create right leg
      const rightLeg = new THREE.Mesh(legGeometry, legMaterial)
      rightLeg.position.set(0.7, -3.5, 0)
      scene.add(rightLeg)

      // Create eyes
      const eyeGeometry = new THREE.SphereGeometry(0.25, 8, 8)
      const eyeMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x000000,
        shininess: 100
      })
      const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
      leftEye.position.set(-0.6, 2.2, 1.1)
      head.add(leftEye)

      const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial)
      rightEye.position.set(0.6, 2.2, 1.1)
      head.add(rightEye)

      // Animations
      let frame = 0
      const animate = () => {
        let loopNum = 0
        return (time) => {
          if (!(++loopNum % 2)) return
          frame = frame <= 100 ? frame + 1 : frame

          let easeRate = easeOutCirc(frame / 120)

          head.rotation.y += 0.005
          body.rotation.x += 0.003

          leftArm.rotation.z = -0.5 + Math.sin(time * 0.005) * 0.3
          rightArm.rotation.z = 0.5 + Math.sin(time * 0.005 + Math.PI) * 0.3

          leftLeg.rotation.z = Math.sin(time * 0.004) * 0.2
          rightLeg.rotation.z = Math.sin(time * 0.004 + Math.PI) * 0.2

          camera.position.lerp(target, 0.05)
          renderer.render(scene, camera)
          renderer.setAnimationLoop(animate(0))
        }
      }

      renderer.setAnimationLoop(animate(0))
      setLoading(false)

      window.addEventListener('resize', handleWindowResize)

      return () => {
        window.removeEventListener('resize', handleWindowResize)
        renderer.dispose()
      }
    }
  }, [handleWindowResize])

  return (
    <div
      ref={refContainer}
      style={{
        width: '100%',
        height: '100%'
      }}
    />
  )
}

export default VoxelAvatar
