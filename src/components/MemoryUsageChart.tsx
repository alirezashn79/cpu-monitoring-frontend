import Chart from 'react-google-charts'
import { useTheme } from '../providers/ThemeProvider'
import { Card, CardContent } from './ui/card'

interface IProps {
  memoryUsageChartData: [number, number][]
}

export default function MemoryUsageChart({ memoryUsageChartData }: IProps) {
  const { theme } = useTheme()

  if (!memoryUsageChartData.length) return null

  const lineData = [
    [
      { type: 'datetime', label: 'Time' },
      { type: 'number', label: 'Memory %' },
    ],
    ...memoryUsageChartData.map(([ts, usage]) => [new Date(ts), usage]),
  ] as number[][]

  const lineOptions = {
    title: 'Memory Usage Over Time',
    curveType: 'function',
    legend: { position: 'bottom' },
    hAxis: {
      title: 'Time',
      format: 'HH:mm:ss',
      gridlines: { count: 6 },
    },
    vAxis: {
      title: 'Memory %',
      minValue: 0,
      maxValue: 100,
    },
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="mt-4">
        <CardContent>
          <Chart
            chartType="LineChart"
            width="100%"
            height="380px"
            data={lineData}
            options={{
              ...lineOptions,
              backgroundColor: theme === 'dark' ? '#09090b' : '#ffffff',
              colors: ['#22c55e'],
            }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
