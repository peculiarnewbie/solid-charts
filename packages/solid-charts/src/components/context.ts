import { type Accessor, createContext, useContext } from 'solid-js'

export type Inset = {
  top: Map<string, number>
  right: Map<string, number>
  bottom: Map<string, number>
  left: Map<string, number>
}

export type BarConfig = {
  bandGap: number | `${number}%`
  barGap: number | `${number}%`
  barSize?: number | `${number}%`
  maxBarSize?: number | `${number}%`
}

export type ChartContextType = {
  data: Accessor<any[]>
  width: Accessor<number>
  height: Accessor<number>
  getInset: (
    edge: 'top' | 'right' | 'bottom' | 'left',
    exclude?: string,
  ) => number
  registerInset: (
    edge: 'top' | 'right' | 'bottom' | 'left',
    key: string,
    value: number,
  ) => void
  unregisterInset: (
    edge: 'top' | 'right' | 'bottom' | 'left',
    key: string,
  ) => void
  pointerPosition: Accessor<{ x: number; y: number } | null>
  pointerInChart: Accessor<boolean>
  wrapperRef: Accessor<HTMLDivElement | null>
  stacks: Accessor<
    Map<
      string,
      Map<
        string,
        {
          seriesIds: Set<string>
          values: number[]
        }
      >
    >
  >
  registerStack: (
    stackId: string,
    dataKey: string,
    seriesId: string,
    values: number[],
  ) => void
  unregisterStack: (stackId: string, dataKey: string, seriesId: string) => void
  registerAxis: (
    axisId: string,
    data:
      | { type: 'series'; seriesId: string; min: number; max: number }
      | {
          type: 'user'
          range: [number | 'min', number | 'max']
        },
  ) => void
  unregisterAxis: (
    axisId: string,
    data:
      | {
          type: 'series'
          seriesId: string
        }
      | {
          type: 'user'
        },
  ) => void
  getAxis: (axisId: string) => {
    min: number
    max: number
    userDefined: boolean
  }
  barConfig: Accessor<BarConfig>
  bars: Accessor<Set<string>>
  registerBar: (key: string) => void
  unregisterBar: (key: string) => void
  toSvgPosition: (position: number, dimension: 'width' | 'height') => number
  toContainerPosition: (
    position: number,
    dimension: 'width' | 'height',
  ) => number
}

export const ChartContext = createContext<ChartContextType>()

export const useChartContext = () => {
  const context = useContext(ChartContext)
  if (!context) {
    throw new Error(
      '[solid-charts]: Chart context not found. Make sure to wrap chart components in <Chart>',
    )
  }
  return context
}
