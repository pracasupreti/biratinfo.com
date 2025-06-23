/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useCallback } from 'react'
import { toast } from 'react-hot-toast'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon, Loader2 } from 'lucide-react'
import { format } from 'date-fns'
import { useAuth } from '@clerk/nextjs'

type NetworkFormData = {
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

type NetworkFormProps = {
    mode?: 'create' | 'edit'
    initialData?: Partial<NetworkFormData>
    networkId?: string
}

const provinces = [
    { value: 'Koshi', label: 'Koshi' },
    { value: 'Madhesh', label: 'Madhesh' },
    { value: 'Bagmati', label: 'Bagmati' },
    { value: 'Gandaki', label: 'Gandaki' },
    { value: 'Lumbini', label: 'Lumbini' },
    { value: 'Karnali', label: 'Karnali' },
    { value: 'Sudurpashchim', label: 'Sudurpashchim' },
]

const NetworkForm = ({ mode = 'create', initialData, networkId }: NetworkFormProps) => {
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState<Record<string, string>>({})
    const { getToken } = useAuth()

    const [formData, setFormData] = useState<NetworkFormData>({
        domainName: '',
        province: '',
        district: '',
        mpUmp: '',
        wardNumber: '',
        nameOfEditor: '',
        editorMobile: '',
        editorEmail: '',
        nameOfOwner: '',
        ownerPhone: '',
        ownerEmail: '',
        registrationNumber: '',
        panNumber: '',
        suchanaBibhagRegdNumber: '',
        url: '',
        domainRegistryDate: undefined,
        domainExpiryDate: undefined,
        domainRegistrar: '',
        joinedDate: undefined,
        agreementDate: undefined,
        totalNumberOfAuthors: '',
        ...initialData
    })

    // Email validation regex
    const validateEmail = (email: string) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return re.test(email)
    }

    // Phone validation regex
    const validatePhone = (phone: string) => {
        const re = /^[0-9]{10,15}$/
        return re.test(phone)
    }

    const validateUrl = (url: string) => {
        const re = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/
        return re.test(url)
    }

    // Validate form fields
    const validateForm = useCallback(() => {
        const newErrors: Record<string, string> = {}

        // Required fields validation
        const requiredFields: Array<keyof NetworkFormData> = [
            'domainName', 'province', 'district', 'mpUmp', 'wardNumber',
            'nameOfEditor', 'editorMobile', 'editorEmail', 'nameOfOwner',
            'ownerPhone', 'ownerEmail', 'registrationNumber', 'panNumber',
            'suchanaBibhagRegdNumber', 'url', 'domainRegistrar',
            'totalNumberOfAuthors'
        ]

        requiredFields.forEach(field => {
            if (!formData[field]) {
                const fieldName = field
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase())
                    .replace('Mp Ump', 'MP/UMP')
                newErrors[field] = `${fieldName} is required`
            }
        })

        // Date fields validation
        const requiredDateFields: Array<keyof NetworkFormData> = [
            'domainRegistryDate', 'domainExpiryDate', 'joinedDate', 'agreementDate'
        ]

        requiredDateFields.forEach(field => {
            if (!formData[field]) {
                const fieldName = field
                    .replace(/([A-Z])/g, ' $1')
                    .replace(/^./, str => str.toUpperCase())
                newErrors[field] = `${fieldName} is required`
            }
        })

        // Email validation
        if (formData.editorEmail && !validateEmail(formData.editorEmail)) {
            newErrors.editorEmail = 'Please enter a valid email address'
        }
        if (formData.ownerEmail && !validateEmail(formData.ownerEmail)) {
            newErrors.ownerEmail = 'Please enter a valid email address'
        }

        // Phone validation
        if (formData.editorMobile && !validatePhone(formData.editorMobile)) {
            newErrors.editorMobile = 'Please enter a valid 10-15 digit phone number'
        }
        if (formData.ownerPhone && !validatePhone(formData.ownerPhone)) {
            newErrors.ownerPhone = 'Please enter a valid 10-15 digit phone number'
        }

        // URL validation
        if (formData.url && !validateUrl(formData.url)) {
            newErrors.url = 'Please enter a valid URL (should start with http:// or https://)'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }, [formData])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleDateChange = (name: string, date: Date | undefined) => {
        setFormData(prev => ({ ...prev, [name]: date }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            toast.error('Please fix the errors in the form')
            return
        }

        setLoading(true)
        toast.loading(mode === 'create' ? 'Registering network...' : 'Updating network information...')

        try {
            const token = await getToken()
            const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL

            if (!backend_uri) {
                throw new Error("Missing API endpoint configuration")
            }

            // Prepare the data for API submission
            const submissionData = {
                ...formData,
                domainRegistryDate: formData.domainRegistryDate?.toISOString(),
                domainExpiryDate: formData.domainExpiryDate?.toISOString(),
                joinedDate: formData.joinedDate?.toISOString(),
                agreementDate: formData.agreementDate?.toISOString(),
                totalNumberOfAuthors: parseInt(formData.totalNumberOfAuthors) || 0
            }

            const url = mode === 'edit' && networkId
                ? `${backend_uri}/api/networks/${networkId}`
                : `${backend_uri}/api/networks`

            const method = mode === 'edit' ? 'PUT' : 'POST'

            console.log(JSON.stringify(submissionData))

            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData)
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || 'Failed to process request')
            }

            const successMessage = mode === 'create'
                ? 'Network registered successfully!'
                : 'Network updated successfully!'
            toast.dismiss()
            toast.success(successMessage)

            if (mode === 'create') {
                setFormData({
                    domainName: '',
                    province: '',
                    district: '',
                    mpUmp: '',
                    wardNumber: '',
                    nameOfEditor: '',
                    editorMobile: '',
                    editorEmail: '',
                    nameOfOwner: '',
                    ownerPhone: '',
                    ownerEmail: '',
                    registrationNumber: '',
                    panNumber: '',
                    suchanaBibhagRegdNumber: '',
                    url: '',
                    domainRegistryDate: undefined,
                    domainExpiryDate: undefined,
                    domainRegistrar: '',
                    joinedDate: undefined,
                    agreementDate: undefined,
                    totalNumberOfAuthors: '',
                })
            }

        } catch (error: any) {
            console.error('Form submission error:', error)
            toast.error(error.message || 'Failed to process request. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="max-w-6xl mx-auto p-4">
            <Card className="border-0 shadow-lg">
                <CardHeader className="pb-6">
                    <CardTitle className="text-2xl font-bold text-center text-gray-800">
                        {mode === 'create' ? 'Network Registration Form' : 'Edit Network Information'}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Network Information Section */}
                        <div className="space-y-4 p-6 bg-gray-100 rounded-lg shadow-sm border">
                            <h3 className="text-lg font-semibold text-gray-800">Network Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="domainName">Domain Name*</Label>
                                    <Input
                                        id="domainName"
                                        name="domainName"
                                        value={formData.domainName}
                                        onChange={handleChange}
                                        placeholder="Enter domain name"
                                    />
                                    {errors.domainName && <p className="text-sm text-red-500">{errors.domainName}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="url">Website URL*</Label>
                                    <Input
                                        id="url"
                                        name="url"
                                        value={formData.url}
                                        onChange={handleChange}
                                        placeholder="Enter website URL (e.g., https://example.com)"
                                    />
                                    {errors.url && <p className="text-sm text-red-500">{errors.url}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="domainRegistrar">Domain Registrar*</Label>
                                    <Input
                                        id="domainRegistrar"
                                        name="domainRegistrar"
                                        value={formData.domainRegistrar}
                                        onChange={handleChange}
                                        placeholder="Enter domain registrar"
                                    />
                                    {errors.domainRegistrar && <p className="text-sm text-red-500">{errors.domainRegistrar}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label>Domain Registry Date*</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {formData.domainRegistryDate ? (
                                                    format(formData.domainRegistryDate, 'PPP')
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={formData.domainRegistryDate}
                                                onSelect={(date) => handleDateChange('domainRegistryDate', date)}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {errors.domainRegistryDate && <p className="text-sm text-red-500">{errors.domainRegistryDate}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label>Domain Expiry Date*</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {formData.domainExpiryDate ? (
                                                    format(formData.domainExpiryDate, 'PPP')
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={formData.domainExpiryDate}
                                                onSelect={(date) => handleDateChange('domainExpiryDate', date)}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {errors.domainExpiryDate && <p className="text-sm text-red-500">{errors.domainExpiryDate}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Location Information Section */}
                        <div className="space-y-4 p-6 bg-gray-100 rounded-lg shadow-sm border">
                            <h3 className="text-lg font-semibold text-gray-800">Location Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="province">Province*</Label>
                                    <Select
                                        value={formData.province}
                                        onValueChange={(value) => handleSelectChange('province', value)}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select province" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {provinces.map(province => (
                                                <SelectItem key={province.value} value={province.value}>
                                                    {province.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.province && <p className="text-sm text-red-500">{errors.province}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="district">District*</Label>
                                    <Input
                                        id="district"
                                        name="district"
                                        value={formData.district}
                                        onChange={handleChange}
                                        placeholder="Enter district"
                                    />
                                    {errors.district && <p className="text-sm text-red-500">{errors.district}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="mpUmp">MP/UMP*</Label>
                                    <Input
                                        id="mpUmp"
                                        name="mpUmp"
                                        value={formData.mpUmp}
                                        onChange={handleChange}
                                        placeholder="Enter MP/UMP"
                                    />
                                    {errors.mpUmp && <p className="text-sm text-red-500">{errors.mpUmp}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="wardNumber">Ward Number*</Label>
                                    <Input
                                        id="wardNumber"
                                        name="wardNumber"
                                        value={formData.wardNumber}
                                        onChange={handleChange}
                                        placeholder="Enter ward number"
                                    />
                                    {errors.wardNumber && <p className="text-sm text-red-500">{errors.wardNumber}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Editor Information Section */}
                        <div className="space-y-4 p-6 bg-gray-100 rounded-lg shadow-sm border">
                            <h3 className="text-lg font-semibold text-gray-800">Editor Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="nameOfEditor">Name of Editor*</Label>
                                    <Input
                                        id="nameOfEditor"
                                        name="nameOfEditor"
                                        value={formData.nameOfEditor}
                                        onChange={handleChange}
                                        placeholder="Enter editor name"
                                    />
                                    {errors.nameOfEditor && <p className="text-sm text-red-500">{errors.nameOfEditor}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="editorMobile">Editor Mobile*</Label>
                                    <Input
                                        id="editorMobile"
                                        name="editorMobile"
                                        value={formData.editorMobile}
                                        onChange={handleChange}
                                        placeholder="Enter mobile number"
                                    />
                                    {errors.editorMobile && <p className="text-sm text-red-500">{errors.editorMobile}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="editorEmail">Editor Email*</Label>
                                    <Input
                                        id="editorEmail"
                                        name="editorEmail"
                                        value={formData.editorEmail}
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                        type="email"
                                    />
                                    {errors.editorEmail && <p className="text-sm text-red-500">{errors.editorEmail}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Owner Information Section */}
                        <div className="space-y-4 p-6 bg-gray-100 rounded-lg shadow-sm border">
                            <h3 className="text-lg font-semibold text-gray-800">Owner Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="nameOfOwner">Name of Owner*</Label>
                                    <Input
                                        id="nameOfOwner"
                                        name="nameOfOwner"
                                        value={formData.nameOfOwner}
                                        onChange={handleChange}
                                        placeholder="Enter owner name"
                                    />
                                    {errors.nameOfOwner && <p className="text-sm text-red-500">{errors.nameOfOwner}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="ownerPhone">Owner Phone*</Label>
                                    <Input
                                        id="ownerPhone"
                                        name="ownerPhone"
                                        value={formData.ownerPhone}
                                        onChange={handleChange}
                                        placeholder="Enter phone number"
                                    />
                                    {errors.ownerPhone && <p className="text-sm text-red-500">{errors.ownerPhone}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="ownerEmail">Owner Email*</Label>
                                    <Input
                                        id="ownerEmail"
                                        name="ownerEmail"
                                        value={formData.ownerEmail}
                                        onChange={handleChange}
                                        placeholder="Enter email address"
                                        type="email"
                                    />
                                    {errors.ownerEmail && <p className="text-sm text-red-500">{errors.ownerEmail}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Registration Information Section */}
                        <div className="space-y-4 p-6 bg-gray-100 rounded-lg shadow-sm border">
                            <h3 className="text-lg font-semibold text-gray-800">Registration Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="registrationNumber">Registration Number*</Label>
                                    <Input
                                        id="registrationNumber"
                                        name="registrationNumber"
                                        value={formData.registrationNumber}
                                        onChange={handleChange}
                                        placeholder="Enter registration number"
                                    />
                                    {errors.registrationNumber && <p className="text-sm text-red-500">{errors.registrationNumber}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="panNumber">PAN Number*</Label>
                                    <Input
                                        id="panNumber"
                                        name="panNumber"
                                        value={formData.panNumber}
                                        onChange={handleChange}
                                        placeholder="Enter PAN number"
                                    />
                                    {errors.panNumber && <p className="text-sm text-red-500">{errors.panNumber}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="suchanaBibhagRegdNumber">Suchana Bibhag Regd Number*</Label>
                                    <Input
                                        id="suchanaBibhagRegdNumber"
                                        name="suchanaBibhagRegdNumber"
                                        value={formData.suchanaBibhagRegdNumber}
                                        onChange={handleChange}
                                        placeholder="Enter registration number"
                                    />
                                    {errors.suchanaBibhagRegdNumber && <p className="text-sm text-red-500">{errors.suchanaBibhagRegdNumber}</p>}
                                </div>
                            </div>
                        </div>

                        {/* Additional Information Section */}
                        <div className="space-y-4 p-6 bg-gray-100 rounded-lg shadow-sm border">
                            <h3 className="text-lg font-semibold text-gray-800">Additional Information</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label>Joined Date*</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {formData.joinedDate ? (
                                                    format(formData.joinedDate, 'PPP')
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={formData.joinedDate}
                                                onSelect={(date) => handleDateChange('joinedDate', date)}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {errors.joinedDate && <p className="text-sm text-red-500">{errors.joinedDate}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label>Agreement Date*</Label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className="w-full justify-start text-left font-normal"
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {formData.agreementDate ? (
                                                    format(formData.agreementDate, 'PPP')
                                                ) : (
                                                    <span>Pick a date</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={formData.agreementDate}
                                                onSelect={(date) => handleDateChange('agreementDate', date)}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {errors.agreementDate && <p className="text-sm text-red-500">{errors.agreementDate}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="totalNumberOfAuthors">Total Number of Authors*</Label>
                                    <Input
                                        id="totalNumberOfAuthors"
                                        name="totalNumberOfAuthors"
                                        value={formData.totalNumberOfAuthors}
                                        onChange={handleChange}
                                        placeholder="Enter number of authors"
                                        type="number"
                                        min="0"
                                    />
                                    {errors.totalNumberOfAuthors && <p className="text-sm text-red-500">{errors.totalNumberOfAuthors}</p>}
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end pt-6">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="px-8 py-4 text-lg gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : mode === 'create' ? 'Register Network' : 'Update Network'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

export default NetworkForm