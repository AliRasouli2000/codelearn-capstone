import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    courseId: String,
    title: String,
    level: String,
    duration: String,
    tagline: String,
    description: String,
    outcomes: [String],
    project: String,
    coursePageName: String,
    heroTitle: String,
    heroSubtitile: String,
    intro: String,
    pageList: [String],
    video: {
        youtubeId: String,
        title: String
    },
    flashcards: {
        startIndex: Number,
        endIndex: Number
    },
    quizQuestions: [
        {
            question: String,
            optionA: String,
            optionB: String,
            optionC: String,
            optionD: String,
            correct: String
        }
    ]

});

const Course = mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;
