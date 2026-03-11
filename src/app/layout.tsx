import './globals.css';
import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const outfit = Outfit({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Drip Clothing | Catálogo Premium',
  description: 'Catálogo oficial de Drip Clothing. Remeras, pantalones, gorras y conjuntos con estilo único.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={outfit.className}>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <Navbar />
          <main style={{ flex: 1, paddingBottom: '4rem' }}>
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
