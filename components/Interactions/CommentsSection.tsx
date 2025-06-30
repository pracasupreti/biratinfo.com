'use client';

import { useState, useEffect } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import NepaliDateTime from '../homepage/NepaliDate';
import { Edit, Trash2, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';
import Link from 'next/link';


interface IComment {
    _id: string;
    userId: string;
    name: string;
    avatar?: string;
    content: string;
    createdAt: string;
}

interface CommentsSectionProps {
    postId: string;
    initialComments?: IComment[];
    initialLimitReached?: boolean;
}

export default function CommentsSection({
    postId,
    initialComments = [],
    initialLimitReached = false,
}: CommentsSectionProps) {
    const [comments, setComments] = useState<IComment[]>(initialComments);
    const [newComment, setNewComment] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [limitReached, setLimitReached] = useState(initialLimitReached);
    const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
    const [editedContent, setEditedContent] = useState('');
    const { getToken } = useAuth();
    const { user, isSignedIn } = useUser();
    const backend_uri = process.env.NEXT_PUBLIC_BACKEND_URL;

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const res = await fetch(`${backend_uri}/api/posts/${postId}/comment`);
                if (res.ok) {
                    const data = await res.json();
                    setComments(data.comments);
                    setLimitReached(data.comments.length >= 10);
                }
            } catch (error) {
                console.error('Failed to fetch comments:', error);
            }
        };

        fetchComments();
    }, [postId, backend_uri]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newComment.trim() || !user || limitReached) return;

        setIsLoading(true);

        try {
            const token = await getToken();
            const res = await fetch(`${backend_uri}/api/posts/${postId}/comment`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: newComment.trim(),
                }),
            });

            const data = await res.json();
            if (res.ok) {
                setComments(data.comments);
                setNewComment('');
                setLimitReached(data.comments.length >= 10);
                toast.success('Comment posted successfully');
            } else {
                toast.error('Failed to post comment');
            }
        } catch (error) {
            console.error('Failed to post comment', error);
            toast.error('Failed to post comment');
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (comment: IComment) => {
        setEditingCommentId(comment._id);
        setEditedContent(comment.content);
    };

    const handleCancelEdit = () => {
        setEditingCommentId(null);
        setEditedContent('');
    };

    const handleSaveEdit = async (commentId: string) => {
        if (!editedContent.trim()) return;

        try {
            const token = await getToken();
            const res = await fetch(`${backend_uri}/api/posts/${postId}/comment`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content: editedContent.trim(),
                    commentId: commentId
                }),
            });

            console.log(res)
            if (!res.ok) throw new Error("Faile to update comment")

            const data = await res.json();
            if (data) {
                setComments(data.comments);
                setEditingCommentId(null);
                toast.success('Comment updated successfully');
            } else {
                toast.error('Failed to update comment');
            }
        } catch (error) {
            console.error('Failed to update comment', error);
            toast.error('Failed to update comment');
        }
    };

    const handleDelete = async (commentId: string) => {
        if (!confirm('Are you sure you want to delete this comment?')) return;

        try {
            const token = await getToken();
            const res = await fetch(`${backend_uri}/api/posts/${postId}/comment`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    commentId: commentId
                }),
            });

            const data = await res.json();
            if (res.ok) {
                setComments(data.comments);
                setLimitReached(data.comments.length >= 10);
                toast.success('Comment deleted successfully');
            } else {
                toast.error('Failed to delete comment');
            }
        } catch (error) {
            console.error('Failed to delete comment', error);
            toast.error('Failed to delete comment');
        }
    };

    return (
        <section className="max-w-4xl mx-auto px-4 mt-12">
            <h3 className="text-2xl font-bold mb-6 text-gray-800">
                Comments ({comments.length}/10)
            </h3>

            {limitReached && (
                <div className="mb-4 p-3 bg-yellow-100 text-yellow-800 rounded-lg text-sm">
                    Comment limit reached. Only 10 comments allowed per post.
                </div>
            )}

            {/* Comment Form */}
            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <Textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write your comment..."
                    rows={3}
                    maxLength={500}
                    className="mb-3 text-gray-700 focus:ring-2 focus:ring-blue-500"
                    disabled={!isSignedIn || limitReached}
                />
                <div className="flex justify-end gap-2">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => setNewComment('')}
                        disabled={!newComment.trim() || !isSignedIn}
                        className='cursor-pointer'
                    >
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        onClick={handleSubmit}
                        disabled={isLoading || !newComment.trim() || !isSignedIn || limitReached}
                        className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
                    >
                        {isLoading ? 'Posting...' : 'Post Comment'}
                    </Button>
                </div>
            </div>

            {!isSignedIn && <div className='text-lg text-gray-500 flex justify-center items-center mb-6 gap-2'>कमेन्ट गर्न कृपया <Link href={'/sign-in'} className='font-bold hover:underline'> साइन इन </Link> गर्नुहोस्।</div>}

            {/* Comments List */}
            <div className="space-y-4">
                {comments.length > 0 ? (
                    [...comments].reverse().map((comment) => (
                        <div
                            key={comment._id}
                            className={cn(
                                "p-4 bg-white rounded-lg shadow-sm border border-gray-200",
                                editingCommentId === comment._id ? "border-blue-300 ring-1 ring-blue-200" : ""
                            )}
                        >
                            <div className="flex gap-3">
                                <Avatar className="w-10 h-10 border">
                                    <AvatarImage src={comment.avatar} />
                                    <AvatarFallback className="bg-gray-200">
                                        {comment.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-1">
                                        <div>
                                            <h4 className="text-gray-800 font-bold">{comment.name}</h4>
                                            <div className="text-xs text-gray-500">
                                                <NepaliDateTime updatedAt={comment.createdAt} />
                                            </div>
                                        </div>
                                        {user?.id === comment.userId && (
                                            <div className="flex gap-1">
                                                {editingCommentId === comment._id ? (
                                                    <>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleSaveEdit(comment._id)}
                                                            className="h-8 px-2 text-green-600 hover:bg-green-50 cursor-pointer"
                                                        >
                                                            <Check className="h-4 w-4 mr-1" />
                                                            Save
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={handleCancelEdit}
                                                            className="h-8 px-2 text-red-600 hover:bg-red-50 cursor-pointer"
                                                        >
                                                            <X className="h-4 w-4 mr-1" />
                                                            Cancel
                                                        </Button>
                                                    </>
                                                ) : (
                                                    <>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleEdit(comment)}
                                                            className="h-8 px-2 text-gray-600 hover:bg-gray-100 cursor-pointer"
                                                        >
                                                            <Edit className="h-4 w-4 mr-1" />
                                                            Edit
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleDelete(comment._id)}
                                                            className="h-8 px-2 text-red-600 hover:bg-red-50 cursor-pointer"
                                                        >
                                                            <Trash2 className="h-4 w-4 mr-1" />
                                                            Delete
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        )}
                                    </div>

                                    {editingCommentId === comment._id ? (
                                        <Textarea
                                            value={editedContent}
                                            onChange={(e) => setEditedContent(e.target.value)}
                                            rows={3}
                                            className="mt-2 text-gray-700 focus:ring-2 focus:ring-blue-500"
                                            autoFocus
                                        />
                                    ) : (
                                        <p className="text-gray-700 whitespace-pre-line mt-2">
                                            {comment.content}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center text-gray-500 bg-white rounded-lg border border-gray-200">
                        No comments yet
                    </div>
                )}
            </div>
        </section>
    );
}