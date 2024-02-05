import React, {useState, useEffect} from 'react';
import { formatAmount, formatTime } from './tableHelpers'; 
const GrantAidTable = ({ collections, setGrantAidSummary }) => {
  // Calculate subtotal
    const [subtotal, setSubtotal] = useState(0.0000);
  
  useEffect(()=>{
    const subtotal1 = collections.reduce((acc, curr) => acc + parseFloat(curr.amount), 0).toFixed(4);
    // console.log(typeof(subtotal1))
    setSubtotal(subtotal1)
    setGrantAidSummary(subtotal1)
  })

  return (
    <div className="container mx-auto" id='grantAidTable'>
     <h1 className='text-md font-semibold my-3'>Financial Aid</h1>
      <table className="bg-white border-collapse border border-slate-400 mb-6 text-xs">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-black/35">Time</th>
            <th className="py-2 px-4 border border-black/35">Student Name and Number</th>
            <th className="py-2 px-4 border border-black/35">Amount</th>
            <th className="py-2 px-4 border border-black/35">Reference</th>
            <th className="py-2 px-4 border border-black/35">User ID</th>
          </tr>
        </thead>
        <tbody>
          {collections.map((item, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border border-black/35">{formatTime(item.Time)}</td>
              <td className="py-2 px-4 border border-black/35">
                {item.studentname} {item.studentno && `(${item.studentno})`}
              </td>
              <td className="py-2 px-4 border border-black/35 text-end">{formatAmount(item.amount)}</td>
              <td className="py-2 px-4 border border-black/35">{item.reference}</td>
              <td className="py-2 px-4 border border-black/35">{item.userid}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            
            <td colSpan={2} className="py-2 px-4 border border-black/35 font-semibold text-end">Subtotal:</td>
            <td  className="py-2 px-4 border border-black/35 font-semibold text-end">{formatAmount(subtotal)}</td>
            <td className=""></td>
            <td className=""></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default GrantAidTable;