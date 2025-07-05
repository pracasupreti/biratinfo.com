'use client';

import React from 'react';
import parse, { DOMNode, domToReact, Element, HTMLReactParserOptions } from 'html-react-parser';
import Image from 'next/image';
import { Volume2Icon } from 'lucide-react';
import AudioPlayer from '@/components/AudioPlayer';
import { AudioData, ImageData, SinglePost } from '@/types/Post';
import Link from 'next/link';

const cleanContent = (html: string): string =>
    html
        .replace(/<button[^>]*onclick="[^"]*"[^>]*>.*?<\/button>/gi, '')
        .replace(/<div[^>]*onclick="[^"]*"[^>]*>.*?<\/div>/gi, '')
        .replace(/<span[^>]*>×<\/span>/gi, '')
        .replace(/×/g, '');

export default function ArticleContent({ post }: { post: SinglePost }) {
    const cleaned = cleanContent(post.content || '').trim();
    if (!cleaned) return null;

    const sponsorAds = post.sponsoredAds as ImageData | string | null;
    const adUrl = typeof sponsorAds === 'string' ? sponsorAds : sponsorAds?.url;

    const opts: HTMLReactParserOptions = {
        replace: (node: DOMNode) => {
            if (node.type === 'tag') {
                const el = node as Element;
                const { name, attribs, children } = el;
                const inner = domToReact(children as DOMNode[], opts);

                switch (name) {
                    case 'h1':
                        return <h1 className="text-3xl font-bold my-6 text-text-color">{inner}</h1>;
                    case 'h2':
                        return <h2 className="text-2xl font-bold my-4">{inner}</h2>;

                    // --- START: MODIFIED SECTION ---
                    case 'p': {
                        // Check if the parent of this <p> tag is a list item (<li>)
                        const parent = node.parent as Element;
                        if (parent && parent.type === 'tag' && parent.name === 'li') {
                            return <>{inner}</>;
                        }
                        // Otherwise, render a normal paragraph
                        return <p className="text-gray-800 leading-relaxed mb-4">{inner}</p>;
                    }
                    // --- END: MODIFIED SECTION ---

                    case 'ul':
                        return <ul className="list-disc list-inside mb-6 text-gray-800 space-y-2">{inner}</ul>;
                    case 'ol':
                        return <ol className="list-decimal list-inside mb-6 text-gray-800 space-y-2">{inner}</ol>;
                    case 'li':
                        return <li className="leading-relaxed">{inner}</li>;
                    case 'img': {
                        const src = attribs.src || '';
                        const alt = attribs.alt || '';
                        const w = attribs.width ? parseInt(attribs.width) : 800;
                        const h = attribs.height ? parseInt(attribs.height) : 600;
                        return (
                            <div className="my-6 w-full">
                                <Image
                                    src={src}
                                    alt={alt}
                                    width={w}
                                    height={h}
                                    className="rounded-lg object-contain w-full h-auto"
                                    sizes="(max-width: 768px) 100vw, 800px"
                                    unoptimized
                                />
                            </div>
                        );
                    }
                }
            }
        },
    };

    const parsed = parse(cleaned, opts) as React.ReactNode[];
    const mid = adUrl ? Math.floor(parsed.length / 2) : -1;

    const contentWithAd: React.ReactNode[] = [];
    parsed.forEach((node, idx) => {
        if (idx === mid && adUrl) {
            contentWithAd.push(
                <div
                    key="ad"
                    className="float-right ml-6 mb-6 w-full max-w-[300px] md:max-w-[400px]"
                >
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden w-full h-auto aspect-[2/3]">
                        <div className="relative w-full h-full">
                            <Image
                                src={adUrl}
                                alt="Sponsored Advertisement"
                                layout="fill"
                                className="object-cover rounded-b-lg"
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
            );
        }
        contentWithAd.push(<React.Fragment key={idx}>{node}</React.Fragment>);
    });

    return (
        <div className="max-w-4xl mx-auto px-4">
            {/* Audio */}
            {post.audio && (
                <div className="mb-8 bg-gray-50 rounded-lg p-6 clear-both">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Volume2Icon className="w-5 h-5 text-primary" />
                        यस समाचारको अडियो संस्करण
                    </h3>
                    <AudioPlayer audioFile={post.audio as AudioData | null} />
                </div>
            )}

            {/* Article with floated ad */}
            <div className="prose prose-lg text-gray-800 leading-relaxed">
                {contentWithAd}
            </div>
            <div className="clear-both" />

            {/* CTAs */}
            {post.ctas && post.ctas.length > 0 && (
                <div className="mt-8">
                    <h3 className="text-xl font-semibold mb-4">यस समाचार सम्बन्धी अधिक जानकारी</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {post.ctas.map((cta, i) => (
                            <Link
                                key={i}
                                href={cta.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-primary hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg text-center transition-colors"
                            >
                                {cta.name}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}