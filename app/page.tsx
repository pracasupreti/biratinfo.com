/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useEffect, useState } from 'react'
import Header from '@/components/homepage/Header'
import Hero from '@/components/homepage/Hero'
import Body from '@/components/homepage/Body'
import Footer from '@/components/homepage/Footer'
import Loader from '@/components/Loader'
import { PostsResponse } from '@/types/Post'

// Define your categories
const CATEGORIES = [
  'tourism',
  'technology',
  'economy',
  'agriculture',
  'lifestyle',
  'sports',
  'health',
  'education',
  'entertainment',
  'culture'
]

// Interfaces
interface Author {
  firstName: string
  lastName: string
  avatar?: string
  clerkId: string
}

interface HeroPost {
  nepaliTitle: string
  excerpt: string
  category: string
  categoryId: string
  authors: Author[]
  readingTime: string
  heroBanner?: string
}


export default function Page() {
  const [heroData, setHeroData] = useState<HeroPost | null>(null)
  const [bodyData, setBodyData] = useState<PostsResponse[] | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL
    const apiKey = process.env.NEXT_PUBLIC_API_SPECIAL_KEY

    if (!backend_uri || !apiKey) {
      setErrorMessage('Missing backend URL or API key')
      setIsLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        setIsLoading(true)

        const headers = { 'x-special-key': apiKey }
        const options: RequestInit = { headers, cache: 'no-store' }

        // Fetch banner and hero in parallel
        const heroRes = await fetch(`${backend_uri}/api/posts/featured-news`, options)


        if (!heroRes.ok) {
          throw new Error('Banner or hero fetch failed')
        }

        const heroPostData = await heroRes.json()

        setHeroData(heroPostData?.post || [])

        // Fetch category data in parallel
        const categoryRequests = CATEGORIES.map(async (category) => {
          const res = await fetch(`${backend_uri}/api/posts/category-summary/${category}`, options)
          if (!res.ok) throw new Error(`Failed to fetch category: ${category}`)
          return await res.json()
        })

        const categoryBlocks = await Promise.all(categoryRequests)
        setBodyData(categoryBlocks)
      } catch (error: any) {
        console.error('Fetch error:', error)
        setErrorMessage(error?.message || 'Unexpected error occurred.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading) return <Loader />

  if (errorMessage) {
    return (
      <div className="p-4 text-center text-red-600">
        <p>{errorMessage}</p>
      </div>
    )
  }
  return (
    <div>
      <Header />
      <Hero data={heroData} />
      <Body data={bodyData} />
      <Footer />
    </div>
  )
}
