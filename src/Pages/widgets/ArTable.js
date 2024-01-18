import React, {useRef, useEffect} from 'react';

import testData from '../../data/test';
import colleges from '../../data/college';

import { 
  renderAmountDueAging,
  renderTotalAging,
  calculateAgingBalances,
  calculateAgingBalancesForTotal,
  formatCurrency
 } from './tableHelpers'; 



const ArTable = ({formattedDate, studentData}) =>{
  useEffect(() => {
    // Adjust header widths after the component is mounted
    adjustHeaderWidths();
    // You might want to listen for window resize events to readjust header widths
    // window.addEventListener('resize', adjustHeaderWidths);

    // Cleanup listener when the component is unmounted
    return () => {
      // window.removeEventListener('resize', adjustHeaderWidths);
    };
  }, []);



  const mergeData = () => {
    // Merge testData and colleges based on collegeid
    return studentData.map(student => ({
      ...student,
      collegeName: colleges.find(college => college.collegeid === student.collegeid)?.collegeName || 'Unknown College',
    }));
  };
  const groupByCollegeId = () => {
    // Group data by collegeid and arrange students alphabetically by name
    return mergeData().reduce((acc, student) => {
      const collegeId = student.collegeid;
      acc[collegeId] = acc[collegeId] || { students: [], totalBalance: 0 };
      acc[collegeId].students.push(student);
      acc[collegeId].students.sort((a, b) => a.name.localeCompare(b.name)); // Sort students alphabetically by name
      acc[collegeId].totalBalance += calculateTotalBalance(student.accounts);
      return acc;
    }, {});
  };
  
  const calculateTotalBalance = (accounts) => {
    // Calculate total balance
    const totalBalance = accounts.reduce((total, reg) => total + reg.balance, 0);

    // return totalBalance !== 0 ? totalBalance : 0;
    return totalBalance;
  };
  


  
const adjustHeaderWidths = () => {
const tables = document.querySelectorAll('.adjustable-table');

tables.forEach(table => {
const headers = table.querySelectorAll('thead th');

headers.forEach(header => {
const columnIndex = header.cellIndex;
const maxWidth = Array.from(table.querySelectorAll(`tbody tr td:nth-child(${columnIndex + 1})`))
  .map(td => td.clientWidth)
  .reduce((max, width) => Math.max(max, width), 0);

header.style.width = `${maxWidth}px`;
});
});
};
    const originalBody = useRef('');
       
       const handlePrint = () => {
         const printContents = document.getElementById('printableArea').innerHTML;
         
         originalBody.current = document.body.innerHTML; // Save original body content
     
         document.body.innerHTML = printContents;
     
         window.print();
     
         document.body.innerHTML = originalBody.current; // Restore original body content
       };
  
       const renderTable = () => {
       
        const groupedData = groupByCollegeId();
      
        return (
          <div>
            {Object.entries(groupedData).map(([collegeId, { students, totalBalance }]) => (
              totalBalance !== 0 && (
                <React.Fragment key={collegeId}>
                <h2 className="text-2xl font-bold mb-2">{groupedData[collegeId].students[0].collegeName}</h2>
                <table className="bg-white border-collapse border border-slate-400 table-auto mb-6 text-sm">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border border-slate-300" rowSpan={3}>No.</th>
                      <th className="py-2 px-4 border border-slate-300" rowSpan={3}>Name of Debtor</th>
                      <th className="py-2 px-4 border border-slate-300" rowSpan={3}>Student Number</th>
                      <th className="py-2 px-4 border border-slate-300" rowSpan={3}>Amount Balance</th>
                      <th className="py-2 px-4 border border-slate-300" colSpan={5}>Amount Due</th>
                    </tr>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border border-slate-300" colSpan={2}>Current</th>
                      <th className="py-2 px-4 border border-slate-300" colSpan={3}>Past Due</th>
                    </tr>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border border-slate-300">less than 90 Days</th>
                      <th className="py-2 px-4 border border-slate-300">91-365 days</th>
                      <th className="py-2 px-4 border border-slate-300">Over 1 year</th>
                      <th className="py-2 px-4 border border-slate-300">Over 2 years</th>
                      <th className="py-2 px-4 border border-slate-300">Over 3 years and onwards</th>
                    
                    </tr>
                  </thead>
                  <tbody>
                    {students
                    .filter(student => calculateTotalBalance(student.accounts) !== 0)
                    .map((student, index) => (
                      <tr key={student.studentno}>
                        <td className="py-2 px-4 border border-slate-300">{index+1}.</td>
                        <td className="py-2 px-4 border border-slate-300">{student.name}</td>
                        <td className="py-2 px-4 border border-slate-300">{student.studentno}</td>
                        <td className="py-2 px-4 border border-slate-300 text-end">{formatCurrency(calculateTotalBalance(student.accounts))}</td>
                        {renderAmountDueAging(student.accounts)}
                        {/* Add Amount Due logic here */}
                      </tr>
                    ))}
                    <tr className='border-y-2 border-black'>
                      <th colSpan="3" className=" py-2 px-4 text-end">
                        Sub-Total:
                      </th>
                      <td className="py-2 px-4 text-end">{formatCurrency(totalBalance)}</td>
                      {renderTotalAging(students)}
                    </tr>
                  </tbody>
                </table>
              </React.Fragment>
              )
             
            ))}
          </div>
        );
      };

      return (
        <div className="p-4" id="printableArea">
          <h1 className="text-lg text-center font-bold mb-2">SCHEDULE OF ACCOUNTS RECEIVABLE</h1>
          <p className='text-md text-center font-semibold mb-4'>As at <u>{formattedDate}</u></p>
          <p className='text-md'>Entity Name: PALAWAN STATE UNIVERSITY</p>
          <p className='text-md mb-4'>Fund Cluster: 164</p>
          {renderTable()}
        </div>
      );
}


export default ArTable