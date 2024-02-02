import React from "react";
import { formatAmount } from "./tableHelpers";

const TransactionLogSummary = ({
    cashierSummary,
    grantAidSummary,
    schoSummary,
    specialClassSummary,
    assessmentSummary,
    addingSummary,
    changingSummary,
    droppingSummary
}) => {

  
    //get the credit summary
    const creditSummary = (parseFloat(assessmentSummary) < 0 ? parseFloat(assessmentSummary) : 0) + (parseFloat(changingSummary) >= 0 ? parseFloat(changingSummary) : 0) + parseFloat(cashierSummary) + parseFloat(schoSummary) + parseFloat(grantAidSummary) + parseFloat(droppingSummary);
        
    //get the debits/receivables
    const debitSummary = (parseFloat(assessmentSummary) >= 0 ? parseFloat(assessmentSummary) : 0) + (parseFloat(changingSummary) < 0 ? parseFloat(changingSummary) : 0) + parseFloat(specialClassSummary) + parseFloat(addingSummary);
    return(
        <div className="w-[28rem]">
             <h1 className='text-md font-semibold my-3 npr'>Summary:</h1>
            <table className="bg-white mb-6 text-xs w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th className="border-b-2 font-semibold text-center">DEBITS</th>
                        <th className="border-b-2 font-semibold text-center">CREDITS</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>CASHIER COLLECTIONS</td>
                        <td></td>
                        <td className="text-end">{formatAmount(cashierSummary)}</td>
                    </tr>

                    <tr>
                        <td>GRANT AND AID</td>
                        <td></td>
                        <td className="text-end">{formatAmount(grantAidSummary)}</td>
                    </tr>

                    <tr>
                        <td>FREE HIGHER EDUCATION</td>
                        <td></td>
                        <td className="text-end">{formatAmount(schoSummary)}</td>
                    </tr>

                    <tr>
                        <td>DROPPING</td>
                        <td></td>
                        <td className="text-end">{formatAmount(droppingSummary)}</td>
                    </tr>

                    <tr>
                        <td>ASSESSMENT</td>
                        <td className="text-end">{parseFloat(assessmentSummary) >= 0 ? formatAmount(assessmentSummary): ''}</td>
                        <td className="text-end">{parseFloat(assessmentSummary) < 0 ? formatAmount(assessmentSummary) : ''}</td>
                    </tr>

                    <tr>
                        <td>ADDING</td>
                        <td className="text-end">{parseFloat(addingSummary) >= 0 ? formatAmount(addingSummary): ''}</td>
                        <td className="text-end">{parseFloat(addingSummary) < 0 ? formatAmount(addingSummary) : ''}</td>
                    </tr>

                    <tr>
                        <td>SPECIAL CLASS</td>
                        <td className="text-end">{formatAmount(specialClassSummary)}</td>
                        <td></td>
                    </tr>

                    <tr className="border-b-2 border-black/50">
                        <td>CHANGING</td>
                        <td className="text-end">{parseFloat(changingSummary) >= 0 ? formatAmount(changingSummary): ''}</td>
                        <td className="text-end">{parseFloat(changingSummary) < 0 ? formatAmount(changingSummary) : ''}</td>
                    </tr>
                       
                    <tr className="border-b-4 border-black/50">
                        <td className="font-bold">TOTAL</td>
                        <td className="text-end text-sm font-semibold">{formatAmount(debitSummary)}</td>
                        <td className="text-end text-sm font-semibold">{formatAmount(creditSummary)}</td>
                    </tr>
                        
                    
                </tbody>
            </table>
        </div>
    )


}


export default TransactionLogSummary;