import { GeistSans } from "geist/font/sans";
import "./globals.css";
import Header from "@/components/header";

const defaultUrlOrig = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const defaultUrl = 'https://quiz-gpt-psi.vercel.app';
export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "QuizGPT",
  description: "Study",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="sticky top-0 bg-background text-foreground">
        <Header />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
