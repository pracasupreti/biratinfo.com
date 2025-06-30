import { Metadata, NextPage } from 'next';
import Header from '@/components/homepage/Header';
import Footer from '@/components/homepage/Footer';

export const metadata: Metadata = {
    title: "Privacy Policy | Birat Informatics",
    description: "Privacy Policy for Birat Informatics Pvt. Ltd.",

};

const PrivacyPolicy: NextPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Privacy Policy</h1>
                        <p className="text-gray-600">Effective Date: June 25, 2023</p>
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-700">
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">1. Introduction</h2>
                            <p>
                                Welcome to Birat Informatics Pvt. Ltd. (&quot;Company&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our media services.
                            </p>
                            <p className="mt-4 bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                                Birat Informatics Pvt. Ltd. operates as an online media agency with a network of affiliated and partner news agencies. We provide a wide range of news content and feeds from multiple sources. The views, opinions, and claims expressed in those news items belong solely to their respective authors or sources, and do not necessarily reflect the views of the company.
                            </p>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">2. Information We Collect</h2>
                            <p>We collect minimal personal information, limited to the extent required to enhance our services. Information we may collect includes:</p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li><strong>Personal Identification Information:</strong> Name, email address, contact information (when voluntarily submitted).</li>
                                <li><strong>Non-Personal Identification Information:</strong> Browser type, IP address, referring URLs, date/time of visits, device type, and similar analytics data.</li>
                                <li><strong>Cookies and Tracking Technologies:</strong> For user experience enhancement, website performance, and analytics.</li>
                            </ul>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">3. How We Use Collected Information</h2>
                            <p>We use collected information for the following purposes:</p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li>To improve our website and services.</li>
                                <li>To personalize user experience.</li>
                                <li>To communicate with users upon request (e.g., newsletter or feedback).</li>
                                <li>To comply with legal obligations.</li>
                            </ul>
                            <p className="mt-4 font-medium bg-green-50 p-4 rounded-lg">
                                We do not sell, rent, or lease your personal information to any third party.
                            </p>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">4. Content Ownership and Attribution</h2>
                            <p>The news, articles, images, videos, and other materials published on our platform may come from:</p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li>Our in-house content team</li>
                                <li>Freelance or contracted journalists</li>
                                <li>Third-party syndicated sources</li>
                                <li>Partnered news agencies</li>
                            </ul>
                            <div className="mt-6 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                                <p className="font-medium">Disclaimer:</p>
                                <p>The responsibility for the accuracy, copyright, or claims made in the content lies with the individual authors or original sources, not with Birat Informatics Pvt. Ltd.</p>
                                <p className="mt-2">
                                    If you believe that any content violates copyrights or intellectual property rights, please contact us immediately at:
                                    <br />
                                    <a href="mailto:privacy@biratinformatics.com" className="text-blue-600 hover:underline">privacy@biratinformatics.com</a>
                                </p>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">5. Sharing of Information</h2>
                            <p>We may share user information in the following cases:</p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li>With service providers (like analytics platforms) to help us operate the website efficiently.</li>
                                <li>As required by law, regulation, or legal process.</li>
                                <li>In case of a merger, acquisition, or sale of assets, your data may be transferred to the new owner.</li>
                            </ul>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">6. Third-Party Links and External Sources</h2>
                            <p>Our content may include links to third-party websites and external sources. These are provided for informational purposes only.</p>
                            <p className="mt-4">
                                We are not responsible for the privacy practices or the content of such external websites. Please read their privacy policies separately.
                            </p>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">7. Data Security</h2>
                            <p>
                                We adopt appropriate data collection, storage, and security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
                            </p>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">8. Your Privacy Rights</h2>
                            <p>As a user, you have the right to:</p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li>Access your data.</li>
                                <li>Request correction or deletion of your data.</li>
                                <li>Withdraw consent where processing is based on consent.</li>
                            </ul>
                            <p className="mt-4">
                                To make a request, please email us at:
                                <br />
                                <a href="mailto:privacy@biratinformatics.com" className="text-blue-600 hover:underline">privacy@biratinformatics.com</a>
                            </p>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">9. Children&apos;s Privacy</h2>
                            <p>
                                Our services are not directed to children under 13 years of age, and we do not knowingly collect personal information from them. If we become aware of any such data, it will be deleted immediately.
                            </p>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">10. Changes to This Privacy Policy</h2>
                            <p>
                                We may update this Privacy Policy from time to time. The updated version will be indicated by an updated &quot;Effective Date&quot; at the top. Users are encouraged to review this page periodically.
                            </p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">11. Contact Information</h2>
                            <p>If you have any questions or concerns about this Privacy Policy or how we handle your data, please contact us:</p>
                            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                                <p className="font-medium">Birat Informatics Pvt. Ltd.</p>
                                <p>📍 Kamalpokhari, Kathmandu, Nepal</p>
                                <p>📧 Email: <a href="mailto:info@biratinfo.com" className="text-blue-600 hover:underline">info@biratinfo.com</a></p>
                                <p>📞 Phone: +977-9851152774</p>
                                <p>🌐 Website: <a href="https://www.biratinfo.com" className="text-blue-600 hover:underline">www.biratinfo.com</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default PrivacyPolicy;