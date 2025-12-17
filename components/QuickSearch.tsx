'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { Search, MapPin, Wifi } from 'lucide-react'

interface Location {
  LocationId: number
  Address: string
  City: string
  State: string
  SiteID: string
  CompanyId: number
}

interface AccessPoint {
  APId: number
  MacAddress: string
  NASID: string
  LocationId: number
  APManufacturer: string
}

export default function QuickSearch() {
  const [searchTerm, setSearchTerm] = useState('')
  const [locations, setLocations] = useState<Location[]>([])
  const [accessPoints, setAccessPoints] = useState<AccessPoint[]>([])
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    if (searchTerm.length < 2) {
      setLocations([])
      setAccessPoints([])
      return
    }

    const search = async () => {
      setLoading(true)
      try {
        // Search locations by SiteID, Address, City, State
        const { data: locData } = await supabase
          .from('Locations')
          .select('LocationId, Address, City, State, SiteID, CompanyId')
          .or(`SiteID.ilike.%${searchTerm}%,Address.ilike.%${searchTerm}%,City.ilike.%${searchTerm}%,State.ilike.%${searchTerm}%`)
          .limit(10)

        // Search access points by NASID, MacAddress
        const { data: apData } = await supabase
          .from('AccessPoints')
          .select('APId, MacAddress, NASID, LocationId, APManufacturer')
          .or(`NASID.ilike.%${searchTerm}%,MacAddress.ilike.%${searchTerm}%`)
          .limit(10)

        setLocations(locData || [])
        setAccessPoints(apData || [])
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setLoading(false)
      }
    }

    const debounce = setTimeout(search, 300)
    return () => clearTimeout(debounce)
  }, [searchTerm, supabase])

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center mb-4">
        <Search className="h-5 w-5 text-gray-400 mr-2" />
        <h2 className="text-lg font-medium text-gray-900">Quick Search</h2>
      </div>
      
      <input
        type="text"
        placeholder="Search locations by SiteID, Address, City, State or Access Points by NASID, MacAddress..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
      />

      {loading && (
        <div className="mt-4 text-sm text-gray-500">Searching...</div>
      )}

      {!loading && (locations.length > 0 || accessPoints.length > 0) && (
        <div className="mt-4 space-y-4">
          {locations.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                Locations ({locations.length})
              </h3>
              <div className="space-y-2">
                {locations.map((loc) => (
                  <a
                    key={loc.LocationId}
                    href={`/dashboard/locations/${loc.LocationId}`}
                    className="block p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <div className="font-medium text-gray-900">
                      {loc.SiteID || 'No SiteID'}
                    </div>
                    <div className="text-sm text-gray-500">
                      {loc.Address}, {loc.City}, {loc.State}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {accessPoints.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Wifi className="h-4 w-4 mr-1" />
                Access Points ({accessPoints.length})
              </h3>
              <div className="space-y-2">
                {accessPoints.map((ap) => (
                  <a
                    key={ap.APId}
                    href={`/dashboard/access-points/${ap.APId}`}
                    className="block p-3 bg-gray-50 rounded-md hover:bg-gray-100 transition-colors"
                  >
                    <div className="font-medium text-gray-900">
                      NASID: {ap.NASID || 'N/A'}
                    </div>
                    <div className="text-sm text-gray-500">
                      MAC: {ap.MacAddress} | {ap.APManufacturer}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!loading && searchTerm.length >= 2 && locations.length === 0 && accessPoints.length === 0 && (
        <div className="mt-4 text-sm text-gray-500">No results found</div>
      )}
    </div>
  )
}

