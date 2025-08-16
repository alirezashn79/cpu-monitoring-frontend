import Chart from 'react-google-charts'
import { useTheme } from '../providers/ThemeProvider'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

type TimePoint = [number /* timestamp */, number /* percent */]

interface IProps {
  cpuUsageChartData: TimePoint[]
  memoryUsageChartData: TimePoint[]
}

export default function CpuMemoryChart({ cpuUsageChartData, memoryUsageChartData }: IProps) {
  const { theme } = useTheme()

  if (!cpuUsageChartData.length || !memoryUsageChartData.length) return null

  const lastCpu = cpuUsageChartData[cpuUsageChartData.length - 1]
  const lastMemory = memoryUsageChartData[memoryUsageChartData.length - 1]

  const lineData = [
    [
      { type: 'datetime', label: 'Time' },
      { type: 'number', label: 'CPU %' },
      { type: 'number', label: 'Memory %' },
    ],
    ...cpuUsageChartData.map(([ts, cpuPercent], idx) => {
      const memPercent = memoryUsageChartData[idx]?.[1] ?? 0
      return [new Date(ts), cpuPercent, memPercent]
    }),
  ]

  const lineOptions = {
    title: 'CPU & Memory Usage Over Time',
    curveType: 'function',
    legend: { position: 'bottom' as const },
    hAxis: {
      title: 'Time',
      format: 'HH:mm:ss',
      gridlines: { count: 6 },
    },
    vAxis: {
      title: 'Usage %',
      minValue: 0,
      maxValue: 100,
    },
    colors: ['#155dfc', '#22c55e'],
    backgroundColor: theme === 'dark' ? '#09090b' : '#ffffff',
  }

  const gaugeDataCpu = [
    ['Label', 'Value'],
    ['CPU', lastCpu[1]],
  ] as number[][]

  const gaugeDataMemory = [
    ['Label', 'Value'],
    ['Memory', lastMemory[1]],
  ] as number[][]

  return (
    <div className="container mx-auto p-4">
      <Card className="w-fit mx-auto p-4">
        <CardHeader>
          <CardTitle className="text-center">Monitoring</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 justify-center">
            <Chart
              chartType="Gauge"
              height="100px"
              data={gaugeDataCpu}
              options={{
                redFrom: 80,
                redTo: 100,
                yellowFrom: 50,
                yellowTo: 80,
                minorTicks: 5,
              }}
            />
            <Chart
              chartType="Gauge"
              height="100px"
              data={gaugeDataMemory}
              options={{
                redFrom: 80,
                redTo: 100,
                yellowFrom: 50,
                yellowTo: 80,
                minorTicks: 5,
              }}
            />
          </div>
        </CardContent>
      </Card>
      <Card className="mt-4">
        <CardContent>
          <Chart
            chartType="LineChart"
            width="100%"
            height="380px"
            data={lineData}
            options={lineOptions}
          />
        </CardContent>
      </Card>
    </div>
  )
}
