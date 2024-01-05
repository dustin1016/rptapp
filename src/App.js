import React, {useState, useEffect} from "react";
import Sidebar from "./Sidebar";
import AccountsReceivable from "./Pages/AccountsReceivable";
import TransactionLogs from "./Pages/TransactionLogs";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  useEffect(()=>{
    console.log(isMenuHovered)
  }, [isMenuHovered])
  return (
    <Router>
      <div className="flex">
        <Sidebar setIsMenuHovered={setIsMenuHovered}/>
        <div className={`${isMenuHovered ? 'pl-44' : 'pl-16'}`}>
          <Routes>
            <Route path="/accounts-receivable" element={<AccountsReceivable />} />
            <Route path="/transaction-logs" element={<TransactionLogs />} />
            {/* Add more routes as needed */}
            <Route path="*" element={<h1>Page Not Found</h1>} /> {/* Fallback route for 404 */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
