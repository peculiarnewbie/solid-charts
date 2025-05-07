import { combineStyle } from '@corvu/utils/dom'
import { useAxisContext } from '@src/axis/context'
import { useChartContext } from '@src/components/context'
import createClosestTick from '@src/lib/createClosestTick'
import createSize from '@src/lib/dom/createSize'
import type { OverrideProps } from '@src/lib/types'
import {
  type ComponentProps,
  type JSX,
  createMemo,
  createSignal,
  mergeProps,
  splitProps,
} from 'solid-js'
import { Portal, isDev } from 'solid-js/web'

export type TooltipProps = OverrideProps<
  ComponentProps<'div'>,
  {
    /**
     * The gap between the tick and the tooltip.
     * @defaultValue 16px
     */
    tickGap?: number
    /**
     * The gap between the pointer and the tooltip.
     * @defaultValue 16px
     */
    pointerGap?: number
    /**
     * Accepts a function as it's children that receives the data of the closest tick.
     */
    children: (props: { data: any }) => JSX.Element
  }
>

/** Interactive tooltip component that renders near the closest tick.
 *
 * @data `data-sc-axis-tooltip` - Present on every tooltip element.
 */
const Tooltip = (props: TooltipProps) => {
  const defaultedProps = mergeProps(
    {
      tickGap: 16,
      pointerGap: 16,
    },
    props,
  )
  const [localProps, otherProps] = splitProps(defaultedProps, [
    'tickGap',
    'pointerGap',
    'children',
    'style',
  ])
  const chartContext = useChartContext()
  const axisContext = useAxisContext()

  if (isDev && axisContext.scale().type === 'linear') {
    throw new Error(
      '[solid-charts] Tooltip can not be used with an axis of type linear',
    )
  }

  const [tooltipRef, setTooltipRef] = createSignal<HTMLDivElement | null>(null)

  const tooltipSize = createSize({
    element: tooltipRef,
  })

  const pointerPosition = createMemo<{ x: number; y: number } | undefined>(
    (prev) => {
      const pointerPosition = chartContext.pointerPosition()
      if (!pointerPosition) return prev
      return pointerPosition
    },
  )

  const closestTick = createClosestTick({
    axis: axisContext.axis,
    chartContext,
  })

  const x = () => {
    const _pointerPosition = pointerPosition()
    const tick = closestTick()
    if (!_pointerPosition || !tick) return 0

    switch (axisContext.axis()) {
      case 'x': {
        const tickPosition = chartContext.toContainerPosition(
          tick.position,
          'width',
        )
        const preferredPosition = tickPosition + localProps.tickGap
        const _tooltipSize = tooltipSize()
        if (
          _tooltipSize &&
          preferredPosition + _tooltipSize[0] >
            chartContext.toContainerPosition(chartContext.width(), 'width')
        ) {
          return tickPosition - localProps.tickGap - _tooltipSize[0]
        }
        return preferredPosition
      }
      case 'y': {
        const preferredPosition = _pointerPosition.x + localProps.pointerGap
        const _tooltipSize = tooltipSize()
        if (
          _tooltipSize &&
          preferredPosition + _tooltipSize[0] >
            chartContext.toContainerPosition(chartContext.width(), 'width')
        ) {
          return _pointerPosition.x - localProps.pointerGap - _tooltipSize[0]
        }
        return preferredPosition
      }
    }
  }

  const y = () => {
    const _pointerPosition = pointerPosition()
    const tick = closestTick()
    if (!_pointerPosition || !tick) return 0

    switch (axisContext.axis()) {
      case 'x': {
        const preferredPosition = _pointerPosition.y + localProps.pointerGap
        const _tooltipSize = tooltipSize()
        if (
          _tooltipSize &&
          preferredPosition + _tooltipSize[1] >
            chartContext.toContainerPosition(chartContext.height(), 'height')
        ) {
          return _pointerPosition.y! - localProps.pointerGap - _tooltipSize[1]
        }
        return preferredPosition
      }
      case 'y': {
        const tickPosition = chartContext.toContainerPosition(
          tick.position,
          'height',
        )
        const preferredPosition = tickPosition + localProps.tickGap
        const _tooltipSize = tooltipSize()
        if (
          _tooltipSize &&
          preferredPosition + _tooltipSize[1] >
            chartContext.toContainerPosition(chartContext.height(), 'height')
        ) {
          return tickPosition - localProps.tickGap - _tooltipSize[1]
        }
        return preferredPosition
      }
    }
  }

  return (
    <Portal mount={chartContext.wrapperRef() ?? undefined}>
      <div
        ref={setTooltipRef}
        style={combineStyle(
          {
            position: 'absolute',
            'pointer-events': 'none',
            top: 0,
            left: 0,
            opacity: chartContext.pointerInChart() ? 1 : 0,
            transform: `translate3d(${x()}px, ${y()}px, 0px)`,
          },
          localProps.style,
        )}
        data-sc-axis-tooltip=""
        {...otherProps}
      >
        {localProps.children({
          get data() {
            return chartContext.data()[closestTick()?.index ?? 0]
          },
        })}
      </div>
    </Portal>
  )
}

export default Tooltip
