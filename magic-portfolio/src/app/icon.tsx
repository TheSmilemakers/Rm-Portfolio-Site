/* eslint-disable @next/next/no-img-element */
import React from 'react';

export default function Favicon() {
  return new Response(
    `<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="32" height="32" rx="6" fill="#FFB800"/>
      <text x="16" y="22" font-family="Space Grotesk, system-ui, sans-serif" font-size="18" font-weight="700" text-anchor="middle" fill="white">R</text>
    </svg>`,
    {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    }
  );
}