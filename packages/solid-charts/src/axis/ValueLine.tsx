import { useAxisContext } from '@src/axis/context'
import { useChartContext } from '@src/components/context'
import type { OverrideProps } from '@src/lib/types'
import { type ComponentProps, mergeProps, splitProps } from 'solid-js'

export type ValueLineProps = OverrideProps<
  Omit<ComponentProps<'line'>, 'x1' | 'y1' | 'x2' | 'y2'>,
  {
    /**
     * The value in the axis scale to draw the line at.
     */
    value: any
  }
>

/** Line rendered at a specific value in the axis scale.
 *
 * @data `data-sc-axis-value-line` - Present on every value line element.
 */
const ValueLine = (props: ValueLineProps) => {
  const defaultedProps = mergeProps(
    {
      stroke: 'currentColor',
      'stroke-width': 1,
    },
    props,
  )
  const [localProps, otherProps] = splitProps(defaultedProps, ['value'])

  const chartContext = useChartContext()
  const axisContext = useAxisContext()

  const x = () => {
    switch (axisContext.axis()) {
      case 'x':
        return axisContext.scale().scale(localProps.value)
      case 'y':
        return chartContext.getInset('left')
    }
  }

  const y = () => {
    switch (axisContext.axis()) {
      case 'x':
        return chartContext.getInset('top')
      case 'y':
        return axisContext.scale().scale(localProps.value)
    }
  }

  const x2 = () => {
    switch (axisContext.axis()) {
      case 'x':
        return axisContext.scale().scale(localProps.value)
      case 'y':
        return chartContext.width() - chartContext.getInset('right')
    }
  }

  const y2 = () => {
    switch (axisContext.axis()) {
      case 'x':
        return chartContext.height() - chartContext.getInset('bottom')
      case 'y':
        return axisContext.scale().scale(localProps.value)
    }
  }

  return (
    <line
      x1={x()}
      y1={y()}
      x2={x2()}
      y2={y2()}
      data-value={localProps.value}
      data-sc-axis-value-line=""
      {...otherProps}
    />
  )
}

export default ValueLine
