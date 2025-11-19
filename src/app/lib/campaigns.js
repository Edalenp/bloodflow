const BACKEND = process.env.NEXT_PUBLIC_BACKEND || 'http://localhost:3001';

/**
 * Get all published campaigns
 * @returns {Promise<Array>}
 */
export const getAllCampaigns = async () => {
  try {
    const response = await fetch(`${BACKEND}/api/campaigns`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener campañas');
    }

    return data;
  } catch (error) {
    console.error('Get campaigns error:', error);
    throw error;
  }
};

/**
 * Get campaign by ID
 * @param {string} campaignId
 * @returns {Promise<Object>}
 */
export const getCampaignById = async (campaignId) => {
  try {
    const response = await fetch(`${BACKEND}/api/campaigns/${campaignId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Error al obtener la campaña');
    }

    return data;
  } catch (error) {
    console.error('Get campaign by ID error:', error);
    throw error;
  }
};