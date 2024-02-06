import React, {useEffect, useState, useRef} from 'react';
import Datepicker from './widgets/DatePicker';
import { format } from 'date-fns';
import CollectionsTable from './widgets/CollectionsTable';
import GrantAidTable from './widgets/GrantAidTable';
import ScholarshipTable from './widgets/ScholarshipTable';
import SpecialClassTable from './widgets/SpecialClassTable';
import AssessmentTable from './widgets/AssessmentTable';
import AddingTable from './widgets/AddingTable';
import ChangingTable from './widgets/ChangingTable';
import DroppingTable from './widgets/DroppingTable';
import TableNav from './widgets/TableNav';
import TransactionLogSummary from './widgets/TransactionLogSummary';
import { IoMdPrint } from "react-icons/io";


const formatDate = (dateString) => {
  //returns 2024-01-01 as Jan. 1, 2024
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedString = new Date(dateString).toLocaleDateString('en-US', options);

  return formattedString;
};


const TransactionLogs = () => {
  const [formattedDate, setFormattedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [isFetching, setIsFetching]= useState(false);
  const [hasData, setHasData] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  
  //array states for cashier collections
  const [cashierSummary, setCashierSummary] = useState(0.00);
  const [cashierCollections, setCashierCollections] = useState([]);

  //array states for grant and aid collections
  const [grantAidSummary, setGrantAidSummary] = useState(0.00);
  const [grantAidCollections, setGrantAidCollections] = useState([]);

  //array states for Free Higher Education collections
  const [schoSummary, setSchoSummary] = useState(0.00);
  const [schoCollections, setSchoCollections] = useState([]);

  //array states for Special Class collections
  const [specialClassSummary, setSpecialClassSummary] = useState(0.00);
  const [specialClassTransactions, setSpecialClassTransactions] = useState([]);

  //array states for Assessment Modifications
  const [assessmentSummary, setAssessmentSummary] = useState(0.00);
  const [assessmentTransactions, setAssessmentTransactions] = useState([]);

  //array states for subject adding transactions
  const [addingSummary, setAddingSummary] = useState(0.00);
  const [addingTransactions, setAddingTransactions] = useState([]);

  //array states for subject changing transactions
  const [changingSummary, setChangingSummary] = useState(0.00);
  const [changingTransactions, setChangingTransactions] = useState([]);

  //array states for subject dropping transactions
  const [droppingSummary, setDroppingSummary] = useState(0.00);
  const [droppingTransactions, setDroppingTransactions] = useState([]);


  const printableRef = useRef(null);
  //table navigations
  const [visibleTables, setVisibleTables] = useState([]);

  const scrollToTable = (tableId) => {
    const tableElement = document.getElementById(tableId);

    if (tableElement) {
      tableElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleTableVisibilityById = (tableId) => {
    const tableElement = document.getElementById(tableId);
 
    
    setVisibleTables((prevVisibleTables) => {
      const isVisible = prevVisibleTables.includes(tableId);

      if (isVisible) {
        tableElement.classList.add('hidden');
        return prevVisibleTables.filter((id) => id !== tableId);
      } else {
        tableElement.classList.remove('hidden');
        return [...prevVisibleTables, tableId];
      }
    });
  };
  const tables = [
    {data:cashierCollections, summary:cashierSummary, name:'Cashier Collections', table:'collectionsTable'},
    {data:grantAidCollections, summary:grantAidSummary, name:'Grant and Aid',table:'grantAidTable'},
    {data:schoCollections, summary:schoSummary, name:'Free Higher Education', table:'schoTable'},
    {data:specialClassTransactions, summary:specialClassSummary, name:'Special Class', table:'specialClassTable'},
    {data:assessmentTransactions, summary:assessmentSummary, name:'Assessment', table:'assessmentTable'},
    {data:addingTransactions, summary:addingSummary, name:'Adding', table:'addingTable'},
    {data:changingTransactions, summary:changingSummary, name:'Changing', table:'changingTable'},
    {data:droppingTransactions, summary:droppingSummary, name:'Dropping', table:'droppingTable'},
  ];

  const getVisibleTableIds = (tables) => {
    //function to check every data from tables data to see if it is not empty
    return tables
      .filter((table) => table.data.length > 0)
      .map((table) => table.table);
  };


  const clearData = () => {
    setCashierSummary(0.00);
    setGrantAidSummary(0.00);
    setSchoSummary(0.00);
    setSpecialClassSummary(0.00);
    setAssessmentSummary(0.00);
    setAddingSummary(0.00);
    setChangingSummary(0.00);
    setDroppingSummary(0.00);
   
    setCashierCollections([]);
    setGrantAidCollections([]);
    setSchoCollections([]);
    setSpecialClassTransactions([]);
    setAssessmentTransactions([]);
    setAddingTransactions([]);
    setChangingTransactions([]);
    setDroppingTransactions([]);
    setVisibleTables([]);

 
  }

  useEffect(() => {
    document.title = 'Daily Transactions Log';
  }, []);

  useEffect(()=>{
    const dataCheck = tables.every(table => table.data.length === 0); //check if all data are empty, meaning no transactions has been done for the day yet
    
      if (dataCheck){
        //there is no data
        setHasData(false);
        
      } else {
     
        const visibleTables = getVisibleTableIds(tables);
        setVisibleTables(visibleTables);
        setHasData(true);
        
       
      }
  }, [isFetching]);
  const generateData = async()=>{
    setClickCount(clickCount + 1);
    setIsFetching(true);
    setHasData(false);
    clearData();
    try {
      
      // Fetch data sequentially
      await fetchCashierCollections();
      await fetchGrantAidTransactions();
      await fetchSchoTransactions();
      await fetchSpecialClassTransactions();
      await fetchAssessmentTransactions();
      await fetchAddingTransactions();
      await fetchChangingTransactions();
      await fetchDroppingTransactions();
      // Add more fetch calls as needed

      // All fetches completed sequentially, do any additional logic here
      setIsFetching(false);
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


//method to fetch cashier data
  const fetchCashierCollections = async () => {
    try {
      const response = await fetch(`http://10.125.0.222:8080/rptApi/index.php/cashierCollections?formattedDate=${formattedDate}`); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const result = await response.json();
  
      setCashierCollections(result.cashierCollections)
    } catch (error) {
      console.log('Error fetching data: ' + error.message); // Set error message to state
    }
  };

//method to fetch scholarship Debit/Credit Memo transactions
const fetchSchoTransactions = async () => {
  try {
    const response = await fetch(`http://10.125.0.222:8080/rptApi/index.php/scholarshipTransactions?formattedDate=${formattedDate}`); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const result = await response.json();

    setSchoCollections(result.scholarshipTransactions);
  } catch (error) {
    console.log('Error fetching data: ' + error.message); // Set error message to state
  }
};

//method to fetch grant and aid debit/credit transactions
const fetchGrantAidTransactions = async () => {
  try {
    const response = await fetch(`http://10.125.0.222:8080/rptApi/index.php/grantAidTransactions?formattedDate=${formattedDate}`); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const result = await response.json();

    setGrantAidCollections(result.grantAidTransactions);
  } catch (error) {
    console.log('Error fetching data: ' + error.message); // Set error message to state
  }
};


//method to fetch grant and aid debit/credit transactions
const fetchSpecialClassTransactions = async () => {
  try {
    const response = await fetch(`http://10.125.0.222:8080/rptApi/index.php/specialClassTransactions?formattedDate=${formattedDate}`); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const result = await response.json();

    setSpecialClassTransactions(result.specialClassTransactions);
  } catch (error) {
    console.log('Error fetching data: ' + error.message); // Set error message to state
  }
};

//method to fetch grant and aid debit/credit transactions
const fetchAssessmentTransactions = async () => {
  try {
    const response = await fetch(`http://10.125.0.222:8080/rptApi/index.php/assessmentTransactions?formattedDate=${formattedDate}`); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const result = await response.json();

    setAssessmentTransactions(result.assessmentTransactions);
  } catch (error) {
    console.log('Error fetching data: ' + error.message); // Set error message to state
  }
};


const fetchAddingTransactions = async () => {
  try {
    const response = await fetch(`http://10.125.0.222:8080/rptApi/index.php/addingTransactions?formattedDate=${formattedDate}`); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const result = await response.json();

    setAddingTransactions(result.addingTransactions);
  } catch (error) {
    console.log('Error fetching data: ' + error.message); // Set error message to state
  }
};

const fetchChangingTransactions = async () => {
  try {
    const response = await fetch(`http://10.125.0.222:8080/rptApi/index.php/changingTransactions?formattedDate=${formattedDate}`); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const result = await response.json();

    setChangingTransactions(result.changingTransactions);
  } catch (error) {
    console.log('Error fetching data: ' + error.message); // Set error message to state
  }
};


const fetchDroppingTransactions = async () => {
  try {
    const response = await fetch(`http://10.125.0.222:8080/rptApi/index.php/droppingTransactions?formattedDate=${formattedDate}`); // Replace with your API endpoint
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    const result = await response.json();

    setDroppingTransactions(result.droppingTransactions);
  } catch (error) {
    console.log('Error fetching data: ' + error.message); // Set error message to state
  }
};

// const handlePrint = () => {
//   const element = document.getElementById('printable');

//   if (element){
  
//     const printContents = element.innerHTML;
//       originalBody.current = document.body.innerHTML;

//       // Apply print-specific stylesheet
//       const printStylesheet = document.createElement('link');
//       printStylesheet.href = '/print-styles.css'; // Adjust the path accordingly
//       printStylesheet.rel = 'stylesheet';
//       printStylesheet.type = 'text/css';
//       document.head.appendChild(printStylesheet);

//       document.body.innerHTML = printContents;

//       window.print();

//       // Remove print-specific stylesheet
//       document.head.removeChild(printStylesheet);

//       // Restore original body content after printing
//       document.body.innerHTML = originalBody.current;
//   } else {
//     console.log('asdf')
//   }
  
// };

const handlePrint = () => {
  const printWindow = window.open('', '_blank');
  const printableContent = printableRef.current.innerHTML;

  if (printWindow) {
    printWindow.document.write(`<!DOCTYPE html><html><head><title>PSU ${formatDate(formattedDate)} Transactions Log</title>`);
    printWindow.document.write('<link rel="stylesheet" href="/print-styles.css" type="text/css" />');
    printWindow.document.write('</head><body>');
    printWindow.document.write(printableContent);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
    }, 200);
  } else {
    console.error('Failed to open print window');
  }
};

  return (
    <div>
      <div className='w-[90vw] h-screen'>
      <div className='flex flex-row w-full'>
          <div className='h-screen w-64 p-2 border-r-2 border-r-blue-500 npr'>
            <h1 className='text-2xl mb-4 npr'>Daily Transactions Log</h1>
            <Datepicker setFormattedDate={setFormattedDate} label={'Select Transaction Date'} />
            
           
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
            
              
          {hasData && 
         <div className='mt-4'>
                  <TableNav
                tables={tables}
                visibleTables={visibleTables}
                scrollToTable={scrollToTable}
                toggleTableVisibilityById={toggleTableVisibilityById}
              />
         </div>
          }
         
            
           

          </div>
        <div className='flex-grow h-screen p-3 overflow-y-scroll' >
          {isFetching ? <></> :
            <div className='flex flex-col pl-16 rm-padding' id='printContainer'>
              {hasData && <div className='npr'>

                <button className="bg-blue-500 hover:bg-blue-700 w-24 fixed top-5 right-4  text-center text-white font-semibold py-2 px-4 rounded"
              onClick={()=>handlePrint()}
              >
              <IoMdPrint className='text-6xl' />
              <p className='text-sm'>PRINT</p>
              </button>
                </div>
                }
          <div id='printable' ref={printableRef} >
            {(hasData && clickCount > 0) && 
            <>
            <p className='text-sm font-semibold'>PALAWAN STATE UNIVERSITY</p>
            <p className='text-sm font-semibold uppercase'>Accounts Receivable daily transaction log</p>
            <p className='text-sm font-semibold'>Fund 164</p>
            <p className='text-sm font-semibold'>For Date: {formatDate(formattedDate)}</p>
            </>
            
            }
            {cashierCollections.length > 0 && 
            <div className='mb-6'>
              <CollectionsTable collections={cashierCollections} setCashierSummary={setCashierSummary} />
            </div>
            }

            {grantAidCollections.length > 0 && 
            <div className='mb-6'>
              <GrantAidTable collections={grantAidCollections} setGrantAidSummary={setGrantAidSummary} />
            </div>
            }

            {schoCollections.length > 0 && 
            <div className='mb-6'>
              <ScholarshipTable collections={schoCollections} setSchoSummary={setSchoSummary} />
            </div>
            }

            {specialClassTransactions.length > 0 && 
            <div className='mb-6'>
              <SpecialClassTable collections={specialClassTransactions} setSpecialClassSummary={setSpecialClassSummary} />
            </div>
            }


            {assessmentTransactions.length > 0 && 
            <div className='mb-6'>
              <AssessmentTable collections={assessmentTransactions} setAssessmentSummary={setAssessmentSummary} />
            </div>
            }


            {addingTransactions.length > 0 && 
            <div className='mb-6'>
              <AddingTable collections={addingTransactions} setAddingSummary={setAddingSummary} />
            </div>
            }

            {changingTransactions.length > 0 && 
            <div className='mb-6'>
              <ChangingTable collections={changingTransactions} setChangingSummary={setChangingSummary} />
            </div>
            }

            {droppingTransactions.length > 0 && 
            <div className='mb-6'>
              <DroppingTable collections={droppingTransactions} setDroppingSummary={setDroppingSummary} />
            </div>
            }


             
                  {hasData ?  <div className='mb-6'>
                      <TransactionLogSummary 
                      cashierSummary={cashierSummary}
                      assessmentSummary={assessmentSummary}
                      grantAidSummary={grantAidSummary}
                      schoSummary={schoSummary}
                      specialClassSummary={specialClassSummary}
                      addingSummary={addingSummary}
                      changingSummary={changingSummary}
                      droppingSummary={droppingSummary}
                      />
                    </div> : 
                    <>
                      {clickCount > 0 && <h4 className='text-center font-semibold text-xl'>No Transactions Found for the selected date</h4>}
                    </>}
                </div>
            </div>

         
          }
        
        </div>
      </div>
    </div>
    </div>
  );
};

export default TransactionLogs;
