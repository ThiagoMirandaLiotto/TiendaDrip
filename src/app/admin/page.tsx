'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  description: string;
  images: string;
  isFeatured: boolean;
}

export default function AdminDashboard() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  
  // Form state
  const [editingId, setEditingId] = useState<number | null>(null);
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('remeras');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrls, setImageUrls] = useState(['']); // Array of text inputs
  const [isFeatured, setIsFeatured] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setTitle('');
    setCategory('remeras');
    setPrice('');
    setDescription('');
    setImageUrls(['']);
    setIsFeatured(false);
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setTitle(product.title);
    setCategory(product.category);
    setPrice(product.price.toString());
    setDescription(product.description || '');
    setIsFeatured(product.isFeatured);
    
    try {
      const parsedImages = JSON.parse(product.images);
      if (Array.isArray(parsedImages) && parsedImages.length > 0) {
        // Add an empty string at the end so they can add more images easily
        setImageUrls([...parsedImages, '']);
      } else {
        setImageUrls(['']);
      }
    } catch (e) {
      setImageUrls(['']);
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('¿Estás seguro que deseas eliminar este producto? Esta acción no se puede deshacer.')) return;
    
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        alert('Producto eliminado exitosamente.');
        if (editingId === id) resetForm();
        fetchProducts();
      } else {
        alert('Error al eliminar producto.');
      }
    } catch (err) {
      console.error(err);
      alert('Error de conexión con la base de datos.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? `/api/products/${editingId}` : '/api/products';
    
    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          price,
          description,
          images: JSON.stringify(imageUrls.filter(url => url.trim() !== '')),
          isFeatured
        })
      });
      if (res.ok) {
        alert(editingId ? '¡Producto actualizado con éxito!' : '¡Producto agregado con éxito!');
        resetForm();
        fetchProducts();
      } else {
        alert('Error al guardar producto. Verifica la consola.');
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
          <h2>
            {editingId ? 'Editar Producto' : 'Agregar Producto'}
            {editingId && (
              <button type="button" onClick={resetForm} className={styles.cancelButton}>
                Cancelar Edición
              </button>
            )}
          </h2>
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
              <label>Descripción</label>
              <textarea 
                value={description} 
                onChange={(e)=>setDescription(e.target.value)} 
                required 
                placeholder="Ej: Prenda exclusiva..." 
                className={styles.input} 
                rows={4}
                style={{ resize: 'vertical' }}
              />
            </div>
            <div className={styles.inputGroup}>
              <label>URLs de Imágenes</label>
              <p style={{ fontSize: '0.8rem', color: '#888', marginTop: '-5px' }}>Podés agregar varias imágenes. Dejá vacío el último campo si no necesitás más.</p>
              {imageUrls.map((url, index) => (
                <div key={index} style={{ display: 'flex', gap: '10px' }}>
                  <input 
                    value={url} 
                    onChange={(e) => {
                      const newUrls = [...imageUrls];
                      newUrls[index] = e.target.value;
                      // Si editó el último y no está vacío, agrega un campo nuevo
                      if (index === newUrls.length - 1 && e.target.value.trim() !== '') {
                        newUrls.push('');
                      }
                      setImageUrls(newUrls);
                    }} 
                    placeholder="https://ejemplo.com/imagen.jpg" 
                    className={styles.input} 
                    style={{ flex: 1 }}
                  />
                  {index !== imageUrls.length - 1 && (
                    <button 
                      type="button" 
                      onClick={() => {
                        const newUrls = imageUrls.filter((_, i) => i !== index);
                        setImageUrls(newUrls);
                      }}
                      style={{ background: 'transparent', border: '1px solid #444', color: '#fff', borderRadius: '4px', padding: '0 10px', cursor: 'pointer' }}
                    >
                      X
                    </button>
                  )}
                </div>
              ))}
            </div>
            <div className={styles.checkboxGroup}>
              <input type="checkbox" id="featured" checked={isFeatured} onChange={(e)=>setIsFeatured(e.target.checked)} />
              <label htmlFor="featured">Destacar en la página de inicio</label>
            </div>
            <button type="submit" disabled={loading} className={styles.submitButton}>
              {loading ? 'Guardando...' : (editingId ? 'Actualizar Producto' : 'Guardar Producto')}
            </button>
          </form>
        </div>

        <div className={styles.card}>
          <h2>Productos Existentes ({products.length})</h2>
          {loadingProducts ? (
            <div className={styles.emptyState}>Cargando productos...</div>
          ) : products.length === 0 ? (
            <div className={styles.emptyState}>
              <p>Todavía no hay productos publicados.</p>
            </div>
          ) : (
            <div className={styles.productList}>
              {products.map(product => (
                <div key={product.id} className={styles.productItem}>
                  <div className={styles.productInfo}>
                    <span className={styles.productTitle}>
                      {product.title} {product.isFeatured && '★'}
                    </span>
                    <div className={styles.productMeta}>
                      <span style={{textTransform: 'capitalize'}}>{product.category}</span>
                      <span>${product.price.toLocaleString('es-AR')}</span>
                    </div>
                  </div>
                  <div className={styles.productActions}>
                    <button 
                      onClick={() => handleEdit(product)} 
                      className={styles.editButton}
                    >
                      Editar
                    </button>
                    <button 
                      onClick={() => handleDelete(product.id)} 
                      className={styles.deleteButton}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
