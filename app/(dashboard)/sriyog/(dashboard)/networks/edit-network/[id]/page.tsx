'use client'

import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useAuth } from '@clerk/nextjs'
import Loader from '@/components/Loader'
import NetworkForm from '../../add-network/NetworkTable'

type NetworkData = {
  domainName: string
  province: string
  district: string
  mpUmp: string
  wardNumber: string
  nameOfEditor: string
  editorMobile: string
  editorEmail: string
  nameOfOwner: string
  ownerPhone: string
  ownerEmail: string
  registrationNumber: string
  panNumber: string
  suchanaBibhagRegdNumber: string
  url: string
  domainRegistryDate: string
  domainExpiryDate: string
  domainRegistrar: string
  joinedDate: string
  agreementDate: string
  totalNumberOfAuthors: number
}

export default function EditNetworkPage() {
  const params = useParams()
  const { id } = params
  const [networkData, setNetworkData] = useState<NetworkData | null>(null)
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()

  useEffect(() => {
    const fetchNetwork = async () => {
      try {
        setLoading(true)
        const token = await getToken()
        const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL

        const response = await fetch(`${backend_uri}/api/networks/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch network data')
        }
        const data = await response.json()
        setNetworkData(data?.data?.network)
      } catch (error) {
        console.error('Error fetching network:', error)
        toast.error('Failed to load network data')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchNetwork()
    }
  }, [id, getToken])

  if (loading) {
    return (
      <div className="container mx-auto py-8 flex justify-center">
        <Loader />
      </div>
    )
  }

  if (!networkData) {
    return (
      <div className="container mx-auto py-8 text-center">
        <p>Network not found</p>
      </div>
    )
  }

  // Transform dates from strings to Date objects
  const initialData = {
    ...networkData,
    domainRegistryDate: networkData.domainRegistryDate ? new Date(networkData.domainRegistryDate) : undefined,
    domainExpiryDate: networkData.domainExpiryDate ? new Date(networkData.domainExpiryDate) : undefined,
    joinedDate: networkData.joinedDate ? new Date(networkData.joinedDate) : undefined,
    agreementDate: networkData.agreementDate ? new Date(networkData.agreementDate) : undefined,
    totalNumberOfAuthors: networkData.totalNumberOfAuthors.toString(),
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Edit Network</h1>
      <NetworkForm mode="edit" initialData={initialData} networkId={id as string} />
    </div>
  )
}