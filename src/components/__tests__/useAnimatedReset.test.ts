import { describe, it, expect, vi } from 'vitest'
import { useAnimatedReset } from '../composables/useAnimatedReset'
import { reactive } from 'vue'
import { gsap } from 'gsap'

// Мокаем GSAP для тестирования
vi.mock('gsap', () => ({
  gsap: {
    to: vi.fn(),
    fromTo: vi.fn(),
  },
}))

describe('useAnimatedReset', () => {
  const options = {
    containerSize: 500,
    initialSize: 100,
    animationDuration: 1.5,
  }
  const cube = reactive({ x: 0, y: 0, w: 200, h: 200 })

  it('анимирует сброс до начального состояния', () => {
    const { animateReset } = useAnimatedReset(cube, options)
    animateReset()

    expect(gsap.to).toHaveBeenCalledWith(cube, {
      x: 200, // (500 - 100) / 2
      y: 200, // (500 - 100) / 2
      w: 100,
      h: 100,
      duration: 1.5,
      ease: 'elastic.out(1, 0.3)',
    })
  })

  it('анимирует появление элемента', () => {
    const { animateAppear } = useAnimatedReset(cube, options)
    animateAppear('.cube')

    expect(gsap.fromTo).toHaveBeenCalledWith(
      '.cube',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
    )
  })
})
