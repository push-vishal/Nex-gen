import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = 'image/png';

// Dynamic Favicon Generator
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#050816',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          border: '1px solid rgba(168, 85, 247, 0.3)',
        }}
      >
        <svg
          width="22"
          height="22"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Hexagon Outline */}
          <path
            d="M 50 8 L 86.37 29 M 86.37 29 L 86.37 71 M 86.37 71 L 50 92 M 50 92 L 13.63 71 M 13.63 71 L 13.63 29 M 13.63 29 L 50 8 Z"
            stroke="#a855f7"
            strokeWidth="9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Upward Arrow */}
          <path
            d="M 50 72 L 50 30 M 50 30 L 40 40 M 50 30 L 60 40"
            stroke="#22d3ee"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Spark Star */}
          <path
            d="M 68 25 C 68 29, 68 29, 72 29 C 68 29, 68 29, 68 33 C 68 29, 68 29, 64 29 C 68 29, 68 29, 68 25 Z"
            fill="#8b5cf6"
          />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
