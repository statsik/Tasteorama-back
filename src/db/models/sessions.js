import mongoose, { model } from "mongoose";

const sessionsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    accessToken: {
        type: String,
        required: true
    },
    refreshToken: {
        type: String,
        required: true
    },
    accessTokenValidUntil: {
        type: Date, required: true
    },
    refreshTokenValidUntil: {
        type: Date, required: true
    },
});

export const SessionsCollection = model('sessions', sessionsSchema);
