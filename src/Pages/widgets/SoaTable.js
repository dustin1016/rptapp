import {useState, useEffect} from 'react';
import colleges from '../../data/college';
import { formatCurrency } from './tableHelpers';
const SoaTable = ({data}) => {
   
    const groupByStudentAndTerm = (data) => {
        const groupedData = {};
    
        data.forEach(student => {
            const studentName = student.StudentName;
            const studentNo = student.studentno;
            const studentCourse = student.StudentCourse; // Assuming you add studentCourse in data structure
    
            if (!groupedData[studentName]) {
                groupedData[studentName] = {
                    studentNo,
                    studentCourse,
                    terms: [],
                grandTotal: {
                    debit: 0,
                    payments: 0,
                    discount: 0
                }
                };
            }
    
            if (student.registrations && Array.isArray(student.registrations)) {
                student.registrations.forEach(registration => {
                    const termid = registration.termid;
                    if (!groupedData[studentName].terms[termid]) {
                        groupedData[studentName].terms[termid] = {
                            AYTerm: registration.AYTerm,
                            SortOrder: parseInt(registration.SortOrder, 10),
                            assessment: []
                        };
                    }
                    if (registration.assessment && Array.isArray(registration.assessment)) {
                        registration.assessment.forEach(assessment => {
                            groupedData[studentName].terms[termid].assessment.push(assessment);

                             // Update grand total
                        groupedData[studentName].grandTotal.debit += parseFloat(assessment.Debit) || 0;
                        groupedData[studentName].grandTotal.payments += parseFloat(assessment.Payments) || 0;
                        groupedData[studentName].grandTotal.discount += parseFloat(assessment.Discount) || 0;
                        });
                    }
                });
            }
        });
    
        // Sort terms within each student by SortOrder
        for (const studentName in groupedData) {
            groupedData[studentName].terms = Object.values(groupedData[studentName].terms).sort((a, b) => b.SortOrder - a.SortOrder);
        }
    
        return groupedData;
    };



    const calculateSubtotals = (assessment) => {
       
        const subtotals = assessment.reduce((acc, assessment) => {
            const debit = parseFloat(assessment.Debit) || 0;
            const payments = parseFloat(assessment.Payments) || 0;
            const discount = parseFloat(assessment.Discount) || 0;
    
            acc.debit += debit;
            acc.payments += payments;
            acc.discount += discount;
    
            return acc;
        }, { debit: 0, payments: 0, discount: 0 });
    
        subtotals.balance = subtotals.debit - subtotals.payments - subtotals.discount;
    
        return subtotals;
    };

    // const calculateSubtotals = (assessments) => {
    //     return assessments.reduce((acc, assessment) => {
    //         const debit = parseFloat(assessment.Debit) || 0;
    //         const payments = parseFloat(assessment.Payments) || 0;
    //         const discount = parseFloat(assessment.Discount) || 0;
    
    //         acc.debit += debit;
    //         acc.payments += payments;
    //         acc.discount += discount;
    
    //         return acc;
    //     }, { debit: 0, payments: 0, discount: 0 });
    // };


   

    const groupedData = groupByStudentAndTerm(data);
   
    return (
        <div className="p-4 ">
            {Object.keys(groupedData).map(studentName => (
                <div key={studentName} className="mb-8 border-t-2 border-black pt-4">
                    <h2 className="text-sm font-semibold mb-4">Name: {studentName}</h2>
                    <h2 className="text-sm font-semibold mb-4">Student No: {groupedData[studentName].studentNo}</h2>
                    <h2 className="text-sm font-semibold mb-4">Course/Program: {groupedData[studentName].studentCourse}</h2>
                   

                    {groupedData[studentName].terms.map((term, index) => {
                        const subtotals = calculateSubtotals(term.assessment);

                        return (
                            <div key={index} className="mb-6 ml-10">
                                <h3 className="text-md font-medium mb-2">{term.AYTerm}</h3>
                                <table className="table-fixed text-xs border border-gray-300">
                                    <thead className="bg-gray-100">
                                        <tr>
                                            <th className="border border-gray-300 px-4 py-2">Account Name</th>
                                            <th className="border border-gray-300 px-4 py-2">Debit</th>
                                            <th className="border border-gray-300 px-4 py-2">Payments</th>
                                            <th className="border border-gray-300 px-4 py-2">Discount</th>
                                            <th className="border border-gray-300 px-4 py-2">Balance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {term.assessment.map((assessment, idx) => (
                                            <tr key={idx} className="hover:bg-gray-100">
                                                <td className="border border-gray-300 px-4 py-2">{assessment.AccountName}</td>
                                                {/* <td className="border border-gray-300 px-4 py-2">{parseFloat(assessment.Debit).toFixed(4)}</td> */}
                                                <td className="border border-gray-300 px-4 py-2 text-end">{formatCurrency(parseFloat(assessment.Debit))}</td>
                                                <td className="border border-gray-300 px-4 py-2 text-end">{formatCurrency(parseFloat(assessment.Payments))}</td>
                                                <td className="border border-gray-300 px-4 py-2 text-end">{formatCurrency(parseFloat(assessment.Discount))}</td>
                                                <td className="border border-gray-300 px-4 py-2 text-end">{formatCurrency(parseFloat(assessment.Debit) - parseFloat(assessment.Payments) - parseFloat(assessment.Discount))}</td>
                                            </tr>
                                        ))}
                                        <tr className="bg-gray-200 font-medium">
                                            <td className="border border-gray-300 px-4 py-2 text-end"><strong>Subtotals</strong></td>
                                            <td className="border border-gray-300 px-4 py-2 text-end"><strong>{formatCurrency(subtotals.debit)}</strong></td>
                                            <td className="border border-gray-300 px-4 py-2 text-end"><strong>{formatCurrency(subtotals.payments)}</strong></td>
                                            <td className="border border-gray-300 px-4 py-2 text-end"><strong>{formatCurrency(subtotals.discount)}</strong></td>
                                            <td className="border border-gray-300 px-4 py-2 text-end"><strong>{formatCurrency(subtotals.balance)}</strong></td>
                                        </tr>
                                    </tbody>
                                </table>

               
                            </div>
                        );
                    })}

                                         {/* Display Grand Total */}
                                         <div className="mt-4">
                        <h3 className="text-lg font-medium">Grand Total</h3>
                        <table className="table-fixed text-sm border border-gray-300 mt-2">
                            <tbody>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2"><strong>Total Debit:</strong></td>
                                    <td className="border border-gray-300 px-4 py-2 text-end" >{formatCurrency(groupedData[studentName].grandTotal.debit)}</td>
                                </tr>
                                <tr >
                                    <td className="border border-gray-300 px-4 py-2"><strong>Total Payments:</strong></td>
                                    <td className="border border-gray-300 px-4 py-2 text-end" >{formatCurrency(groupedData[studentName].grandTotal.payments)}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2"><strong>Total Discount:</strong></td>
                                    <td className="border border-gray-300 px-4 py-2 text-end" >{formatCurrency(groupedData[studentName].grandTotal.discount)}</td>
                                </tr>
                                <tr>
                                    <td className="border border-gray-300 px-4 py-2"><strong>Total Balance:</strong></td>
                                    <td className="border border-gray-300 px-4 py-2 text-end">{formatCurrency(groupedData[studentName].grandTotal.debit - groupedData[studentName].grandTotal.payments - groupedData[studentName].grandTotal.discount)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            ))}
        </div>
    );
}


export default SoaTable;