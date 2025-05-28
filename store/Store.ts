import { create } from 'zustand'

// TypeScript types for store state and actions
export interface PostState {
    englishTitle: string
    nepaliTitle: string
    blocks: string[]
    excerpt: string
    featuredIn: boolean[]
    postInNetwork: boolean[]
    category: string
    tags: string
    date: string
    time: string
    author: string
    language: string
    heroBanner: string
    ogBanner: string
    imageCredit: string
    sponsoredAds: string
    access: string
    audioFile: File | null
    canonicalUrl: string
    errors: Record<string, string>

    // Actions
    setField: (field: keyof Omit<PostState, 'errors' | 'setField' | 'setError' | 'clearError' | 'validate' | 'updateBlock' | 'resetStore'>, value: any) => void
    setError: (field: string, message: string) => void
    clearError: (field: string) => void
    validate: () => boolean
    resetStore: () => void
}

// Zustand store implementation
export const usePostStore = create<PostState>((set, get) => ({
    // Initial State
    englishTitle: '',
    nepaliTitle: '',
    blocks: ['', '', '', ''], // 4 blocks by default
    excerpt: '',
    featuredIn: Array(8).fill(false), // [false, false,....,false] Array of 8
    postInNetwork: Array(8).fill(false),
    category: '',
    tags: '',
    date: '',
    time: '',
    author: '',
    language: 'english',
    heroBanner: '',
    ogBanner: '',
    imageCredit: '',
    sponsoredAds: '',
    access: 'public',
    audioFile: null,
    canonicalUrl: '',
    errors: {},



    // Set any field dynamically
    setField: (field, value) => {
        set({ [field]: value })

        // Auto-clear error if it exists
        if (get().errors[field]) {
            set(state => ({
                errors: { ...state.errors, [field]: '' }
            }))
        }
    },

    // Set an error manually
    setError: (field, message) => {
        set(state => ({
            errors: { ...state.errors, [field]: message }
        }))
    },

    // Clear error manually
    clearError: (field) => {
        set(state => ({
            errors: { ...state.errors, [field]: '' }
        }))
    },


    // Validate fields before submission
    validate: () => {
        const state = get()
        const newErrors: Record<string, string> = {}

        // Required field validation
        if (!state.englishTitle.trim()) newErrors.englishTitle = 'English title is required.'
        if (!state.nepaliTitle.trim()) newErrors.nepaliTitle = 'Nepali title is required.'
        if (!state.excerpt.trim()) newErrors.excerpt = 'Excerpt is required.'
        if (!state.category.trim()) newErrors.category = 'Category is required.'
        if (!state.date.trim()) newErrors.date = 'Date is required.'
        if (!state.time.trim()) newErrors.time = 'Time is required.'
        if (!state.author.trim()) newErrors.author = 'Author name is required.'
        if (!state.imageCredit.trim()) newErrors.imageCredit = 'Image credit is required.'
        if (!state.heroBanner) newErrors.heroBanner = 'Hero banner image is required.'
        if (!state.ogBanner) newErrors.ogBanner = 'OG banner image is required.'

        // // File type validations (images and audio)
        // const allowedImageTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp']
        // if (state.heroBanner && !allowedImageTypes.includes(state.heroBanner.type)) {
        //     newErrors.heroBanner = 'Hero banner must be PNG, JPG, JPEG, SVG, or WebP.'
        // }
        // if (state.ogBanner && !allowedImageTypes.includes(state.ogBanner.type)) {
        //     newErrors.ogBanner = 'OG banner must be PNG, JPG, JPEG, SVG, or WebP.'
        // }

        // const allowedAudioTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg']
        // if (state.audioFile && !allowedAudioTypes.includes(state.audioFile.type)) {
        //     newErrors.audioFile = 'Audio must be MP3, WAV, or OGG format.'
        // }

        // Apply and return
        set({ errors: newErrors })
        return Object.keys(newErrors).length === 0
    },

    // Reset store to initial state
    resetStore: () => {
        set({
            englishTitle: '',
            nepaliTitle: '',
            blocks: ['', '', '', ''],
            excerpt: '',
            featuredIn: Array(8).fill(false),
            postInNetwork: Array(8).fill(false),
            category: '',
            tags: '',
            date: '',
            time: '',
            author: '',
            language: 'english',
            heroBanner: '',
            ogBanner: '',
            imageCredit: '',
            sponsoredAds: '',
            access: 'public',
            audioFile: null,
            canonicalUrl: '',
            errors: {},
        })
    },

}))
