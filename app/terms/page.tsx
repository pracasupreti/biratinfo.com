import { Metadata, NextPage } from 'next';
import Header from '@/components/homepage/Header';
import Footer from '@/components/homepage/Footer';
import Link from 'next/link';

export const metadata: Metadata = {
    title: "Terms & Conditions | Birat Informatics",
    description: "Terms and Conditions for Birat Informatics Pvt. Ltd.",

};

const TermsAndConditions: NextPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />

            <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 md:p-8">
                    <div className="text-center mb-10">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Terms & Conditions</h1>
                        <p className="text-gray-600">Effective Date: June 25, 2023</p>
                    </div>

                    <div className="prose prose-lg max-w-none text-gray-700">
                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">1. Acceptance of Terms</h2>
                            <p>
                                By accessing, browsing, or using any service provided by Birat Informatics Pvt. Ltd. (&quot;we&quot;, &quot;our&quot;, &quot;us&quot;, or &quot;the Company&quot;), including but not limited to reading articles, subscribing to newsletters, or submitting content, you agree to be legally bound by these Terms and Conditions (&quot;Terms&quot;).
                            </p>
                            <div className="mt-4 bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                                <p>If you do not agree with these Terms, please do not use our services or access our websites.</p>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">2. Use of Our Services</h2>
                            <p>You agree to use our services only for lawful purposes and in a manner that does not:</p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li>Infringe on the rights of others</li>
                                <li>Restrict or inhibit anyone else&apos;s use of the platform</li>
                                <li>Cause damage or interfere with the services or systems</li>
                            </ul>
                            <p className="mt-4 font-medium">
                                We reserve the right to suspend or permanently block access for users violating these terms.
                            </p>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">3. Content Responsibility and Ownership</h2>
                            <p>Our platform hosts a variety of content including news, opinions, images, videos, and external feeds sourced from:</p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li>In-house editorial teams</li>
                                <li>Independent journalists</li>
                                <li>News partners and media affiliates</li>
                                <li>Public domain and user-generated content</li>
                            </ul>
                            <div className="mt-6 bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                                <p className="font-medium">Disclaimer:</p>
                                <p>All articles and opinions published are solely the responsibility of their authors. Birat Informatics Pvt. Ltd. does not necessarily endorse or validate any views expressed therein.</p>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">4. Intellectual Property</h2>
                            <p>All original content produced by Birat Informatics Pvt. Ltd., including logos, designs, layouts, and branding elements, is protected under copyright law and remains the exclusive property of the company.</p>

                            <div className="mt-6 grid md:grid-cols-2 gap-6">
                                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                                    <h3 className="font-bold mb-2">You may:</h3>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Share content using proper attribution</li>
                                        <li>Use excerpts for academic or journalistic purposes (with source citation)</li>
                                    </ul>
                                </div>
                                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-500">
                                    <h3 className="font-bold mb-2">You may not:</h3>
                                    <ul className="list-disc pl-5 space-y-1">
                                        <li>Reproduce, republish, or distribute full articles or data without permission</li>
                                        <li>Use our brand, logo, or visuals for commercial use without written consent</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">5. User Submissions</h2>
                            <p>When submitting content (articles, comments, media, etc.) to us:</p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li>You affirm that the content is original or you have the rights to publish it.</li>
                                <li>You grant us a non-exclusive, royalty-free, worldwide license to publish, display, and distribute the content across our platforms.</li>
                                <li>You agree not to post defamatory, harmful, or misleading content.</li>
                            </ul>
                            <p className="mt-4 font-medium">
                                We reserve the right to edit, reject, or remove user-submitted content at our discretion.
                            </p>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">6. Third-Party Links and Sources</h2>
                            <p>Our services may contain links to third-party websites, embedded content, or syndications.</p>
                            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
                                <p>We are not responsible for the content, accuracy, or policies of external websites. Accessing those links is done at your own risk.</p>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">7. Limitation of Liability</h2>
                            <p>While we strive to ensure accuracy, we do not guarantee the completeness, reliability, or timeliness of any content provided. Birat Informatics Pvt. Ltd. will not be liable for:</p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li>Any loss or damage (direct or indirect)</li>
                                <li>Inaccuracies or content errors</li>
                                <li>System downtime or unavailability</li>
                                <li>Damages resulting from use or reliance on content provided</li>
                            </ul>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">8. Privacy</h2>
                            <p>
                                Your use of our platform is also governed by our <Link href="/privacy-policy" className="text-blue-600 hover:underline">Privacy Policy</Link>, which outlines how we collect and manage your data.
                            </p>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">9. Termination of Access</h2>
                            <p>We reserve the right to suspend or permanently terminate access to any user or entity if we believe that there has been:</p>
                            <ul className="list-disc pl-6 mt-4 space-y-2">
                                <li>Breach of these Terms</li>
                                <li>Misuse of services</li>
                                <li>Legal obligation to act</li>
                                <li>Harmful conduct or interference</li>
                            </ul>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">10. Changes to the Terms</h2>
                            <p>We may update these Terms & Conditions at any time. The latest version will be posted on this page with an updated effective date.</p>
                            <div className="mt-4 bg-purple-50 p-4 rounded-lg">
                                <p>Continued use of our services implies your acceptance of any changes made.</p>
                            </div>
                        </div>

                        <div className="mb-10">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">11. Governing Law</h2>
                            <p>These Terms shall be governed by and interpreted in accordance with the laws of Nepal. Any disputes shall fall under the exclusive jurisdiction of the courts located in Kathmandu, Nepal.</p>
                        </div>

                        <div>
                            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-2 border-gray-200">12. Contact Information</h2>
                            <p>If you have questions about these Terms, please contact us at:</p>
                            <div className="mt-4 bg-gray-50 p-4 rounded-lg">
                                <p className="font-medium">Birat Informatics Pvt. Ltd.</p>
                                <p>📍 Kamalpokhari, Kathmandu, Nepal</p>
                                <p>📧 Email: <Link href="mailto:info@biratinfo.com" className="text-blue-600 hover:underline">info@biratinfo.com</Link></p>
                                <p>📞 Phone: +977-9851152774</p>
                                <p>🌐 Website: <Link href="https://www.biratinfo.com" className="text-blue-600 hover:underline">www.biratinfo.com</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default TermsAndConditions;