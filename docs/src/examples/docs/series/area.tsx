import { Area, Chart } from 'solid-charts'
import { curveNatural } from 'solid-charts/curves'

const values = [0, 3, 2, 5, 3, 6, 2]

const data = values.map((value, index) => ({
  xAxis: `Day ${index + 1}`,
  value,
}))

const AreaChart = () => {
  return (
    <div class="h-62.5 text-sm w-125 m-6">
      <Chart data={data}>
        <Area curve={curveNatural} dataKey="value" class="text-sc-400" />
      </Chart>
    </div>
  )
}

export default AreaChart
