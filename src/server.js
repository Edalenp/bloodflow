import express from 'express';
import dotenv from 'dotenv';
import { poolPromise } from './config/database.js';
import authRoutes from './routes/auth.routes.js';
import campaignRoutes from './routes/campaign.routes.js';
import appointmentRoutes from './routes/appointment.routes.js';

dotenv.config();
const app = express();
app.use(express.json());

// routes (still empty, but already plug-and-play)

app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/appointments', appointmentRoutes);

// test DB connection on start

poolPromise
    .then(() => console.log('DB pool connected'))
    .catch(err => console.error('DB pool error', err));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));