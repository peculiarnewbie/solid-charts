import { useAxisContext } from '@src/axis/context'
import { useChartContext } from '@src/components/context'
import { type ComponentProps, For, mergeProps } from 'solid-js'

export type GridProps = Omit<ComponentProps<'line'>, 'x1' | 'y1' | 'x2' | 'y2'>

/** Lines displaying the axis ticks on the chart.
 *
 * @data `data-sc-axis-grid-group` - Present on every grid group element.
 * @data `data-sc-axis-grid` - Present on every grid line element.
 */
const Grid = (props: GridProps) => {
  const chartContext = useChartContext()
  const axisContext = useAxisContext()

  const defaultedProps = mergeProps(
    {
      stroke: 'currentColor',
      'stroke-width': 1,
    },
    props,
  )

  const x = (tick: any) => {
    switch (axisContext.axis()) {
      case 'x':
        return axisContext.scale().scale(tick)
      case 'y':
        return chartContext.getInset('left')
    }
  }

  const y = (tick: any) => {
    switch (axisContext.axis()) {
      case 'x':
        return chartContext.getInset('top')
      case 'y':
        return axisContext.scale().scale(tick)
    }
  }

  const x2 = (tick: any) => {
    switch (axisContext.axis()) {
      case 'x':
        return axisContext.scale().scale(tick)
      case 'y':
        return chartContext.width() - chartContext.getInset('right')
    }
  }

  const y2 = (tick: any) => {
    switch (axisContext.axis()) {
      case 'x':
        return chartContext.height() - chartContext.getInset('bottom')
      case 'y':
        return axisContext.scale().scale(tick)
    }
  }

  return (
    <g data-sc-axis-grid-group="">
      <For each={axisContext.labelTicks()}>
        {(tick) => (
          <line
            x1={x(tick)}
            y1={y(tick)}
            x2={x2(tick)}
            y2={y2(tick)}
            data-sc-axis-grid=""
            {...defaultedProps}
          />
        )}
      </For>
    </g>
  )
}

export default Grid
