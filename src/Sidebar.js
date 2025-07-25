import React, { useState } from 'react';
import { GiMoneyStack } from 'react-icons/gi';
import { GrTransaction } from 'react-icons/gr';
import { Link } from 'react-router-dom';
import { GiPostStamp } from "react-icons/gi";
import { BiReceipt } from "react-icons/bi";
import { FaCashRegister } from "react-icons/fa";
const Sidebar = ({setIsMenuHovered, isHeadPc}) => {
  const [isHovered, setIsHovered] = useState(false);
  const menuItems = [
    { path: '/accounts-receivable', item: 'Accounts Receivable', isHeadPc:true, icon: <GiMoneyStack className="w-8 h-8" /> },
    { path: '/soa', item: 'SOA', isHeadPc:true, icon: <BiReceipt className="w-8 h-8" /> },
    { path: '/transaction-logs', item: 'Transaction Logs',isHeadPc:true, icon: <GrTransaction className="w-8 h-8" /> },
    // { path: '/docstamp', item: 'Documentary Stamp Tax',isHeadPc:false, icon: <GiPostStamp className="w-8 h-8" /> },
    { path: '/collections', item: 'Summary of Collections' ,isHeadPc:true, icon: <FaCashRegister className="w-8 h-8" /> },
    { path: '/rcd', item: 'Report of Collections and Deposits' ,isHeadPc:true, icon: <FaCashRegister className="w-8 h-8" /> },
  ];
  const handleMouseEnter = () => {
    setIsHovered(true);
    setIsMenuHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsMenuHovered(false);
  };

  return (
    <div
      className={`bg-gray-800 text-white w-40 h-screen flex flex-col items-center justify-center fixed top-0 left-0 transition-all ease-in-out duration-300 npr ${
        isHovered ? 'translate-x-0 opacity-100' : '-translate-x-36 opacity-60'
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <p className="mb-4 text-2xl">Menu</p>
      <div className="flex flex-col text-center">
      {menuItems.map((menuItem, index) => (
        // menuItem.isHeadPc === isHeadPc && 
        <Link key={index} to={menuItem.path} className="text-white text-xs hover:bg-gray-700 hover:border-gray-500 hover:border-2 hover:rounded-sm flex flex-col items-center py-2 px-3 cursor-pointer mb-4">
          {menuItem.icon}
          <span>{menuItem.item}</span>
        </Link>
      ))}
      </div>
    </div>
  );
};

export default Sidebar;
