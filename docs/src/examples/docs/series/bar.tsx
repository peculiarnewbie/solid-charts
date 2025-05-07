import { Bar, Chart } from 'solid-charts'

const values = [0, 3, 2, 5, 3, 6, 2]

const data = values.map((value, index) => ({
  xAxis: `Day ${index + 1}`,
  value,
}))

const BarChart = () => {
  return (
    <div class="h-62.5 text-sm w-125 m-6">
      <Chart data={data}>
        <Bar dataKey="value" class="text-sc-400" />
      </Chart>
    </div>
  )
}

export default BarChart
