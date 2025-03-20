import { reactive, ref, computed } from 'vue'

export type Side = 'left' | 'right' | 'top' | 'bottom' | null

export interface Position {
  x: number
  y: number
}

export interface Size {
  w: number
  h: number
}

export interface CubeState extends Position, Size {}

export interface DraggableResizeOptions {
  containerSize: number
  initialSize: number
  minSize: number
  dragThreshold: number
}

export function useDraggableResize(options: DraggableResizeOptions) {
  const { containerSize, initialSize, minSize, dragThreshold } = options

  // Состояние куба
  const cube = reactive<CubeState>({
    x: (containerSize - initialSize) / 2,
    y: (containerSize - initialSize) / 2,
    w: initialSize,
    h: initialSize,
  })

  // Состояние взаимодействия
  const isDragging = ref(false)
  const draggedSide = ref<Side>(null)
  const hoverSide = ref<Side>(null)
  const startPosition = reactive<Position>({ x: 0, y: 0 })
  const startCubeState = reactive<CubeState>({ ...cube })

  // Вычисляемые свойства
  const cursorStyle = computed(() => {
    const side = isDragging.value ? draggedSide.value : hoverSide.value

    if (!side) return {}

    const cursors = {
      left: 'ew-resize',
      right: 'ew-resize',
      top: 'ns-resize',
      bottom: 'ns-resize',
    }

    return { cursor: cursors[side] }
  })

  // Отслеживание позиции клика
  function getClickPosition(e: MouseEvent | TouchEvent): Position {
    const element = e.currentTarget as HTMLElement
    const { left, top } = element.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

    return {
      x: clientX - left,
      y: clientY - top,
    }
  }

  // Определение стороны, к которой ближе всего клик
  function detectSide(x: number, y: number): Side {
    const sides: ('left' | 'right' | 'top' | 'bottom')[] = ['left', 'right', 'top', 'bottom']

    const distances = {
      left: Math.abs(x - cube.x),
      right: Math.abs(x - (cube.x + cube.w)),
      top: Math.abs(y - cube.y),
      bottom: Math.abs(y - (cube.y + cube.h)),
    }

    const closestSide = sides.reduce(
      (closest, side) => (distances[side] < distances[closest] ? side : closest),
      'left' as const, // Явно задаем начальное значение как 'left'
    )

    return distances[closestSide] < dragThreshold ? closestSide : null
  }

  // Начало перетаскивания
  function startDrag(e: MouseEvent | TouchEvent) {
    const { x, y } = getClickPosition(e)

    draggedSide.value = detectSide(x, y)
    if (!draggedSide.value) return

    e.preventDefault()
    isDragging.value = true

    // Сохраняем начальные позиции
    startPosition.x = x
    startPosition.y = y
    Object.assign(startCubeState, cube)
  }

  // Изменение размера куба
  function resizeCube(dx: number, dy: number) {
    if (!draggedSide.value) return

    const actions = {
      left: () => {
        const newWidth = Math.max(minSize, startCubeState.w - dx)
        if (newWidth >= minSize) {
          cube.x = startCubeState.x + dx
          cube.w = newWidth
        }
      },
      right: () => {
        cube.w = Math.max(minSize, startCubeState.w + dx)
      },
      top: () => {
        const newHeight = Math.max(minSize, startCubeState.h - dy)
        if (newHeight >= minSize) {
          cube.y = startCubeState.y + dy
          cube.h = newHeight
        }
      },
      bottom: () => {
        cube.h = Math.max(minSize, startCubeState.h + dy)
      },
    }

    // Explicitly assert that draggedSide.value is not null
    const side = draggedSide.value as 'left' | 'right' | 'top' | 'bottom'
    actions[side]?.()
  }

  // Обработка перетаскивания
  function onDrag(e: MouseEvent | TouchEvent) {
    if (!isDragging.value) return

    const { x, y } = getClickPosition(e)
    resizeCube(x - startPosition.x, y - startPosition.y)
  }

  // Обработка движения мыши для изменения курсора
  function onMouseMove(e: MouseEvent) {
    if (isDragging.value) return

    const { x, y } = getClickPosition(e)
    hoverSide.value = detectSide(x, y)
  }

  // Завершение перетаскивания
  function stopDrag() {
    if (!isDragging.value) return

    isDragging.value = false
    draggedSide.value = null
  }

  // Сброс состояния при выходе из области
  function onMouseLeave() {
    if (!isDragging.value) {
      hoverSide.value = null
    }
  }

  return {
    cube,
    isDragging,
    draggedSide,
    hoverSide,
    cursorStyle,
    startDrag,
    onDrag,
    onMouseMove,
    stopDrag,
    onMouseLeave,
  }
}
