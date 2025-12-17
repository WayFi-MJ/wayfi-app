import PerformanceGraphs from '@/components/PerformanceGraphs'

export default function PerformancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Performance Analytics</h1>
        <p className="mt-1 text-sm text-gray-500">
          View performance metrics and analytics
        </p>
      </div>

      <PerformanceGraphs />
    </div>
  )
}

