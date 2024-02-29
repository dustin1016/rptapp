import React, {useEffect, useState} from "react";
import Sidebar from "./Sidebar";
import AccountsReceivable from "./Pages/AccountsReceivable";
import TransactionLogs from "./Pages/TransactionLogs";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BsArrowLeft } from "react-icons/bs";
import Home from "./Pages/Home";
function App() {
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  const [isHeadPc, setIsHeadPc] = useState(false);


  useEffect(()=>{
    document.title = 'Princtech Accounting Reports';
      //check client IP address
  const netCheck = async () => {
    try {
      const response = await fetch(`http://10.125.0.222:8080/rptApi/index.php/netCheck`); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const result = await response.json();
  
      const ip = result.ip;
      if (ip === '10.125.10.106'){
        setIsHeadPc(true);
      } else {
        setIsHeadPc(false);
      }
    } catch (error) {
      console.log('Error fetching data: ' + error.message); // Set error message to state
    }
  };

  netCheck();
  }, [])
  return (
    <Router>
      <div className="flex">
        <Sidebar setIsMenuHovered={setIsMenuHovered}/>
        <div className={`${isMenuHovered ? 'pl-44' : 'pl-16'} rm-padding`}>
          <Routes>
            <Route path="/accounts-receivable" element={<AccountsReceivable isHeadPc={isHeadPc} />} />
            <Route path="/transaction-logs" element={<TransactionLogs isHeadPc={isHeadPc} />} />
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
