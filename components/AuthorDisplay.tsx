import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Author } from '@/types/Post'

export default function AuthorDisplay({ author }: { author: Author }) {
    const name = author.firstName || author.lastName
        ? `${author.firstName ?? ''} ${author.lastName ?? ''}`.trim()
        : author.username || 'Unknown'
    const imageUrl = author.avatar || ''

    return (
        <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
                {imageUrl ? (
                    <AvatarImage src={imageUrl} />
                ) : (
                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                )}
            </Avatar>
            <span className="text-sm line-clamp-1">{name}</span>
        </div>
    )
}
