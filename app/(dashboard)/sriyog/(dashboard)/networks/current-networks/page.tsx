'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card'
import { Loader2, Edit, Trash2, Plus } from 'lucide-react'
import { useAuth } from '@clerk/nextjs'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"

type Network = {
    _id: string
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
    domainRegistryDate: Date | undefined
    domainExpiryDate: Date | undefined
    domainRegistrar: string
    joinedDate: Date | undefined
    agreementDate: Date | undefined
    totalNumberOfAuthors: string
}

export default function CurrentNetworks() {
    const [networks, setNetworks] = useState<Network[]>([])
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('')
    const { getToken } = useAuth()
    const router = useRouter()

    useEffect(() => {
        const fetchNetworks = async () => {
            try {
                setLoading(true)
                const token = await getToken()
                const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL

                const response = await fetch(`${backend_uri}/api/networks`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                })

                if (!response.ok) {
                    throw new Error('Failed to fetch networks')
                }

                const data = await response.json()
                setNetworks(data?.data?.data)

            } catch (error) {
                console.error('Error fetching networks:', error)
                toast.error('Failed to load networks')
            } finally {
                setLoading(false)
            }
        }

        fetchNetworks()
    }, [getToken])

    const handleDelete = async (id: string) => {
        const confirmation = confirm('Are you sure you want to delete this network?')
        if (!confirmation) return

        try {
            const toastId = toast.loading('Deleting network...')
            const token = await getToken()
            const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL

            const response = await fetch(`${backend_uri}/api/networks/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })

            if (!response.ok) {
                throw new Error('Failed to delete network')
            }

            toast.dismiss(toastId)
            toast.success('Network deleted successfully')

            // Update the networks list
            setNetworks(networks.filter(network => network._id !== id))
        } catch (error) {
            console.error('Error deleting network:', error)
            toast.error('Failed to delete network')
        }
    }


    const filteredNetworks = networks.filter(network =>
        network.domainName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        network.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
        network.province.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        })
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Current Networks</h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        Manage all registered media networks
                    </p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                    <Input
                        placeholder="Search networks..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-64"
                    />
                    <Button onClick={() => router.push('/sriyog/networks/add-network')}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Network
                    </Button>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                </div>
            ) : filteredNetworks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 border rounded-lg bg-gray-50 dark:bg-gray-900">
                    <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                        {searchTerm ? 'No matching networks found' : 'No networks registered yet'}
                    </p>
                    {!searchTerm && (
                        <Button onClick={() => router.push('/sriyog/networks/add-network')}>
                            <Plus className="mr-2 h-4 w-4" />
                            Register First Network
                        </Button>
                    )}
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNetworks.map((network) => (
                        <Card key={network._id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg line-clamp-1">
                                            {network.domainName}
                                        </CardTitle>
                                        <CardDescription className="mt-1">
                                            {network.district}, {network.province}
                                        </CardDescription>
                                    </div>
                                    <Badge variant="outline" className="ml-2">
                                        {network.totalNumberOfAuthors} authors
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2 text-sm">
                                    <div className="flex items-center">
                                        <span className="text-gray-500 dark:text-gray-400 w-24">Website:</span>
                                        <a
                                            href={network.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline dark:text-blue-400"
                                        >
                                            {network.url.replace(/^https?:\/\//, '')}
                                        </a>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-gray-500 dark:text-gray-400 w-24">Editor:</span>
                                        <span>{network.editorEmail}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-gray-500 dark:text-gray-400 w-24">Expires:</span>
                                        <span>{formatDate(network.domainExpiryDate!.toString())}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <span className="text-gray-500 dark:text-gray-400 w-24">Registered:</span>
                                        <span>{formatDate(network.agreementDate!.toString())}</span>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => router.push(`/sriyog/networks/edit-network/${network._id}`)}
                                                className='cursor-pointer'
                                            >
                                                <Edit className="h-4 w-4" />
                                                <span className="sr-only">Edit</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Edit network</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button
                                                variant="destructive"
                                                size="sm"
                                                onClick={() => handleDelete(network._id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                                <span className="sr-only">Delete</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Delete network</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}