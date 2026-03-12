import styles from './page.module.css';
import Link from 'next/link';
import prisma from '@/lib/prisma';

export default async function Home() {
  // Fetch featured products from the database
  let featuredProducts: { id: number; title: string; price: number; images: string }[] = [];
  try {
    featuredProducts = await prisma.product.findMany({
      where: { isFeatured: true },
      orderBy: { createdAt: 'desc' },
      take: 8 // Show up to 8 featured items on home page
    });
  } catch (error) {
    console.error("Error fetching featured products", error);
  }

  return (
    <div className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>ROPITA <span className={styles.highlight}>DRIP PA</span>.</h1>
          <p className={styles.subtitle}>La mejor ropa drip en una tienda.</p>
          <div className={styles.heroButtons}>
            <Link href="/categoria/remeras" className={styles.primaryButton}>
              Ver Remeras
            </Link>
            <Link href="#destacados" className={styles.secondaryButton}>
              Explorar Destacados
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.categories}>
        <h2 className={styles.sectionTitle}>CATEGORÍAS</h2>
        <div className={styles.categoryGrid}>
          {['Remeras', 'Pantalones', 'Gorras', 'Conjuntos'].map((cat) => (
            <Link key={cat} href={`/categoria/${cat.toLowerCase()}`} className={styles.categoryCard}>
              <div className={styles.categoryName}>{cat}</div>
            </Link>
          ))}
        </div>
      </section>

      <section id="destacados" className={styles.featured}>
        <h2 className={styles.sectionTitle}>DESTACADOS</h2>
        
        {featuredProducts.length === 0 ? (
          <div className={styles.featuredGrid}>
            <div className={styles.placeholderCard}>
              <p>Aún no hay productos destacados. Marcalos desde el panel de administrador.</p>
            </div>
          </div>
        ) : (
          <div className={styles.featuredGrid}>
            {featuredProducts.map((product) => {
              let imgs: string[] = [];
              try { imgs = JSON.parse(product.images); } catch {}
              const mainImg = imgs[0] || null;

              return (
                <Link href={`/producto/${product.id}`} key={product.id} className={styles.featuredItemCard}>
                  <div className={styles.featuredItemImg}>
                    {mainImg ? (
                      <img src={mainImg} alt={product.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span>DRIP</span>
                    )}
                  </div>
                  <div className={styles.featuredItemInfo}>
                    <h4>{product.title}</h4>
                    <p className={styles.featuredItemPrice}>${product.price.toLocaleString()}</p>
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
