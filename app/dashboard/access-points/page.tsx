import { createClient } from '@/lib/supabase/server'
import AccessPointsTable, { type AccessPoint } from '@/components/AccessPointsTable'

export default async function AccessPointsPage() {
  const supabase = await createClient()

  const { data: accessPointsData } = await supabase
    .from('AccessPoints')
    .select(`
      APId,
      MacAddress,
      NASID,
      APManufacturer,
      Status,
      LocationId,
      Locations (SiteID, Address)
    `)
    .order('APId', { ascending: false })
    .limit(100)

  // Transform data to match component interface (Supabase returns Locations as array)
  const accessPoints: AccessPoint[] = (accessPointsData?.map((ap: any): AccessPoint => {
    const location = Array.isArray(ap.Locations) && ap.Locations.length > 0 
      ? ap.Locations[0] 
      : null
    
    return {
      APId: Number(ap.APId),
      MacAddress: String(ap.MacAddress || ''),
      NASID: String(ap.NASID || ''),
      APManufacturer: String(ap.APManufacturer || ''),
      Status: String(ap.Status || ''),
      LocationId: Number(ap.LocationId),
      Locations: location ? {
        SiteID: String(location.SiteID || ''),
        Address: String(location.Address || '')
      } : null
    }
  }) || [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Access Points</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and view all access points
        </p>
      </div>

      <AccessPointsTable accessPoints={accessPoints} />
    </div>
  )
}

