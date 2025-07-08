import React, {useState, useEffect, useRef} from "react";
import Datepicker from "./widgets/DatePicker";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { FaFileExcel } from "react-icons/fa";
import { format } from 'date-fns';
const formatDate = (dateString) => {
    //returns 2024-01-01 as Jan. 1, 2024
    // const timeOptions = { timeStyle: 'short', hour12: true};
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedString = new Date(dateString).toLocaleDateString('en-US', options);
    // const dateTimeStr = new Date();
    // const formattedTime = new Date(dateTimeStr).toLocaleTimeString('en-US', timeOptions);
    return formattedString;
  };
const Rcd = ({isHeadPc}) => {
    const [formattedDate, setFormattedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [isFetching, setIsFetching]= useState(false);
    const [hasData, setHasData] = useState(false);
    const [nonParticulars, setNonParticulars] = useState([]);
    const [particulars, setParticulars] = useState([]);
    const [startOR, setStartOR] = useState('');
    const [endOR, setEndOR] = useState('');
    const printableRef = useRef(null);

    const resetData = () => {
      
      setHasData(false);
      setNonParticulars([]);
      setParticulars([]);
      setStartOR('');
      setEndOR('');
      
    }

     const getCollections = async () => {
      resetData();
      
        try {
         
            setIsFetching(true);
            const response = await fetch(`http://10.125.2.222:8080/rptApi/index.php/rcd?formattedDate=${formattedDate}`); // Replace with your API endpoint
            if (!response.ok) {
              setIsFetching(false);
              throw new Error('Network response was not ok.');
            }
            const result = await response.json();
            
            console.log(result)
            setNonParticulars(result.nonParticulars);
            setParticulars(result.nonParticulars);
            
            setStartOR(result.beginningOR);
            setEndOR(result.endingOR);
            setHasData(true)
            setIsFetching(false);
          } catch (error) {
            console.log('Error fetching data: ' + error.message); // Set error message to state
          }
    }



    const calcTotals =(arr)=>{

      const totalCollections = arr.reduce((total, acc) => total + parseFloat(acc.Amount), 0);
      return totalCollections;
    }


     const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        const printableContent = printableRef.current.innerHTML;
      
        if (printWindow) {
          printWindow.document.write(`<!DOCTYPE html><html><head><title>PSU ${formatDate(formattedDate)} Summary of Report of Collections and Deposits</title>`);
          printWindow.document.write('<link rel="stylesheet" href="/print-styles.css" type="text/css" />');
          printWindow.document.write('</head><body>');
          printWindow.document.write(printableContent);
          printWindow.document.write('<div class="w-full-flex mt-6">');
          printWindow.document.write('<div class="flex-col"');
          printWindow.document.write('<p class="text-xs mb-6 font-semibold ">Prepared By:</p>');
          printWindow.document.write('<p class="text-xs"><u>Angelica E. Cordero</u></p>');
          printWindow.document.write('<p class="text-xs">Cashier Staff</p>');
          printWindow.document.write('</div>');
          printWindow.document.write('<div class="flex-col"');
          printWindow.document.write('<p class="text-xs font-semibold">Certified Correct:</p>');
          printWindow.document.write('<p class="text-xs"><u>MARICHELLE N. BADON</u></p>');
          printWindow.document.write('<p class="text-xs">AOV/University Cashier</p>');
          printWindow.document.write('</div>');
          printWindow.document.write('</div>');
          printWindow.document.write('</body></html>');
          printWindow.document.close();
          setTimeout(() => {
            printWindow.print();
          }, 500);
        } else {
          console.error('Failed to open print window');
        }
      };


      return (
          <>
        
        <div>
            <div className='w-[90vw] h-screen'>
                <div className='flex flex-row w-full'>
                    <div className='h-screen w-64 p-2 border-r-2 border-r-blue-500 npr'>
                        <h1 className='text-xl mb-4 npr'>Summary of Collections and Deposits</h1>

                       

                         <Datepicker setFormattedDate={setFormattedDate} label={'Select Transaction Date'} />


                   
                        
                        
                        <button className={`bg-transparent
                        hover:bg-blue-500 mt-4 w-full
                        text-blue-700 font-semibold 
                        hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded npr
                        ${isFetching ? 'cursor-not-allowed flex items-center justify-center' : 'cursor-pointer'}`}
                        onClick={()=>getCollections()}
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
                        
                        
                       
                            
                        
                    

                    </div>

                    {/* content area */}
                    <div className='flex-grow h-screen  p-3 overflow-y-scroll' id='printable' ref={printableRef} >
                            
                            {hasData && 
                                    <>
                                    <div className='mb-6'>
                                    <p className='text-sm font-semibold'>Republic of the Philippines</p>
                                    <p className='text-sm font-semibold uppercase'>Palawan State University</p>
                                    <p className='text-sm font-semibold mb-6'>LBP Fund 164</p>
                                    <p className='text-sm font-semibold'>Summary of Report of Collection and Deposits</p>
                                    <p className='text-sm font-semibold'>Date: {formatDate(formattedDate)}</p>         
                                    </div>

                                {/* content here */}

                                       
                                    </>
                                    
                                    }

          
                    </div>
                      {/* PRINT BUTTONS */}
                      {hasData &&
              
              <div className='npr flex flex-col fixed top-5 right-4 h-4'>
            
            
                {isHeadPc &&  
                    <DownloadTableExcel
                        filename={`Daily Transaction Logs - ${formatDate(formattedDate)}`}
                        sheet="Transactions"
                        currentTableRef={printableRef.current}
                    >

                      <button className='bg-green-500 hover:bg-green-700 w-24 text-center text-white font-semibold py-2 px-4 rounded'>
                        <FaFileExcel className='text-6xl' />
                        <p className='text-xs'>Export Excel</p>
                      </button>

                    </DownloadTableExcel>
                    }

                </div>
                }
                </div>
            </div>
        </div>
    </>

      )
}


export default Rcd;