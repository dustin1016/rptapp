import React, {useEffect, useState} from "react";
import Sidebar from "./Sidebar";
import AccountsReceivable from "./Pages/AccountsReceivable";
import DocStamp from "./Pages/DocStamp";
import TransactionLogs from "./Pages/TransactionLogs";
import Soa from "./Soa";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BsArrowLeft } from "react-icons/bs";
import Home from "./Pages/Home";
import CollectionSummary from "./Pages/CollectionSummary";
import Rcd from "./Pages/Rcd";
function App() {
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [isHeadPc, setIsHeadPc] = useState(true);


  useEffect(()=>{
    document.title = 'Princtech Accounting Reports';
      //check client IP address
  const netCheck = async () => {
    try {
      const response = await fetch(`http://10.125.2.222:8080/rptApi/index.php/netCheck`); // Replace with  API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const result = await response.json();
  
      const ip = result.ip;
      // if (ip === '10.125.10.106' || ip === '10.125.50.229'){
      //   setIsHeadPc(true);
      // } else {
      //   setIsHeadPc(false);
      // }
    } catch (error) {
      console.log('Error fetching data: ' + error.message); // Set error message to state
    }
  };

  netCheck();
  }, [])
  return (
    <Router>
      <div className="flex">
        <Sidebar setIsMenuHovered={setIsMenuHovered} isHeadPc={isHeadPc}/>
        <div className={`${isMenuHovered ? 'pl-44' : 'pl-16'} rm-padding`}>
          <Routes>
          
              <Route path="/accounts-receivable" element={<AccountsReceivable isHeadPc={isHeadPc} />} />
              <Route path="/soa" element={<Soa isHeadPc={isHeadPc} />} />
              <Route path="/transaction-logs" element={<TransactionLogs isHeadPc={isHeadPc} />} />
         
              <Route path="/docstamp" element={<DocStamp isHeadPc={isHeadPc} />} />
              <Route path="/collections" element={<CollectionSummary isHeadPc={true} />} />
              <Route path="/rcd" element={<Rcd isHeadPc={true} />} />
            {/* Add more routes as needed */}
            <Route path="*" element={
           <Home />
          } /> {/* Fallback route for 404 */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
