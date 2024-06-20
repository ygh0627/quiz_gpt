import { GeistSans } from 'geist/font/sans';
import './globals.css';
import Header from '@/components/header';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { ClerkProvider } from '@clerk/nextjs'

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'QuizGPT',
  description: 'Study',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang='en' className={GeistSans.className}>
        <body className='sticky top-0 bg-background text-foreground'>
          <Header />
          <main className='flex flex-col items-center'>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </main>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
