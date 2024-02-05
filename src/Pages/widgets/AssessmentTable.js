import React, {useState, useEffect} from 'react';
import { formatAmount, formatTime } from './tableHelpers'; 
const AssessmentTable = ({ collections, setAssessmentSummary }) => {
  // Calculate subtotal
    const [subtotal, setSubtotal] = useState(0.0000);
    const [totalOriginalBalance, setTotalOriginalBalance] = useState(0.0000)
  useEffect(()=>{
    const subtotal1 = collections.reduce((acc, curr) => acc + parseFloat(curr.amount), 0).toFixed(4);
    setSubtotal(subtotal1)

    
    const totalOriginal = collections.reduce((acc, curr) => acc + parseFloat(curr.originalBalance), 0).toFixed(4);
    setTotalOriginalBalance(totalOriginal);
  

    setAssessmentSummary(subtotal1)
  })

  return (
    <div className="container mx-auto" id='assessmentTable'>
     <h1 className='text-md font-semibold my-3'>Assessment</h1>
      <table className="bg-white border-collapse border border-slate-400 mb-6 text-xs">
        <thead>
          <tr>
            <th className="py-2 px-4 border border-black/35">Time</th>
            <th className="py-2 px-4 border border-black/35">Student Name and Number</th>
            <th className="py-2 px-4 border border-black/35">Original Assessment</th>
            <th className="py-2 px-4 border border-black/35">Modified Assessment</th>
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
              <td className="py-2 px-4 border border-black/35 text-end">{formatAmount(item.originalBalance)}</td>
              <td className="py-2 px-4 border border-black/35 text-end">{formatAmount(item.amount)}</td>
              <td className="py-2 px-4 border border-black/35">{item.reference}</td>
              <td className="py-2 px-4 border border-black/35">{item.userid}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            
            <td colSpan={2} className="py-2 px-4 border border-black/35 font-semibold text-end">Subtotal:</td>
            <td  className="py-2 px-4 border border-black/35 font-semibold text-end">{formatAmount(totalOriginalBalance)}</td>
            <td  className="py-2 px-4 border border-black/35 font-semibold text-end">{formatAmount(subtotal)}</td>
            <td className=""></td>
            <td className=""></td>
          </tr>
        </tfoot>
      </table>
      {/* <table className='text-xs border-collapse border'>
        <thead>
            <tr>
              <th className="py-2 px-4 border border-black/35"></th>
              <th className="py-2 px-4 border border-black/35"></th>
              <th className="py-2 px-4 border border-black/35">Original Assessment</th>
              <th className="py-2 px-4 border border-black/35">Modified Assessment</th>
              <th className="py-2 px-4 border border-black/35"></th>
              <th className="py-2 px-4 border border-black/35"></th>
            </tr>
        </thead>
         <tbody>
         <tr>
            
            <td  className="py-2 px-4 border border-black/35 font-semibold text-end" colSpan={2}>Subtotal:</td>
            <td  className="py-2 px-4 border border-black/35 font-semibold text-end">{formatAmount(totalOriginalBalance)}</td>
            <td  className="py-2 px-4 border border-black/35 font-semibold text-end">{formatAmount(subtotal)}</td>
        
          </tr>
         </tbody>
      </table> */}
    </div>
  );
};

export default AssessmentTable;