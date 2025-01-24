import './global.css';
import Providers from './providers';
import Header from '@/components/Header';

export const metadata = {
  title: 'Order tracker - imvilabs',
  description: 'Created by  Tariq Mahrous',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: '48x48',
      },
      {
        url: '/icon.png',
        sizes: '96x96',
      },
    ],
    apple: [
      {
        url: '/apple-icon.png',
        sizes: '180x180',
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" type="image/png" href="/icon.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/icon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link rel="apple-icon" sizes="180x180" href="/apple-icon.png" />
      </head>
      <body className="h-screen">
        <Providers>
          <Header />
          <main className="container flex justify-center items-center h-full">
            {children}
          </main>
          <footer></footer>
        </Providers>
      </body>
    </html>
  );
}
