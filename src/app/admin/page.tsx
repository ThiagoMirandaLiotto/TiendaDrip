'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function AdminDashboard() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('remeras');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          price,
          images: JSON.stringify([imageUrl]),
          isFeatured
        })
      });
      if (res.ok) {
        alert('¡Producto agregado con éxito!');
        setTitle('');
        setPrice('');
        setImageUrl('');
      } else {
        alert('Error al agregar producto. Verifica la consola.');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión con la base de datos.');
    }
    setLoading(false);
  };

  return (
    <div className={styles.adminContainer}>
      <h1 className={styles.title}>Panel de Administración</h1>
      
      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Agregar Producto</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Título</label>
              <input value={title} onChange={(e)=>setTitle(e.target.value)} required placeholder="Ej: Remera Drip Essential" className={styles.input} />
            </div>
            <div className={styles.inputGroup}>
              <label>Categoría</label>
              <select value={category} onChange={(e)=>setCategory(e.target.value)} className={styles.input}>
                <option value="remeras">Remeras</option>
                <option value="pantalones">Pantalones</option>
                <option value="gorras">Gorras</option>
                <option value="conjuntos">Conjuntos</option>
              </select>
            </div>
            <div className={styles.inputGroup}>
              <label>Precio ($)</label>
              <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} required placeholder="Ej: 25000" className={styles.input} />
            </div>
            <div className={styles.inputGroup}>
              <label>URL de Imagen</label>
              <input value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} placeholder="https://ejemplo.com/imagen.jpg" className={styles.input} />
            </div>
            <div className={styles.checkboxGroup}>
              <input type="checkbox" id="featured" checked={isFeatured} onChange={(e)=>setIsFeatured(e.target.checked)} />
              <label htmlFor="featured">Destacar en la página de inicio</label>
            </div>
            <button type="submit" disabled={loading} className={styles.submitButton}>
              {loading ? 'Guardando...' : 'Guardar Producto'}
            </button>
          </form>
        </div>

        <div className={styles.card}>
          <h2>Productos Recientes</h2>
          <div className={styles.emptyState}>
            <p>Para ver y gestionar los productos, asegúrate de haber configurado tu base de datos MySQL en el archivo .env y haber ejecutado `npx prisma db push`.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
