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

CodeLearn is an interactive full-stack educational platform designed to help beginner developers learn HTML, CSS, and JavaScript through structured lessons, quizzes, flashcards, coding challenges, and gamified learning experiences.

The platform aims to provide an engaging and beginner-friendly learning environment where users can build foundational web development skills while tracking their quiz performance over time.

---

## Tech Stack

### Frontend

- Next.js
- React
- CSS
- Responsive Design Techniques

### Backend

- Node.js
- Next.js API Routes / Route Handlers

### Database

- MongoDB
- Mongoose

### Authentication & Security

- bcrypt for password hashing
- JWT or session-based authentication

### Deployment

- Vercel
- MongoDB Atlas

---

## Focus of the Project

This project will be an evenly focused full-stack application.

The frontend will focus on creating an engaging and responsive learning experience through reusable React components and interactive UI design. The backend will focus on authentication, API development, database management, and persistent quiz score tracking.

The goal is to demonstrate both frontend and backend development skills within a modern full-stack application.

---

## Project Type

This project will be a browser-based web application accessible on desktop, tablet, and mobile devices.

---

## Project Goal

The goal of CodeLearn is to provide an interactive and beginner-friendly platform for learning web development fundamentals.

Users will be able to:

- Create accounts
- Log in securely
- Access structured course content
- Review flashcards
- Complete quizzes
- Save quiz scores
- View their progress
- Participate in interactive coding mini-games

The project is intended to combine educational content with interactive learning tools to improve engagement and retention.

---

## User Demographic

The primary users of the platform will include:

### Beginner Developers

Users who are learning HTML, CSS, and JavaScript for the first time.

### Self-Taught Learners

Individuals seeking a structured and interactive way to practice frontend development skills.

### Students

Users looking for additional educational resources and coding practice outside of traditional coursework.

---

## Data and API

### Data

The application will use educational content related to HTML, CSS, and JavaScript, including:

- Course information
- Introductory course text
- Video information
- Flashcard references
- Quiz questions
- User quiz scores

### User Data

The application will store:

- Username
- Email
- Hashed password
- Quiz scores for each course

### Data Collection

The project will primarily use a custom-built database populated with original course content rather than relying heavily on external APIs. This provides greater flexibility and control over the educational material.

### API

The backend API will handle:

- User registration
- User login
- Course retrieval
- Quiz submission
- Quiz score saving
- Progress page data retrieval

---

## Project Approach

## Database Schema

### Users

The Users collection will store account information for registered users. This is needed for sign up, login, and connecting saved quiz progress to each user.

Fields may include:

- username
- email
- hashed password

### Courses

The Courses collection will store the main content for each course, such as HTML, CSS, and JavaScript.

Fields may include:

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

There will likely be three course documents: one for HTML, one for CSS, and one for JavaScript.

### Progress

The Progress collection will store each user’s quiz scores and learning progress.

Fields may include:

- userId
- quizScores
  - html
  - css
  - javascript

This keeps the progress design simple because each user only needs one progress document, and the progress page can fetch all quiz scores from that single document.

---

## Potential API Issues

Some possible challenges include:

- Maintaining consistent course data for HTML, CSS, and JavaScript
- Validating user input during sign up, login, and quiz submission
- Handling failed requests and database errors gracefully
- Making sure quiz scores are saved to the correct user account
- Keeping authentication secure across protected routes

---

## Sensitive Information

The application will need to securely manage:

- User passwords
- Authentication tokens or sessions
- Environment variables containing database credentials and secret keys

Passwords will be hashed before storage, and sensitive configuration values will be stored using environment variables.

---

## Functionality

The application will include:

- User registration and login
- Secure authentication
- Course browsing
- Course video viewing
- Flashcards
- Quiz system
- Saved quiz scores
- Progress page
- Interactive coding mini-games
- Responsive design across devices

---

## User Flow

1. Users arrive at the homepage
2. Users create an account or log in
3. Users browse available courses
4. Users select HTML, CSS, or JavaScript
5. Users watch the course video
6. Users review flashcards
7. Users complete the quiz
8. The quiz score is saved to their account
9. Users view their saved scores on the progress page
10. Users can return later and continue using the platform

---

## Features Beyond CRUD

The project goes beyond a standard CRUD application through:

- Gamified learning features
- Interactive mini-games
- Flashcard learning sections
- Dynamic quizzes
- Saved quiz score tracking
- Responsive educational UI
- Authentication and protected routes

---

## Stretch Goals

Potential stretch goals include:

- Admin dashboard for managing course content
- Profile customization
- Achievement badges
- Progress analytics and charts
- Bookmarking system
- Search and filtering functionality
- Additional courses beyond HTML, CSS, and JavaScript
