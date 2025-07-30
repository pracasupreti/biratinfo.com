/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import {
    RadioGroup,
    RadioGroupItem,
} from '@/components/ui/radio-group';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2, Globe, Settings, Clock, Target, Image as ImageIcon, Link2, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '@clerk/nextjs';
import { RoadblockFormData } from '@/types/roadblock';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import RoadblockImageSection from './RoadBlockImageSection';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';

const NETWORK_SITES = [
    'biratinfo.com',
    'bhadrapur.com',
    'belauri.com',
    'chandragadhi.com',
    'digitalkoshi.com',
    'koshiinfo.com',
    'duhabi.com',
    'jhorahat.com',
    'sriyog.net',
    'sunsaritimes.com',
    'birtacity.com',
    'karmashil.com',
    'gramthan.com',
    'birtainfo.com'
];

type RoadblockFormProps = {
    mode?: 'create' | 'edit';
    initialData?: Partial<RoadblockFormData>;
    bannerId?: string;
};

const RoadblockForm = ({ mode = 'create', initialData, bannerId }: RoadblockFormProps) => {
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [activeTab, setActiveTab] = useState('content');
    const { getToken } = useAuth();

    // Initialize networks based on initialData
    const initialNetworks = initialData?.networks === 'all' ? 'all' :
        (initialData?.networks as string[] || []);

    const [selectedNetworks, setSelectedNetworks] = useState<string[] | 'all'>(
        initialNetworks
    );

    const [dateType, setDateType] = useState<'single' | 'range'>('range');
    const [formData, setFormData] = useState<RoadblockFormData>({
        link: '',
        image: null,
        closeButtonDelay: 5,
        bannerTimeDelay: 5,
        repeat: 'never',
        networks: 'all',
        location: 'homepage',
        devices: 'desktop',
        hideForLoggedIn: false,
        startDate: undefined,
        endDate: undefined,
        ...initialData
    });

    const validateUrl = (url: string) => {
        const re = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
        return re.test(url);
    };

    const validateForm = useCallback(() => {
        const newErrors: Record<string, string> = {};

        // Required fields validation
        if (!formData.link) {
            newErrors.link = 'Destination URL is required';
        } else if (!validateUrl(formData.link)) {
            newErrors.link = 'Please enter a valid URL (should start with http:// or https://)';
        }

        if (!formData.image) {
            newErrors.image = 'Banner image is required';
        }

        if (!formData.startDate) {
            newErrors.startDate = 'Start date is required';
        }

        if (dateType === 'range' && !formData.endDate) {
            newErrors.endDate = 'End date is required';
        } else if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
            newErrors.endDate = 'End date must be after start date';
        }

        if (selectedNetworks !== 'all' && selectedNetworks.length === 0) {
            newErrors.networks = 'Please select at least one network or choose "All Networks"';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [formData, selectedNetworks, dateType]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [name]: name === 'closeButtonDelay' || name === 'bannerTimeDelay'
                ? parseInt(value)
                : value
        }));
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleDateChange = (name: string, date: Date | undefined) => {
        if (dateType === 'single' && name === 'startDate') {
            setFormData(prev => ({
                ...prev,
                startDate: date,
                endDate: date
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: date }));
        }
        setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const handleRadioChange = (name: string, value: string | boolean) => {
        setFormData(prev => ({
            ...prev,
            [name]: name === 'hideForLoggedIn'
                ? value === 'true'
                : value
        }));
    };

    const handleImageUploadSuccess = (result: { secure_url: string; public_id: string }) => {
        setFormData(prev => ({
            ...prev,
            image: {
                url: result.secure_url,
                publicId: result.public_id
            }
        }));
        setErrors(prev => ({ ...prev, image: '' }));
    };

    const handleImageRemove = () => {
        setFormData(prev => ({ ...prev, image: null }));
    };

    const handleNetworkToggle = (network: string) => {
        setSelectedNetworks(prev => {
            if (prev === 'all') {
                return [network];
            }
            if (prev.includes(network)) {
                const newNetworks = prev.filter(n => n !== network);
                return newNetworks.length > 0 ? newNetworks : 'all';
            }
            return [...prev, network];
        });
        setErrors(prev => ({ ...prev, networks: '' }));
    };

    const handleSelectAllNetworks = () => {
        setSelectedNetworks('all');
        setErrors(prev => ({ ...prev, networks: '' }));
    };

    const handleDeselectAllNetworks = () => {
        setSelectedNetworks([]);
        setErrors(prev => ({ ...prev, networks: '' }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Update formData with current network selection
        const updatedFormData = {
            ...formData,
            networks: selectedNetworks
        };

        setFormData(updatedFormData);

        if (!validateForm()) {
            toast.error('Please fix the errors in the form');
            return;
        }

        setLoading(true);
        toast.loading(mode === 'create' ? 'Creating banner...' : 'Updating banner...');

        try {
            const token = await getToken();
            const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL;

            if (!backend_uri) {
                throw new Error("Missing API endpoint configuration");
            }

            // Prepare the data for API submission
            const submissionData = {
                ...updatedFormData,
                startDate: updatedFormData.startDate?.toISOString(),
                endDate:
                    dateType === 'single'
                        ? null
                        : updatedFormData.endDate
                            ? updatedFormData.endDate.toISOString()
                            : null,
                networks: updatedFormData.networks === 'all' ? 'all' : updatedFormData.networks,
            };

            const url = mode === 'edit' && bannerId
                ? `${backend_uri}/api/roadblocks/${bannerId}`
                : `${backend_uri}/api/roadblocks`;

            const method = mode === 'edit' ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to process request');
            }

            const successMessage = mode === 'create'
                ? 'Banner created successfully!'
                : 'Banner updated successfully!';
            toast.dismiss();
            toast.success(successMessage);

            if (mode === 'create') {
                // Reset form
                setFormData({
                    link: '',
                    image: null,
                    closeButtonDelay: 5,
                    bannerTimeDelay: 5,
                    repeat: 'never',
                    networks: 'all',
                    location: 'homepage',
                    devices: 'desktop',
                    hideForLoggedIn: false,
                    startDate: undefined,
                    endDate: undefined,
                });
                setSelectedNetworks('all');
                setDateType('range');
                setActiveTab('content');
            }

        } catch (error: any) {
            console.error('Form submission error:', error);
            toast.error(error.message || 'Failed to process request. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Progress indicator
    const getCompletedSteps = () => {
        let completed = 0;
        if (formData.image) completed++;
        if (selectedNetworks === 'all' || selectedNetworks.length > 0) completed++;
        if (formData.devices) completed++
        if (formData.startDate) completed++;
        return completed;
    };

    const totalSteps = 4;
    const completedSteps = getCompletedSteps();

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <div className="container mx-auto px-4 py-8 max-w-5xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
                        {mode === 'create' ? 'Create New Roadblock Banner' : 'Edit Roadblock Banner'}
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">
                        Configure your banner settings
                    </p>

                    {/* Progress Indicator */}
                    <div className="mt-6 max-w-md mx-auto">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Progress
                            </span>
                            <span className="text-sm text-slate-500 dark:text-slate-400">
                                {completedSteps}/{totalSteps} completed
                            </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300 ease-in-out"
                                style={{ width: `${(completedSteps / totalSteps) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card className="shadow-xl border-0 bg-white/80 dark:bg-slate-900/50 backdrop-blur-sm">
                        <CardContent className="p-0">
                            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                                <div className="border-b bg-white/50 dark:bg-slate-800/50 rounded-t-lg">
                                    <TabsList className="grid w-full grid-cols-4 bg-transparent h-16 p-1">
                                        <TabsTrigger
                                            value="content"
                                            className="flex flex-col gap-1 h-14 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-700"
                                        >
                                            <ImageIcon className="h-4 w-4" />
                                            <span className="text-xs">Content</span>
                                            {formData.image && formData.link && <CheckCircle className="h-3 w-3 text-green-500" />}
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="networks"
                                            className="flex flex-col gap-1 h-14 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-700"
                                        >
                                            <Globe className="h-4 w-4" />
                                            <span className="text-xs">Networks</span>
                                            {(selectedNetworks === 'all' || selectedNetworks.length > 0) && <CheckCircle className="h-3 w-3 text-green-500" />}
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="display"
                                            className="flex flex-col gap-1 h-14 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-700"
                                        >
                                            <Settings className="h-4 w-4" />
                                            <span className="text-xs">Display</span>
                                            <CheckCircle className="h-3 w-3 text-green-500" />
                                        </TabsTrigger>
                                        <TabsTrigger
                                            value="schedule"
                                            className="flex flex-col gap-1 h-14 data-[state=active]:bg-white data-[state=active]:shadow-sm dark:data-[state=active]:bg-slate-700"
                                        >
                                            <Clock className="h-4 w-4" />
                                            <span className="text-xs">Schedule</span>
                                            {formData.startDate && <CheckCircle className="h-3 w-3 text-green-500" />}
                                        </TabsTrigger>
                                    </TabsList>
                                </div>

                                <div className="p-6">
                                    {/* Content Tab */}
                                    <TabsContent value="content" className="space-y-6 mt-0">
                                        <div className="text-center mb-6">
                                            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                                                Upload Banner & Set Destination
                                            </h2>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                                Add your banner image and configure where clicks should redirect
                                            </p>
                                        </div>

                                        {/* Banner Image Section */}
                                        <Card className="border-2 border-dashed border-slate-200 dark:border-slate-700">
                                            <CardHeader className="text-center pb-4">
                                                <div className="flex items-center justify-center gap-2 mb-2">
                                                    <ImageIcon className="h-5 w-5 text-slate-500" />
                                                    <h3 className="font-semibold text-slate-700 dark:text-slate-300">Banner Image</h3>
                                                </div>
                                                <p className="text-sm text-slate-500">Upload your roadblock banner image</p>
                                            </CardHeader>
                                            <CardContent>
                                                <RoadblockImageSection
                                                    image={formData.image}
                                                    onUploadSuccess={handleImageUploadSuccess}
                                                    onRemove={handleImageRemove}
                                                />
                                                {errors.image && (
                                                    <Alert className="mt-4 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                                                        <AlertDescription className="text-red-600 dark:text-red-400">
                                                            {errors.image}
                                                        </AlertDescription>
                                                    </Alert>
                                                )}
                                            </CardContent>
                                        </Card>

                                        {/* Destination URL Section */}
                                        <Card>
                                            <CardHeader className="pb-4">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <Link2 className="h-5 w-5 text-slate-500" />
                                                    <h3 className="font-semibold text-slate-700 dark:text-slate-300">Destination URL</h3>
                                                </div>
                                                <p className="text-sm text-slate-500">Where should users go when they click the banner?</p>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="space-y-2">
                                                    <Label htmlFor="link" className="text-sm font-medium">
                                                        Destination URL *
                                                    </Label>
                                                    <Input
                                                        id="link"
                                                        name="link"
                                                        type="url"
                                                        value={formData.link}
                                                        onChange={handleChange}
                                                        placeholder="https://example.com"
                                                        className="h-12"
                                                    />
                                                    {errors.link && (
                                                        <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                                                            <AlertDescription className="text-red-600 dark:text-red-400">
                                                                {errors.link}
                                                            </AlertDescription>
                                                        </Alert>
                                                    )}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </TabsContent>

                                    {/* Networks Tab */}
                                    <TabsContent value="networks" className="space-y-6 mt-0">
                                        <div className="text-center mb-6">
                                            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                                                Select Target Networks
                                            </h2>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                                Choose which networks should display this banner
                                            </p>
                                        </div>

                                        <Card>
                                            <CardHeader>
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Globe className="h-5 w-5 text-slate-500" />
                                                        <h3 className="font-semibold text-slate-700 dark:text-slate-300">Network Selection</h3>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Badge variant="secondary" className="text-xs">
                                                            {selectedNetworks === 'all' ? 'All Networks' : `${selectedNetworks.length} selected`}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            </CardHeader>
                                            <CardContent>
                                                <div className="flex gap-2 mb-6">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={handleSelectAllNetworks}
                                                        className="text-xs"
                                                    >
                                                        Select All
                                                    </Button>
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={handleDeselectAllNetworks}
                                                        className="text-xs"
                                                    >
                                                        Deselect All
                                                    </Button>
                                                </div>


                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {NETWORK_SITES.map((network) => (
                                                        <div key={network} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                                            <Checkbox
                                                                id={`network-${network}`}
                                                                checked={selectedNetworks === 'all' || selectedNetworks.includes(network)}
                                                                onCheckedChange={() => handleNetworkToggle(network)}
                                                            />
                                                            <Label htmlFor={`network-${network}`} className="font-medium cursor-pointer">
                                                                {network}
                                                            </Label>
                                                        </div>
                                                    ))}
                                                </div>


                                                {errors.networks && (
                                                    <Alert className="mt-4 border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                                                        <AlertDescription className="text-red-600 dark:text-red-400">
                                                            {errors.networks}
                                                        </AlertDescription>
                                                    </Alert>
                                                )}
                                            </CardContent>
                                        </Card>
                                    </TabsContent>

                                    {/* Display Settings Tab */}
                                    <TabsContent value="display" className="space-y-6 mt-0">
                                        <div className="text-center mb-6">
                                            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                                                Display Configuration
                                            </h2>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                                Configure how and where your banner appears
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            {/* Timing Settings */}
                                            <Card>
                                                <CardHeader>
                                                    <h3 className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                                        <Clock className="h-4 w-4" />
                                                        Timing Settings
                                                    </h3>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="closeButtonDelay">Close Button Delay</Label>
                                                        <Select
                                                            value={formData.closeButtonDelay.toString()}
                                                            onValueChange={(value) => handleSelectChange('closeButtonDelay', value)}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select delay" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {[0, 5, 10, 15, 30].map((seconds) => (
                                                                    <SelectItem key={seconds} value={seconds.toString()}>
                                                                        {seconds === 0 ? 'No delay' : `${seconds} seconds`}
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="bannerTimeDelay">Display Duration</Label>
                                                        <Select
                                                            value={formData.bannerTimeDelay.toString()}
                                                            onValueChange={(value) => handleSelectChange('bannerTimeDelay', value)}
                                                        >
                                                            <SelectTrigger>
                                                                <SelectValue placeholder="Select duration" />
                                                            </SelectTrigger>
                                                            <SelectContent>
                                                                {[5, 10, 15, 30, 60].map((seconds) => (
                                                                    <SelectItem key={seconds} value={seconds.toString()}>
                                                                        {seconds} seconds
                                                                    </SelectItem>
                                                                ))}
                                                            </SelectContent>
                                                        </Select>
                                                    </div>
                                                </CardContent>
                                            </Card>

                                            {/* Target Settings */}
                                            <Card>
                                                <CardHeader>
                                                    <h3 className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                                        <Target className="h-4 w-4" />
                                                        Target Settings
                                                    </h3>
                                                </CardHeader>
                                                <CardContent className="space-y-6">
                                                    <div className="space-y-3">
                                                        <Label className="text-sm font-medium">Target Devices</Label>
                                                        <RadioGroup
                                                            value={formData.devices}
                                                            onValueChange={(value) => handleRadioChange('devices', value)}
                                                            className="grid grid-cols-2 gap-3"
                                                        >
                                                            {[
                                                                { value: 'mobile', label: 'Mobile' },
                                                                { value: 'tablet', label: 'Tablet' },
                                                                { value: 'desktop', label: 'Desktop' },
                                                                { value: 'all', label: 'All Devices' },
                                                            ].map((device) => (
                                                                <div key={device.value} className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        value={device.value}
                                                                        id={`device-${device.value}`}
                                                                    />
                                                                    <Label htmlFor={`device-${device.value}`} className="text-sm">
                                                                        {device.label}
                                                                    </Label>
                                                                </div>
                                                            ))}
                                                        </RadioGroup>
                                                    </div>

                                                    <Separator />

                                                    <div className="space-y-3">
                                                        <Label className="text-sm font-medium">Display Location</Label>
                                                        <RadioGroup
                                                            value={formData.location}
                                                            onValueChange={(value) => handleRadioChange('location', value)}
                                                            className="space-y-2"
                                                        >
                                                            {[
                                                                { value: 'homepage', label: 'Homepage' },
                                                                { value: 'article', label: 'Article Pages' },
                                                                { value: 'both', label: 'Both' },
                                                            ].map((location) => (
                                                                <div key={location.value} className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        value={location.value}
                                                                        id={`location-${location.value}`}
                                                                    />
                                                                    <Label htmlFor={`location-${location.value}`} className="text-sm">
                                                                        {location.label}
                                                                    </Label>
                                                                </div>
                                                            ))}
                                                        </RadioGroup>
                                                    </div>

                                                    <Separator />

                                                    <div className="space-y-3">
                                                        <Label className="text-sm font-medium">Hide for Logged-in Users?</Label>
                                                        <RadioGroup
                                                            value={formData.hideForLoggedIn.toString()}
                                                            onValueChange={(value) => handleRadioChange('hideForLoggedIn', value)}
                                                            className="flex gap-6"
                                                        >
                                                            {[
                                                                { value: 'true', label: 'Yes' },
                                                                { value: 'false', label: 'No' },
                                                            ].map((option) => (
                                                                <div key={option.value} className="flex items-center space-x-2">
                                                                    <RadioGroupItem
                                                                        value={option.value}
                                                                        id={`hide-${option.value}`}
                                                                    />
                                                                    <Label htmlFor={`hide-${option.value}`} className="text-sm">
                                                                        {option.label}
                                                                    </Label>
                                                                </div>
                                                            ))}
                                                        </RadioGroup>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </TabsContent>

                                    {/* Schedule Tab */}
                                    <TabsContent value="schedule" className="space-y-6 mt-0">
                                        <div className="text-center mb-6">
                                            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                                                Schedule Your Banner
                                            </h2>
                                            <p className="text-slate-600 dark:text-slate-400 text-sm">
                                                Set when your banner should be active and how often it should repeat
                                            </p>
                                        </div>

                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                            {/* Date Selection */}
                                            <Card>
                                                <CardHeader>
                                                    <div className="flex items-center justify-between">
                                                        <h3 className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                                            <CalendarIcon className="h-4 w-4" />
                                                            Date Range
                                                        </h3>
                                                        <div className="flex gap-2">
                                                            <Button
                                                                type="button"
                                                                variant={dateType === 'range' ? 'default' : 'outline'}
                                                                size="sm"
                                                                onClick={() => setDateType('range')}
                                                                className="text-xs"
                                                            >
                                                                Range
                                                            </Button>
                                                            <Button
                                                                type="button"
                                                                variant={dateType === 'single' ? 'default' : 'outline'}
                                                                size="sm"
                                                                onClick={() => setDateType('single')}
                                                                className="text-xs"
                                                            >
                                                                Single
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </CardHeader>
                                                <CardContent className="space-y-4">
                                                    <div className="space-y-2">
                                                        <Label>Start Date *</Label>
                                                        <Popover>
                                                            <PopoverTrigger asChild>
                                                                <Button
                                                                    variant="outline"
                                                                    className="w-full justify-start text-left font-normal h-12"
                                                                >
                                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                                    {formData.startDate ? (
                                                                        format(formData.startDate, 'PPP')
                                                                    ) : (
                                                                        <span className="text-slate-500">Pick a date</span>
                                                                    )}
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={formData.startDate}
                                                                    onSelect={(date) => handleDateChange('startDate', date)}
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                        {errors.startDate && (
                                                            <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                                                                <AlertDescription className="text-red-600 dark:text-red-400">
                                                                    {errors.startDate}
                                                                </AlertDescription>
                                                            </Alert>
                                                        )}
                                                    </div>

                                                    {dateType === 'range' && (
                                                        <div className="space-y-2">
                                                            <Label>End Date *</Label>
                                                            <Popover>
                                                                <PopoverTrigger asChild>
                                                                    <Button
                                                                        variant="outline"
                                                                        className="w-full justify-start text-left font-normal h-12"
                                                                    >
                                                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                                                        {formData.endDate ? (
                                                                            format(formData.endDate, 'PPP')
                                                                        ) : (
                                                                            <span className="text-slate-500">Pick a date</span>
                                                                        )}
                                                                    </Button>
                                                                </PopoverTrigger>
                                                                <PopoverContent className="w-auto p-0" align="start">
                                                                    <Calendar
                                                                        mode="single"
                                                                        selected={formData.endDate}
                                                                        onSelect={(date) => handleDateChange('endDate', date)}
                                                                        initialFocus
                                                                    // disabled={{ before: formData.startDate }}
                                                                    />
                                                                    <div className="px-4 py-2 text-xs text-slate-500 bg-slate-50 dark:bg-slate-800 border-t">
                                                                        <p className="text-sm">
                                                                            <span className="font-medium">Note:</span> End date must be after start date
                                                                        </p>
                                                                    </div>
                                                                </PopoverContent>
                                                            </Popover>
                                                            {errors.endDate && (
                                                                <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                                                                    <AlertDescription className="text-red-600 dark:text-red-400">
                                                                        {errors.endDate}
                                                                    </AlertDescription>
                                                                </Alert>
                                                            )}
                                                        </div>
                                                    )}
                                                </CardContent>
                                            </Card>

                                            {/* Repeat Settings */}
                                            <Card>
                                                <CardHeader>
                                                    <h3 className="font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                                                        <Clock className="h-4 w-4" />
                                                        Repeat Settings
                                                    </h3>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-3">
                                                        <Label className="text-sm font-medium">Repeat Frequency</Label>
                                                        <RadioGroup
                                                            value={formData.repeat}
                                                            onValueChange={(value) => handleRadioChange('repeat', value)}
                                                            className="space-y-3"
                                                        >
                                                            {[
                                                                { value: 'never', label: 'Never', desc: 'Run only once during the selected period' },
                                                                { value: 'daily', label: 'Daily', desc: 'Repeat every day' },
                                                                { value: 'weekly', label: 'Weekly', desc: 'Repeat every week' },
                                                                { value: 'monthly', label: 'Monthly', desc: 'Repeat every month' },
                                                                { value: 'yearly', label: 'Yearly', desc: 'Repeat every year' },
                                                            ].map((repeat) => (
                                                                <div key={repeat.value} className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                                                                    <RadioGroupItem
                                                                        value={repeat.value}
                                                                        id={`repeat-${repeat.value}`}
                                                                        className="mt-0.5"
                                                                    />
                                                                    <div className="space-y-1">
                                                                        <Label htmlFor={`repeat-${repeat.value}`} className="font-medium cursor-pointer">
                                                                            {repeat.label}
                                                                        </Label>
                                                                        <p className="text-xs text-slate-500">{repeat.desc}</p>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </RadioGroup>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </div>

                                        {/* Schedule Summary */}
                                        {(formData.startDate || formData.endDate) && (
                                            <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
                                                <CardHeader>
                                                    <h3 className="font-semibold text-blue-800 dark:text-blue-200 flex items-center gap-2">
                                                        <Clock className="h-4 w-4" />
                                                        Schedule Summary
                                                    </h3>
                                                </CardHeader>
                                                <CardContent>
                                                    <div className="space-y-2 text-sm">
                                                        <p className="text-blue-700 dark:text-blue-300">
                                                            <span className="font-medium">Active Period:</span>{' '}
                                                            {formData.startDate && format(formData.startDate, 'PPP')}
                                                            {dateType === 'range' && formData.endDate &&
                                                                ` to ${format(formData.endDate, 'PPP')}`
                                                            }
                                                        </p>
                                                        <p className="text-blue-700 dark:text-blue-300">
                                                            <span className="font-medium">Repeat:</span> {formData.repeat === 'never' ? 'No repeat' : `${formData.repeat}`}
                                                        </p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        )}
                                    </TabsContent>
                                </div>

                                {/* Navigation and Submit */}
                                <div className="flex items-center justify-between p-6 bg-slate-50 dark:bg-slate-800 rounded-b-lg border-t">
                                    <div className="flex gap-2">
                                        {activeTab !== 'content' && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => {
                                                    const tabs = ['content', 'networks', 'display', 'schedule'];
                                                    const currentIndex = tabs.indexOf(activeTab);
                                                    if (currentIndex > 0) {
                                                        setActiveTab(tabs[currentIndex - 1]);
                                                    }
                                                }}
                                            >
                                                Previous
                                            </Button>
                                        )}
                                        {activeTab !== 'schedule' && (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => {
                                                    const tabs = ['content', 'networks', 'display', 'schedule'];
                                                    const currentIndex = tabs.indexOf(activeTab);
                                                    if (currentIndex < tabs.length - 1) {
                                                        setActiveTab(tabs[currentIndex + 1]);
                                                    }
                                                }}
                                            >
                                                Next
                                            </Button>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={loading}
                                        className="px-8 py-3 text-lg gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="h-5 w-5 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                {mode === 'create' ? 'Create Banner' : 'Update Banner'}
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </Tabs>
                        </CardContent>
                    </Card>
                </form>
            </div>
        </div>
    );
};

export default RoadblockForm;