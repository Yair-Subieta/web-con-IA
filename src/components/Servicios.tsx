import React, { useEffect, useState } from 'react';
import { obtenerProductos } from '../services/ApiServicio';
import './Servicios.css';

interface Producto {
  id_producto?: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  estado: string;
  precio: number;
}

const Servicios: React.FC = () => {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [cargando, setCargando] = useState(true);

  // Servicios estáticos de la veterinaria (respaldo)
  const serviciosEstaticos: Producto[] = [
    {
      id_producto: 1,
      nombre: 'Consulta Veterinaria',
      descripcion: 'Atención médica profesional para tu mascota. Diagnóstico, revisión general y recomendaciones de salud.',
      imagen: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=500&h=300&fit=crop',
      estado: 'A',
      precio: 80
    },
    {
      id_producto: 2,
      nombre: 'Vacunación',
      descripcion: 'Plan completo de vacunación para proteger a tu mascota de enfermedades. Incluye vacunas antirrábicas y más.',
      imagen: 'https://images.unsplash.com/photo-1581888227599-779811939961?w=500&h=300&fit=crop',
      estado: 'A',
      precio: 120
    },
    {
      id_producto: 3,
      nombre: 'Peluquería Canina',
      descripcion: 'Servicio de estética y cuidado para tu mascota. Baño, corte de pelo, limpieza de oídos y corte de uñas.',
      imagen: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&h=300&fit=crop',
      estado: 'A',
      precio: 100
    }
  ];

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      setCargando(true);
      const data = await obtenerProductos();
      
      // Si hay productos en la BD, usarlos. Si no, usar los estáticos
      if (data && data.length > 0) {
        setProductos(data);
        console.log(' Productos cargados desde la base de datos:', data.length);
      } else {
        setProductos(serviciosEstaticos);
        console.log(' No hay productos en la BD. Mostrando servicios estáticos');
      }
    } catch (error) {
      console.error(' Error al cargar productos:', error);
      // Si falla la conexión, mostrar servicios estáticos
      setProductos(serviciosEstaticos);
      console.log(' Error de conexión. Mostrando servicios estáticos');
    } finally {
      setCargando(false);
    }
  };

  if (cargando) {
    return (
      <div className="servicios-container">
        <div className="loading">
          <h2>Cargando servicios...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="servicios-container">
      <h1>Nuestros Servicios</h1>
      <div className="servicios-grid">
        {productos.map((producto) => (
          <div key={producto.id_producto} className="servicio-card">
            <img 
              src={producto.imagen} 
              alt={producto.nombre} 
              className="servicio-imagen"
            />
            <div className="servicio-info">
              <h3 className="servicio-titulo">{producto.nombre}</h3>
              <p className="servicio-descripcion">{producto.descripcion}</p>
              <div className="precio-estado">
                <span className="precio">Bs. {producto.precio}</span>
                <span className={`estado ${producto.estado === 'A' ? 'activo' : 'inactivo'}`}>
                  {producto.estado === 'A' ? 'Disponible' : 'No disponible'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Servicios;