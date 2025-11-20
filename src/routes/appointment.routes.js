import express from 'express';
import { createAppointment, getMyAppointments, getPendingDonations } from '../controllers/appointment.controller.js';
import { requireAuth } from '../middlewares/auth.middleware.js';

const router = express.Router();

router.post('/', requireAuth(['donor']), createAppointment);
router.get('/me', requireAuth(['donor']), getMyAppointments)
router.get('/pending-donations', requireAuth(['medical_staff']), getPendingDonations);

export default router;