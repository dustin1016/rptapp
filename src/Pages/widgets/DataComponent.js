
import React, { useState, useEffect } from 'react';

const DataComponent = () => {
  const [studentData, setStudentData] = useState([]);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.125.0.222:8080/rptapi/index.php/fetchStudentDataChunks');
        const reader = response.body.getReader();
        let result = '';

        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            // Fetching process is completed
            setLoading(false);
            break;
          }

          const chunk = new TextDecoder('utf-8').decode(value);

          try {
            const parsedData = JSON.parse(chunk);

            if (parsedData.pct !== undefined) {
              // Progress update received
              setProgressPercentage(parsedData.pct.progress_percentage);
            } else {
              // Student data received
              setStudentData((prevData) => [...prevData, parsedData.studentdata]);
            }
          } catch (error) {
            console.error('Error parsing JSON:', error);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Render loading indicator while fetching data
  if (loading) {
    return <div>Loading... Progress: {progressPercentage}%</div>;
  }

  // Rendering student data once fetched
  return (
    <div>
      <ul>
        {studentData.map((student, index) => (
          <li key={index}>
            Student Number: {student.student_number}, Name: {student.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataComponent;
