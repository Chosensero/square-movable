import { describe, it, expect } from 'vitest'
import { useDraggableResize } from '../composables/useDraggableResize'

// Мокаем события мыши для тестирования
function createMouseEvent(type: string, x: number, y: number): MouseEvent {
  return new MouseEvent(type, { clientX: x, clientY: y, bubbles: true })
}

describe('useDraggableResize', () => {
  const options = {
    containerSize: 500,
    initialSize: 100,
    minSize: 50,
    dragThreshold: 10,
  }

  it('инициализирует куб с правильной позицией и размером', () => {
    const { cube } = useDraggableResize(options)
    expect(cube.x).toBe(200) // (500 - 100) / 2
    expect(cube.y).toBe(200) // (500 - 100) / 2
    expect(cube.w).toBe(100)
    expect(cube.h).toBe(100)
  })

  it('определяет левую сторону при начале перетаскивания', () => {
    const { startDrag, isDragging, draggedSide } = useDraggableResize(options)
    const event = createMouseEvent('mousedown', 205, 250) // Близко к левой стороне (x: 200 + 5)
    const mockElement = { getBoundingClientRect: () => ({ left: 0, top: 0 }) }
    Object.defineProperty(event, 'currentTarget', { value: mockElement })

    startDrag(event)
    expect(isDragging.value).toBe(true)
    expect(draggedSide.value).toBe('left')
  })

  it('изменяет размер куба при перетаскивании вправо', () => {
    const { cube, startDrag, onDrag } = useDraggableResize(options)
    const startEvent = createMouseEvent('mousedown', 300, 250) // Правая сторона (x: 200 + 100)
    const dragEvent = createMouseEvent('mousemove', 350, 250) // Перемещение вправо на 50
    const mockElement = { getBoundingClientRect: () => ({ left: 0, top: 0 }) }
    Object.defineProperty(startEvent, 'currentTarget', { value: mockElement })
    Object.defineProperty(dragEvent, 'currentTarget', { value: mockElement })

    startDrag(startEvent)
    onDrag(dragEvent)
    expect(cube.w).toBe(150) // Увеличение ширины на 50
  })

  it('останавливает перетаскивание', () => {
    const { startDrag, stopDrag, isDragging, draggedSide } = useDraggableResize(options)
    const event = createMouseEvent('mousedown', 205, 250) // Близко к левой стороне
    const mockElement = { getBoundingClientRect: () => ({ left: 0, top: 0 }) }
    Object.defineProperty(event, 'currentTarget', { value: mockElement })

    startDrag(event)
    stopDrag()
    expect(isDragging.value).toBe(false)
    expect(draggedSide.value).toBe(null)
  })

  it('обновляет стиль курсора при наведении на левую сторону', () => {
    const { onMouseMove, cursorStyle } = useDraggableResize(options)
    const event = createMouseEvent('mousemove', 205, 250) // Близко к левой стороне
    const mockElement = { getBoundingClientRect: () => ({ left: 0, top: 0 }) }
    Object.defineProperty(event, 'currentTarget', { value: mockElement })

    onMouseMove(event)
    expect(cursorStyle.value).toEqual({ cursor: 'ew-resize' })
  })
})
