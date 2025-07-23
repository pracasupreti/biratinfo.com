import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { NETWORK_SITES, FEATURED_SITES } from '@/lib/constants'
import { Button } from '@/components/ui/button'

export const NetworkSitesSection = ({
    featuredIn,
    postInNetwork,
    isNepali,
    onAddFeatured,
    onRemoveFeatured,
    onAddNetwork,
    onRemoveNetwork
}: {
    featuredIn: string[]
    postInNetwork: string[]
    isNepali: boolean
    onAddFeatured: (site: string) => void
    onRemoveFeatured: (site: string) => void
    onAddNetwork: (site: string) => void
    onRemoveNetwork: (site: string) => void
}) => {
    const handleSelectAllFeatured = () => {
        FEATURED_SITES.forEach(site => {
            if (!featuredIn.includes(site.en)) {
                onAddFeatured(site.en)
            }
        })
    }

    const handleRemoveAllFeatured = () => {
        FEATURED_SITES.forEach(site => {
            if (featuredIn.includes(site.en)) {
                onRemoveFeatured(site.en)
            }
        })
    }

    const handleSelectAllNetwork = () => {
        NETWORK_SITES.forEach(site => {
            if (!postInNetwork.includes(site.en)) {
                onAddNetwork(site.en)
            }
        })
    }

    const handleRemoveAllNetwork = () => {
        NETWORK_SITES.forEach(site => {
            if (postInNetwork.includes(site.en)) {
                onRemoveNetwork(site.en)
            }
        })
    }

    return (
        <div className="space-y-6">
            {/* Featured In Network */}
            <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">
                        {isNepali ? 'नेटवर्कमा फिचर गर्नुहोस्' : 'Featured In Network'}
                    </h3>
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={handleSelectAllFeatured} className='cursor-pointer'>
                            {isNepali ? 'सबै छान्नुहोस्' : 'Select All'}
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleRemoveAllFeatured} className='cursor-pointer border-red-500'>
                            {isNepali ? 'सबै हटाउनुहोस्' : 'Remove All'}
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {FEATURED_SITES.map((site) => (
                        <div key={site.en} className="flex items-center space-x-2">
                            <Checkbox
                                id={`featured-${site.en}`}
                                checked={featuredIn.includes(site.en)}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        onAddFeatured(site.en)
                                    } else {
                                        onRemoveFeatured(site.en)
                                    }
                                }}
                            />
                            <Label htmlFor={`featured-${site.en}`} className="text-sm">
                                {site.en}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>

            {/* Post in Network */}
            <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">
                        {isNepali ? 'नेटवर्कमा पोष्ट गर्नुहोस्' : 'Post in Network'}
                    </h3>
                    <div className="flex gap-2">
                        <Button size="sm" variant="outline" onClick={handleSelectAllNetwork} className='cursor-pointer'>
                            {isNepali ? 'सबै छान्नुहोस्' : 'Select All'}
                        </Button>
                        <Button size="sm" variant="outline" onClick={handleRemoveAllNetwork} className='cursor-pointer border-red-500'>
                            {isNepali ? 'सबै हटाउनुहोस्' : 'Remove All'}
                        </Button>
                    </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {NETWORK_SITES.map((site) => (
                        <div key={site.en} className="flex items-center space-x-2">
                            <Checkbox
                                id={`network-${site.en}`}
                                checked={postInNetwork.includes(site.en)}
                                onCheckedChange={(checked) => {
                                    if (checked) {
                                        onAddNetwork(site.en)
                                    } else {
                                        onRemoveNetwork(site.en)
                                    }
                                }}
                            />
                            <Label htmlFor={`network-${site.en}`} className="text-sm">
                                {site.en}
                            </Label>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
