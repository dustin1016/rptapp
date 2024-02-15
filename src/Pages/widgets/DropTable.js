import React, { useState, useEffect } from 'react';
import { formatAmount, formatTime } from './tableHelpers';
import colleges from '../../data/college';
const DropTable = ({ collections, setDroppingSummary }) => {
  // State to store grouped collections
  const [groupedCollections, setGroupedCollections] = useState({});

  useEffect(() => {
    // Group collections by collegeid
    const groupedByCollege = collections.reduce((acc, curr) => {
      const collegeId = curr.collegeid;

      if (!acc[collegeId]) {
        acc[collegeId] = [];
      }

      acc[collegeId].push(curr);
      return acc;
    }, {});

    setGroupedCollections(groupedByCollege);

    const subtotal1 = collections.reduce((acc, curr) => acc + parseFloat(curr.amount), 0).toFixed(4);
    // pass the totals back to main page
    setDroppingSummary(subtotal1)
    

  }, [collections, setDroppingSummary]);

  return (
    <div className="container mx-auto" id="droppingTable">
        <h1 className='text-md font-semibold my-3'>Subject Dropping</h1>
        {Object.keys(groupedCollections).map((collegeId) => (
      <div key={collegeId} className='ml-6'>
        <h1 className="text-sm font-semibold my-3">{colleges.find(x=>x.collegeid === parseInt(collegeId))?.collegeName}</h1>
        {/* <h1 className="text-sm font-semibold my-3">{collegeId}</h1> */}
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
          {groupedCollections[collegeId].map((item, index) => (
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
            <td  className="py-2 px-4 border border-black/35 font-semibold text-end">{formatAmount(groupedCollections[collegeId].reduce((acc, curr) => acc + parseFloat(curr.amount), 0).toFixed(4))}</td>
            <td className=""></td>
            <td className=""></td>
          </tr>
        </tfoot>
      </table>
      </div>
    ))}
    </div>
  );
};

export default DropTable;
