const BACKEND = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:3001';

/**
 * Get current blood inventory
 * @returns {Promise<Object>} { data: Array, last_updated: string }
 */
export const getInventory = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No estás autenticado. Por favor, inicia sesión.');
    }

    const response = await fetch(`${BACKEND}/api/inventory`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener el inventario');
    }

    return data;
  } catch (error) {
    console.error('Get inventory error:', error);
    throw error;
  }
};