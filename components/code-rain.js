import { useEffect, useRef } from 'react'
import { Box } from '@chakra-ui/react'
import styled from '@emotion/styled'

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
  pointer-events: none;
`

const CodeRain = () => {
  const canvasRef = useRef()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = 120

    const chars = '01アイウエオ'
    const charArray = chars.split('')
    const fontSize = 12
    const columns = Math.floor(canvas.width / fontSize)

    const drops = Array(Math.floor(columns))
      .fill(0)
      .map(() => Math.random() * canvas.height)

    let animationId
    let frameCount = 0

    const draw = () => {
      frameCount++
      if (frameCount % 2 !== 0) {
        animationId = requestAnimationFrame(draw)
        return
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.02)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      ctx.fillStyle = '#0f0'
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = charArray[Math.floor(Math.random() * charArray.length)]
        ctx.fillText(text, i * fontSize, drops[i])

        if (drops[i] > canvas.height && Math.random() > 0.98) {
          drops[i] = 0
        }
        drops[i] += Math.random() * 0.2 + 0.05
      }

      animationId = requestAnimationFrame(draw)
    }

    draw()

    const handleResize = () => {
      canvas.width = window.innerWidth
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return <Canvas ref={canvasRef} />
}

export default CodeRain
