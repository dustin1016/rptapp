import React, {useEffect, useState} from 'react';
import ArTable from './widgets/ArTable';
import DataComponent from './widgets/DataComponent';
const AccountsReceivable = () => {
  const [hasData, setHasData] = useState(false);
  const [isFetching, setIsFetching]= useState(false);
    useEffect(() => {
        document.title = 'Accounts Receivable';
      }, []);


  return (
   

    
    <div className='flex flex-row'>
      <div className='flex-1 w-1/4 p-2'>

      </div>
      <div className='flex-1 w-3/4 p-2'>
      <DataComponent />
        {hasData && <ArTable />}
      </div>
    </div>
  
  );
};

export default AccountsReceivable;