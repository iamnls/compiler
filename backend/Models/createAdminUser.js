const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Path to your User model

const createAdminUser = async () => {
  try {
    // Connect to your MongoDB database
    await mongoose.connect('mongodb://localhost:27017/fiddle', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Check if the admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@gmail.com' });
    if (existingAdmin) {
      console.log('Admin user already exists.');
      return;
    }

    // Create a new admin user
    const adminUser = new User({
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('admin123', 10), // Hashing the password
      role: 'admin',
    });

    // Save the admin user to the database
    await adminUser.save();
    console.log('Admin user created successfully!');
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

createAdminUser();
