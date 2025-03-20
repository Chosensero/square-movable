<template>
  <div
    v-show="isVisible"
    class="container"
    @pointerdown="startDrag"
    @pointermove="onDrag"
    @mousemove="onMouseMove"
    @mouseleave="onMouseLeave"
    :style="cursorStyle"
  >
    <svg :width="CONTAINER_SIZE" :height="CONTAINER_SIZE">
      <rect class="cube" :x="cube.x" :y="cube.y" :width="cube.w" :height="cube.h" />
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useEventListener } from '@vueuse/core'
import { useDraggableResize } from '@/components/composables/useDraggableResize'
import { useAnimatedReset } from '@/components/composables/useAnimatedReset'

// Константы
const CONTAINER_SIZE = 320
const INITIAL_SIZE = 100
const MIN_SIZE = INITIAL_SIZE * 0.05
const DRAG_THRESHOLD = 10
const ANIMATION_DURATION = 0.7

// Видимость компонента
const isVisible = ref(false)

// Инициализация композаблов
const { cube, cursorStyle, startDrag, onDrag, onMouseMove, stopDrag, onMouseLeave } =
  useDraggableResize({
    containerSize: CONTAINER_SIZE,
    initialSize: INITIAL_SIZE,
    minSize: MIN_SIZE,
    dragThreshold: DRAG_THRESHOLD,
  })

const { animateReset, animateAppear } = useAnimatedReset(cube, {
  containerSize: CONTAINER_SIZE,
  initialSize: INITIAL_SIZE,
  animationDuration: ANIMATION_DURATION,
})

// Расширенная версия функции stopDrag с анимацией
function handleStopDrag() {
  stopDrag()
  animateReset()
}

// Хуки жизненного цикла
onMounted(() => {
  isVisible.value = true
  animateAppear('.container')
  useEventListener(document, 'pointerup', handleStopDrag)
})
</script>

<style scoped>
.container {
  width: v-bind(CONTAINER_SIZE + 'px');
  height: v-bind(CONTAINER_SIZE + 'px');
  background-color: #ffffff;
  box-shadow: 0 4px 16px var(--container-shadow);
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  user-select: none;
  touch-action: none;
}

svg {
  position: relative;
}

.cube {
  fill: var(--cube-color, #000000);
  stroke: var(--cube-stroke, #171818);
  stroke-width: 2;
  transition: fill 0.3s ease;
}

.cube:hover {
  fill: var(--cube-hover-color, #1e1f20);
}
</style>
