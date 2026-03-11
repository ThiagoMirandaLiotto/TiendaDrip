import styles from './page.module.css';
import Link from 'next/link';

export default function ProductPage({ params }: { params: { id: string } }) {
  // Mock Data for now
  const product = {
    id: params.id,
    title: 'Premium Drip Item',
    category: 'remeras',
    price: 35000,
    images: []
  };

  return (
    <div className={styles.container}>
      <div className={styles.productLayout}>
        <div className={styles.gallery}>
          <div className={styles.mainImage}>
             <div className={styles.placeholderImg}>DRIP</div>
          </div>
        </div>

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
            <p>Prenda exclusiva de alta calidad con calce perfecto. Diseñada para destacar con un estilo único y moderno.</p>
          </div>
        </div>
      </div>

      <section className={styles.featuredSection}>
        <h2 className={styles.sectionTitle}>Productos Destacados</h2>
        <div className={styles.featuredGrid}>
          {[1, 2, 3, 4].map((id) => (
             <Link href={`/producto/${id}`} key={id} className={styles.featuredCard}>
                <div className={styles.featuredImg}>DRIP</div>
                <div className={styles.featuredInfo}>
                  <h4>Destacado {id}</h4>
                  <p>$25.000</p>
                </div>
             </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
