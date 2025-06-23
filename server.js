
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const payrollRoutes = require('./backend/routes/routes.js');
const authRoutes = require('./backend/routes/auth.routes.js');
const leaveRoutes = require('./backend/routes/leaveRoutes.js');
const employeeRoutes = require('./backend/routes/employeeRoutes.js');
const notificationRoutes = require('./backend/routes/notifications.routes');

const app = express();
const port = 4002;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.set('debug', true);


app.use('/api', payrollRoutes);
app.use('/api', authRoutes);
app.use('/api/leaves', leaveRoutes);
app.use('/api/employees',employeeRoutes);
app.use('/api', notificationRoutes);


app.listen(port, async () => {
  console.log(`Server listening on port ${port}`);

  try {
    const conn = await mongoose.connect('mongodb+srv://jamie:jamie123@cluster0.tklpeg5.mongodb.net/payrollDb?retryWrites=true&w=majority&appName=Cluster0');
    console.log(`Connected to Payroll Services: ${conn.connection.host}`);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
});

