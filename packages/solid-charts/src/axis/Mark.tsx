import { useAxisContext } from '@src/axis/context'
import { useChartContext } from '@src/components/context'
import type { OverrideProps } from '@src/lib/types'
import { type ComponentProps, For, mergeProps } from 'solid-js'

export type MarkProps = OverrideProps<
  Omit<ComponentProps<'line'>, 'x1' | 'y1' | 'x2' | 'y2'>,
  {
    /**
     * Length of the mark lines in px.
     * @defaultValue 6px
     * */
    length?: number
  }
>

/** Mark lines rendered between the chart and axis labels.
 *
 * @data `data-sc-axis-mark-group` - Present on every mark group element.
 * @data `data-sc-axis-mark` - Present on every mark line element.
 */
const Mark = (props: MarkProps) => {
  const defaultedProps = mergeProps(
    {
      stroke: 'currentColor',
      'stroke-width': 1,
      length: 6,
    },
    props,
  )

  const chartContext = useChartContext()
  const axisContext = useAxisContext()

  const x = (tick: any) => {
    switch (axisContext.position()) {
      case 'top':
      case 'bottom':
        return axisContext.scale().scale(tick)
      case 'left':
        return chartContext.getInset('left')
      case 'right':
        return chartContext.width() - chartContext.getInset('right')
    }
  }

  const y = (tick: any) => {
    switch (axisContext.position()) {
      case 'top':
        return chartContext.getInset('top')
      case 'bottom':
        return chartContext.height() - chartContext.getInset('bottom')
      case 'left':
      case 'right':
        return axisContext.scale().scale(tick)
    }
  }

  const x2 = (tick: any) => {
    switch (axisContext.position()) {
      case 'top':
      case 'bottom':
        return axisContext.scale().scale(tick)
      case 'left':
        return chartContext.getInset('left') - defaultedProps.length
      case 'right':
        return (
          chartContext.width() -
          chartContext.getInset('right') +
          defaultedProps.length
        )
    }
  }

  const y2 = (tick: any) => {
    switch (axisContext.position()) {
      case 'top':
        return chartContext.getInset('top') - defaultedProps.length
      case 'bottom':
        return (
          chartContext.height() -
          chartContext.getInset('bottom') +
          defaultedProps.length
        )
      case 'left':
      case 'right':
        return axisContext.scale().scale(tick)
    }
  }

  return (
    <g data-sc-axis-mark-group="">
      <For each={axisContext.labelTicks()}>
        {(tick) => (
          <line
            x1={x(tick)}
            y1={y(tick)}
            x2={x2(tick)}
            y2={y2(tick)}
            data-sc-axis-mark=""
            {...defaultedProps}
          />
        )}
      </For>
    </g>
  )
}

export default Mark
