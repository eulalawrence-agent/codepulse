import type { Metadata } from 'next'; import './globals.css';
export const metadata: Metadata = { title: 'CodePulse — AI Code Review Agent', description: 'Paste GitHub URL → Get instant AI-powered code review with 8 specialized agents' };
export default function RootLayout({ children }: { children: React.ReactNode }) { return <html lang="en"><body>{children}</body></html> }
