import { Chart, Line } from 'solid-charts'
import { curveNatural } from 'solid-charts/curves'

const values = [0, 3, 2, 5, 3, 6, 2]

const data = values.map((value, index) => ({
  xAxis: `Day ${index + 1}`,
  value,
}))

const LineChart = () => {
  return (
    <div class="h-62.5 text-sm w-125 m-6">
      <Chart data={data}>
        <Line
          curve={curveNatural}
          dataKey="value"
          class="stroke-sc-400"
          stroke-linecap="round"
          stroke-width={6}
        />
      </Chart>
    </div>
  )
}

export default LineChart
