import DashboardStats from '@/components/DashboardStats'
import QuickSearch from '@/components/QuickSearch'
import PerformanceGraphs from '@/components/PerformanceGraphs'

export default async function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome to Wayfi Admin Dashboard
        </p>
      </div>

      <DashboardStats />

      <QuickSearch />

      <PerformanceGraphs />
    </div>
  )
}