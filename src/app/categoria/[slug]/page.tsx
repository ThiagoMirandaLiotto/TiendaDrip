import styles from './page.module.css';
import Link from 'next/link';
import prisma from '@/lib/prisma';

const categories: Record<string, string> = {
  remeras: 'REMERAS',
  pantalones: 'PANTALONES',
  gorras: 'GORRAS',
  conjuntos: 'CONJUNTOS'
};

export default async function CategoryPage({ params }: { params: { slug: string } }) {
  const normalizedSlug = params.slug.toLowerCase();
  const categoryName = categories[normalizedSlug] || params.slug.toUpperCase();

  let products: { id: number; title: string; price: number; images: string }[] = [];
  try {
    products = await prisma.product.findMany({
      where: { category: normalizedSlug },
      orderBy: { createdAt: 'desc' },
    });
  } catch (e) {
    console.error('Error fetching products:', e);
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{categoryName}</h1>
        <p className={styles.subtitle}>Explora nuestra exclusiva colección de {normalizedSlug}</p>
      </header>

      {products.length === 0 ? (
        <div className={styles.empty}>
          <p>Aún no hay productos en esta categoría.</p>
        </div>
      ) : (
        <div className={styles.grid}>
          {products.map(product => {
            let imgs: string[] = [];
            try { imgs = JSON.parse(product.images); } catch {}
            const mainImg = imgs[0] || null;

            return (
              <Link href={`/producto/${product.id}`} key={product.id} className={styles.card}>
                <div className={styles.imageContainer}>
                  {mainImg ? (
                    <img src={mainImg} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  ) : (
                    <div className={styles.placeholderImg}>DRIP</div>
                  )}
                </div>
                <div className={styles.info}>
                  <h3 className={styles.productTitle}>{product.title}</h3>
                  <p className={styles.price}>${product.price.toLocaleString()}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
