import express from 'express';
import dotenv from 'dotenv';
import { poolPromise } from './config/database.js';
import authRoutes from './routes/auth.routes.js';
import campaignRoutes from './routes/campaign.routes.js';
import appointmentRoutes from './routes/appointment.routes.js';

dotenv.config();
const app = express();

// Global middlewares
app.use(express.json()); // Allows to read JSON in requests

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/appointments', appointmentRoutes);

// Health check (to test server)
app.get('/api/health', async (req, res) => {
  try {
    await poolPromise; // BD connection test
    res.status(200).json({status: 'OK', db: 'connected'});
  } catch (error) {
    res.status(500).json({status: 'ERROR', db: 'disconnected'});
  }
});

export default app;