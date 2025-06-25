// app/not-found.tsx
import Footer from '@/components/homepage/Footer'
import Header from '@/components/homepage/Header'
import Link from 'next/link'


export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-grow flex flex-col items-center justify-center text-center p-4">
                <div className="max-w-2xl mx-auto h-[80vh] flex flex-col items-center justify-center">
                    <h1 className="text-7xl font-bold text-text-color mb-4">४०४</h1>
                    <h2 className="text-3xl font-semibold text-text-color mb-6">
                        पेज भेटिएन !
                    </h2>
                    <p className="text-lg text-text-color mb-8">
                        तपाईंले खोजिरहनु भएको पेज अस्तित्वमा छैन वा सारिएको छ।
                    </p>
                    <Link
                        href="/"
                        className="inline-block px-6 py-3 bg-text-color text-white font-medium rounded-lg hover:bg-green-950 transition-colors duration-300"
                    >
                        होमपेजमा जानुहोस
                    </Link>
                </div>
            </main>

            <Footer />
        </div>
    )
}