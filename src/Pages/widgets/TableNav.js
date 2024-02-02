import React from 'react';
import { FaRegEye , FaRegEyeSlash  } from "react-icons/fa";
import { FaMagnifyingGlassArrowRight   } from "react-icons/fa6";
const TableNav = ({ tables, visibleTables, scrollToTable, toggleTableVisibilityById }) => {
  return (
    <ul className='text-sm'>
      {tables.map(({ data, name, table }) => (
        <li key={table} className="mb-2">
          {data.length > 0 && (
            <div className='pb-2 border-b-2 border-black'>
              <p className="font-semibold mb-2">{name}</p>
              <button
                onClick={() => scrollToTable(table)}
                className="border text-black/50 hover:text-black p-1 rounded mr-2"
              >
                <FaMagnifyingGlassArrowRight  />
              </button>
              <button
                onClick={() => toggleTableVisibilityById(table)}
                className="bg-gray-300 p-1 rounded"
              >
                {visibleTables.includes(table) ? <FaRegEye/> : <FaRegEyeSlash />}
              </button>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TableNav;
