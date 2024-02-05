import React, { useState } from 'react';
import { GiMoneyStack } from 'react-icons/gi';
import { GrTransaction } from 'react-icons/gr';
import { Link } from 'react-router-dom';

const Sidebar = ({setIsMenuHovered}) => {
  const [isHovered, setIsHovered] = useState(false);
  const menuItems = [
    { path: '/accounts-receivable', item: 'Accounts Receivable', icon: <GiMoneyStack className="w-10 h-10" /> },
    { path: '/transaction-logs', item: 'Transaction Logs', icon: <GrTransaction className="w-10 h-10" /> },
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
      <div className="flex flex-col">
      {menuItems.map((menuItem, index) => (
        <Link key={index} to={menuItem.path} className="text-white text-sm hover:bg-gray-700 hover:border-gray-500 hover:border-2 hover:rounded-sm flex flex-col items-center py-2 px-3 cursor-pointer mb-4">
          {menuItem.icon}
          <span>{menuItem.item}</span>
        </Link>
      ))}
      </div>
    </div>
  );
};

export default Sidebar;
