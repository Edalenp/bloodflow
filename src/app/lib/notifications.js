const BACKEND = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:3001';

/**
 * Send a notification to a user
 * @param {Object} notificationData - { user_id, type, subject, body }
 * @returns {Promise<Object>}
 */
export const sendNotification = async (notificationData) => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      throw new Error('No estás autenticado. Por favor, inicia sesión.');
    }

    const response = await fetch(`${BACKEND}/api/notifications/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify(notificationData),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al enviar la notificación');
    }

    return data;
  } catch (error) {
    console.error('Send notification error:', error);
    throw error;
  }
};