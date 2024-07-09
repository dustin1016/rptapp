import React, { useState, useEffect } from 'react';
import { formatAmount, formatTime } from './tableHelpers';
import colleges from '../../data/college';
const ChangeTable = ({ collections, setChangingSummary }) => {
  
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
    setChangingSummary(subtotal1)
    

  }, [collections, setChangingSummary]);

  return (
    <div className="container mx-auto" id="changingTable">
        <h1 className='text-md font-semibold my-3'>Subject Changing</h1>
        {Object.keys(groupedCollections).map((collegeId) => (
      <div key={collegeId} className='ml-6'>
        <h1 className="text-sm font-semibold my-3">{colleges.find(x=>x.collegeid === parseInt(collegeId))?.collegeName}</h1>
        {/* <h1 className="text-sm font-semibold my-3">{collegeId}</h1> */}
        <table className="bg-white border-collapse border border-slate-400 mb-6 text-xs">
          <thead>
            {/* Your table header code */}
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

export default ChangeTable;
