import type { Scale } from '@src/lib/createScale'
import { type Accessor, createContext, useContext } from 'solid-js'

export type AxisContextType = {
  scale: Accessor<Scale>
  ticks: Accessor<any[]>
  axis: Accessor<'x' | 'y'>
  position: Accessor<'top' | 'right' | 'bottom' | 'left'>
  labelTicks: Accessor<any[]>
  setLabelTicks: (ticks: any[]) => void
}

export const AxisContext = createContext<AxisContextType>()

export const useAxisContext = () => {
  const context = useContext(AxisContext)
  if (!context) {
    throw new Error(
      '[solid-charts]: Axis context not found. Make sure to wrap Axis components in <Axis>',
    )
  }
  return context
}
