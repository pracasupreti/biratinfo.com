import { create } from 'zustand'

interface Block {
    content: string
    link?: string
}

export interface PostState {
    englishTitle: string
    nepaliTitle: string
    blocks: Block[]
    excerpt: string
    featuredIn: boolean[]
    postInNetwork: boolean[]
    category: string
    tags: string[]
    date: string
    time: string
    authors: string[]
    language: string
    readingTime?: string
    heroBanner: string
    ogBanner: string
    heroImageCredit: string
    ogImageCredit: string
    sponsoredAds: string
    access: string
    audioFile: File | null
    canonicalUrl: string
    errors: Record<string, string>

    // Actions
    setField: (field: keyof Omit<PostState, 'errors' | 'setError' | 'clearError' | 'validate' | 'resetStore' | 'initialize'>, value: any) => void
    setError: (field: string, message: string) => void
    clearError: (field: string) => void
    validate: () => boolean
    resetStore: () => void
    initialize: (postData: Partial<PostState>) => void
    updateBlock: (index: number, content: string, link?: string) => void
    addAuthor: (author: string) => void
    removeAuthor: (index: number) => void
    addTag: (tag: string) => void
    removeTag: (index: number) => void
}

export const usePostStore = create<PostState>((set, get) => ({
    // Initial State
    englishTitle: '',
    nepaliTitle: '',
    blocks: Array(4).fill({ content: '', link: undefined }), // Initialize with empty blocks
    excerpt: '',
    featuredIn: Array(8).fill(false),
    postInNetwork: Array(8).fill(false),
    category: '',
    tags: [],
    date: '',
    time: '',
    authors: [],
    language: 'english',
    readingTime: '',
    heroBanner: '',
    ogBanner: '',
    heroImageCredit: '',
    ogImageCredit: '',
    sponsoredAds: '',
    access: 'public',
    audioFile: null,
    canonicalUrl: '',
    errors: {},

    // Set any field dynamically
    setField: (field, value) => {
        set({ [field]: value })
        if (get().errors[field]) {
            set(state => ({
                errors: { ...state.errors, [field]: '' }
            }))
        }
    },

    // Update a specific block with content and optional link
    updateBlock: (index, content, link) => {
        set(state => {
            const newBlocks = [...state.blocks]
            newBlocks[index] = { content, link }
            return { blocks: newBlocks }
        })
    },

    // Add author (max 2)
    addAuthor: (author) => {
        set(state => {
            if (state.authors.length >= 2) return state
            return { authors: [...state.authors, author] }
        })
    },

    // Remove author by index
    removeAuthor: (index) => {
        set(state => {
            const newAuthors = [...state.authors]
            newAuthors.splice(index, 1)
            return { authors: newAuthors }
        })
    },

    // Add tag (max 5)
    addTag: (tag) => {
        set(state => {
            if (state.tags.length >= 5) return state
            return { tags: [...state.tags, tag] }
        })
    },

    // Remove tag by index
    removeTag: (index) => {
        set(state => {
            const newTags = [...state.tags]
            newTags.splice(index, 1)
            return { tags: newTags }
        })
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
        if (state.authors.length === 0) newErrors.authors = 'At least one author is required.'
        if (!state.heroImageCredit.trim()) newErrors.heroImageCredit = 'Hero Image credit is required.'
        if (!state.ogImageCredit.trim()) newErrors.ogImageCredit = 'Og Image credit is required.'
        if (!state.heroBanner) newErrors.heroBanner = 'Hero banner image is required.'
        if (!state.ogBanner) newErrors.ogBanner = 'OG banner image is required.'

        // Validate blocks have content
        state.blocks.forEach((block, index) => {
            if (!block.content.trim()) {
                newErrors[`blocks[${index}]`] = 'Block content cannot be empty'
            }
        })

        // Validate authors limit
        if (state.authors.length > 2) {
            newErrors.authors = 'Maximum 2 authors allowed'
        }

        // Validate tags limit
        if (state.tags.length > 5) {
            newErrors.tags = 'Maximum 5 tags allowed'
        }

        set({ errors: newErrors })
        return Object.keys(newErrors).length === 0
    },

    // Reset store to initial state
    resetStore: () => {
        set({
            englishTitle: '',
            nepaliTitle: '',
            blocks: Array(4).fill({ content: '', link: undefined }),
            excerpt: '',
            featuredIn: Array(8).fill(false),
            postInNetwork: Array(8).fill(false),
            category: '',
            tags: [],
            date: '',
            time: '',
            authors: [],
            language: 'english',
            readingTime: '',
            heroBanner: '',
            ogBanner: '',
            heroImageCredit: '',
            ogImageCredit: '',
            sponsoredAds: '',
            access: 'public',
            audioFile: null,
            canonicalUrl: '',
            errors: {},
        })
    },

    // Initialize store with existing post data for editing
    initialize: (postData) => {
        set({
            englishTitle: postData.englishTitle || '',
            nepaliTitle: postData.nepaliTitle || '',
            blocks: postData.blocks || Array(4).fill({ content: '', link: undefined }),
            excerpt: postData.excerpt || '',
            featuredIn: postData.featuredIn || Array(8).fill(false),
            postInNetwork: postData.postInNetwork || Array(8).fill(false),
            category: postData.category || '',
            tags: postData.tags || [],
            date: postData.date || '',
            time: postData.time || '',
            authors: postData.authors || [],
            language: postData.language || 'english',
            readingTime: postData.readingTime || '',
            heroBanner: postData.heroBanner || '',
            ogBanner: postData.ogBanner || '',
            heroImageCredit: postData.heroImageCredit || '',
            ogImageCredit: postData.ogImageCredit || '',
            sponsoredAds: postData.sponsoredAds || '',
            access: postData.access || 'public',
            audioFile: postData.audioFile || null,
            canonicalUrl: postData.canonicalUrl || '',
            errors: {}
        })
    }
}))