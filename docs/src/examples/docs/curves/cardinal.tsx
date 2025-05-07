import { Chart, Line } from 'solid-charts'
import { curveCardinal } from 'solid-charts/curves'

const data = [0, 3, 2, 5, 3, 6, 2]

const StepCurveChart = () => {
  return (
    <div class="h-37.5 w-75">
      <Chart data={data}>
        <Line curve={curveCardinal} stroke-width={5} class="stroke-sc-400" />
      </Chart>
    </div>
  )
}

export default StepCurveChart
