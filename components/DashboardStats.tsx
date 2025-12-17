import { createClient } from '@/lib/supabase/server'
import { Database, MapPin, Wifi, Users } from 'lucide-react'

export default async function DashboardStats() {
  const supabase = await createClient()

  // Get counts
  const [companiesResult, locationsResult, accessPointsResult, usersResult] = await Promise.all([
    supabase.from('Companies').select('CompanyId', { count: 'exact', head: true }),
    supabase.from('Locations').select('LocationId', { count: 'exact', head: true }),
    supabase.from('AccessPoints').select('APId', { count: 'exact', head: true }),
    supabase.from('Users').select('UserId', { count: 'exact', head: true }),
  ])

  const stats = [
    {
      name: 'Companies',
      value: companiesResult.count || 0,
      icon: Database,
      color: 'bg-blue-500',
    },
    {
      name: 'Locations',
      value: locationsResult.count || 0,
      icon: MapPin,
      color: 'bg-green-500',
    },
    {
      name: 'Access Points',
      value: accessPointsResult.count || 0,
      icon: Wifi,
      color: 'bg-purple-500',
    },
    {
      name: 'Users',
      value: usersResult.count || 0,
      icon: Users,
      color: 'bg-orange-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className={`${stat.color} p-3 rounded-md`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                  <dd className="text-lg font-semibold text-gray-900">{stat.value.toLocaleString()}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

