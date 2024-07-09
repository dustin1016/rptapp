import React, {useState, useEffect, useRef} from 'react';
import colleges from '../../data/college';
import { formatCurrency } from './tableHelpers';
import { IoMdPrint } from "react-icons/io";
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { FaFileExcel } from "react-icons/fa";
import { format } from 'date-fns';
const formatDate = (dateString) => {
    //returns 2024-01-01 as Jan. 1, 2024
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const formattedString = new Date(dateString).toLocaleDateString('en-US', options);
  
    return formattedString;
  };


const SoaTable = ({data, isHeadPc, termName, termId}) => {
    const [selectedCollegeId, setSelectedCollegeId] = useState('1');
    const [formattedDate, setFormattedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const handleCollegeIdChange = (event) => {
        setSelectedCollegeId(event.target.value);
    };

    const printableRef = useRef(null);

    const handlePrint = () => {
        const printWindow = window.open('', '_blank');
        const printableContent = printableRef.current.innerHTML;
      
        if (printWindow) {
          printWindow.document.write(`<!DOCTYPE html><html><head><title>PSU ${formatDate(formattedDate)} Statement of Accounts</title>`);
          printWindow.document.write('<link rel="stylesheet" href="/print-styles.css" type="text/css" />');
          printWindow.document.write('</head><body>');
          printWindow.document.write(printableContent);
          printWindow.document.write('<div class="w-full-flex mt-6">');
          printWindow.document.write('<p class="text-xs font-semibold">Prepared By:</p>');
          printWindow.document.write('<p class="text-xs font-semibold">Approved By:</p>');
          printWindow.document.write('</div>');
          printWindow.document.write('</body></html>');
          printWindow.document.close();
          setTimeout(() => {
            printWindow.print();
          }, 300);
        } else {
          console.error('Failed to open print window');
        }
       };

    
    const calculateSubtotals = (assessments) => {
        return assessments.reduce((acc, assessment) => {
            const debit = parseFloat(assessment.Debit) || 0;
            const payments = parseFloat(assessment.Payments) || 0;
            const discount = parseFloat(assessment.Discount) || 0;
    
            acc.debit += debit;
            acc.payments += payments;
            acc.discount += discount;
    
            return acc;
        }, { debit: 0, payments: 0, discount: 0 });
    };
    

    const groupByStudentAndTerm = (data) => {
        const groupedData = {};
    
        data.forEach(student => {
            const studentName = student.StudentName;
            const studentNo = student.studentno;
            const studentCourse = student.StudentCourse;
    
            if (!groupedData[studentName]) {
                groupedData[studentName] = {
                    studentNo,
                    studentCourse,
                    latestRegistration: null,
                    pastAssessments: [],
                    grandTotal: {
                        debit: 0,
                        payments: 0,
                        discount: 0,
                        balance: 0
                    }
                };
            }
    
            if (student.registrations && Array.isArray(student.registrations)) {
                student.registrations.forEach(registration => {
                    const termid = parseInt(registration.termid, 10);
                    if (!groupedData[studentName].latestRegistration || termid > groupedData[studentName].latestRegistration.termid) {
                        if (groupedData[studentName].latestRegistration) {
                            groupedData[studentName].pastAssessments.push(...groupedData[studentName].latestRegistration.assessment);
                        }
                        groupedData[studentName].latestRegistration = { ...registration, termid };
                    } else {
                        groupedData[studentName].pastAssessments.push(...registration.assessment);
                    }
                });
            }
    
            // Calculate grand total
            const allAssessments = [
                ...groupedData[studentName].latestRegistration.assessment,
                ...groupedData[studentName].pastAssessments
            ];
    
            groupedData[studentName].grandTotal = calculateSubtotals(allAssessments);
    
            // Calculate balance
            groupedData[studentName].grandTotal.balance = groupedData[studentName].grandTotal.debit - groupedData[studentName].grandTotal.payments - groupedData[studentName].grandTotal.discount;
        });
    
        return groupedData;
    };








   

    const groupedData = groupByStudentAndTerm(data);
   

    const filteredData = selectedCollegeId
    ? Object.keys(groupedData).reduce((acc, studentName) => {
        const student = groupedData[studentName];
        if (data.find(s => s.StudentName === studentName && s.collegeid === selectedCollegeId)) {
            acc[studentName] = student;
        }
        return acc;
    }, {})
    : groupedData;
    return (
        <div className="p-4 relative">
                <div className='flex flex-col fixed top-5 right-4 h-40'>
                    <button className="bg-blue-500 hover:bg-blue-700 w-24 mb-6  text-center text-white font-semibold py-2 px-4 rounded"
                    onClick={handlePrint}
                    >
                    <IoMdPrint className='text-6xl' />
                    <p className='text-xs'>PRINT</p>
                    </button>
                    {isHeadPc &&   <DownloadTableExcel
                                filename={`Accounts Receivable as of ${formatDate(formattedDate)}`}
                                sheet="Accounts"
                                currentTableRef={printableRef.current}
                            >

                            <button className='bg-green-500 hover:bg-green-700 w-24 text-center text-white font-semibold py-2 px-4 rounded'>
                            <FaFileExcel className='text-6xl' />
                            <p className='text-xs'>Export Excel</p></button>

                            </DownloadTableExcel>}
                </div>
             <div className="mb-4">
                <label htmlFor="collegeId" className="block text-sm font-medium text-gray-700">Select College:</label>
                <select
                    id="collegeId"
                    value={selectedCollegeId}
                    onChange={handleCollegeIdChange}
                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-600 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                >
                    <option value="">All</option>
                    {[...new Set(data.map(student => student.collegeid))].map(collegeId => (
                        <option key={collegeId} value={collegeId}>{colleges.find(x=>x.collegeid === parseInt(collegeId)).collegeName}</option>
                    ))}
                 
                </select>
            </div>
            <div id='printable' className='breaks' ref={printableRef}>

            <p className='text-md text-center font-semibold'>PALAWAN STATE UNIVERSITY</p>
                        <p className='text-sm text-center font-semibold uppercase'>Statement of Account</p>
                        <p className='text-sm text-center font-semibold uppercase'>{selectedCollegeId !== '' ? colleges.find(x=>x.collegeid === parseInt(selectedCollegeId)).collegeName : 'All Colleges'}</p>
                        <p className='text-sm text-center font-semibold'>For the Term: {termName}</p>      
                        <p className='text-sm text-center font-semibold'>As Of: {formatDate(formattedDate)}</p>
           


                {Object.keys(filteredData).map((studentName, index) => (
                <div key={studentName} className={`mb-8 ${index > 0 && 'pagebreak'} `}>
                    
                    
                    <h2 className="text-xs font-semibold mb-2">Name: {studentName}</h2>
                    <h2 className="text-xs font-semibold mb-2">Student No: {filteredData[studentName].studentNo}</h2>
                    <h2 className="text-xs font-semibold mb-2">Course/Program: {filteredData[studentName].studentCourse}</h2>
                    <div className="mb-6 ml-10">
                        <h3 className="text-md font-medium mb-2">{filteredData[studentName].latestRegistration.AYTerm}</h3>
                        <table className="table-fixed bg-white border-collapse border border-slate-400 text-xs">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-black/35 px-4 py-2">Account Name</th>
                                    <th className="border border-black/35 px-4 py-2">Debit</th>
                                    <th className="border border-black/35 px-4 py-2">Payments</th>
                                    <th className="border border-black/35 px-4 py-2">Discount</th>
                                    <th className="border border-black/35 px-4 py-2">Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData[studentName].latestRegistration.assessment.map((assessment, idx) => (
                                    <tr key={idx} className="hover:bg-gray-100">
                                        <td className="border border-black/35 px-4 py-2">{assessment.AccountName}</td>
                                        <td className="border border-black/35 px-4 py-2 text-end">{formatCurrency(parseFloat(assessment.Debit))}</td>
                                        <td className="border border-black/35 px-4 py-2 text-end">{formatCurrency(parseFloat(assessment.Payments))}</td>
                                        <td className="border border-black/35 px-4 py-2 text-end">{formatCurrency(parseFloat(assessment.Discount))}</td>
                                        <td className="border border-black/35 px-4 py-2 text-end">{formatCurrency(parseFloat(assessment.Debit) -parseFloat(assessment.Payments) - parseFloat(assessment.Discount))}</td>
                                    </tr>
                                ))}
                                <tr className="bg-gray-200 font-medium">
                                    <td className="border border-black/35 px-4 py-2 text-end"><strong>Subtotals</strong></td>
                                    <td className="border border-black/35 px-4 py-2 text-end"><strong>{formatCurrency(calculateSubtotals(filteredData[studentName].latestRegistration.assessment).debit)}</strong></td>
                                    <td className="border border-black/35 px-4 py-2 text-end"><strong>{formatCurrency(calculateSubtotals(filteredData[studentName].latestRegistration.assessment).payments)}</strong></td>
                                    <td className="border border-black/35 px-4 py-2 text-end"><strong>{formatCurrency(calculateSubtotals(filteredData[studentName].latestRegistration.assessment).discount)}</strong></td>
                                    <td className="border border-black/35 px-4 py-2 text-end"><strong>{formatCurrency(calculateSubtotals(filteredData[studentName].latestRegistration.assessment).debit - calculateSubtotals(filteredData[studentName].latestRegistration.assessment).payments - calculateSubtotals(filteredData[studentName].latestRegistration.assessment).discount)}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-6 ml-10">
                        <h3 className="text-md font-medium mb-2">Past Assessments Summary</h3>
                        <table className="table-fixed bg-white border-collapse border border-slate-400 text-xs">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-black/35 px-4 py-2">Account Name</th>
                                    <th className="border border-black/35 px-4 py-2">Debit</th>
                                    <th className="border border-black/35 px-4 py-2">Payments</th>
                                    <th className="border border-black/35 px-4 py-2">Discount</th>
                                    <th className="border border-black/35 px-4 py-2">Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.keys(filteredData[studentName].pastAssessments.reduce((acc, assessment) => {
                                    acc[assessment.AccountName] = acc[assessment.AccountName] || [];
                                    acc[assessment.AccountName].push(assessment);
                                    return acc;
                                }, {})).map(accountName => {
                                    const assessments = filteredData[studentName].pastAssessments.filter(a => a.AccountName === accountName);
                                    const subtotals = calculateSubtotals(assessments);
                                    return (
                                        <React.Fragment key={accountName}>
                                            <tr className="hover:bg-gray-100">
                                                <td className="border border-black/35 px-4 py-2">{accountName}</td>
                                                <td className="border border-black/35 px-4 py-2 text-end">{formatCurrency(subtotals.debit)}</td>
                                                <td className="border border-black/35 px-4 py-2 text-end">{formatCurrency(subtotals.payments)}</td>
                                                <td className="border border-black/35 px-4 py-2 text-end">{formatCurrency(subtotals.discount)}</td>
                                                <td className="border border-black/35 px-4 py-2 text-end">{formatCurrency(subtotals.debit - subtotals.payments - subtotals.discount)}</td>
                                            </tr>
                                        </React.Fragment>
                                    );
                                })}
                                <tr className="bg-gray-200 font-medium">
                                    <td className="border border-black/35 px-4 py-2 text-end"><strong>Subtotals</strong></td>
                                    <td className="border border-black/35 px-4 py-2 text-end"><strong>{formatCurrency(calculateSubtotals(filteredData[studentName].pastAssessments).debit)}</strong></td>
                                    <td className="border border-black/35 px-4 py-2 text-end"><strong>{formatCurrency(calculateSubtotals(filteredData[studentName].pastAssessments).payments)}</strong></td>
                                    <td className="border border-black/35 px-4 py-2 text-end"><strong>{formatCurrency(calculateSubtotals(filteredData[studentName].pastAssessments).discount)}</strong></td>
                                    <td className="border border-black/35 px-4 py-2 text-end"><strong>{formatCurrency(calculateSubtotals(filteredData[studentName].pastAssessments).debit - calculateSubtotals(filteredData[studentName].pastAssessments).payments - calculateSubtotals(filteredData[studentName].pastAssessments).discount)}</strong></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-4 ml-10">
                            <h3 className="text-lg font-medium">Grand Total</h3>
                            <table className="table-fixed text-sm border border-collapse border-black/35 mt-2">
                                <tbody>
                                    <tr>
                                        <td className="border border-black/35 px-4 py-2"><strong>Total Debit:</strong></td>
                                        <td className="border border-black/35 px-4 py-2 text-end" >{formatCurrency(filteredData[studentName].grandTotal.debit)}</td>
                                    </tr>
                                    <tr >
                                        <td className="border border-black/35 px-4 py-2"><strong>Total Payments:</strong></td>
                                        <td className="border border-black/35 px-4 py-2 text-end" >{formatCurrency(filteredData[studentName].grandTotal.payments)}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-black/35 px-4 py-2"><strong>Total Discount:</strong></td>
                                        <td className="border border-black/35 px-4 py-2 text-end" >{formatCurrency(filteredData[studentName].grandTotal.discount)}</td>
                                    </tr>
                                    <tr>
                                        <td className="border border-black/35 px-4 py-2"><strong>Total Balance:</strong></td>
                                        <td className="border border-black/35 px-4 py-2 text-end">{formatCurrency(filteredData[studentName].grandTotal.debit - groupedData[studentName].grandTotal.payments - groupedData[studentName].grandTotal.discount)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <hr className='h-1 bg-black my-4' />
                </div>
            ))}



            </div>
        </div>
    );
}


export default SoaTable;