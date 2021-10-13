import { Schema, Document, model } from "mongoose";

import { UserDocument } from "./User.model";

export interface SessionDocumennt extends Document {
	user: UserDocument['_id'];
	valid: boolean;
	userAgent: string;
	createdAt: Date;
	updatedAt: Date;
}

const SessionSchema = new Schema<SessionDocumennt>({
  user: { type: Schema.Types.ObjectId, ref: 'User'},
	valid: { type: Boolean, default: true },
	userAgent: { type: String }
}, {
	timestamps: true
});

const Session = model<SessionDocumennt>('Session', SessionSchema);

export default Session;
