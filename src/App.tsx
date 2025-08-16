import CpuUsageChart from './components/CpuUsageChart'
import { ModeToggle } from './components/ToggleTheme'
import useGetSocket from './hooks/useGetSocket'

export default function App() {
  const { isLoading, cpuUsageChartData, memoryUsageChartData } = useGetSocket()
  if (isLoading)
    return (
      <div className="w-screen h-screen flex items-center justify-center gap-2">
        <div className="size-14 rounded-full border-t-4 border-t-primary animate-spin" />
      </div>
    )
  return (
    <div>
      <ModeToggle />
      <CpuUsageChart
        memoryUsageChartData={memoryUsageChartData}
        cpuUsageChartData={cpuUsageChartData}
      />
    </div>
  )
}
