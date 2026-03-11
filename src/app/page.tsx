import styles from './page.module.css';
import Link from 'next/link';

export default function Home() {
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
        <div className={styles.featuredGrid}>
          {/* We will fetch featured products from DB later */}
          <div className={styles.placeholderCard}>
            <p>Productos destacados próximamente</p>
          </div>
        </div>
      </section>
    </div>
  );
}
