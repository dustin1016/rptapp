import Semesters from './Pages/widgets/Semesters';
import React, {useEffect, useState, useRef} from 'react';
import { format } from 'date-fns';
import colleges from './data/college';
import SoaTable from './Pages/widgets/SoaTable';
const formatDate = (dateString) => {
    //returns 2024-01-01 as Jan. 1, 2024
    const timeOptions = { timeStyle: 'short', hour12: true};
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedString = new Date(dateString).toLocaleDateString('en-US', options);
    const dateTimeStr = new Date();
    const formattedTime = new Date(dateTimeStr).toLocaleTimeString('en-US', timeOptions);
    return formattedString + ' ' + formattedTime;
  };
const Soa = ({isHeadPc}) => {
    const [formattedDate, setFormattedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [termId, setTermId] = useState(null);
    const [termName, setTermName] = useState("");
    const [hasData, setHasData] = useState(false);
    const [isFetching, setIsFetching]= useState(false);
    const [clickCount, setClickCount] = useState(0);
    const printableRef = useRef(null);
    const [soaData, setSoaData] = useState([]);
    const [progressPercentage, setProgressPercentage] = useState(0);

    useEffect(()=>{
        document.title = 'Statement Of Accounts';
    }, [])

    const clearData = () => {
        setSoaData([]);
        setHasData(false);
        setProgressPercentage(0);
    }

    useEffect(()=>{
        

        // const confirmed = window.confirm(`Are you sure you want to change to ${colleges.find(college => college.collegeid === newCollegeId)?.collegeName}?`);
        if (termId && hasData){
            const confirmed = window.confirm(`Changing the semester will require you to re-generate the data, this will take a while. are you sure?`);

            if (confirmed) {
                clearData();
              } else {
                // Revert selection if not confirmed
                return;
              }
        }
    }, [termId])
    const generateData = async () => {
        clearData();
        setIsFetching(true);
      
            const eventSource = new EventSource(`/api/index.php/soa?termid=${termId}`); // Replace with your API endpoint
            eventSource.onmessage = (event) => {
                // const strChunk = JSON.stringify(event.data);
                const newChunk = JSON.parse(event.data);
                const record = newChunk.data;
              
              
                // setProgressPercentage(record.progress);
                // setStudProgress(record.name);
                // const accounts = record.accounts.map((item)=>({
                //   acctDate: item.regdate,
                //   balance: item.balance
                // }));
                // const studentRecord = {
                //   studentno: record.student_number,
                //   name: record.name,
                //   collegeid: parseInt(record.collegeid),
                //   accounts:accounts
                // };
      
              
                // const accounts = record.accounts;
               
                
                // console.log(newChunk);
                // Update the state to include the new chunk of data
                setProgressPercentage(record.progress);
                setSoaData((prevData) => [...prevData, record]);
           
              };
          
              eventSource.onerror = (error) => {
                
                console.log('Fetching has finished');
                // console.timeEnd();
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
    return(
        <>
            <div className='w-[90vw] h-screen'>

    
                <div className='flex flex-row w-full'>
                    <div className='h-screen w-64 p-2 border-r-2 border-r-blue-500 npr'>
                        <h1 className='text-xl mb-4 npr'>Statement Of Account</h1>
                        
                        <Semesters setTermId={setTermId} setTermName={setTermName} isFetching={isFetching} />

                        
                        <button className={`bg-transparent
                                    hover:bg-blue-500 mt-4 w-full
                                    text-blue-700 font-semibold 
                                    hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded npr
                                    ${isFetching ? 'cursor-not-allowed flex items-center justify-center' : 'cursor-pointer'}`}
                                    onClick={()=>generateData()}
                                    disabled={isFetching}
                                    >
                                    {isFetching ? 
                                    <>
                                    <span>Generating</span>
                                        <div role="status">
                                        <svg aria-hidden="true" className="ml-2 inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-gray-600 dark:fill-gray-300" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                                </>
                                    :
                                    'Generate'
                                    }
                        </button>
                        {isFetching && <p className={`text-md font-medium text-center ${progressPercentage === 100 && 'text-green-600' }`}>Fetching Progress: {progressPercentage}%</p>}
                    </div>
                    {/* End Contextual SideMenu */}
                    

                    {/* Begin Main Content Section */}
                    <div className='flex-grow h-screen p-3 overflow-y-scroll'>
                    {hasData &&
                    <>
                    </>
                        }

                    <div >
                    {hasData &&
                    <>
                      

                        <SoaTable data={soaData} isHeadPc={isHeadPc} termName={termName} termId={termId} />      
                    </>
                    }
                    </div>
                    </div>       
                </div>

                    {/* END FLEX ROW */}
                </div>
        </>
    )
}

export default  Soa;