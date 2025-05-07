import type { AxisContextType } from '@src/axis/context'
import type { ChartContextType } from '@src/components/context'
import type { Scale } from '@src/lib/createScale'
import { type Accessor, createEffect } from 'solid-js'

const createLabelTicks = (props: {
  ticks: Accessor<any[]>
  interval: Accessor<
    'preserveStart' | 'preserveEnd' | 'preserveStartEnd' | number
  >
  labelGap: Accessor<number>
  format: Accessor<(value: any) => string>
  averageCharSize: Accessor<{ x: number; y: number }>
  chartContext: ChartContextType
  axisContext: AxisContextType
}) => {
  createEffect(() => {
    const scale = props.axisContext.scale()

    const interval = props.interval()
    if (typeof interval === 'number') {
      props.axisContext.setLabelTicks(
        props.ticks().filter((_, i) => i % interval === 0),
      )
      return
    }

    const axis = props.axisContext.axis()
    const chartSize =
      axis === 'x' ? props.chartContext.width() : props.chartContext.height()

    switch (interval) {
      case 'preserveStart': {
        const sign = axis === 'x' ? 1 : -1
        const visibleLabels = calculateLabelTicks(
          props.ticks(),
          sign,
          chartSize,
          props.averageCharSize(),
          axis,
          props.labelGap(),
          props.format(),
          scale.scale,
        )
        props.axisContext.setLabelTicks(visibleLabels)
        break
      }
      case 'preserveEnd': {
        const sign = axis === 'x' ? -1 : 1
        const visibleLabels = calculateLabelTicks(
          [...props.ticks()].reverse(),
          sign,
          chartSize,
          props.averageCharSize(),
          axis,
          props.labelGap(),
          props.format(),
          scale.scale,
        )
        props.axisContext.setLabelTicks(visibleLabels.reverse())
        break
      }
      case 'preserveStartEnd': {
        const sign = axis === 'x' ? -1 : 1
        const ticks = [...props.ticks()].reverse()
        const firstTick = ticks[ticks.length - 1]!
        const size =
          props.averageCharSize()[axis] *
          (axis === 'x' ? props.format()(firstTick).length : 1)

        const tickPosition = scale.scale(firstTick)!
        const start = tickPosition - size / 2
        let end = tickPosition + size / 2
        if (axis === 'x' && start < 0) {
          end = size
        }

        const visibleLabels = calculateLabelTicks(
          ticks.slice(0, -1),
          sign,
          chartSize,
          props.averageCharSize(),
          axis,
          props.labelGap(),
          props.format(),
          scale.scale,
          end + props.labelGap(),
        )
        props.axisContext.setLabelTicks([...visibleLabels, firstTick].reverse())
        break
      }
    }
  })
}

const calculateLabelTicks = (
  ticks: any[],
  sign: number,
  chartSize: number,
  averageCharSize: { x: number; y: number },
  axis: 'x' | 'y',
  labelGap: number,
  format: (value: any) => string,
  scale: Scale['scale'],
  fixedStart?: number,
) => {
  const visibleLabels = []
  let lastPosition =
    sign > 0 ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY

  for (const tick of ticks) {
    const size =
      averageCharSize[axis] * (axis === 'x' ? format(tick).length : 1)

    const tickPosition = scale(tick)!
    let start = tickPosition - size / 2
    let end = tickPosition + size / 2

    if (axis === 'x') {
      if (start < 0) {
        start = 0
        end = start + size
      } else if (end > chartSize) {
        end = chartSize
        start = end - size
      }
    }

    const hasGap =
      sign > 0
        ? start >= lastPosition + labelGap
        : end <= lastPosition - labelGap

    if ((!fixedStart || start >= fixedStart) && hasGap && end <= chartSize) {
      visibleLabels.push(tick)
      lastPosition = sign > 0 ? end : start
    }
  }
  return visibleLabels
}

export default createLabelTicks
