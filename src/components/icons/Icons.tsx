import React from "react";

export const ChatGPTIcon = ({
  size = 24,
  className,
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2057 5.9847 5.9847 0 0 0 3.998-2.9001 6.0557 6.0557 0 0 0-.7478-7.0731z" />
  </svg>
);

export const GeminiIcon = ({
  size = 24,
  className,
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2.5C12 8 16 12 21.5 12C16 12 12 16 12 21.5C12 16 8 12 2.5 12C8 12 12 8 12 2.5Z" />
    <path d="M19 3C19 4.5 20.5 6 22 6C20.5 6 19 7.5 19 9C19 7.5 17.5 6 16 6C17.5 6 19 4.5 19 3Z" />
  </svg>
);

export const ReactIcon = ({
  size = 24,
  className,
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
  </svg>
);

export const NeonDBIcon = ({
  size = 24,
  className,
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <ellipse cx="12" cy="6" rx="8" ry="3" />
    <path d="M4 6v12a8 3 0 0 0 16 0V6" />
    <path d="M4 12a8 3 0 0 0 16 0" />
    <path d="M12 12v6" />
  </svg>
);

export const StitchIcon = ({
  size = 24,
  className,
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="8" cy="12" r="5" />
    <circle cx="16" cy="12" r="5" />
  </svg>
);

export const FigmaIcon = ({
  size = 24,
  className,
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
    <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
  </svg>
);

export const GithubCustomIcon = ({
  size = 24,
  className,
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.394.1 2.646.64.699 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
  </svg>
);

export const VercelIcon = ({
  size = 24,
  className,
}: {
  size?: number;
  className?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 2L22 22H2L12 2z" />
  </svg>
);
