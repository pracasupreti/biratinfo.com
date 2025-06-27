import React from 'react';

const AdvertisingRates = () => {
    return (
        <div className="max-w-6xl mx-auto px-4 py-10">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">📢 Advertising Packages</h1>
            <p className="text-center text-gray-600 mb-4">
                <strong>Birat Informatics Pvt. Ltd.</strong> – Kamalpokhari, Kathmandu, Nepal <br />
                Reach a wide audience through our online media network.
            </p>

            {/* Display Advertising Table */}
            <section className="my-10">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">🔹 Display Advertising Packages (Prices in NPR)</h2>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border border-gray-300">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="p-2 border">#</th>
                                <th className="p-2 border">Ad Position</th>
                                <th className="p-2 border">1 Week</th>
                                <th className="p-2 border">2 Weeks</th>
                                <th className="p-2 border">1 Month</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['1', 'Homepage – Top Banner', '100,000', '150,000', '250,000'],
                                ['2', 'Roadblock (Full-Screen)', '200,000', '300,000', '500,000'],
                                ['3', 'Category Page (Per Category)', '50,000', '75,000', '125,000'],
                                ['4', 'Advertorial Boost', '10,000', '15,000', '30,000'],
                                ['5', 'Post Blast (Across Network)', '50,000', '100,000', '150,000'],
                            ].map((row, idx) => (
                                <tr key={idx} className="text-gray-700">
                                    {row.map((cell, i) => (
                                        <td key={i} className="p-2 border">{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Sponsored Posts Table */}
            <section className="my-10">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">🔸 Sponsored Posts Packages</h2>
                <div className="overflow-x-auto">
                    <table className="w-full table-auto border border-gray-300">
                        <thead className="bg-gray-100 text-left">
                            <tr>
                                <th className="p-2 border">#</th>
                                <th className="p-2 border">Number of Posts</th>
                                <th className="p-2 border">Price (NPR)</th>
                                <th className="p-2 border">Boosted Posts</th>
                                <th className="p-2 border">Remarks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                ['1', '1 Post', '3,000', 'No', 'Advertorial Only'],
                                ['2', '10 Posts', '20,000', '1 Post', 'Great for Series'],
                                ['3', '50 Posts', '100,000', '3 Posts', 'Ideal for Campaigns'],
                                ['4', '100 Posts', '150,000', '10 Posts', 'Volume Promotion'],
                                ['5', '500 Posts', '500,000', '20 Posts', 'Corporate Partner'],
                            ].map((row, idx) => (
                                <tr key={idx} className="text-gray-700">
                                    {row.map((cell, i) => (
                                        <td key={i} className="p-2 border">{cell}</td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* Add-ons Section */}
            <section className="my-10">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">⚙️ Add-Ons & Custom Options</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Content Writing: Starting NPR 2,000 per article</li>
                    <li>Graphic Design Support: NPR 1,000 per post/banner</li>
                    <li>Real-Time Analytics Access: NPR 5,000/month</li>
                    <li>Targeted Boost (Location/Age): Based on actual platform rates</li>
                </ul>
            </section>

            {/* Notes Section */}
            <section className="my-10">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">📝 Notes</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>All prices are in <strong>Nepali Rupees (NPR)</strong> and exclusive of VAT.</li>
                    <li>Boosted posts are promoted via social media ads across our verified pages.</li>
                    <li>&quot;Post Blast&quot; includes mass distribution across our news portal network.</li>
                    <li>Roadblock and Homepage placements are subject to availability.</li>
                    <li>Payment must be made in advance for all campaigns.</li>
                </ul>
            </section>

            {/* Contact Section */}
            <section className="text-center mt-12">
                <h2 className="text-xl font-bold text-gray-800">📞 Contact for Booking</h2>
                <p className="text-gray-600 mt-2">
                    <strong>Birat Informatics Pvt. Ltd.</strong><br />
                    Kamalpokhari, Kathmandu, Nepal<br />
                    📧 Email: [Insert Email]<br />
                    📞 Phone: [Insert Phone Number]<br />
                    🌐 Website: [Insert Website URL]
                </p>
            </section>
        </div>
    );
};

export default AdvertisingRates;