import { FilterQuery } from "mongoose";
import Session, { SessionDocumennt } from "../models/Session.model";

export const createSession = async (userId: string, userAgent: string) => {
	const session = await Session.create({ user: userId, userAgent });
	
	return session.toJSON();
}

export const findSessions = async (query: FilterQuery<SessionDocumennt>) => {
	return Session.find(query).lean();
}
