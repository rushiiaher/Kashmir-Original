"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/hooks/useAuth"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

export default function AdminVendors() {
  const { user, loading } = useAuth()
  const [vendors, setVendors] = useState<any[]>([])
  const [vendorsLoading, setVendorsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchVendors()
  }, [])

  const fetchVendors = async () => {
    const { data, error } = await supabase
      .from('vendors')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching vendors:', error)
    }
    
    setVendors(data || [])
    setVendorsLoading(false)
  }

  const updateVendorStatus = async (vendorId: string, status: string, isVerified: boolean) => {
    const { error } = await supabase
      .from('vendors')
      .update({ status, is_verified: isVerified })
      .eq('id', vendorId)

    if (!error) {
      fetchVendors()
    }
  }

  if (loading || vendorsLoading) {
    return <div className="p-8">Loading...</div>
  }

  if (!user) {
    return (
      <div className="p-8 text-center">
        <p>Please log in to access admin panel.</p>
        <Button asChild className="mt-4">
          <Link href="/auth/login">Sign In</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-8">Vendor Management</h1>

      <Card>
        <CardHeader>
          <CardTitle>All Vendors</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Store Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {vendors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    No vendors found
                  </TableCell>
                </TableRow>
              ) : (
                vendors.map((vendor) => (
                  <TableRow key={vendor.id}>
                  <TableCell className="font-medium">{vendor.store_name}</TableCell>
                  <TableCell>{vendor.business_email || 'N/A'}</TableCell>
                  <TableCell>
                    <Badge variant={vendor.status === 'active' ? 'default' : 'secondary'}>
                      {vendor.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={vendor.is_verified ? 'default' : 'destructive'}>
                      {vendor.is_verified ? 'Verified' : 'Unverified'}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(vendor.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      {vendor.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => updateVendorStatus(vendor.id, 'active', true)}
                        >
                          Approve
                        </Button>
                      )}
                      {vendor.status === 'active' && (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => updateVendorStatus(vendor.id, 'suspended', false)}
                        >
                          Suspend
                        </Button>
                      )}
                    </div>
                  </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}