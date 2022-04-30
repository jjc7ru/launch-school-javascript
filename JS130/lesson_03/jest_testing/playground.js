const createBankAccount = (function() {
  let deposits;
  let withdrawals;
  let balance;
  let transactionId;

  return {
    init(initialBalance) {
      deposits = [];
      withdrawals = [];
      balance = initialBalance;
      transactionId = 0;
      return this;
    },
    getTransactionId() {
       transactionId += 1;
       return transactionId;
    },
    getBalance() {
      return balance;
    },
    deposit(amount) {
      balance += amount;
      deposits.push([this.getTransactionId(), amount]);
    },
    withdraw(amount) {
      if (amount > balance) {
        amount = balance;
      }

      balance -= amount;
      withdrawals.push([this.getTransactionId(), amount]);
    },
    getDeposits() {
      let depositString = JSON.stringify(deposits)
      return JSON.parse(depositString);
    },
    getWithdrawals() {
      let withdrawalString = JSON.stringify(withdrawals);
      return JSON.parse(withdrawalString);
    },
  };
})();

let account = Object.create(createBankAccount).init(10);
account.deposit(100);
account.deposit(200);
console.log(account.deposits); // undefined
console.log(account.getDeposits()); // [ [1, 100], [2, 200] ]

// An attempt to change the content of deposits
let testDeposits = account.getDeposits();
console.log(testDeposits); // [ [1, 100], [2, 200] ]
testDeposits[0] = 'hello';
console.log(testDeposits); // [ 'hello', [ 2, 200 ] ] 
console.log(account.getDeposits()); // [ [1, 100], [2, 200] ]
testDeposits[0][0] = 'bye';
console.log(account.getDeposits()); // [ [1, 100], [2, 200] ]

console.log(account.balance); // undefined
console.log(account.getBalance()); // 310

account.withdraw(10);
console.log(account.withdrawals);
console.log(account.getWithdrawals()); // [[3, 10]]

console.log(account.transactionId); // undefined

let testWithdrawls = account.getWithdrawals(); 
console.log(testWithdrawls); // [ [3, 10] ]
testWithdrawls[0] = 'hello'; 
console.log(testWithdrawls); // [ 'hello']
console.log(account.getWithdrawals()); // [ [3, 10] ]
testWithdrawls[0][0] = 'bye';
console.log(account.getWithdrawals()); // [ [3, 10] ]
