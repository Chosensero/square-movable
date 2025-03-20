import { gsap } from 'gsap'
import { type CubeState } from './useDraggableResize' // Исправленный импорт

export interface AnimatedResetOptions {
  containerSize: number
  initialSize: number
  animationDuration: number
}

export function useAnimatedReset(cube: CubeState, options: AnimatedResetOptions) {
  const { containerSize, initialSize, animationDuration } = options

  // Анимация возвращения к исходному размеру
  function animateReset() {
    gsap.to(cube, {
      x: (containerSize - initialSize) / 2,
      y: (containerSize - initialSize) / 2,
      w: initialSize,
      h: initialSize,
      duration: animationDuration,
      ease: 'elastic.out(1, 0.3)',
    })
  }

  // Анимация появления
  function animateAppear(element: string) {
    gsap.fromTo(
      element,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' },
    )
  }

  return {
    animateReset,
    animateAppear,
  }
}
