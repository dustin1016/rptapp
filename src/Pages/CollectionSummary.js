import React, {useEffect, useState, useRef} from 'react';
import Datepicker from './widgets/DatePicker';
import { format } from 'date-fns';
import { IoMdPrint } from "react-icons/io";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { FaFileExcel } from "react-icons/fa";
import { formatCurrency } from './widgets/tableHelpers';
import DetailedCollectionTable from './widgets/DetailedCollectionTable';


const formatDate = (dateString) => {
    //returns 2024-01-01 as Jan. 1, 2024
    // const timeOptions = { timeStyle: 'short', hour12: true};
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedString = new Date(dateString).toLocaleDateString('en-US', options);
    // const dateTimeStr = new Date();
    // const formattedTime = new Date(dateTimeStr).toLocaleTimeString('en-US', timeOptions);
    return formattedString;
  };



const CollectionSummary = ({isHeadPc}) => {
    const [formattedDate, setFormattedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [isFetching, setIsFetching]= useState(false);
    const [hasData, setHasData] = useState(false);
    const [collections, setCollections] = useState([]);
    const [dues, setDues] = useState([]);
    const [startOR, setStartOR] = useState('');
    const [endOR, setEndOR] = useState('');
    const [orFilter, setOrFilter] = useState('date');
    const [orFrom, setOrFrom] = useState('')
    const [orTo, setOrTo] = useState('')
    const [selectedLayout, setSelectedLayout] = useState(1);
    const printableRef = useRef(null);

    useEffect(()=>{
      resetData();
    },[formattedDate, selectedLayout]);

    const resetData = () => {
      
      setHasData(false);
      setCollections([]);
      setDues([]);
      setStartOR('');
      setEndOR('');
      
    }



    const checkOr = () =>{
      const txtOrFrom = document.getElementById('orFrom');
      const txtOrTo = document.getElementById('orTo');
      let check = false;

      //check if the length of the characters are same with actual OR numbers
      if (orFrom.length < 8){
        txtOrFrom.classList.add('border-red-500')
        check = true;
      } else {
        txtOrFrom.classList.remove('border-red-500')
      }

      if (orTo.length < 8){
        txtOrTo.classList.add('border-red-500')
        check = true;
      } else {
        txtOrTo.classList.remove('border-red-500') 
      }

      //check if the last character of each OR number is a letter
      const o1 = orFrom.substring(orFrom.length - 1) //beginning OR
      const o2 = orTo.substring(orTo.length - 1) //ending OR

      if (!isNaN(o1)){
        txtOrFrom.classList.add('border-red-500')
        check = true;
      } else {
        txtOrFrom.classList.remove('border-red-500')
      }

      if (!isNaN(o2)){
        txtOrTo.classList.add('border-red-500')
        check = true;
      } else {
        txtOrTo.classList.remove('border-red-500') 
      }
      return check;


    }
    const getCollections = async () => {
      resetData();
      //0212348S
      //0212768S
        try {
         
          const params = orFilter === 'date' ?
            `summaryCollections${selectedLayout === 2 ? "2" : ""}?formattedDate=${formattedDate}`
            :
            `summaryCollectionsBySeries${selectedLayout === 2 ? "2" : ""}?orFrom=${orFrom}&orTo=${orTo}`;
            

            console.log(params)
            if (orFilter === 'series'){
              if (checkOr()) return;
            }
            setIsFetching(true);
            const response = await fetch(`http://10.125.2.222:8080/rptApi/index.php/${params}`); // Replace with your API endpoint
            if (!response.ok) {
              setIsFetching(false);
              throw new Error('Network response was not ok.');
            }
            const result = await response.json();
            
     
            setCollections(result.collections);
            if (result.dues){
              setDues(result.dues);
            }
            setStartOR(result.beginningOR);
            setEndOR(result.endingOR);
            setHasData(true)
            setIsFetching(false);
          } catch (error) {
            console.log('Error fetching data: ' + error.message); // Set error message to state
          }
    }

    

    const handleOptionChange = (event) => {
      setOrFilter(event.target.value);
    };

    const handleLayoutOptionChange = (event) => {
      setSelectedLayout(parseInt(event.target.value));
    };

    const handleORInput = (event) => {
      if (event.target.id === 'orFrom'){
        setOrFrom(event.target.value)
      } else {
        setOrTo(event.target.value)
      }
    }


    const calcTotals =(arr)=>{

      const totalCollections = arr.reduce((total, acc) => total + parseFloat(acc.Amount), 0);
      return totalCollections;
    }


    const LayoutSelection = () => {
      return (
           
                        <div className='mb-6'>
                          <h3>Select Layout:</h3>
                          <div className='flex flex-row gap-6 text-xs'>
                          <div>
                            <input
                              type="radio"
                              id="l1"
                              name="layoutOption"
                              value="1"
                              checked={selectedLayout === 1}
                              onChange={handleLayoutOptionChange}
                              
                            />
                            <label htmlFor="l1">Basic (Default)</label>
                          </div>

                          <div>
                            <input
                              type="radio"
                              id="l2"
                              name="layoutOption"
                              value="2"
                              checked={selectedLayout === 2}
                              onChange={handleLayoutOptionChange}
                            />
                            <label htmlFor="l2">Layout 2</label>
                          </div>
                          </div>
                        
                        </div>
                      
      );
    }


    const Layout1 = () => {
       return (
          <div className="container mx-auto" id="summaryTable">
              <table className="bg-white border-collapse border border-slate-400 mb-6 text-xs"> 
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-2 px-4 text-center text-xs font-semibold border border-black/35 text-gray-500 uppercase tracking-wider">Particulars</th>
                    <th scope="col" className="py-2 px-4  border border-black/35 text-gray-500 uppercase tracking-wider"></th>
                    <th scope="col" className="py-2 px-4  border border-black/35 text-gray-500 uppercase tracking-wider"></th>
                    <th scope="col" className="py-2 px-4 text-center text-xs font-semibold border border-black/35 text-gray-500 uppercase tracking-wider">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {collections.map((c, index) => (
                    <React.Fragment key={index}>
                  
                    <tr>
                      <td className={`py-2 px-4 border border-black/35 ${parseInt(c.accountid) === 593 && 'font-semibold'}`}>{c.acctName}</td>
                      <td className='py-2 px-4 border border-black/35'></td>
                      <td className='py-2 px-4 border border-black/35'></td>
                      <td className={`py-2 px-4 border border-black/35 ${parseInt(c.accountid) === 593 && 'font-semibold'}`}>{formatCurrency(parseFloat(c.Amount))}</td>
                    </tr>
                    {parseInt(c.accountid) === 593 && (
                      <React.Fragment key={index}>
                        {dues.map((d,i)=>(
                          <tr key={i}>
                            <td className='py-2 px-4 border border-black/35'>{d.Payor}</td>
                            <td className='py-2 px-4 border border-black/35'>OR No. {d.Referenceno}</td>
                            <td className='py-2 px-4 border border-black/35'>{formatCurrency(parseFloat(d.Amount))}</td>
                            <td className='py-2 px-4 border border-black/35'></td>
                          </tr>
                        ))}
                      </React.Fragment>
                    )}
                    </React.Fragment>
                  ))}
                  <tr>
                    <td className='py-2 px-4 border border-black/35 text-center font-semibold' colSpan={2}>
                      Total Collections Per O.R. No. {startOR} - {endOR}
                    </td>
                    <td className='py-2 px-4 border border-black/35'></td>
                    <td className='py-2 px-4 border border-black/35 font-semibold'>&#8369; {formatCurrency(calcTotals(collections) + calcTotals(dues))}</td>
                  </tr>
                </tbody>
              </table>          
            </div>
       )
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

    return(
    <>
        
        <div>
            <div className='w-[90vw] h-screen'>
                <div className='flex flex-row w-full'>
                    <div className='h-screen w-64 p-2 border-r-2 border-r-blue-500 npr'>
                        <h1 className='text-xl mb-4 npr'>Summary of Collections</h1>

                        <LayoutSelection />
                        <div>
                          <h3>Select Filter:</h3>
                          <div className='flex flex-row gap-6 text-xs mb-6'>
                          <div>
                            <input
                              type="radio"
                              id="byDate"
                              name="filterOption"
                              value="date"
                              checked={orFilter === 'date'}
                              onChange={handleOptionChange}
                              
                            />
                            <label htmlFor="byDate">By Date</label>
                          </div>

                          <div>
                            <input
                              type="radio"
                              id="bySeries"
                              name="filterOption"
                              value="series"
                              checked={orFilter === 'series'}
                              onChange={handleOptionChange}
                            />
                            <label htmlFor="bySeries">By Series</label>
                          </div>
                          </div>
                        
                        </div>

                        {orFilter === 'date' ? 
                          <Datepicker setFormattedDate={setFormattedDate} label={'Select Transaction Date'} />
                          :
                          <div className='flex flex-col gap-2'>
                            <h1 className='text-xl mb-4'>Indicate OR Series</h1>
                            <div className='flex flex-row align-middle items-center gap-2'>
                              <label htmlFor='orFrom' className='text-xs w-20'>Beginning OR:</label>
                              <input 
                                type='text'
                                id='orFrom'
                                name='orFrom'
                                className='w-32 border-2 rounded-md px-3 py-2 outline-none text-xs'
                                value={orFrom}
                                onChange={handleORInput}


                              />
                            </div>
                            <div className='flex flex-row align-middle items-center gap-2'>
                              <label htmlFor='orTo' className='text-xs w-20'>Ending OR:</label>
                              <input 
                                type='text'
                                id='orTo'
                                name='orTo'
                                className='w-32 border-2 rounded-md px-3 py-2 outline-none text-xs'
                                value={orTo}
                                onChange={handleORInput}
                              />
                            </div>
                          </div>
                        }


                   
                        
                        
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



                {selectedLayout === 1 && (
                  <Layout1 />
                )}

                {(selectedLayout === 2 && hasData) && <DetailedCollectionTable data={collections} />}
            </>
            
            }

          
                    </div>
                      {/* PRINT BUTTONS */}
                      {hasData &&
              
              <div className='npr flex flex-col fixed top-5 right-4 h-4'>
                <button className="bg-blue-500 hover:bg-blue-700 w-24 mb-6 text-center text-white font-semibold py-2 px-4 rounded"
                onClick={()=>handlePrint()}
                >
                  <IoMdPrint className='text-6xl' />
                  <p className='text-sm'>PRINT</p>
                </button>
            
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


export default CollectionSummary;

