
import React, { useState, useEffect } from 'react';

const DataComponent = () => {
  const [studentData, setStudentData] = useState([]);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch('/api/index.php/fetchStudentDataChunks?x=1287');
          const reader = response.body.getReader();
          let result = '';
          let parsedData = null;
          while (true) {
              const { done, value } = await reader.read();
  
              if (done) {
                  // Fetching process is completed
                  setLoading(false);
                  break;
              }
  
              const chunk = new TextDecoder('utf-8').decode(value);
              result += chunk; // Accumulate chunks into a single string
            
              try {
                const lastValidJSONIndex = result.lastIndexOf('}');
                const previousLastValidJSONIndex = result.lastIndexOf('}', lastValidJSONIndex - 1);

                if (previousLastValidJSONIndex !== -1) {
                    const validJSONChunk = result.substring(previousLastValidJSONIndex + 1, lastValidJSONIndex + 1);

                    parsedData = JSON.parse(validJSONChunk);
                    result = result.substring(0, previousLastValidJSONIndex + 1);

                    // Process parsedData as needed (progress updates or final data)
                    const pct = ((parsedData.current/parsedData.total)*100).toFixed(2);
                    setProgressPercentage(pct);
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
