import React, {useEffect, useState} from 'react';
import Datepicker from './widgets/DatePicker';
import { format } from 'date-fns';
const TransactionLogs = () => {
  const [formattedDate, setFormattedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [isFetching, setIsFetching]= useState(false);
 
  const transactionsArray = [
    {name:"Cashier Collections", code:"cc"}
  ];
  return (
    <div>
      <div className='w-[90vw] h-screen'>
      <div className='flex flex-row w-full'>
          <div className='h-screen w-64 p-2 border-r-2 border-r-blue-500'>
            <h1 className='text-2xl mb-4'>Daily Transactions Log</h1>
            <Datepicker setFormattedDate={setFormattedDate} label={'Select Transaction Date'} />
            <button className={`bg-transparent
            hover:bg-blue-500 mt-4 w-3/4
              text-blue-700 font-semibold
              hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded
              ${isFetching ? 'cursor-not-allowed' : 'cursor-pointer'}`}
              onClick={()=>{console.log('tae')}}
              disabled={isFetching}
              >
              Generate
            </button>
       


          </div>
        <div className='flex-grow h-screen p-2 overflow-y-scroll'>
       
        
        </div>
      </div>
    </div>
    </div>
  );
};

export default TransactionLogs;
