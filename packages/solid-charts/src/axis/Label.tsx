import { useAxisContext } from '@src/axis/context'
import { useChartContext } from '@src/components/context'
import createLabelTicks from '@src/lib/createLabelTicks'
import { getAverageCharSize } from '@src/lib/dom/charSize'
import createSvgSize from '@src/lib/dom/createSvgSize'
import type { OverrideProps } from '@src/lib/types'
import {
  type ComponentProps,
  For,
  type JSX,
  createEffect,
  createSignal,
  createUniqueId,
  mergeProps,
  splitProps,
} from 'solid-js'

export type LabelProps = OverrideProps<
  Omit<ComponentProps<'text'>, 'x' | 'y'>,
  {
    /**
     * Optional function to format the label text.
     * @defaultValue (value) => String(value)
     */
    format?: (value: any) => string
    /**
     * The interval at which to show labels.
     * @defaultValue 'preserveEnd'
     */
    interval?: 'preserveStart' | 'preserveEnd' | 'preserveStartEnd' | number
    /**
     * The minimum gap between labels.
     * @defaultValue 16px
     */
    labelGap?: number,
    /**
     * Accepts a function as it's children that receives the data of the ticks.
     */
    children?: (props: {  data: any }) => JSX.Element
  }
>

/** Axis label component.
 *
 * @data `data-sc-axis-label-group` - Present on every label group element.
 * @data `data-sc-axis-label` - Present on every label text element.
 */
const Label = (props: LabelProps) => {
  const chartContext = useChartContext()
  const axisContext = useAxisContext()

  const defaultedProps = mergeProps(
    {
      format: (value: any) => String(value),
      interval: 'preserveEnd' as const,
      labelGap: 16,
      fill: 'currentColor',
      'text-anchor':
        axisContext.position() === 'left'
          ? ('end' as const)
          : axisContext.position() === 'right'
            ? ('start' as const)
            : ('middle' as const),
      'dominant-baseline':
        axisContext.axis() === 'y' ? ('central' as const) : undefined,
      dx:
        axisContext.position() === 'left'
          ? '-0.5em'
          : axisContext.position() === 'right'
            ? '0.5em'
            : undefined,
      dy:
        axisContext.position() === 'bottom'
          ? '0.3em'
          : axisContext.position() === 'bottom'
            ? '-0.3em'
            : undefined,
    },
    props,
  )
  const [localProps, otherProps] = splitProps(defaultedProps, [
    'format',
    'interval',
    'labelGap',
    "children"
  ])

  const [labelGroupRef, setLabelGroupRef] = createSignal<SVGGElement | null>(
    null,
  )

  createSvgSize({
    element: labelGroupRef,
    dimension: () => (axisContext.axis() === 'x' ? 'height' : 'width'),
    onSizeChange: (size: number) => {
      chartContext.registerInset(
        axisContext.position(),
        'axis.label',
        chartContext.toSvgPosition(
          size,
          axisContext.axis() === 'x' ? 'height' : 'width',
        ),
      )
    },
    onCleanup: () =>
      chartContext.unregisterInset(axisContext.position(), 'axis.label'),
  })

  const labelAxisId = createUniqueId()

  // Can't do DOM stuff in a memo in Solid 1.0
  const [averageCharSize, setAverageCharSize] = createSignal({
    x: 0,
    y: 0,
  })
  createEffect(() => {
    const _labelGroupRef = labelGroupRef()
    if (!_labelGroupRef) return
    setAverageCharSize(
      getAverageCharSize(_labelGroupRef, otherProps, labelAxisId),
    )
  })

  createLabelTicks({
    ticks: axisContext.ticks,
    interval: () => localProps.interval,
    labelGap: () => localProps.labelGap,
    format: () => localProps.format,
    averageCharSize,
    chartContext,
    axisContext,
  })

  const x = (tick: any) => {
    switch (axisContext.position()) {
      case 'top':
      case 'bottom': {
        const tickPosition = axisContext.scale().scale(tick)
        const size = averageCharSize().x * localProps.format(tick).length
        const start = tickPosition - size / 2
        const end = tickPosition + size / 2

        if (start < 0) {
          return tickPosition - start
        }
        if (end > chartContext.width()) {
          return tickPosition - (end - chartContext.width())
        }
        return tickPosition
      }
      case 'left':
        return chartContext.getInset('left')
      case 'right':
        return chartContext.width() - chartContext.getInset('right')
    }
  }

  const y = (tick: any) => {
    switch (axisContext.position()) {
      case 'top':
        return chartContext.getInset('top', 'axis.label')
      case 'bottom':
        return (
          chartContext.height() - chartContext.getInset('bottom', 'axis.label')
        )
      case 'left':
      case 'right':
        return axisContext.scale().scale(tick)
    }
  }

  return (
    <g ref={setLabelGroupRef} data-sc-axis-label-group="">
      <For each={axisContext.labelTicks()}>
        {(tick) => localProps.children ? 
          localProps.children({
          get data() {
            return {x: x(tick), y: y(tick), label: tick}
          },
        })
          : (
            <text x={x(tick)} y={y(tick)} data-sc-axis-label="" {...otherProps}>
              {localProps.format(tick)}
            </text>
          )}
      </For>
    </g>
  )
}

export default Label
