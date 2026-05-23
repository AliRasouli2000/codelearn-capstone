# springboard-capstone

Full-stack capstone project for the Springboard Software Engineering Career Track.

## Potential Project Ideas

### 1. CodeLearn ⭐

CodeLearn is an interactive coding education platform where users can learn web development topics such as HTML, CSS, JavaScript, and React through lessons, quizzes, flashcards, coding challenges, and gamified learning experiences. Users will be able to create accounts, save progress, complete achievements, and participate in leaderboards.

This project aims to make coding education more interactive and beginner-friendly while helping users build practical programming skills in an engaging environment.

Potential APIs:
- Custom-built API for authentication, quizzes, flashcards, progress tracking, achievements, and leaderboard functionality

---

### 2. CineVerse ⭐

CineVerse is a movie and TV discovery platform where users can search for movies and television shows, create watchlists, save favorites, write reviews, rate content, and receive personalized recommendations. Users will also be able to follow other users and explore trending content.

This project aims to help users organize and discover entertainment content in a more social and personalized way.

Potential APIs:
- TMDB API
- OMDb API
- Watchmode API
- Custom-built API for user authentication, reviews, ratings, favorites, watchlists, comments, and social features

---

### 3. FitQuest

FitQuest is a fitness tracking and workout gamification platform where users can log workouts, build routines, track progress, complete challenges, and earn achievement badges. The application will also include social and progress tracking features.

This project aims to create a more engaging and motivating fitness experience while helping users organize and monitor their long-term fitness goals.

Potential APIs:
- ExerciseDB API
- WGER API
- Nutritionix API
- Custom-built API for authentication, workout logs, user progress tracking, achievements, challenges, and social functionality

## Preferred Project

My current preferred ideas are CodeLearn and CineVerse. If both projects are approved, I will make a final decision.




---
# Project Proposal: CodeLearn Full-Stack Web Development Education Platform

## Overview

CodeLearn is an interactive full-stack educational platform designed to help beginner developers learn HTML, CSS, and JavaScript through lessons, quizzes, flashcards, coding challenges, and gamified learning experiences.

The platform aims to create an engaging and beginner-friendly environment where users can practice web development concepts while tracking quiz performance and progress.

---

## Tech Stack

### Frontend
- Next.js
- React
- CSS

### Backend
- Node.js
- Next.js API Routes

### Database
- MongoDB
- Mongoose

### Authentication
- bcrypt
- JWT or session-based authentication

### Deployment
- Vercel
- MongoDB Atlas

---

## Focus of the Project

This project will be an evenly focused full-stack application. The frontend will focus on responsive UI design and interactive learning features, while the backend will focus on authentication, database management, APIs, and persistent quiz score tracking.

---

## Project Type

Browser-based web application accessible on desktop, tablet, and mobile devices.

---

## Project Goal

The goal of CodeLearn is to provide an interactive platform for learning web development fundamentals. Users will be able to create accounts, access course content, complete quizzes, review flashcards, save quiz scores, and track their progress.

---

## Users

The primary users will include:
- Beginner developers
- Self-taught learners
- Students practicing frontend development

---

## Data and API

The application will use custom-built course data related to HTML, CSS, and JavaScript, including videos, flashcards, quiz questions, and user quiz scores.

The backend API will handle:
- User authentication
- Course retrieval
- Quiz submission
- Quiz score saving
- Progress retrieval

---

## Database Schema

### Users
Stores registered account information.

Fields:
- username
- email
- hashed password

### Courses
Stores the main content for HTML, CSS, and JavaScript courses.

Fields:
- courseId
- title
- subtitle
- intro
- pageList
- video
  - youtubeId
  - title
- flashcards
  - startIndex
  - endIndex
- quizQuestions
  - question
  - optionA
  - optionB
  - optionC
  - optionD
  - correct

There will likely be three course documents: HTML, CSS, and JavaScript.

### Progress
Stores each user’s saved quiz scores.

Fields:
- userId
- quizScores
  - html
  - css
  - javascript

This keeps the progress system simple because each user only needs one progress document.

---

## Potential API Issues

Potential challenges include:
- Validating user input
- Handling failed requests gracefully
- Secure authentication handling
- Keeping quiz scores connected to the correct user

---

## Sensitive Information

Sensitive information will include:
- User passwords
- Authentication tokens
- Environment variables

Passwords will be hashed before storage.

---

## Functionality

The application will include:
- User registration and login
- Course browsing
- Video lessons
- Flashcards
- Quizzes
- Saved quiz scores
- Progress page
- Interactive coding mini-games
- Responsive UI

---

## User Flow

1. Users visit the homepage
2. Users create an account or log in
3. Users select a course
4. Users watch videos and review flashcards
5. Users complete quizzes
6. Quiz scores are saved to their account
7. Users view progress on the dashboard

---

## Features Beyond CRUD

The project goes beyond a standard CRUD application through:
- Gamified learning
- Interactive coding mini-games
- Flashcards
- Dynamic quizzes
- Persistent quiz score tracking
- Protected routes and authentication

---

## Stretch Goals

Potential stretch goals include:
- Achievement badges
- Admin dashboard
- Progress analytics
- Search/filter functionality
- Additional courses
