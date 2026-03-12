import styles from './page.module.css';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import ProductGallery from '@/components/ProductGallery';

export default async function ProductPage({ params }: { params: { id: string } }) {
  const productId = Number(params.id);

  const product = await prisma.product.findUnique({
    where: { id: productId },
  });

  if (!product) return notFound();

  let imgs: string[] = [];
  try { imgs = JSON.parse(product.images); } catch {}

  // Fetch 4 featured products (excluding current)
  const featured = await prisma.product.findMany({
    where: { isFeatured: true, NOT: { id: productId } },
    take: 4,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className={styles.container}>
      <div className={styles.productLayout}>
        <ProductGallery images={imgs} title={product.title} />

        <div className={styles.details}>
          <div className={styles.breadcrumbs}>
            <Link href="/">Inicio</Link> / <Link href={`/categoria/${product.category}`}>{product.category}</Link>
          </div>
          <h1 className={styles.title}>{product.title}</h1>
          <p className={styles.price}>${product.price.toLocaleString()}</p>

          <div className={styles.actions}>
            <p className={styles.consultText}>Catálogo oficial. Consultas de stock y compra:</p>
            <a href="#" className={styles.whatsappButton}>
              Consultar Disponibilidad
            </a>
          </div>

          <div className={styles.description}>
            <h3>Detalles del Producto</h3>
            <p>{product.description || 'Prenda exclusiva de alta calidad. Diseñada para destacar con un estilo único y moderno.'}</p>
          </div>
        </div>
      </div>

      <section className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>Productos Destacados</h2>
        {featured.length === 0 ? (
          <p style={{ color: '#888' }}>No hay productos destacados aún.</p>
        ) : (
          <div className={styles.featuredGrid}>
            {featured.map((p) => {
              let fImgs: string[] = [];
              try { fImgs = JSON.parse(p.images); } catch {}
              return (
                <Link href={`/producto/${p.id}`} key={p.id} className={styles.featuredCard}>
                  <div className={styles.featuredImg}>
                    {fImgs[0] ? (
                      <img src={fImgs[0]} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span>DRIP</span>
                    )}
                  </div>
                  <div className={styles.featuredInfo}>
                    <h4>{p.title}</h4>
                    <p>${p.price.toLocaleString()}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
