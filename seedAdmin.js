const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/yourdbname');

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
