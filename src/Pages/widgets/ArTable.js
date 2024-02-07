import React, {useRef} from 'react';
import { IoMdPrint } from "react-icons/io";

import colleges from '../../data/college';

import { 
  renderAmountDueAging,
  renderTotalAging,
  // calculateAgingBalances,
  // calculateAgingBalancesForTotal,
  formatCurrency,
  calculateTotalBalance,
  calculateTotalBalanceAndAgingByCollege
 } from './tableHelpers'; 

 const formatDate = (dateString) => {
  //returns 2024-01-01 as Jan. 1, 2024
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  const formattedString = new Date(dateString).toLocaleDateString('en-US', options);

  return formattedString;
};

const ArTable = ({formattedDate, studentData, isDetailed}) =>{



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

  
  const renderSummaryTable = () => {
   
    const groupedData = groupByCollegeId();
    const agingCategories = ['over90', '91to365', 'over1Year', 'over2Years', 'over3YearsOnwards'];
    const totalBalancesAndAgingByCollege = calculateTotalBalanceAndAgingByCollege(
      Object.values(groupedData).flatMap(college => college.students)
    );

      // Calculate grand totals
  const grandTotals = {
    totalBalance: 0,
    agingByCategory: {
      over90: 0,
      '91to365': 0,
      over1Year: 0,
      over2Years: 0,
      over3YearsOnwards: 0,
    },
  };

  Object.values(totalBalancesAndAgingByCollege).forEach(({ totalBalance, agingByCategory }) => {
    grandTotals.totalBalance += totalBalance;
    agingCategories.forEach(category => {
      grandTotals.agingByCategory[category] += agingByCategory[category];
    });
  });
  
    return (
      <div>
        <h2 className="text-md font-bold mb-2">Accounts Receivable Summary</h2>
        <table className="table-auto bg-white border border-slate-400 text-xs">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border border-black/35" rowSpan={3}>College Name</th>
              <th className="py-2 px-4 border border-black/35" rowSpan={3}>Amount Balance</th>
              <th className="py-2 px-4 border border-black/35" colSpan={5}>Amount Due</th>
              </tr>
              <tr className="bg-gray-100">
                      <th className="py-2 px-4 border border-black/35" colSpan={2}>Current</th>
                      <th className="py-2 px-4 border border-black/35" colSpan={3}>Past Due</th>
              </tr>
              <tr className="bg-gray-100">
                      <th className="py-2 px-4 border border-black/35">less than 90 Days</th>
                      <th className="py-2 px-4 border border-black/35">91-365 days</th>
                      <th className="py-2 px-4 border border-black/35">Over 1 year</th>
                      <th className="py-2 px-4 border border-black/35">Over 2 years</th>
                      <th className="py-2 px-4 border border-black/35">Over 3 years and onwards</th>
                    
                    </tr>
          </thead>
          <tbody>
            {Object.entries(totalBalancesAndAgingByCollege).map(([collegeId, { totalBalance, agingByCategory }]) => (
              <tr key={collegeId}>
                <td className="py-2 px-4 border border-black/35">{colleges.find(college => college.collegeid === parseInt(collegeId))?.collegeName || 'Unknown College'}</td>
                <td className="py-2 px-4 border border-black/35 text-end">{formatCurrency(totalBalance)}</td>
                {agingCategories.map((category, index) => (
                  <td key={index} className="py-2 px-4 text-end border border-black/35">
                    {formatCurrency(agingByCategory[category])}
                  </td>
                ))}
              </tr>
            ))}
            <tr className="text-end">
            <td className="py-2 px-4 font-semibold border border-black/35">Grand Total</td>
            <td className="py-2 px-4 font-semibold border border-black/35">{formatCurrency(grandTotals.totalBalance)}</td>
            {agingCategories.map((category, index) => (
              <td key={index} className="py-2 px-4 font-semibold border border-black/35">
                {formatCurrency(grandTotals.agingByCategory[category])}
              </td>
            ))}
          </tr>
          </tbody>
        </table>
      </div>
    );
  };

  


  

    const printableRef = useRef(null);
       
       const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        const printableContent = printableRef.current.innerHTML;
      
        if (printWindow) {
          printWindow.document.write(`<!DOCTYPE html><html><head><title>PSU ${formatDate(formattedDate)} Accounts Receivable</title>`);
          printWindow.document.write('<link rel="stylesheet" href="/print-styles.css" type="text/css" />');
          printWindow.document.write('</head><body>');
          printWindow.document.write(printableContent);
          printWindow.document.write('<div class="w-full-flex">');
          printWindow.document.write('<p class="text-xs font-semibold">Prepared By:</p>');
          printWindow.document.write('<p class="text-xs font-semibold">Approved By:</p>');
          printWindow.document.write('</div>');
          printWindow.document.write('</body></html>');
          printWindow.document.close();
          setTimeout(() => {
            printWindow.print();
          }, 200);
        } else {
          console.error('Failed to open print window');
        }
       };
  
       const renderTable = () => {
       
        const groupedData = groupByCollegeId();
      
        return (
          <div>
            {Object.entries(groupedData).map(([collegeId, { students, totalBalance }]) => (
              totalBalance !== 0 && (
                <React.Fragment key={collegeId}>
                <h2 className="text-md font-bold mb-2">{groupedData[collegeId].students[0].collegeName}</h2>
                <table className="bg-white border-collapse border border-slate-400 mb-6 text-xs">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-1 border border-black/35" rowSpan={3}>No.</th>
                      <th className="py-2 px-4 border border-black/35" rowSpan={3}>Name of Debtor</th>
                      <th className="py-2 px-4 border border-black/35" rowSpan={3}>Student Number</th>
                      <th className="py-2 px-4 border border-black/35" rowSpan={3}>Amount Balance</th>
                      <th className="py-2 px-4 border border-black/35" colSpan={5}>Amount Due</th>
                    </tr>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border border-black/35" colSpan={2}>Current</th>
                      <th className="py-2 px-4 border border-black/35" colSpan={3}>Past Due</th>
                    </tr>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border border-black/35">less than 90 Days</th>
                      <th className="py-2 px-4 border border-black/35">91-365 days</th>
                      <th className="py-2 px-4 border border-black/35">Over 1 year</th>
                      <th className="py-2 px-4 border border-black/35">Over 2 years</th>
                      <th className="py-2 px-4 border border-black/35">Over 3 years and onwards</th>
                    
                    </tr>
                  </thead>
                  <tbody>
                    {students
                    .filter(student => calculateTotalBalance(student.accounts) !== 0)
                    .map((student, index) => (
                      <tr key={student.studentno}>
                        <td className="py-1 border border-black/35">{index+1}.</td>
                        <td className="py-2 px-4 border border-black/35">{student.name}</td>
                        <td className="py-2 px-4 border border-black/35">{student.studentno}</td>
                        <td className="py-2 px-4 border border-black/35 text-end">{formatCurrency(calculateTotalBalance(student.accounts))}</td>
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
        <div className="p-4 relative">
          <button className="bg-blue-500 hover:bg-blue-700 w-24 fixed top-5 right-4  text-center text-white font-semibold py-2 px-4 rounded"
          onClick={handlePrint}
          >
           <IoMdPrint className='text-6xl' />
           <p className='text-sm'>PRINT</p>
          </button>
          <div id="printableArea" ref={printableRef}>
            <h1 className="text-lg text-center font-bold mb-2">SCHEDULE OF ACCOUNTS RECEIVABLE</h1>
            <p className='text-md text-center font-semibold mb-4'>As at <u>{formatDate(formattedDate)}</u></p>
            <p className='text-md'>Entity Name: PALAWAN STATE UNIVERSITY</p>
            <p className='text-md mb-4'>Fund Cluster: 164</p>
            {isDetailed && renderTable()}
            {renderSummaryTable()}
          </div>
        </div>
      );
}


export default ArTable