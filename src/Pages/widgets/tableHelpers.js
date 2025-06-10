export const renderAmountDueAging = (accounts) => {
    const agingCategories = ['over90', '91to365', 'over1Year', 'over2Years', 'over3YearsOnwards'];
  
    const balancesByCategory = calculateAgingBalances(accounts);
  
    return agingCategories.map((category, index) => (
      <td key={index} className="py-2 px-4 text-end border border-black/35">
        {formatCurrency(balancesByCategory[category])}
      </td>
    ));
  };


  export const formatToDateNum = (datetimeStr) => {
    if (!datetimeStr) return '';

      const date = new Date(datetimeStr);
      if (isNaN(date)) return '';

  const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return `${month}/${day}/${year}`;
  }
  export const formatCurrency = (amount) => {
    // Format the amount as a number with two decimal places
    const formattedAmount = amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
     
    // Ensure there are always two decimal places
    return formattedAmount.includes('.') ? formattedAmount : `${formattedAmount}.00`;
   };

   export   const formatAmount = (amountString) => {
    //format amount from transaction logs data
    const amount = parseFloat(amountString).toFixed(2);
    const formattedAmount = formatter.format(amount);
 
    //remove currency symbol
    // return formattedAmount.substring(1);
    return formattedAmount.replace('₱', '');

  };

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency:'PHP',
   
  
    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: 2, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
  });
  
 export   const formatTime = (timeString) => {
  const date = new Date(`2000-01-01 ${timeString}`);
  const formattedTimeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return formattedTimeString.replace('AM','').replace('PM', '')
};

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
      <td key={index} className="border border-black/35 py-2 px-4 text-end">
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


  export const calculateTotalBalanceAndAgingByCollege = (students) => {
    const balancesByCollege = {};
    const agingCategories = ['over90', '91to365', 'over1Year', 'over2Years', 'over3YearsOnwards'];
  
    students.forEach(student => {
      const collegeId = student.collegeid;
  
      if (!balancesByCollege[collegeId]) {
        balancesByCollege[collegeId] = {
          totalBalance: 0,
          agingByCategory: {
            over90: 0,
            '91to365': 0,
            over1Year: 0,
            over2Years: 0,
            over3YearsOnwards: 0,
          },
        };
      }
  
      balancesByCollege[collegeId].totalBalance += calculateTotalBalance(student.accounts);
  
      const studentAgingBalances = calculateAgingBalances(student.accounts);
      agingCategories.forEach(category => {
        balancesByCollege[collegeId].agingByCategory[category] += studentAgingBalances[category];
      });
    });
  
    return balancesByCollege;
  };

  export   const calculateTotalBalance = (accounts) => {
    // Calculate total balance
    const totalBalance = accounts.reduce((total, reg) => total + reg.balance, 0);

    // return totalBalance !== 0 ? totalBalance : 0;
    return totalBalance;
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

  