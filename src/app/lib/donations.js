const BACKEND = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:3001';

/**
 * Create a donation record
 * @param {Object} donationData - { appointment_id, volume_ml, blood_type, bag_id?, observations? }
 * @returns {Promise<Object>}
 */
export const createDonation = async (donationData) => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No estás autenticado. Por favor, inicia sesión.');
    }

    const response = await fetch(`${BACKEND}/api/donations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(donationData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al registrar la donación');
    }

    return data;
  } catch (error) {
    console.error('Create donation error:', error);
    throw error;
  }
};

/**
 * Get appointments pending donation registration (already evaluated and eligible)
 * (Puedes crear este endpoint en el backend si no existe)
 * @returns {Promise<Array>}
 */
export const getPendingDonations = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No estás autenticado. Por favor, inicia sesión.');
    }

    const response = await fetch(`${BACKEND}/api/appointments/pending-donations`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener donaciones pendientes');
    }

    return data;
  } catch (error) {
    console.error('Get pending donations error:', error);
    throw error;
  }
};