import React, {useState} from "react";
import Sidebar from "./Sidebar";
import AccountsReceivable from "./Pages/AccountsReceivable";
import TransactionLogs from "./Pages/TransactionLogs";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BsArrowLeft } from "react-icons/bs";
import Home from "./Pages/Home";
function App() {
  const [isMenuHovered, setIsMenuHovered] = useState(false);
  
 
  return (
    <Router>
      <div className="flex">
        <Sidebar setIsMenuHovered={setIsMenuHovered}/>
        <div className={`${isMenuHovered ? 'pl-44' : 'pl-16'} rm-padding`}>
          <Routes>
            <Route path="/accounts-receivable" element={<AccountsReceivable />} />
            <Route path="/transaction-logs" element={<TransactionLogs />} />
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
