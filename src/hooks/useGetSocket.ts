import { useEffect, useState } from 'react'
import { io } from 'socket.io-client'
const BACKEND_URL = process.env.BACKEND_URL

export default function useGetSocket() {
  const [cpuUsageChartData, setCpuUsageChartData] = useState<[number, number][]>([])
  const [memoryUsageChartData, setMemoryUsageChartData] = useState<[number, number][]>([])
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const socket = io(BACKEND_URL, {
      transports: ['websocket'],
    })

    socket.on('cpu', (usage) => {
      setCpuUsageChartData(usage)
    })

    socket.on('memory', (usage) => {
      setMemoryUsageChartData(usage)
    })
    return () => {
      socket.off('cpu')
      socket.off('memory')
      socket.disconnect()
    }
  }, [])

  useEffect(() => {
    if (cpuUsageChartData.length > 0 && memoryUsageChartData.length > 0) setIsLoading(false)
  }, [cpuUsageChartData, memoryUsageChartData])

  return { isLoading, cpuUsageChartData, memoryUsageChartData }
}
