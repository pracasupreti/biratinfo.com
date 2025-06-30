import Footer from '@/components/homepage/Footer';
import Header from '@/components/homepage/Header';
import React from 'react';

const AdvertisingRates = () => {
    return (
        <div>
            <Header />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Advertising Packages</h1>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        <span className="font-semibold">Birat Informatics Pvt. Ltd.</span> – Kamalpokhari, Kathmandu, Nepal
                    </p>
                    <p className="text-gray-600 mt-2">Reach a wide audience through our online media network.</p>
                </div>

                {/* Display Advertising Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">Display Advertising Packages</h2>
                        <p className="text-sm text-gray-500 mt-1">Prices in NPR</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ad Position</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">1 Week</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">2 Weeks</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">1 Month</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {[
                                    ['1', 'Homepage – Top Banner', '100,000', '150,000', '250,000'],
                                    ['2', 'Roadblock (Full-Screen)', '200,000', '300,000', '500,000'],
                                    ['3', 'Category Page (Per Category)', '50,000', '75,000', '125,000'],
                                    ['4', 'Advertorial Boost', '10,000', '15,000', '30,000'],
                                    ['5', 'Post Blast (Across Network)', '50,000', '100,000', '150,000'],
                                ].map((row, idx) => (
                                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        {row.map((cell, i) => (
                                            <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Sponsored Posts Table */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">Sponsored Posts Packages</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Number of Posts</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price (NPR)</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Boosted Posts</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {[
                                    ['1', '1 Post', '3,000', 'No', 'Advertorial Only'],
                                    ['2', '10 Posts', '20,000', '1 Post', 'Great for Series'],
                                    ['3', '50 Posts', '100,000', '3 Posts', 'Ideal for Campaigns'],
                                    ['4', '100 Posts', '150,000', '10 Posts', 'Volume Promotion'],
                                    ['5', '500 Posts', '500,000', '20 Posts', 'Corporate Partner'],
                                ].map((row, idx) => (
                                    <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                        {row.map((cell, i) => (
                                            <td key={i} className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Add-ons Section */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">Add-Ons & Custom Options</h2>
                    </div>
                    <div className="px-6 py-4">
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 text-gray-400">•</div>
                                <p className="ml-2 text-sm text-gray-700"><span className="font-medium">Content Writing:</span> Starting NPR 2,000 per article</p>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 text-gray-400">•</div>
                                <p className="ml-2 text-sm text-gray-700"><span className="font-medium">Graphic Design Support:</span> NPR 1,000 per post/banner</p>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 text-gray-400">•</div>
                                <p className="ml-2 text-sm text-gray-700"><span className="font-medium">Real-Time Analytics Access:</span> NPR 5,000/month</p>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 text-gray-400">•</div>
                                <p className="ml-2 text-sm text-gray-700"><span className="font-medium">Targeted Boost (Location/Age):</span> Based on actual platform rates</p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Notes Section */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-12">
                    <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">Notes</h2>
                    </div>
                    <div className="px-6 py-4">
                        <ul className="space-y-3">
                            <li className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 text-gray-400">•</div>
                                <p className="ml-2 text-sm text-gray-700">All prices are in <span className="font-medium">Nepali Rupees (NPR)</span> and exclusive of VAT.</p>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 text-gray-400">•</div>
                                <p className="ml-2 text-sm text-gray-700">Boosted posts are promoted via social media ads across our verified pages.</p>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 text-gray-400">•</div>
                                <p className="ml-2 text-sm text-gray-700"><span className="font-medium">&quot;Post Blast&quot;</span> includes mass distribution across our news portal network.</p>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 text-gray-400">•</div>
                                <p className="ml-2 text-sm text-gray-700">Roadblock and Homepage placements are subject to availability.</p>
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 h-5 w-5 text-gray-400">•</div>
                                <p className="ml-2 text-sm text-gray-700">Payment must be made in advance for all campaigns.</p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Contact Section */}
                <div className="bg-blue-50 rounded-lg shadow-md overflow-hidden">
                    <div className="bg-blue-100 px-6 py-4 border-b border-blue-200">
                        <h2 className="text-xl font-semibold text-blue-800 flex items-center">
                            <span className="mr-2">📞</span> Contact for Booking
                        </h2>
                    </div>
                    <div className="px-6 py-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">Birat Informatics Pvt. Ltd.</h3>
                                <p className="text-gray-600">Kamalpokhari, Kathmandu, Nepal</p>
                            </div>
                            <div>
                                <div className="space-y-2">
                                    <p className="text-gray-700"><span className="font-medium">Email:</span> info@biratinfo.com</p>
                                    <p className="text-gray-700"><span className="font-medium">Phone:</span> +977-9851152774</p>
                                    <p className="text-gray-700"><span className="font-medium">Website:</span> www.biratinfo.com</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default AdvertisingRates;