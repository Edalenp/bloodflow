const BACKEND = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:3001';

/**
 * Create a medical check for an appointment
 * @param {Object} checkData - { appointment_id, answers, vitals, apto, reason_not_apto }
 * @returns {Promise<Object>}
 */
export const createMedicalCheck = async (checkData) => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No estás autenticado. Por favor, inicia sesión.');
    }

    const response = await fetch(`${BACKEND}/api/medical_checks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(checkData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al crear la evaluación médica');
    }

    return data;
  } catch (error) {
    console.error('Create medical check error:', error);
    throw error;
  }
};

/**
 * Get appointments pending medical evaluation
 * (Puedes crear este endpoint en el backend si no existe)
 * @returns {Promise<Array>}
 */
export const getPendingMedicalChecks = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No estás autenticado. Por favor, inicia sesión.');
    }

    const response = await fetch(`${BACKEND}/api/appointments/pending-checks`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener citas pendientes');
    }

    return data;
  } catch (error) {
    console.error('Get pending checks error:', error);
    throw error;
  }
};