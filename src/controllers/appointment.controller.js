import { poolPromise } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';
import sql from 'mssql'; 

/**
 * POST /api/appointments
 * Crea una cita de donación
 * Body esperado:
 * {
 *   "donor_id": "...",
 *   "campaign_id": "...",
 *   "slot_datetime": "2025-11-10T09:30:00"
 * }
 */

export const createAppointment = async (req, res) => {
  const { donor_id, campaign_id, slot_datetime } = req.body;

  if (!donor_id || !campaign_id || !slot_datetime)
    return res.status(400).json({ message: 'Missing required fields' });

  try {
    const pool = await poolPromise;
    const newId = uuidv4();

    await pool.request()
      .input('id', sql.UniqueIdentifier, newId)
      .input('donor_id', sql.UniqueIdentifier, donor_id)
      .input('campaign_id', sql.UniqueIdentifier, campaign_id)
      .input('slot_datetime', sql.DateTime2, slot_datetime)
      .query(`
        INSERT INTO appointments (id, donor_id, campaign_id, slot_datetime, status)
        VALUES (@id, @donor_id, @campaign_id, @slot_datetime, 'scheduled')
      `);

    return res.status(201).json({
      message: 'Appointment created successfully',
      appointment_id: newId
    });
  } catch (err) {
    console.error('Error creating appointment:', err);
    return res.status(500).json({ message: 'Error creating appointment' });
  }
};