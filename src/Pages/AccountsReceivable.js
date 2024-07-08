import React, {useEffect, useState} from 'react';
import ArTable from './widgets/ArTable';

import Datepicker from './widgets/DatePicker';
import { format } from 'date-fns';

// import LoadingIcons from 'react-loading-icons'
const AccountsReceivable = ({isHeadPc}) => {
  const [hasData, setHasData] = useState(false);
  const [isFetching, setIsFetching]= useState(false);
  const [studentData, setStudentData] = useState([]);
  const [formattedDate, setFormattedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [showDiv, setShowDiv] = useState(false);
  const [studProgress, setStudProgress] = useState('');
  const [isDetailed, setIsDetailed] = useState(true);
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

   


      const fetchData = async () => {
     
        setHasData(false);
        setStudentData([]);
        setIsFetching(true);
        setProgressPercentage(0);
        console.time();
        const eventSource = new EventSource(`http://10.125.2.222:8080/rptapi/index.php/accountsReceivable?formattedDate=${formattedDate}`);

        eventSource.onmessage = (event) => {
          // const strChunk = JSON.stringify(event.data);
          const newChunk = JSON.parse(event.data);
          const record = newChunk.data;
       
          setProgressPercentage(record.progress);
          setStudProgress(record.name);
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
         
          
          // console.log(newChunk);
          // Update the state to include the new chunk of data
          setStudentData((prevData) => [...prevData, studentRecord]);
     
        };
    
        eventSource.onerror = (error) => {
          
          console.log('Fetching has finished');
          console.timeEnd();
          setIsFetching(false);
          eventSource.close(); // Close the connection in case of an error
          setHasData(true);
        };
    
        // Cleanup when the component unmounts
        return () => {
          eventSource.close();
          setIsFetching(false);
          setHasData(true);
        };
      };
  
      const handleToggleChange = () => {
        // Toggle the value of isDetailed
        setIsDetailed(!isDetailed);
      };
    const ToggleView =()=> {
      return (
        <div className='flex flex-col items-center justify-center mt-10'>
          <p className='text-base'>Choose View Type</p>
          <label className="relative inline-flex items-center cursor-pointer mt-6">
            <input type="checkbox"
             className="sr-only peer" 
             onChange={handleToggleChange}
             checked={isDetailed} />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
        <span className="ms-3 text-base font-medium text-black">{isDetailed ? 'Detailed' : 'Summary'}</span>
        </label>
        </div>
      )
    }

  return (
   
    <div className='w-[90vw] h-screen'>
      <div className='flex flex-row w-full'>
          <div className='h-screen w-64 p-2 border-r-2 border-r-blue-500'>
            <h1 className='text-2xl mb-4'>Accounts Receivable</h1>
            <Datepicker setFormattedDate={setFormattedDate} label={"Select 'As Of' Date"} />
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
              <p className='text-center text-md mb-4'>Progress of Data Fetching: {progressPercentage}%</p>
              <p className='text-center text-sm'>Retrieving records of {studProgress}</p>
            </div>
            )}

              <ToggleView />
          </div>
        <div className='flex-grow h-screen p-2 overflow-y-scroll'>
        {/* <DataComponent /> */}
          {hasData && <ArTable formattedDate={formattedDate} studentData={studentData} isDetailed={isDetailed} isHeadPc={isHeadPc}  />
       
        }
        
        </div>
      </div>
    </div>
  
  );
};

export default AccountsReceivable;