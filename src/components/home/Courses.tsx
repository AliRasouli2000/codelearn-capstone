import CourseCard from './CourseCard';
import './HomePage.css';

const Courses = () => {
  return (
    <div>
      <section id="courses" className="courses">
        <h2>Our Courses</h2>
        <div className="course-grid">
            <CourseCard
              path="htmlCourse"
              title="HTML Basics"
              description="Learn how to build the structure of web pages using HTML."
            />
            <CourseCard
              path="cssCourse"
              title="CSS Fundamentals"
              description="Style your pages beautifully and make them responsive."
            />
            <CourseCard
              path="javaScriptCourse"
              title="JavaScript Essentials"
              description="Make your websites interactive and dynamic."
            />
        </div>
      </section>
    </div>
  );
};

export default Courses;
