import { type ChartContextType, useChartContext } from '@src/components/context'
import { getBarPadding } from '@src/lib/utils'
import { scaleLinear } from 'd3-scale'
import { type Accessor, createMemo } from 'solid-js'

type ClosestTick = {
  index: number
  position: number
}

const createClosestTick = (props: {
  axis: Accessor<'x' | 'y'>
  chartContext: ChartContextType
}) => {
  const chartContext = useChartContext()

  return createMemo<ClosestTick | undefined>((prev) => {
    const pointerPosition = chartContext.pointerPosition()
    if (!pointerPosition) return prev

    let position: number
    let start: number
    let end: number

    switch (props.axis()) {
      case 'x': {
        const barPadding = getBarPadding(props.chartContext)
        position = chartContext.toSvgPosition(pointerPosition.x, 'width')
        start = chartContext.getInset('left') + barPadding
        end = chartContext.width() - chartContext.getInset('right') - barPadding
        break
      }
      case 'y': {
        position = chartContext.toSvgPosition(pointerPosition.y, 'height')
        start = chartContext.height() - chartContext.getInset('bottom')
        end = chartContext.getInset('top')
        break
      }
    }

    const scale = scaleLinear(
      [start, end],
      [0, chartContext.data().length - 1],
    ).clamp(true)

    const tickIndex = Math.round(scale(position))

    if (tickIndex === prev?.index) return prev

    return {
      index: tickIndex,
      position: scale.invert(tickIndex),
    }
  })
}

export default createClosestTick
