import mongoose, { Model, Schema } from 'mongoose';

interface UserMethods {
  verifyPassword: (password: string) => Promise<boolean>;
  setPassword: (password: string) => Promise<UserType>;
}

type UserModel = Model<UserType, {}, UserMethods>;

export interface UserType {
  _id: string;
  username?: string;
  email: string;
  password: string;
}

const userSchema = new Schema<UserType, UserModel, UserMethods>({
  username: {
    type: String,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
});

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await Bun.password.hash(this.password);
  }
  next();
});

userSchema.method('verifyPassword', async function (password: string) {
  return await Bun.password.verify(password, this.password);
});

userSchema.method('setPassword', async function (password: string) {
  this.password = await Bun.password.hash(password);
  return this;
});

const User = mongoose.model('User', userSchema);

export default User;
