// 1. Create an employee record
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  return {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };
}

// 2. Create multiple employee records
function createEmployeeRecords(employeeData) {
  return employeeData.map(createEmployeeRecord);
}

// 3. Create a time-in event for an employee
function createTimeInEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  this.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });
  return this;
}

// 4. Create a time-out event for an employee
function createTimeOutEvent(dateStamp) {
  const [date, hour] = dateStamp.split(" ");
  this.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour, 10),
    date,
  });
  return this;
}

// 5. Calculate hours worked on a specific date
function hoursWorkedOnDate(date) {
  const timeIn = this.timeInEvents.find((event) => event.date === date);
  const timeOut = this.timeOutEvents.find((event) => event.date === date);
  return (timeOut.hour - timeIn.hour) / 100;
}

// 6. Calculate wages earned on a specific date
function wagesEarnedOnDate(date) {
  const hoursWorked = this.hoursWorkedOnDate(date);
  return hoursWorked * this.payPerHour;
}

// 7. Find employee by first name
function findEmployeeByFirstName(srcArray, firstName) {
  return srcArray.find((employee) => employee.firstName === firstName);
}

// 8. Calculate payroll for all employees
function calculatePayroll(employeeRecords) {
  return employeeRecords.reduce((totalPay, employee) => {
    return totalPay + allWagesFor.call(employee);
  }, 0);
}
/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
    return e.date;
  });

  const payable = eligibleDates.reduce(
    function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d);
    }.bind(this),
    0
  ); // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable;
};
