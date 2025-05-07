import { useAxisContext } from '@src/axis/context'
import { useChartContext } from '@src/components/context'
import { type ComponentProps, mergeProps } from 'solid-js'

export type LineProps = Omit<ComponentProps<'line'>, 'x1' | 'y1' | 'x2' | 'y2'>

/** Baseline for the axis.
 *
 * @data `data-sc-axis-line` - Present on every axis line element.
 */
const Line = (props: LineProps) => {
  const defaultedProps = mergeProps(
    {
      stroke: 'currentColor',
      'stroke-width': 1,
    },
    props,
  )

  const chartContext = useChartContext()
  const axisContext = useAxisContext()

  const x = () => {
    switch (axisContext.position()) {
      case 'top':
      case 'bottom':
        return chartContext.getInset('left')
      case 'left':
        return chartContext.getInset('left')
      case 'right':
        return chartContext.width() - chartContext.getInset('right')
    }
  }

  const y = () => {
    switch (axisContext.position()) {
      case 'top':
        return chartContext.getInset('top')
      case 'bottom':
        return chartContext.height() - chartContext.getInset('bottom')
      case 'left':
      case 'right':
        return chartContext.getInset('top')
    }
  }

  const x2 = () => {
    switch (axisContext.position()) {
      case 'top':
      case 'bottom':
        return chartContext.width() - chartContext.getInset('right')
      case 'left':
        return chartContext.getInset('left')
      case 'right':
        return chartContext.width() - chartContext.getInset('right')
    }
  }

  const y2 = () => {
    switch (axisContext.position()) {
      case 'top':
        return chartContext.getInset('top')
      case 'bottom':
        return chartContext.height() - chartContext.getInset('bottom')
      case 'left':
      case 'right':
        return chartContext.height() - chartContext.getInset('bottom')
    }
  }

  return (
    <line
      x1={x()}
      y1={y()}
      x2={x2()}
      y2={y2()}
      data-sc-axis-line=""
      {...defaultedProps}
    />
  )
}

export default Line
