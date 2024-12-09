const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true , match: [/.+\@.+\..+/, 'Please fill a valid email address']},
  password: { type: String, required: true },
  resetPasswordToken: { type: String },
  resetPasswordExpires: { type: Date },
  role: { type: String, required: true, enum: ['admin', 'tech', ] },
});


// userSchema.pre('save', async function(next) {
//   // Only hash the password if it has been modified (or is new)
//   if (!this.isModified('password')) return next();

//   // Hash the password with a cost of 10
//   this.password = await bcrypt.hash(this.password, 10);
//   next();
// });


const User = mongoose.model('User', userSchema);
module.exports = User;
