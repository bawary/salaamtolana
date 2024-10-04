const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/yourdbname', { useNewUrlParser: true, useUnifiedTopology: true });

const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', UserSchema);

const seedAdmin = async () => {
    const hashedPassword = bcrypt.hashSync('105259', 8);
    const admin = new User({ username: 'salaamtolana', password: hashedPassword });
    await admin.save();
    console.log('Admin user seeded');
    mongoose.connection.close();
};

seedAdmin();
