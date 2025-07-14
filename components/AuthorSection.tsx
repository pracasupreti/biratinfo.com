// components/AuthorSection.tsx
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Author } from '@/types/Post';

const AuthorSection = ({ author }: { author?: Author }) => {
    if (!author) return null;


    return (
        <div className="max-w-4xl mx-auto px-4 mt-12 mb-8">
            <div className="bg-gray-100 rounded-lg p-6 shadow-lg">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                    <div className="flex-shrink-0 mx-auto">
                        <Avatar className="w-20 h-20 border-2 border-primary">
                            <AvatarImage src={author.avatar} alt={`${author.firstName} ${author.lastName}`} />
                            <AvatarFallback className="bg-primary text-white text-sm">
                                {author.firstName?.charAt(0) || ''}{author.lastName?.charAt(0) || ''}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                    <div className="flex-grow flex flex-col gap-1 justify-center items-center md:items-start">
                        <Link href={`/author/${author.username}`} className="text-md font-bold text-text-color hover:underline">
                            {author.firstName} {author.lastName}
                        </Link>
                        {author.bio && (
                            <p className="text-gray-700 mb-1 text-sm font-medium line-clamp-3">{author.bio}</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthorSection;