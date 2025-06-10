import React from "react";
import { formatToDateNum, formatAmount } from "./tableHelpers";

const DetailedCollectionTable = ({data}) => {

   console.log(data)
      // Show loading or empty states properly
  if (!data || !data[0].particulars) {
    return <div>Loading...</div>; // while data is still being fetched
  }

 if (!data || data.length === 0 || !data[0].particulars) {
    return <div>No data available.</div>;
  }

  // Get all unique acctname + accountid pairs
  const accountMap = {};
  data.forEach((item) => {
    item.particulars.forEach(({ acctname, accountid }) => {
      accountMap[acctname] = accountid;
    });
  });

  // Sort acctnames alphabetically
  const sortedAcctnames = Object.keys(accountMap).sort();

    // Prepare totals
  let totalAmount = 0;
  const totalsByAcctname = {};
  sortedAcctnames.forEach((name) => {
    totalsByAcctname[name] = 0;
  });
  return (
    <table className="table-auto  text-xs font-light border-collapse border border-gray-400 w-full ">
        <thead>
            {/* Top row with grouped headers */}
            <tr className="bg-gray-100">
                <th colSpan={2} className="border  border-gray-400 px-2 py-2 text-center text-xs font-light">
                Office Receipt / Report of Collections by Sub-Collector
                </th>
                <th className="border border-gray-400 px-2 py-2 text-center text-xs font-light" rowSpan={2}>
                Payor
                </th>
                <th className="border border-gray-400 px-2 py-2 text-center text-xs font-light" rowSpan={2}>
                Amount
                </th>
                <th colSpan={sortedAcctnames.length} className="border border-gray-400 px-2 py-2 text-center text-xs font-light">
                Amount Breakdown
                </th>
            </tr>

            {/* Second row with individual headers */}
            <tr className="bg-gray-200">
                <th className="border border-gray-400 p-1 text-xs font-light">Transdate</th>
                <th className="border border-gray-400 p-1 text-xs font-light">Reference No</th>
                {sortedAcctnames.map((name) => (
                <th key={accountMap[name]} className="border border-gray-400 p-1 text-xs font-light">
                    {name}
                </th>
                ))}
            </tr>
        </thead>

      <tbody>
        {data.map((item, index) => {
          const particularMap = {};
          item.particulars.forEach(({ acctname, credit }) => {
            particularMap[acctname] = parseFloat(credit);
            totalsByAcctname[acctname] += parseFloat(credit);
          });

          totalAmount += parseFloat(item.amount);

          return (
            <tr key={index}>
              <td className="border border-gray-400 p-1">{formatToDateNum(item.transdate)}</td>
              <td className="border border-gray-400 p-1">{item.referenceno}</td>
              <td className="border border-gray-400 p-1  whitespace-nowrap">{item.payor}</td>
              <td className="border border-gray-400 p-1 text-right">
                {/* {parseFloat(item.amount).toFixed(2)} */}
                {formatAmount(item.amount)}
              </td>
              {sortedAcctnames.map((name) => (
                <td key={name} className="border border-gray-400 p-1 text-right">
                  {particularMap[name] ? formatAmount(particularMap[name]) : <p className="text-center">-</p>}
                </td>
              ))}
            </tr>
          );
        })}
        <tr className="font-semibold bg-gray-100">
          <td className="border border-gray-400 p-1 text-center font-semibold" colSpan={3}>
            TOTAL COLLECTION PER ACCOUNTS
          </td>
          <td className="border border-gray-400 p-1 text-right">
            {formatAmount(totalAmount)}
          </td>
          {sortedAcctnames.map((name) => (
            <td key={name} className="border border-gray-400 p-1 text-right">
              {totalsByAcctname[name] > 0 ? formatAmount(totalsByAcctname[name]) : ''}
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );

}

export default DetailedCollectionTable;