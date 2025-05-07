import { Chart, Point } from 'solid-charts'

const values = [0, 3, 2, 5, 3, 6, 2]

const data = values.map((value, index) => ({
  xAxis: `Day ${index + 1}`,
  value,
}))

const PointChart = () => {
  return (
    <div class="h-62.5 text-sm w-125 m-6">
      <Chart data={data}>
        <Point dataKey="value" r={8} class="text-sc-400" />
      </Chart>
    </div>
  )
}

export default PointChart
