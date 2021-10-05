import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface UserDocument extends Document {
	email: string;
	username: string;
	password: string;
	createdAt: Date;
	updatedAt: Date;

	comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

UserSchema.pre('save', async function(next) {
	let user: UserDocument = this as UserDocument;

	// hash password ONLY if new or modified
	if (!user.isModified('password')) return next();

	const salt: string = await bcrypt.genSalt(10);
	const hashedPassword: string = await bcrypt.hash(user.password, salt);

	// substitute password with hashedPassword
	user.password = hashedPassword;

	return next();
});

UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean>{
	const user = this as UserDocument;

	return bcrypt.compare(candidatePassword, user.password).catch(err => false);
}

const User = model<UserDocument>("User", UserSchema);

export default User;
