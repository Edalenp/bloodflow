const BACKEND = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:3001';

/**
 * Create a new appointment
 * @param {Object} appointmentData - { donor_id, campaign_id, slot_datetime }
 * @returns {Promise<Object>}
 */
export const createAppointment = async (appointmentData) => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No estás autenticado. Por favor, inicia sesión.');
    }

    const response = await fetch(`${BACKEND}/api/appointments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(appointmentData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al crear la cita');
    }

    return data;
  } catch (error) {
    console.error('Create appointment error:', error);
    throw error;
  }
};

/**
 * Get my appointments (authenticated user)
 * @returns {Promise<Object>} { data: Array }
 */
export const getMyAppointments = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No estás autenticado. Por favor, inicia sesión.');
    }

    const response = await fetch(`${BACKEND}/api/appointments/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener tus citas');
    }

    return data;
  } catch (error) {
    console.error('Get my appointments error:', error);
    throw error;
  }
};