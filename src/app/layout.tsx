import type { Metadata, Viewport } from 'next';
import { Space_Grotesk } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  title: 'Ayoub Atidi | Creative Developer & Full Stack Engineer',
  description:
    'Portfolio de Ayoub Atidi — Desarrollo web full stack, diseño de interfaces y experiencias digitales.',
  metadataBase: new URL('https://ayoubatidi.dev'),
  openGraph: {
    title: 'Ayoub Atidi | Creative Developer',
    description: 'Desarrollo web full stack y experiencias digitales.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#050a18',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={spaceGrotesk.variable}>
      <body className={`${spaceGrotesk.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
