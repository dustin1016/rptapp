import React, {useEffect} from 'react';
import testData from '../data/test';
const AccountsReceivable = () => {

    useEffect(() => {
        document.title = 'Accounts Receivable';
      }, []);


     // Grouping the data by collegeid
  const groupedByCollege = testData.reduce((acc, obj) => {
    const key = obj.collegeid;
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});

  const handlePrint = () => {
    window.print();
  };
  return (
    <div>
          {/* Print button */}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
        onClick={handlePrint}
      >
        Print
      </button>
      {Object.keys(groupedByCollege).map((collegeId) => (
        <div key={collegeId}>
          <h2 className="text-xl font-bold mt-4 mb-2">College ID: {collegeId}</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IDNO
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount Receivable
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {groupedByCollege[collegeId].map((student, index) => (
                <tr key={index}>
                  <td className="p-2 whitespace-nowrap">{student.idno}</td>
                  <td className="p-2 whitespace-nowrap">{student.name}</td>
                  <td className="p-2 whitespace-nowrap text-right">{student.amountReceivable}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-2 text-right">
            Subtotal: {groupedByCollege[collegeId].reduce((acc, student) => acc + student.amountReceivable, 0)}
          </div>
        </div>
      ))}



        {/* Final table */}
        <div>
        <h2 className="text-xl font-bold mt-4 mb-2">Total Amount Receivable per College</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                College ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Total Amount Receivable
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {Object.keys(groupedByCollege).map((collegeId) => (
              <tr key={collegeId}>
                <td className="px-6 py-4 whitespace-nowrap">{collegeId}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {
                    // Calculate total amount receivable for each college
                    groupedByCollege[collegeId].reduce((acc, student) => acc + student.amountReceivable, 0)
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AccountsReceivable;