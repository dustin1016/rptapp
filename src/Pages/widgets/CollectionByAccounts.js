import React, {useState, useEffect} from 'react';
import { formatAmount } from './tableHelpers'; 


const CollectionByAccounts = ({collections}) => {
    const [subtotal, setSubtotal] = useState(0.0000);
  
    useEffect(()=>{
      
      const subtotal1 = collections.reduce((acc, curr) => acc + parseFloat(curr.amount), 0).toFixed(4);
      setSubtotal(subtotal1)
   
    })

    return(
        <>
            <div className="w-[28rem] wp-28">
                <h1 className='text-md font-semibold my-3 '>Summary of Collections by Account:</h1>
                <table className="bg-white mb-6 text-xs w-full">
                    <thead>
                        <tr>
                            <th className="border-b-2 font-semibold text-center">Account Name</th>
                            <th className="border-b-2 font-semibold text-center">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {collections.map((item, index)=>(
                            <tr key={index}>
                                <td className="border-b-2">{item.account}</td>
                                <td className="border-b-2 text-end">{formatAmount(item.amount)}</td>
                            </tr>
                        ))}
                        <tr>
                            <td className='text-end'>Subtotal: </td>
                            <td className='text-end'>{formatAmount(subtotal)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default CollectionByAccounts;