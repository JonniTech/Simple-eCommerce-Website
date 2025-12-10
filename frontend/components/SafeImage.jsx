"use client";

import { useState } from "react";
import Image from "next/image";

export default function SafeImage({ src, alt, fill, className, sizes, priority }) {
    const [hasError, setHasError] = useState(false);

    // Strict validation
    const isString = src && typeof src === 'string';
    const trimmedSrc = isString ? src.trim() : '';
    const isHttp = trimmedSrc.startsWith('http');
    const isValidHttp = isHttp && trimmedSrc.length > 8;
    const isRelative = trimmedSrc.startsWith('/');

    const isValidSrc = isString && trimmedSrc !== '' && (isValidHttp || isRelative);

    if (!isValidSrc || hasError) {
        return (
            <div className={`flex items-center justify-center bg-gray-100 dark:bg-[#362F5C] text-gray-400 ${className} ${fill ? 'absolute inset-0' : 'w-full h-full'}`}>
                <span className="text-2xl">📷</span>
            </div>
        );
    }

    // If external URL, use standard img tag to avoid Next.js Strictness & Config issues
    if (isValidHttp) {
        return (
            <img
                src={trimmedSrc}
                alt={alt || "Product image"}
                className={`${className} ${fill ? 'absolute inset-0 w-full h-full' : ''}`}
                onError={() => setHasError(true)}
            />
        );
    }

    // For local images, use Next.js Image for optimization
    return (
        <Image
            src={trimmedSrc}
            alt={alt || "Product image"}
            fill={fill}
            sizes={sizes}
            className={className}
            priority={priority}
            onError={() => setHasError(true)}
        />
    );
}
