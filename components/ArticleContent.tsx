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

export default function ArticleContent({ post, defaultSponsoredAd }: {
    post: SinglePost,
    defaultSponsoredAd?: { url: string; link: string } | null
}) {
    const cleaned = cleanContent(post.content || '').trim();
    if (!cleaned) return null;

    // Determine which ad to show
    const sponsorAds = post.sponsoredAds as ImageData | string | null;
    const adUrl = typeof sponsorAds === 'string' ? sponsorAds.trim() : sponsorAds?.url?.trim();
    const showAd = (adUrl && adUrl.length > 0) || (defaultSponsoredAd?.url && defaultSponsoredAd.url.length > 0);
    const finalAdUrl = adUrl && adUrl.length > 0 ? adUrl : defaultSponsoredAd?.url;
    const finalAdLink = (adUrl && adUrl.length > 0)
        ? (post.sponsorLink || '#')
        : (defaultSponsoredAd?.link || '#');

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
                    case 'p': {
                        const parent = node.parent as Element;
                        if (parent && parent.type === 'tag' && parent.name === 'li') {
                            return <>{inner}</>;
                        }
                        return <p className="text-gray-800 leading-relaxed mb-4">{inner}</p>;
                    }
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
    const mid = showAd ? Math.floor(parsed.length / 2) : -1;

    const contentWithAd: React.ReactNode[] = [];
    parsed.forEach((node, idx) => {
        if (idx === mid && showAd && finalAdUrl) {
            contentWithAd.push(
                <div
                    key="ad"
                    className="mx-auto sm:ml-6 sm:float-right mb-6 w-full max-w-[300px] md:max-w-[400px]"
                >
                    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden w-full h-auto aspect-[1/1.5]">
                        <Link href={finalAdLink} target="_blank" rel="noopener noreferrer">
                            <div className="relative w-full h-full">
                                <Image
                                    src={finalAdUrl}
                                    alt="Sponsored Advertisement"
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 300px, 400px"
                                    unoptimized
                                />
                            </div>
                        </Link>
                    </div>
                </div>
            );
        }
        contentWithAd.push(<React.Fragment key={idx}>{node}</React.Fragment>);
    });

    return (
        <div className="max-w-4xl mx-auto px-4">
            {post.audio && (
                <div className="mb-8 bg-gray-50 rounded-lg p-6 clear-both">
                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                        <Volume2Icon className="w-5 h-5 text-primary" />
                        यस समाचारको अडियो संस्करण
                    </h3>
                    <AudioPlayer audioFile={post.audio as AudioData | null} />
                </div>
            )}

            <div className="prose prose-lg text-gray-800 leading-relaxed">
                {contentWithAd}
            </div>
            <div className="clear-both" />

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