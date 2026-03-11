import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>DRIP.</div>
        <div className={styles.links}>
          <p>&copy; {new Date().getFullYear()} Drip Clothing. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
