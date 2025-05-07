import { useAxisContext } from '@src/axis/context'
import { useChartContext } from '@src/components/context'
import createClosestTick from '@src/lib/createClosestTick'
import { type ComponentProps, mergeProps } from 'solid-js'
import { isDev } from 'solid-js/web'

export type CursorProps = Omit<
  ComponentProps<'line'>,
  'x1' | 'y1' | 'x2' | 'y2'
>

/** Guide line rendered when hovering over the chart to hightlight the closest tick.
 *
 * @data `data-sc-axis-cursor` - Present on every cursor line element.
 */
const Cursor = (props: CursorProps) => {
  const chartContext = useChartContext()
  const axisContext = useAxisContext()

  if (isDev && axisContext.scale().type === 'linear') {
    throw new Error(
      '[solid-charts] Cursor can not be used with an axis of type linear',
    )
  }

  const defaultedProps = mergeProps(
    {
      stroke: 'currentColor',
      'stroke-width': 1,
    },
    props,
  )

  const closestTick = createClosestTick({
    axis: axisContext.axis,
    chartContext,
  })

  const x = () => {
    const tick = closestTick()
    if (!tick) return undefined

    switch (axisContext.axis()) {
      case 'x':
        return tick.position
      case 'y':
        return chartContext.getInset('left')
    }
  }

  const y = () => {
    const tick = closestTick()
    if (!tick) return undefined

    switch (axisContext.axis()) {
      case 'x':
        return chartContext.getInset('top')
      case 'y':
        return tick.position
    }
  }

  const x2 = () => {
    const tick = closestTick()
    if (!tick) return undefined

    switch (axisContext.axis()) {
      case 'x':
        return tick.position
      case 'y':
        return chartContext.width() - chartContext.getInset('right')
    }
  }

  const y2 = () => {
    const tick = closestTick()
    if (!tick) return undefined

    switch (axisContext.axis()) {
      case 'x':
        return chartContext.height() - chartContext.getInset('bottom')
      case 'y':
        return tick.position
    }
  }

  return (
    <line
      x1={x()}
      y1={y()}
      x2={x2()}
      y2={y2()}
      opacity={chartContext.pointerInChart() ? 1 : 0}
      data-sc-axis-cursor=""
      {...defaultedProps}
    />
  )
}

export default Cursor
