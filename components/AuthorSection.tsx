// components/AuthorSection.tsx
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram, FaTiktok } from 'react-icons/fa'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Link from 'next/link';
import { Author } from '@/types/Post';

const AuthorSection = ({ author }: { author?: Author }) => {
    if (!author) return null;

    const socialLinks = author.socialLinks || {};
    const hasSocialLinks = Object.values(socialLinks).some(link => !!link);

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
                    <div className="flex-grow flex flex-col gap-1">
                        <Link href={`/author/${author.username}`} className="text-md font-bold text-text-color hover:underline">
                            {author.firstName} {author.lastName}
                        </Link>
                        {author.bio && (
                            <p className="text-gray-700 mb-1 text-sm font-medium line-clamp-2">{author.bio}</p>
                        )}
                        {hasSocialLinks && (
                            <div className="flex gap-4">
                                {socialLinks.facebook && (
                                    <Link href={socialLinks.facebook} target="_blank" rel="noopener noreferrer">
                                        <FaFacebookF className="w-6 h-6 text-gray-600 hover:text-blue-600 transition-colors" />
                                    </Link>
                                )}
                                {socialLinks.instagram && (
                                    <Link href={socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                                        <FaInstagram className="w-6 h-6 text-gray-600 hover:text-pink-600 transition-colors" />
                                    </Link>
                                )}
                                {socialLinks.twitter && (
                                    <Link href={socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                                        <FaTwitter className="w-6 h-6 text-gray-600 hover:text-blue-400 transition-colors" />
                                    </Link>
                                )}
                                {socialLinks.youtube && (
                                    <Link href={socialLinks.youtube} target="_blank" rel="noopener noreferrer">
                                        <FaYoutube className="w-6 h-6 text-gray-600 hover:text-red-600 transition-colors" />
                                    </Link>
                                )}
                                {socialLinks.tiktok && (
                                    <Link href={socialLinks.tiktok} target="_blank" rel="noopener noreferrer">
                                        <FaTiktok className="w-6 h-6 text-gray-600 hover:text-black transition-colors" />
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthorSection;