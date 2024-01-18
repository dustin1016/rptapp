export const renderAmountDueAging = (accounts) => {
    const agingCategories = ['over90', '91to365', 'over1Year', 'over2Years', 'over3YearsOnwards'];
  
    const balancesByCategory = calculateAgingBalances(accounts);
  
    return agingCategories.map((category, index) => (
      <td key={index} className="py-2 px-4 text-end border border-slate-300">
        {formatCurrency(balancesByCategory[category])}
      </td>
    ));
  };


  export const formatCurrency = (amount) => {
    // Format the amount as a number with two decimal places
    const formattedAmount = amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
     
    // Ensure there are always two decimal places
    return formattedAmount.includes('.') ? formattedAmount : `${formattedAmount}.00`;
   };
  
//   export const renderTotalAging = (totalBalance) => {
//     const agingCategories = ['over90', '91to365', 'over1Year', 'over2Years', 'over3YearsOnwards'];
  
//     const balancesByCategory = calculateAgingBalancesForTotal(totalBalance);
  
//     return agingCategories.map((category, index) => (
//       <td key={index} className="bg-gray-200 py-2 px-4">
//         {formatCurrency(balancesByCategory[category])}
//       </td>
//     ));
//   };

// export const renderTotalAging = (totalBalance, students) => {
//     const agingCategories = ['over90', '91to365', 'over1Year', 'over2Years', 'over3YearsOnwards'];
  
//     const balancesByCategory = calculateAgingBalancesForTotal(totalBalance);
  
//     students.forEach(student => {
//       const studentAgingBalances = calculateAgingBalances(student.accounts);
//       agingCategories.forEach(category => {
//         balancesByCategory[category] += studentAgingBalances[category];
//       });
//     });
  
//     return agingCategories.map((category, index) => (
//       <td key={index} className=" py-2 px-4 text-end border border-slate-300">
//         {formatCurrency(balancesByCategory[category])}
//       </td>
//     ));
//   };

export const renderTotalAging = (students) => {
    const agingCategories = ['over90', '91to365', 'over1Year', 'over2Years', 'over3YearsOnwards'];
  
    const balancesByCategory = {
      over90: 0,
      '91to365': 0,
      over1Year: 0,
      over2Years: 0,
      over3YearsOnwards: 0,
    };
  
    students.forEach(student => {
      const studentAgingBalances = calculateAgingBalances(student.accounts);
      agingCategories.forEach(category => {
        balancesByCategory[category] += studentAgingBalances[category];
      });
    });
  
    return agingCategories.map((category, index) => (
      <td key={index} className="border border-slate-300 py-2 px-4 text-end">
        {formatCurrency(balancesByCategory[category])}
      </td>
    ));
  };
  
  export const calculateAgingBalances = (accounts) => {
    const currentDate = new Date();
    const agingCategories = {
      over90: 0,
      '91to365': 0,
      over1Year: 0,
      over2Years: 0,
      over3YearsOnwards: 0,
    };
  
    accounts.forEach(accounts => {
      const regDate = new Date(accounts.acctDate);
    
      const daysDiff = Math.floor((currentDate - regDate) / (1000 * 60 * 60 * 24));
  
      if (daysDiff < 90) {
        agingCategories.over90 += accounts.balance;
      }
  
      if (daysDiff > 90 && daysDiff <= 365) {
        agingCategories['91to365'] += accounts.balance;
      }
  
      if (daysDiff > 365 && daysDiff <= 365 * 2) {
        agingCategories.over1Year += accounts.balance;
      }
  
      if (daysDiff > 365 * 2 && daysDiff <= 365 * 3) {
        agingCategories.over2Years += accounts.balance;
      }
  
      if (daysDiff > 365 * 3) {
        agingCategories.over3YearsOnwards += accounts.balance;
      }
    });
  
    return agingCategories;
  };
  
  export const calculateAgingBalancesForTotal = (totalBalance) => {
    const agingCategories = {
      over90: 0,
      '91to365': 0,
      over1Year: 0,
      over2Years: 0,
      over3YearsOnwards: 0,
    };
  
    if (totalBalance !== null) {
      agingCategories.over90 += totalBalance;
    }
  
    return agingCategories;
  };

  