
import { useState } from "react";
import "./App.css";

/* ================= JOB DATA ================= */

const jobsData = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "TechNova Solutions",
    location: "Mumbai",
    type: "Full Time",
    salary: "₹6 - 10 LPA",
    skills: "React, JavaScript, HTML, CSS",
    description:
      "Build responsive and interactive web applications using modern frontend technologies."
  },

  {
    id: 2,
    title: "Java Developer",
    company: "CodeCraft Technologies",
    location: "Pune",
    type: "Full Time",
    salary: "₹7 - 12 LPA",
    skills: "Java, Spring Boot, MySQL",
    description:
      "Develop scalable backend applications and REST APIs using Java and Spring Boot."
  },

  {
    id: 3,
    title: "Python Developer",
    company: "DataSphere",
    location: "Bangalore",
    type: "Full Time",
    salary: "₹6 - 11 LPA",
    skills: "Python, SQL, APIs",
    description:
      "Develop Python applications and work with databases and APIs."
  },

  {
    id: 4,
    title: "UI/UX Designer",
    company: "Creative Minds",
    location: "Mumbai",
    type: "Part Time",
    salary: "₹4 - 7 LPA",
    skills: "Figma, UI Design, UX Research",
    description:
      "Design user-friendly interfaces and create engaging digital experiences."
  },

  {
    id: 5,
    title: "Software Engineer",
    company: "Innovate Labs",
    location: "Delhi",
    type: "Full Time",
    salary: "₹8 - 14 LPA",
    skills: "Java, Python, SQL",
    description:
      "Work with the engineering team to develop and maintain software applications."
  },

  {
    id: 6,
    title: "Web Developer Intern",
    company: "WebWorks",
    location: "Mumbai",
    type: "Internship",
    salary: "₹15,000 / month",
    skills: "HTML, CSS, JavaScript",
    description:
      "Learn and contribute to real-world web development projects."
  }
];


/* ================= NAVBAR ================= */

function Navbar({ savedCount, onHome, onSaved }) {

  return (
    <nav className="navbar">

      <div className="logo">
        Job<span>Finder</span>
      </div>

      <div className="nav-links">

        <button onClick={onHome}>
          Home
        </button>

        <button onClick={onSaved}>
          Saved Jobs ❤️
          {savedCount > 0 && (
            <span className="count">
              {savedCount}
            </span>
          )}
        </button>

      </div>

    </nav>
  );
}


/* ================= JOB CARD ================= */

function JobCard({
  job,
  isSaved,
  onSave,
  onView
}) {

  return (

    <div className="job-card">

      <div className="company-logo">
        {job.company.charAt(0)}
      </div>

      <div className="job-info">

        <h3>
          {job.title}
        </h3>

        <p className="company">
          {job.company}
        </p>

        <p>
          📍 {job.location}
        </p>

        <p>
          💼 {job.type}
        </p>

        <p className="salary">
          💰 {job.salary}
        </p>

        <div className="skills">
          {job.skills.split(", ").map((skill) => (
            <span key={skill}>
              {skill}
            </span>
          ))}
        </div>

        <div className="job-buttons">

          <button
            className="view-btn"
            onClick={() => onView(job)}
          >
            View Details
          </button>

          <button
            className={`save-btn ${
              isSaved ? "saved" : ""
            }`}
            onClick={() => onSave(job.id)}
          >
            {isSaved ? "❤️ Saved" : "♡ Save"}
          </button>

        </div>

      </div>

    </div>
  );
}


/* ================= JOB DETAILS ================= */

function JobDetails({
  job,
  onBack,
  onApply
}) {

  return (

    <div className="details-container">

      <button
        className="back-btn"
        onClick={onBack}
      >
        ← Back to Jobs
      </button>

      <div className="details-card">

        <div className="details-logo">
          {job.company.charAt(0)}
        </div>

        <h1>
          {job.title}
        </h1>

        <h3>
          {job.company}
        </h3>

        <div className="details-info">

          <p>📍 {job.location}</p>

          <p>💼 {job.type}</p>

          <p>💰 {job.salary}</p>

        </div>

        <hr />

        <h2>
          Job Description
        </h2>

        <p>
          {job.description}
        </p>

        <h2>
          Required Skills
        </h2>

        <div className="skills">

          {job.skills.split(", ").map((skill) => (
            <span key={skill}>
              {skill}
            </span>
          ))}

        </div>

        <button
          className="apply-btn"
          onClick={() => onApply(job)}
        >
          Apply Now
        </button>

      </div>

    </div>
  );
}


/* ================= SEARCH ================= */

function SearchBar({
  search,
  setSearch,
  location,
  setLocation
}) {

  return (

    <div className="search-box">

      <input
        type="text"
        placeholder="Search job title or company..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      >

        <option value="">
          All Locations
        </option>

        <option value="Mumbai">
          Mumbai
        </option>

        <option value="Pune">
          Pune
        </option>

        <option value="Bangalore">
          Bangalore
        </option>

        <option value="Delhi">
          Delhi
        </option>

      </select>

    </div>
  );
}


/* ================= MAIN APP ================= */

function App() {

  const [jobs] = useState(jobsData);

  const [search, setSearch] = useState("");

  const [location, setLocation] = useState("");

  const [savedJobs, setSavedJobs] = useState([]);

  const [selectedJob, setSelectedJob] = useState(null);

  const [showSaved, setShowSaved] = useState(false);


  /* ================= SAVE JOB ================= */

  const toggleSave = (jobId) => {

    setSavedJobs((previous) => {

      if (previous.includes(jobId)) {

        return previous.filter(
          (id) => id !== jobId
        );

      }

      return [...previous, jobId];

    });

  };


  /* ================= FILTER JOBS ================= */

  const filteredJobs = jobs.filter((job) => {

    const searchMatch =
      job.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      job.company
        .toLowerCase()
        .includes(search.toLowerCase());

    const locationMatch =
      location === "" ||
      job.location === location;

    return searchMatch && locationMatch;
  });


  /* ================= SAVED JOBS ================= */

  const displayedJobs = showSaved
    ? jobs.filter((job) =>
        savedJobs.includes(job.id)
      )
    : filteredJobs;


  /* ================= JOB DETAILS VIEW ================= */

  if (selectedJob) {

    return (

      <>
        <Navbar
          savedCount={savedJobs.length}
          onHome={() => {
            setSelectedJob(null);
            setShowSaved(false);
          }}
          onSaved={() => {
            setSelectedJob(null);
            setShowSaved(true);
          }}
        />

        <JobDetails
          job={selectedJob}
          onBack={() => setSelectedJob(null)}
          onApply={(job) => {
            alert(
              `Application started for ${job.title}!`
            );
          }}
        />

      </>

    );
  }


  /* ================= MAIN VIEW ================= */

  return (

    <>

      <Navbar
        savedCount={savedJobs.length}
        onHome={() => setShowSaved(false)}
        onSaved={() => setShowSaved(true)}
      />


      <section className="hero">

        <div>

          <h1>
            Find Your
            <span> Dream Job</span>
          </h1>

          <p>
            Discover opportunities and take the next
            step in your career.
          </p>

        </div>

      </section>


      <main className="container">

        {!showSaved && (

          <SearchBar
            search={search}
            setSearch={setSearch}
            location={location}
            setLocation={setLocation}
          />

        )}


        <div className="section-heading">

          <h2>
            {showSaved
              ? "Your Saved Jobs"
              : "Latest Job Opportunities"}
          </h2>

          <p>
            {displayedJobs.length} jobs found
          </p>

        </div>


        {displayedJobs.length === 0 ? (

          <div className="no-jobs">

            <h3>
              No jobs found 😕
            </h3>

            <p>
              Try changing your search or location.
            </p>

          </div>

        ) : (

          <div className="jobs-grid">

            {displayedJobs.map((job) => (

              <JobCard
                key={job.id}
                job={job}
                isSaved={savedJobs.includes(job.id)}
                onSave={toggleSave}
                onView={setSelectedJob}
              />

            ))}

          </div>

        )}

      </main>


      <footer>

        <h3>
          JobFinder
        </h3>

        <p>
          Find opportunities. Build your future.
        </p>

        <p>
          © 2026 JobFinder
        </p>

      </footer>

    </>

  );
}

export default App;

