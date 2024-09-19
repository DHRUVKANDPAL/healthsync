import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react'

interface RadialChartProps {
  title: string
  value: number
  total: number
  trend: number
  timeframe: string
  color: string
}

const RadialChart: React.FC<RadialChartProps> = ({ title, value, total, trend, timeframe, color }) => {
  const percentage = (value / total) * 100

  return (
    <Card className="w-full bg-white dark:bg-gray-800 shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold text-gray-700 dark:text-gray-200">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pb-8">
        <div className="flex justify-between items-baseline mb-2">
          <span className="text-3xl font-bold" style={{ color }}>{value.toLocaleString()}</span>
          <span className="text-sm text-gray-500 dark:text-gray-400">of {total.toLocaleString()}</span>
        </div>
        <Progress value={percentage} className="h-2" style={{ ['--progress-background' as any]: color }} />
      </CardContent>
      
    </Card>
  )
}

export default RadialChart