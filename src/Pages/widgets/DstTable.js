import React from 'react';
import { formatAmount } from './tableHelpers';
const formatDate = (dateString) => {
    //returns 2024-01-01 as Jan. 1, 2024
    const timeOptions = { timeStyle: 'short', hour12: true};
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedString = new Date(dateString).toLocaleDateString('en-US', options);
    // const dateTimeStr = new Date();
    const formattedTime = new Date(dateString).toLocaleTimeString('en-US', timeOptions);
    return formattedString + ' ' + formattedTime;
  };

const DstTable = ({data}) => {
    const groupData = (data) => {
        return data.reduce((groups, item) => {
          const key = `${item.ReferenceNo}-${item.Payor}-${item.TransDate}-${item.control_number}`;
          if (!groups[key]) {
            groups[key] = [];
          }
          groups[key].push(item);
          return groups;
        }, {});
      };

      


      const TableComponent = () => {
        const groupedData = groupData(data);
        const sumCredit = data.reduce((n, {Credit}) => n + Number(Credit), 0)
       
        return (
          <table className="min-w-full divide-y border-collapse border border-gray-800  divide-gray-700 mt-6">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="py-2 px-4 text-left text-xs font-medium border border-black/35 text-gray-500 uppercase tracking-wider">Date of Issue</th>
                <th scope="col" className="py-2 px-4 text-left text-xs font-medium border border-black/35 text-gray-500 uppercase tracking-wider">OR Number</th>
                <th scope="col" className="py-2 px-4 text-left text-xs font-medium border border-black/35 text-gray-500 uppercase tracking-wider">Control Number</th>
                <th scope="col" className="py-2 px-4 text-left text-xs font-medium border border-black/35 text-gray-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="py-2 px-4 text-left text-xs font-medium border border-black/35 text-gray-500 uppercase tracking-wider">Description of Certificate</th>
                <th scope="col" className="py-2 px-4 text-left text-xs font-medium border border-black/35 text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Object.keys(groupedData).map((key, index) => {
                const group = groupedData[key];
                return (
                  <React.Fragment key={index}>
                    {group.map((item, itemIndex) => (
                      <tr key={`${index}-${itemIndex}`} className={itemIndex % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                        {itemIndex === 0 && (
                          <>
                            <td rowSpan={group.length} className="py-2 px-4 whitespace-nowrap border border-black/35 text-xs text-gray-900">{formatDate(item.TransDate)}</td>
                            <td rowSpan={group.length} className="py-2 px-4 whitespace-nowrap border border-black/35 text-xs text-gray-900">{item.ReferenceNo}</td>
                            <td rowSpan={group.length} className="py-2 px-4 whitespace-nowrap border border-black/35 text-xs text-gray-900">{item.control_number}</td>
                            <td rowSpan={group.length} className="py-2 px-4 whitespace-nowrap border border-black/35 text-xs text-gray-900">{item.Payor}</td>
                          </>
                        )}
                        <td className="py-2 px-4 whitespace-nowrap border border-black/35 text-xs text-gray-900">{item.acctName}</td>
                        <td className="py-2 px-4 whitespace-nowrap border border-black/35 text-xs text-end text-gray-900">{formatAmount(item.Credit)}</td>
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
              <tr>
                <td colSpan={5} className="py-2 px-4 whitespace-nowrap border border-black/35 text-sm text-end text-gray-900">Total:</td>
                <td className="py-2 px-4 whitespace-nowrap border border-black/35 text-sm text-end text-gray-900">
                    {formatAmount(sumCredit)}
                </td>
              </tr>
            </tbody>
          </table>
        );
      };


      return (
        <TableComponent />
      );

}


export default DstTable;