import React from 'react';
import {  formatAmount } from './tableHelpers';
const RcdTable = ({ data }) => {
  const groupByClassname = (items) => {
    return items.reduce((acc, curr) => {
      const { classname } = curr;
      if (!acc[classname]) acc[classname] = [];
      acc[classname].push(curr);
      return acc;
    }, {});
  };

  const renderNonParticulars = () => {
    const grouped = groupByClassname(data.nonParticulars);

    return Object.entries(grouped).map(([classname, entries], i) => {
      const total = entries.reduce((sum, e) => sum + parseFloat(e.amount), 0).toFixed(2);

      return (
        <React.Fragment key={`non-${i}`}>
          <tr className="bg-orange-500 text-black font-semibold">
            <td className="border px-2 py-1">{classname.toUpperCase()}</td>
            <td className="border px-2 py-1"></td>
            <td className="border px-2 py-1"></td>
            <td className="border px-2 py-1 text-right">{formatAmount(total)}</td>
          </tr>
          {entries.map((entry, j) => (
            <tr key={`non-entry-${j}`}>
              <td className="border px-2 py-1 pl-4">{entry.acctName}</td>
              <td className="border px-2 py-1"></td>
              <td className="border px-2 py-1 text-right">{formatAmount(entry.amount)}</td>
              <td className="border px-2 py-1"></td>
            </tr>
          ))}
        </React.Fragment>
      );
    });
  };

  const renderParticulars = () => {
    const grouped = groupByClassname(data.particulars);

    return Object.entries(grouped).map(([classname, entries], i) => {
      const groupedByAcct = entries.reduce((acc, entry) => {
        if (!acc[entry.acctName]) acc[entry.acctName] = [];
        acc[entry.acctName].push(entry);
        return acc;
      }, {});
      const classTotal = entries.reduce((sum, e) => sum + parseFloat(e.amount), 0).toFixed(2);

      return (
        <React.Fragment key={`part-${i}`}>
          <tr className="bg-orange-500 text-black font-semibold">
            <td className="border px-2 py-1">{classname.toUpperCase()}</td>
            <td className="border px-2 py-1"></td>
            <td className="border px-2 py-1"></td>
            <td className="border px-2 py-1 text-right">{formatAmount(classTotal)}</td>
          </tr>
          {Object.entries(groupedByAcct).map(([acctName, acctEntries], j) =>
            acctEntries.map((entry, k) => (
              <tr key={`part-entry-${j}-${k}`}>
                <td className="border px-2 py-1 pl-4">{acctName}</td>
                <td className="border px-2 py-1">{`OR No. ${entry.referenceno}`}</td>
                <td className="border px-2 py-1 text-right">{formatAmount(entry.amount)}</td>
                <td className="border px-2 py-1"></td>
              </tr>
            ))
          )}
        </React.Fragment>
      );
    });
  };


const calculateGrandTotal = () => {
    const nonTotal = data.nonParticulars.reduce((sum, e) => sum + parseFloat(e.amount), 0);
    const partTotal = data.particulars.reduce((sum, e) => sum + parseFloat(e.amount), 0);
    const final = formatAmount((nonTotal + partTotal).toFixed(2))
    return final;
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="table-auto w-full border-collapse border text-sm">
        <thead>
          <tr className="bg-gray-200 font-semibold">
            <th className="border px-2 py-1 text-center" colSpan={3}>Particulars</th>
            {/* <th className="border px-2 py-1 text-left">Reference No.</th>
            <th className="border px-2 py-1 text-right">Total</th> */}
            <th className="border px-2 py-1 text-right">Amount</th>
          </tr>
        </thead>
        <tbody>
          {renderNonParticulars()}
          {renderParticulars()}
          <tr className="text-black font-bold">
            <td className="border px-2 py-1 text-left" colSpan={3}>Total Collections Per O.R. No. {data.beginningOR} - {data.endingOR}</td>
           
            <td className="border px-2 py-1 text-right">₱ {calculateGrandTotal()}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default RcdTable;
