'use client';

import Link from 'next/link';
import { useState } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          BASTI  PA.
        </Link>

        {/* Desktop links */}
        <div className={styles.navLinks}>
          <Link href="/categoria/remeras" className={styles.link}>Remeras</Link>
          <Link href="/categoria/pantalones" className={styles.link}>Pantalones</Link>
          <Link href="/categoria/gorras" className={styles.link}>Gorras</Link>
          <Link href="/categoria/conjuntos" className={styles.link}>Conjuntos</Link>
        </div>

        {/* Hamburger button */}
        <button
          className={`${styles.hamburger} ${isOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile drawer */}
      <div className={`${styles.mobileMenu} ${isOpen ? styles.mobileMenuOpen : ''}`}>
        <Link href="/categoria/remeras" className={styles.mobileLink} onClick={closeMenu}>Remeras</Link>
        <Link href="/categoria/pantalones" className={styles.mobileLink} onClick={closeMenu}>Pantalones</Link>
        <Link href="/categoria/gorras" className={styles.mobileLink} onClick={closeMenu}>Gorras</Link>
        <Link href="/categoria/conjuntos" className={styles.mobileLink} onClick={closeMenu}>Conjuntos</Link>
      </div>
    </nav>
  );
}
