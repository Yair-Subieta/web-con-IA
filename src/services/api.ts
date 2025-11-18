// ============================================
// INTERFACES
// ============================================

interface FormData {
  nombre: string;
  correo: string;
  mensaje: string;
}

export interface Producto {
  id_producto?: number;
  nombre: string;
  descripcion: string;
  imagen: string;
  estado: string;
  precio: number;
}

// ============================================
// API DE CONTACTO
// ============================================

export const submitForm = async (formData: FormData) => {
  try {
    const response = await fetch('http://localhost:3000/api/save', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      throw new Error('Error al enviar el formulario');
    }

    return await response.json();
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};

// ============================================
// API DE PRODUCTOS
// ============================================

const API_URL = 'http://localhost:3000/api';

// Obtener todos los productos
export const obtenerProductos = async (): Promise<Producto[]> => {
  try {
    const response = await fetch(`${API_URL}/productos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener productos');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al obtener productos:', error);
    throw error;
  }
};

// Guardar un nuevo producto
export const guardarProducto = async (producto: Producto): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/productos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto)
    });

    if (!response.ok) {
      throw new Error('Error al guardar producto');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al guardar producto:', error);
    throw error;
  }
};

// Actualizar un producto existente
export const actualizarProducto = async (id: number, producto: Producto): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/productos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(producto)
    });

    if (!response.ok) {
      throw new Error('Error al actualizar producto');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al actualizar producto:', error);
    throw error;
  }
};

// Eliminar un producto
export const eliminarProducto = async (id: number): Promise<any> => {
  try {
    const response = await fetch(`${API_URL}/productos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (!response.ok) {
      throw new Error('Error al eliminar producto');
    }

    return await response.json();
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
};