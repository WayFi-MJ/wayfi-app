'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'

export default function PerformanceGraphs() {
  const [apData, setApData] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from('APData')
        .select('PeriodStart, GBs, UniqueUsers, QualityScore, AvgThroughput')
        .order('PeriodStart', { ascending: false })
        .limit(30)
      setApData(data || [])
    }
    fetchData()
  }, [supabase])

  // Process data for charts
  interface DailyUsageData {
    date: string
    gbs: number
    users: number
  }

  interface QualityData {
    date: string
    quality: number
    throughput: number
  }

  interface APDataRecord {
    PeriodStart: string
    GBs: string | number | null
    UniqueUsers: number | null
    QualityScore: string | number | null
    AvgThroughput: string | number | null
  }

  const dailyUsage: DailyUsageData[] = apData?.reduce((acc: DailyUsageData[], record: APDataRecord) => {
    const date = new Date(record.PeriodStart).toLocaleDateString()
    const existing = acc.find((item) => item.date === date)
    if (existing) {
      existing.gbs += parseFloat(String(record.GBs || 0))
      existing.users += record.UniqueUsers || 0
    } else {
      acc.push({
        date,
        gbs: parseFloat(String(record.GBs || 0)),
        users: record.UniqueUsers || 0,
      })
    }
    return acc
  }, []) || []

  const qualityData: QualityData[] = apData?.slice(0, 10).map((record: APDataRecord) => ({
    date: new Date(record.PeriodStart).toLocaleDateString(),
    quality: parseFloat(String(record.QualityScore || 0)),
    throughput: parseFloat(String(record.AvgThroughput || 0)),
  })) || []

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">Performance Metrics</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Usage Chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Daily Usage (GB & Users)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyUsage.slice(-7)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="gbs" fill="#3b82f6" name="GBs" />
              <Bar yAxisId="right" dataKey="users" fill="#10b981" name="Users" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Quality Score Chart */}
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Quality Score & Throughput</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={qualityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="quality" stroke="#8b5cf6" name="Quality Score" />
              <Line yAxisId="right" type="monotone" dataKey="throughput" stroke="#f59e0b" name="Throughput (Mbps)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

