import { createClient } from '@/lib/supabase/server'
import LocationsTable, { type Location } from '@/components/LocationsTable'

export default async function LocationsPage() {
  const supabase = await createClient()

  const { data: locationsData } = await supabase
    .from('Locations')
    .select(`
      LocationId,
      SiteID,
      Address,
      City,
      State,
      Status,
      CompanyId,
      Companies (Name)
    `)
    .order('LocationId', { ascending: false })
    .limit(100)

  // Transform data to match component interface (Supabase returns Companies as array)
  const locations: Location[] = (locationsData?.map((loc: any): Location => {
    const company = Array.isArray(loc.Companies) && loc.Companies.length > 0 
      ? loc.Companies[0] 
      : null
    
    return {
      LocationId: Number(loc.LocationId),
      SiteID: String(loc.SiteID || ''),
      Address: String(loc.Address || ''),
      City: String(loc.City || ''),
      State: String(loc.State || ''),
      Status: String(loc.Status || ''),
      CompanyId: Number(loc.CompanyId),
      Companies: company ? {
        Name: String(company.Name || '')
      } : undefined
    }
  }) || [])

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Locations</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage and view all locations
        </p>
      </div>

      <LocationsTable locations={locations || []} />
    </div>
  )
}

