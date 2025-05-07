import type { ChartContextType } from '@src/components/context'
import { gapToPadding } from '@src/lib/utils'
import { scaleBand } from 'd3-scale'
import { type Accessor, createMemo } from 'solid-js'

const createBands = (props: {
  seriesId: string
  stackId: Accessor<string | undefined>
  data: Accessor<number[]>
  chartContext: ChartContextType
}) => {
  return createMemo(() => {
    const data = props.data()

    const left = props.chartContext.getInset('left')
    const right =
      props.chartContext.width() - props.chartContext.getInset('right')

    const chartWidth = right - left

    const barConfig = props.chartContext.barConfig()
    const bandGap = gapToPadding(barConfig.bandGap, chartWidth / data.length)
    const barGap = gapToPadding(barConfig.barGap, chartWidth / data.length)

    const bandScale = scaleBand()
      .domain(Array(data.length).keys().map(String))
      .range([left, right])
      .paddingInner(bandGap)

    const bars = props.chartContext.bars()
    const barGroupScale = scaleBand()
      .domain([...bars.values()])
      .range([0, bandScale.bandwidth()])
      .paddingInner(barGap)

    const barWidth = barGroupScale.bandwidth()

    return Array(data.length)
      .fill(null)
      .map((_, index) => {
        const bandX = bandScale(String(index))!
        const barGroupX = barGroupScale(
          String(props.stackId() ?? props.seriesId),
        )!

        return {
          x: bandX + barGroupX,
          width: barWidth,
        }
      })
  })
}

export default createBands
