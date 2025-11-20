const BACKEND = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:3001';

/**
 * Get appointments pending donation registration
 * @returns {Promise<Array>}
 */
export const getPendingDonations = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No estás autenticado. Por favor, inicia sesión.');
    }

    const url = `${BACKEND}/api/appointments/pending-donations`;
    console.log('🌐 Llamando a:', url); // DEBUG

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    console.log('📡 Status:', response.status); // DEBUG
    console.log('📡 Content-Type:', response.headers.get('content-type')); // DEBUG

    // Intenta leer como texto primero para ver qué devuelve
    const text = await response.text();
    console.log('📄 Respuesta raw:', text.substring(0, 200)); // DEBUG

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      console.error('❌ No es JSON válido');
      throw new Error('El servidor no devolvió JSON válido');
    }

    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener donaciones pendientes');
    }

    return data;
  } catch (error) {
    console.error('Get pending donations error:', error);
    throw error;
  }
};

/**
 * Create a donation record
 * @param {Object} donationData - { appointment_id, volume_ml, blood_type, observations }
 * @returns {Promise<Object>}
 */
export const createDonation = async (donationData) => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No estás autenticado. Por favor, inicia sesión.');
    }

    console.log('📤 Enviando donación:', donationData);

    const response = await fetch(`${BACKEND}/api/donations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(donationData),
    });

    const data = await response.json();
    
    console.log('📥 Respuesta del servidor:', {
      status: response.status,
      ok: response.ok,
      data
    });

    if (!response.ok) {
      throw new Error(data.message || 'Error al registrar la donación');
    }

    return data;
  } catch (error) {
    console.error('❌ Error completo:', error);
    throw error;
  }
};