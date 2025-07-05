import { create } from 'zustand'

interface ImageData {
    url: string
    public_id: string
}

interface CTA {
    name: string
    url: string
}

interface AudioData {
    url: string
    public_id: string
    duration?: number
}

export interface PostState {
    // Core Fields
    title: string
    excerpt: string
    isNepali: boolean
    content: string
    featuredIn: string[]
    postInNetwork: string[]

    // Media Fields
    heroBanner?: ImageData
    ogBanner?: ImageData
    sponsoredAds?: ImageData
    heroImageCredit: string
    ogImageCredit: string
    audio?: AudioData
    audioCredit: string

    // Call to Action
    ctas?: CTA[]

    // Other Fields
    category: string
    tags: string[]
    date: string
    time: string
    authors: string[]
    language: string
    readingTime?: string
    access: string
    canonicalUrl: string
    errors: Record<string, string>

    // Actions
    setField: (field: keyof Omit<PostState, 'errors'>, value: any) => void
    setTitle: (title: string, isNepali: boolean) => void
    setExcerpt: (excerpt: string, isNepali: boolean) => void
    setContent: (content: string) => void
    setHeroBanner: (image: ImageData | null) => void
    setOgBanner: (image: ImageData | null) => void
    setSponsoredAds: (image: ImageData | null) => void
    setAudio: (audio: AudioData | null) => void
    addCTA: (cta: CTA) => void
    removeCTA: (index: number) => void
    updateCTA: (index: number, cta: Partial<CTA>) => void
    addToFeaturedIn: (site: string) => void
    removeFromFeaturedIn: (site: string) => void
    addToPostInNetwork: (site: string) => void
    removeFromPostInNetwork: (site: string) => void
    validate: () => boolean
    resetStore: () => void
    initialize: (postData: Partial<PostState>) => void
    toggleLanguage: () => void
}

export const usePostStore = create<PostState>((set, get) => ({
    // Initial State
    title: '',
    excerpt: '',
    isNepali: false,
    content: '',
    featuredIn: [],
    postInNetwork: [],
    category: '',
    tags: [],
    date: '',
    time: '',
    authors: [],
    language: 'english',
    readingTime: '',
    heroBanner: undefined,
    ogBanner: undefined,
    sponsoredAds: undefined,
    heroImageCredit: '',
    ogImageCredit: '',
    audio: undefined,
    audioCredit: '',
    ctas: [],
    access: 'public',
    canonicalUrl: '',
    errors: {},

    // Actions
    setField: (field, value) => {
        set({ [field]: value })
        if (get().errors[field]) {
            set(state => ({ errors: { ...state.errors, [field]: '' } }))
        }
    },

    setTitle: (title, isNepali) => set({ title, isNepali }),
    setExcerpt: (excerpt, isNepali) => set({ excerpt, isNepali }),
    setContent: (content) => set({ content }),

    // Media handling
    setHeroBanner: (image) => set({ heroBanner: image || undefined }),
    setOgBanner: (image) => set({ ogBanner: image || undefined }),
    setSponsoredAds: (image) => set({ sponsoredAds: image || undefined }),
    setAudio: (audio) => set({ audio: audio || undefined }),

    // CTA handling
    addCTA: (cta) => set(state => ({
        ctas: [...(state.ctas || []), cta]
    })),
    removeCTA: (index) => set(state => ({
        ctas: (state.ctas || []).filter((_, i) => i !== index)
    })),
    updateCTA: (index, cta) => set(state => ({
        ctas: (state.ctas || []).map((item, i) =>
            i === index ? { ...item, ...cta } : item
        )
    })),

    // Network sites
    addToFeaturedIn: (site) => set(state => ({
        featuredIn: [...new Set([...state.featuredIn, site])],
        postInNetwork: [...new Set([...state.postInNetwork, site])]
    })),

    removeFromFeaturedIn: (site) => set(state => ({
        featuredIn: state.featuredIn.filter(s => s !== site),
        postInNetwork: state.postInNetwork.filter(s => s !== site)
    })),

    addToPostInNetwork: (site) => set(state => ({
        postInNetwork: [...new Set([...state.postInNetwork, site])]
    })),

    removeFromPostInNetwork: (site) => set(state => ({
        postInNetwork: state.postInNetwork.filter(s => s !== site)
    })),

    // Language toggle
    toggleLanguage: () => set(state => ({
        isNepali: !state.isNepali,
        language: state.isNepali ? 'english' : 'nepali'
    })),

    // Validation
    validate: () => {
        const state = get()
        const newErrors: Record<string, string> = {}

        if (!state.title.trim()) newErrors.title = 'Title is required'
        if (!state.excerpt.trim()) newErrors.excerpt = 'Excerpt is required'
        if (state.excerpt.length > 250) newErrors.excerpt = 'Excerpt must be 150 characters or less'
        if (!state.content.trim()) newErrors.content = 'Content is required'
        if (!state.category.trim()) newErrors.category = 'Category is required'
        if (!state.heroBanner) newErrors.heroBanner = 'Hero banner is required'
        if (!state.ogBanner) newErrors.ogBanner = 'OG banner is required. You can add same image as Hero banner',

            // Validate CTAs
            (state.ctas || []).forEach((cta, index) => {
                if (cta?.name?.trim() || cta?.url?.trim()) {
                    if (!cta.name?.trim()) newErrors[`cta-${index}-name`] = 'Name required when URL exists';
                    if (!cta.url?.trim()) newErrors[`cta-${index}-url`] = 'URL required when name exists';
                    else if (!/^https?:\/\//i.test(cta.url)) {
                        newErrors[`cta-${index}-url`] = 'URL must start with http:// or https://';
                    }
                }

            }),

            set({ errors: newErrors })
        return Object.keys(newErrors).length === 0
    },

    // Reset
    resetStore: () => set({
        title: '',
        excerpt: '',
        isNepali: false,
        content: '',
        featuredIn: [],
        postInNetwork: [],
        category: '',
        tags: [],
        date: '',
        time: '',
        authors: [],
        language: 'english',
        readingTime: '',
        heroBanner: undefined,
        ogBanner: undefined,
        sponsoredAds: undefined,
        heroImageCredit: '',
        ogImageCredit: '',
        audio: undefined,
        audioCredit: '',
        ctas: [],
        access: 'public',
        canonicalUrl: '',
        errors: {}
    }),

    // Initialize with existing data
    initialize: (postData) => set({
        title: postData.title || '',
        excerpt: postData.excerpt || '',
        isNepali: postData.isNepali || false,
        content: postData.content || '',
        featuredIn: postData.featuredIn || [],
        postInNetwork: postData.postInNetwork || [],
        category: postData.category || '',
        tags: postData.tags || [],
        date: postData.date || '',
        time: postData.time || '',
        authors: postData.authors || [],
        language: postData.language || 'english',
        readingTime: postData.readingTime || '',
        heroBanner: postData.heroBanner,
        ogBanner: postData.ogBanner,
        sponsoredAds: postData.sponsoredAds,
        heroImageCredit: postData.heroImageCredit || '',
        ogImageCredit: postData.ogImageCredit || '',
        audio: postData.audio,
        audioCredit: postData.audioCredit || '',
        ctas: postData.ctas || [],
        access: postData.access || 'public',
        canonicalUrl: postData.canonicalUrl || '',
        errors: {}
    })
}))