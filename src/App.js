import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [subjects, setSubjects] = useState([]);
  const [newSubjectName, setNewSubjectName] = useState("");
  const [newSubjectHours, setNewSubjectHours] = useState(0);

  useEffect(() => {
    const storedSubjects = JSON.parse(localStorage.getItem("subjects"));
    if (storedSubjects) {
      setSubjects(storedSubjects);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("subjects", JSON.stringify(subjects));
  }, [subjects]);

  const addSubject = () => {
    const newSubject = {
      name: newSubjectName,
      hours: newSubjectHours,
    };
    setSubjects([...subjects, newSubject]);
    setNewSubjectName("");
    setNewSubjectHours(0);
  };

  const handleIncreaseHours = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].hours += 1;
    setSubjects(updatedSubjects);
  };

  const handleDecreaseHours = (index) => {
    const updatedSubjects = [...subjects];
    if (updatedSubjects[index].hours > 0) {
      updatedSubjects[index].hours -= 1;
      setSubjects(updatedSubjects);
    }
  };

  const isFormValid = () => {
    return newSubjectName.trim() !== "" && newSubjectHours > 0;
  };

  return (
    <div className="container">
      <h1>Education Planner</h1>
      <div className="add-subject">
        <input
          type="text"
          placeholder="Enter subject name"
          value={newSubjectName}
          onChange={(event) => setNewSubjectName(event.target.value)}
        />
        <input
          type="number"
          placeholder="Enter study hours"
          value={newSubjectHours}
          onChange={(event) => setNewSubjectHours(parseInt(event.target.value))}
        />
        <button
          className="add-button"
          onClick={addSubject}
          disabled={!isFormValid()}
        >
          Add Subject
        </button>
      </div>
      {subjects.map((subject, index) => (
        <div key={index} className="subject">
          <span>{subject.name}</span>
          <div className="hours">
            <button onClick={() => handleDecreaseHours(index)}>-</button>
            <span>{subject.hours}</span>
            <button onClick={() => handleIncreaseHours(index)}>+</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
