import React, {useEffect, useState} from 'react';
import ArTable from './widgets/ArTable';
import DataComponent from './widgets/DataComponent';
import Datepicker from './widgets/DatePicker';
import { format } from 'date-fns';
import { json } from 'react-router-dom';
const AccountsReceivable = () => {
  const [hasData, setHasData] = useState(false);
  const [isFetching, setIsFetching]= useState(false);
  const [studentData, setStudentData] = useState([]);
  const [formattedDate, setFormattedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [showDiv, setShowDiv] = useState(false);
    useEffect(() => {
        document.title = 'Accounts Receivable';
      }, []);

      useEffect(() => {
        if (isFetching){
          setShowDiv(true);
        } else {
          setShowDiv(false);
        }
      }, [isFetching]);

      // useEffect(() => {
      //   console.log(studentData);
      // }, [studentData]);
      //css of progress bar
      const progressCss = {
        width: `${progressPercentage}%`,
        border: '2px solid transparent', // Initially, set a transparent border
        borderRadius: '5px', // Adjust as needed
        animation:  'pulse 2s infinite',
        
      };

      const opacCss = {
        opacity: showDiv ? 1 : 0, // Set opacity based on showDiv state
        transition: 'opacity 1.5s ease-in-out', // Apply transition on opacity property // Use the variable within the style object
      }

      //fetch function
    //   const fetchData = async () => {
    //     setIsFetching(true);
    //     try {
    //         const url = 'http://10.125.0.222:8080/rptapi/index.php/fetchStudentDataChunks';
    //         const params = { formattedDate: formattedDate }; // Parameters to be passed
            
    //         const response = await fetch(url, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(params) // Convert parameters to JSON string
    //         });
    
    //         const reader = response.body.getReader();
    //         let result = '';
    //         let parsedData = null;
    
    //         while (true) {
    //             const { done, value } = await reader.read();
    
    //             if (done) {
    //                 // Fetching process is completed
                  
    //                 setIsFetching(false)
    //                 try {
    //                   parsedData = JSON.parse(result);
    //                   setStudentData(parsedData);
    //                   console.log(studentData)
    //               } catch (error) {
    //                   console.error('Error parsing JSON:', error);
    //               }
  
    //               break;
    //             }
    
    //             const chunk = new TextDecoder('utf-8').decode(value);
    //             // result += chunk; // Accumulate chunks into a single string
    //             const jsonString = JSON.stringify(chunk);
    //             const jsonData = JSON.parse(jsonString);
    //             // const finalJson = JSON.parse(jsonData);
    //             console.log(jsonData);
    //             try {

    //                   // Process parsedData as needed (progress updates or final data)
    //                   // const pct = jsonData.progress;
    //                   // setProgressPercentage(pct);
    //                 // const lastValidJSONIndex = result.lastIndexOf('}');
    //                 // const previousLastValidJSONIndex = result.lastIndexOf('}', lastValidJSONIndex - 1);
    
    //                 // if (previousLastValidJSONIndex !== -1) {
    //                 //     const validJSONChunk = result.substring(previousLastValidJSONIndex + 1, lastValidJSONIndex + 1);
    
    //                 //     parsedData = JSON.parse(validJSONChunk);
    //                 //     result = result.substring(0, previousLastValidJSONIndex + 1);
    
                    
    //                 // }
    //             } catch (error) {
    //                 console.error('Error parsing JSON:', error);
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //         setIsFetching(false);
    //     }
    // };


      const fetchData = async () => {
        setIsFetching(true);
        const eventSource = new EventSource(`http://10.125.0.222:8080/rptapi/index.php/accountsReceivable?formattedDate=${formattedDate}`);

        eventSource.onmessage = (event) => {
          // const strChunk = JSON.stringify(event.data);
          const newChunk = JSON.parse(event.data);
          const record = newChunk.data;

          setProgressPercentage(record.progress);
          const accounts = record.accounts.map((item)=>({
            acctDate: item.regdate,
            balance: item.balance
          }));
          const studentRecord = {
            studentno: record.student_number,
            name: record.name,
            collegeid: parseInt(record.collegeid),
            accounts:accounts
          };

        
          // const accounts = record.accounts;
          console.log(studentRecord);
          
          // console.log(newChunk);
          // Update the state to include the new chunk of data
          setStudentData((prevData) => [...prevData, studentRecord]);
     
        };
    
        eventSource.onerror = (error) => {
          console.error('EventSource failed:', error);
          setIsFetching(false);
          eventSource.close(); // Close the connection in case of an error
        };
    
        // Cleanup when the component unmounts
        return () => {
          eventSource.close();
          setIsFetching(false);
        };
      };
  

    

  return (
   
    <div className='w-[90vw] h-screen'>
      <div className='flex flex-row w-96'>
        <div className='flex-auto h-screen w-64 p-2 border-r-2 border-r-blue-500'>
          <h1 className='text-2xl mb-4'>Accounts Receivable</h1>
          <Datepicker setFormattedDate={setFormattedDate} />
          <button className={`bg-transparent
           hover:bg-blue-500 mt-4 w-3/4
            text-blue-700 font-semibold
             hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded
             ${isFetching ? 'cursor-not-allowed' : 'cursor-pointer'}`}
             onClick={()=>fetchData()}
             disabled={isFetching}
             >
            Generate
          </button>
          {showDiv && (
            <div className='my-4 flex flex-col items-center justify-center' style={opacCss}>
            <div className="w-full bg-gray-200 rounded-full h-2.5 my-2 dark:bg-gray-700">
              <div className="bg-blue-600 h-2.5 rounded-full dark:bg-blue-500" style={progressCss}></div>
            </div>
            <p className='text-center text-lg'>Progress of Data Fetching: {progressPercentage}%</p>
          </div>
          )}
        </div>
        <div className='flex-1  p-2'>
        {/* <DataComponent /> */}
          {hasData && <ArTable />}
        </div>
      </div>
    </div>
  
  );
};

export default AccountsReceivable;