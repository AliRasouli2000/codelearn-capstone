import mongoose from "mongoose";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema= new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        unique: true,
        minlength: [11, "Username must be at least 11 characters"]
    },
    email: {
        type: String,
        required: [true, "please provide a email"],
        unique: true,
        match: [EMAIL_REGEX, "Please provide a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [11, "Password must be at least 11 characters"]
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    quizScores: {
        html: { type: Number, default: 0 },
        css: {type: Number, default: 0},
        js: {type: Number, default: 0}
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;