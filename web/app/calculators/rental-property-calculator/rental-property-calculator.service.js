"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var RentalCalculatorService = (function () {
    function RentalCalculatorService() {
    }
    RentalCalculatorService.prototype.calculateResults = function (form) {
        return this.rentalCalculations(form);
    };
    RentalCalculatorService.prototype.generateDownPaymentPercent = function (purchasePrice, downPaymentDollarAmount) {
        return this.calculateDownPaymentPercentage(purchasePrice, downPaymentDollarAmount);
    };
    RentalCalculatorService.prototype.generateDownPaymentDollarAmount = function (purchasePrice, downPaymentPercentage) {
        return this.calculateDownPaymentDollarAmount(purchasePrice, downPaymentPercentage);
    };
    RentalCalculatorService.prototype.generateManagementFeeDollarAmount = function (triggerIndicator, form) {
        return this.calculateManagementFeeDollarAmount(triggerIndicator, form);
    };
    RentalCalculatorService.prototype.calculateManagementFeeDollarAmount = function (triggerIndicator, form) {
        var yearlyIncome = this.calculateFirstYearIncome(form);
        var monthlyIncome = yearlyIncome / 12;
        var maintenancePercent = form.m_costPercent;
        var managementPercent = form.pm_managementFeePercent;
        if (triggerIndicator === "maintenancePercent" && maintenancePercent) {
            form.m_costAmount = (maintenancePercent / 100) * monthlyIncome;
        }
        else if (triggerIndicator === "managementPercent" && managementPercent) {
            form.pm_managementFeeAmount = (managementPercent / 100) * monthlyIncome;
        }
        else if (triggerIndicator === "income") {
            if (maintenancePercent) {
                form.m_costAmount = (maintenancePercent / 100) * monthlyIncome;
            }
            if (managementPercent) {
                form.pm_managementFeeAmount = (managementPercent / 100) * monthlyIncome;
            }
        }
        else {
            form.m_costAmount = undefined;
            form.m_costPercent = undefined;
            form.pm_managementFeePercent = undefined;
            form.pm_managementFeeAmount = undefined;
        }
    };
    RentalCalculatorService.prototype.buildLoan = function () {
        return new forms_1.FormBuilder().group({
            add_bl_loanName: '',
            add_bl_loanAmount: '',
            add_bl_interest: false,
            add_bl_amortization: '',
            add_bl_balloon: '',
            add_bl_upFrontLenderPoints: '',
            add_bl_interestOnly: ''
        });
    };
    RentalCalculatorService.prototype.buildSpecialTermsLoan = function () {
        return new forms_1.FormBuilder().group({
            stl_loanName: '',
            stl_amount: '',
            stl_interest: false,
            stl_amortization: '',
            stl_balloon: '',
            stl_upFrontLenderPoints: '',
            stl_interestOption: ''
        });
    };
    RentalCalculatorService.prototype.buildUnit = function () {
        return new forms_1.FormBuilder().group({
            ri_grossMonthlyIncome: '',
            ri_unitName: ''
        });
    };
    RentalCalculatorService.prototype.buildSupplementalIncome = function () {
        return new forms_1.FormBuilder().group({
            si_description: '',
            si_grossMonthlyIncome: ''
        });
    };
    RentalCalculatorService.prototype.buildUtility = function () {
        return new forms_1.FormBuilder().group({
            add_u_name: '',
            add_u_amount: ''
        });
    };
    RentalCalculatorService.prototype.buildExpense = function () {
        return new forms_1.FormBuilder().group({
            add_e_name: '',
            add_e_cost: ''
        });
    };
    RentalCalculatorService.prototype.buildCapitalExpenditure = function () {
        return new forms_1.FormBuilder().group({
            ce_description: '',
            ce_cost: '',
            ce_date: this.getCurrentDate()
        });
    };
    RentalCalculatorService.prototype.getCurrentDate = function () {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!
        var yyyy = today.getFullYear();
        if (dd < 10) {
            dd = '0' + dd;
        }
        if (mm < 10) {
            mm = '0' + mm;
        }
        var result = mm + '/' + dd + '/' + yyyy;
        return result;
    };
    RentalCalculatorService.prototype.calculateDownPaymentDollarAmount = function (purchasePrice, downPaymentPercentage) {
        var downPaymentDollarAmount;
        //if the user has not entered purchase price return nothing
        if (purchasePrice && downPaymentPercentage) {
            downPaymentDollarAmount = this.roundToNearestDecimal(2, (downPaymentPercentage / 100) * purchasePrice);
        }
        return downPaymentDollarAmount;
    };
    RentalCalculatorService.prototype.calculateDownPaymentPercentage = function (purchasePrice, downPaymentDollarAmount) {
        var downPaymentPercentage;
        //if the user has not entered purchase price return nothing
        if (purchasePrice && downPaymentDollarAmount) {
            downPaymentPercentage = this.roundToNearestDecimal(2, (downPaymentDollarAmount / purchasePrice) * 100);
        }
        return downPaymentPercentage;
    };
    RentalCalculatorService.prototype.rentalCalculations = function (form) {
        var result = {};
        result.cashFlowProjectionTable = this.createCashFlowTable(form);
        result.cashFlowProjectionChart = this.createCashFlowProjectionComboChart(form);
        result.cashFlowSummary = this.createCashFlowSummary(form);
        result.incomePieChart = this.createIncomePieChart(form);
        result.expensePieChart = this.createExpensePieChart(form);
        result.cashOnEquityTable = this.createCashOnEquityTable(form);
        result.cashOnEquityChart = this.createCashOnEquityComboChart(form);
        result.totalReturnTable = this.createTotalReturnTable(form);
        result.totalReturnStackedBarChart = this.createTotalReturnStackedBarChart(form);
        result.totalReturnSummary = this.createTotalReturnSummary(form);
        result.summaryData = this.createSummaryData(form);
        return result;
    };
    RentalCalculatorService.prototype.createSummaryData = function (form) {
        var resultData = [];
        var income = 1;
        var expense = 2;
        var capex = 3;
        var loanPmt = 4;
        var cashFlow = 5;
        var cashOnCash = 6;
        var firstYear = 0;
        //cash flow 
        resultData.cashFlow = Math.round(form.cashFlowTableData[firstYear][cashFlow] / 12);
        //income
        resultData.income = Math.round(form.cashFlowTableData[firstYear][income] / 12);
        //expense
        resultData.expense = Math.round((form.cashFlowTableData[firstYear][expense] + form.cashFlowTableData[firstYear][loanPmt]) / 12);
        //cash on cash roi
        resultData.cashOnCash = Math.round(form.cashFlowTableData[firstYear][cashOnCash]);
        //cap rate
        //1st year income - 1st year expense / (purchase price + first year CAPEX)) ; rounded to nearest 10th decimal
        resultData.capRate = this.roundToNearestDecimal(2, ((form.cashFlowTableData[firstYear][income] - form.cashFlowTableData[firstYear][expense]) / (form.li_purchasePrice + form.cashFlowTableData[firstYear][capex])) * 100);
        return resultData;
    };
    RentalCalculatorService.prototype.createTotalReturnSummary = function (form) {
        var totalReturnData = form.totalReturnTableData;
        var sum = 0;
        var totalReturn = 4;
        var result = [];
        if (5 < totalReturnData.length) {
            result.push({ years: 5, totalReturn: 0 });
        }
        if (15 < totalReturnData.length) {
            result.push({ years: 15, totalReturn: 0 });
        }
        if (30 < totalReturnData.length) {
            result.push({ years: 30, totalReturn: 0 });
        }
        for (var i = 0; i < totalReturnData.length; i++) {
            sum += totalReturnData[i][totalReturn];
            for (var j = 0; j < result.length; j++) {
                if ((i + 1) == result[j].years) {
                    result[j].totalReturn = Math.round(sum);
                    break;
                }
            }
        }
        return result;
    };
    RentalCalculatorService.prototype.createTotalReturnStackedBarChart = function (form) {
        var result = {};
        var chartData = [];
        var rawDataArray = form.totalReturnTableData;
        var year = 0;
        var appreciation = 1;
        var loanPaydow = 2;
        var cashFlow = 3;
        var totalReturnPercent = 5;
        result.options = {
            /* This specifies to which y axis the column belongs
                0 is really the second value from the column list because
                the first one represent 'years' x axis*/
            series: {
                0: { axis: 'TotalReturnDollar', type: 'bars' },
                1: { axis: 'TotalReturnDollar', type: 'bars' },
                2: { axis: 'TotalReturnDollar', type: 'bars' },
                3: { axis: 'TotalReturnPercent', type: 'line', targetAxisIndex: 1 }
            },
            axes: {
                y: {
                    TotalReturnDollar: { label: 'Total Return ($)' },
                    TotalReturnPercent: { label: 'Total Return (%)' }
                }
            },
            hAxis: { title: 'Years' },
            vAxes: [{ minValue: 0, title: 'Total Return ($)' }, { title: 'Total Return (%)' }],
            isStacked: true,
            height: 300,
            legend: { position: 'top', maxLines: 3 }
        };
        //Add columns to the data 
        chartData.push(["Year", "Cash Flow", "Appreciation", "Loan Paydown", "Total Return (%)"]);
        //Add data rows to the data
        rawDataArray.forEach(function (row) {
            var dataRow = [];
            dataRow.push(row[year]);
            dataRow.push(row[cashFlow]);
            dataRow.push(row[appreciation]);
            dataRow.push(row[loanPaydow]);
            dataRow.push(row[totalReturnPercent]);
            chartData.push(dataRow);
        });
        result.data = chartData;
        return result;
    };
    RentalCalculatorService.prototype.createCashFlowTable = function (form) {
        var tableData = {};
        //Create Columns
        tableData.columns = ["Year", "Income ($)", "Expenses ($)", "CAPEX ($)", "Loan PMT ($)", "Cash Flow ($)", "Cash on Cash (%)"];
        //Create Rows
        //took parameter out of here tableData.columns
        tableData.rows = this.createCashFlowDataRows(form);
        //Table display options
        tableData.options = { width: '100%', height: '300px' };
        return tableData;
    };
    /*
    * Helper Function:
    * Creates the data that goes into each columns
    */
    RentalCalculatorService.prototype.createCashFlowDataRows = function (form) {
        var dataRows = [];
        var years = this.getYears(form);
        var capitalExpenditures = this.calculateCapitalExpenditures(years, form);
        var capExSumUpUntilNow = 0;
        var loanPmts = this.calculateLoanPmts(years, form);
        var incomeColumn = 1;
        var expenseColumn = 2;
        var balloonPmtsCashFlow = this.balloonPmtCashFlow(years, form);
        var lenderPointsSum = this.sumOfSpecialTermsLenderPoints(form);
        var loanSum = this.sumOfSpecialTermsLoanAmounts(form.loanInfoView, form);
        for (var i = 0; i < years; i++) {
            var column = [];
            var yearData;
            var incomeData;
            var cashFlowData;
            var cashOnCashData;
            var expenseData;
            var capExData;
            var loanPaymentData;
            yearData = i + 1;
            incomeData = this.calculateIncome(i, dataRows, incomeColumn, form);
            expenseData = this.calculateExpenses(i, dataRows, expenseColumn, incomeData, form);
            capExData = capitalExpenditures[i],
                loanPaymentData = loanPmts[i],
                cashFlowData = incomeData - expenseData - capExData - loanPaymentData;
            capExSumUpUntilNow += capExData;
            cashOnCashData = this.calculateCashOnCash(cashFlowData, capExSumUpUntilNow, lenderPointsSum, loanSum, balloonPmtsCashFlow[i], form);
            column.push(yearData);
            column.push(incomeData);
            column.push(expenseData);
            column.push(capExData);
            column.push(loanPaymentData);
            column.push(cashFlowData);
            column.push(cashOnCashData);
            dataRows.push(column);
        }
        form.cashFlowTableData = dataRows;
        return dataRows;
    };
    /*
    * Helper Function
    * Gets the amount of years for the data results
    * Years pretty much mean rows in the table
    * for special terms loans and bank loans the highest
    *  amortization get chosen
    */
    RentalCalculatorService.prototype.getYears = function (form) {
        var years = 0;
        var view = form.loanInfoView;
        if (view === "cash") {
            //aribitrarily set the years
            years = 30;
        }
        else if (view === "bankLoan") {
            var maxValue = form.bl_amortization || 0;
            var addedBankLoans = form.loans || [];
            var addedBankLoansLength = Object.keys(addedBankLoans).length;
            for (var i = 0; i < addedBankLoansLength; i++) {
                if (addedBankLoans[i].add_bl_amortization > maxValue) {
                    maxValue = addedBankLoans[i].add_bl_amortization;
                }
            }
            years = maxValue + 1;
        }
        else if (view === "specialTermsLoan") {
            var maxValue = 0;
            var specialTermsLoans = form.specialTermsLoans || [];
            var specialTermsLoansLength = Object.keys(specialTermsLoans).length;
            for (var i = 0; i < specialTermsLoansLength; i++) {
                var amortization = specialTermsLoans[i].stl_amortization || 0;
                if (amortization > maxValue) {
                    maxValue = amortization;
                }
            }
            years = maxValue + 1;
        }
        return years;
    };
    RentalCalculatorService.prototype.calculateCapitalExpenditures = function (years, form) {
        var capitalExpenditures = form.capitalExpenditures || [];
        var capitalExpendituresLength = Object.keys(capitalExpenditures).length;
        var purchasDateYear = new Date(form.li_purchaseDate).getFullYear();
        //Initialize the result array to 0 and set length of array to how many years
        var capExpArray = Array.apply(null, Array(years)).map(Number.prototype.valueOf, 0);
        for (var i = 0; i < capitalExpendituresLength; i++) {
            //To ensure the user set a cost since desc and date are always given
            if (form.capitalExpenditures[i].ce_cost) {
                var capExpYear = (new Date(capitalExpenditures[i].ce_date)).getFullYear();
                var capExpPosition = capExpYear - purchasDateYear;
                if (capExpPosition <= capExpArray.length) {
                    capExpArray[capExpPosition] = Math.round(form.capitalExpenditures[i].ce_cost);
                }
            }
        }
        return capExpArray;
    };
    RentalCalculatorService.prototype.calculateLoanPmts = function (years, form) {
        var view = form.loanInfoView;
        var addedBankLoans = form.loans || [];
        var bankLoanPmt;
        var addedBankLoansLength = Object.keys(addedBankLoans).length;
        var specialTermsLoans = form.specialTermsLoans || [];
        var specialTermsLoansLength = Object.keys(specialTermsLoans).length;
        var r;
        var p;
        var n;
        var curStlPaymentAmount;
        var yearlyLoanPayments = Array.apply(null, Array(years)).map(Number.prototype.valueOf, 0);
        //this is added so we can capture data for cash equity calcs
        form.captureLoanData = {},
            form.captureLoanData.addedBankLoans = [],
            form.captureLoanData.specialTermsLoans = [];
        if (view == "bankLoan") {
            //Calculate Bank Loan Payment
            p = form.li_purchasePrice - form.bl_downPaymentDollar;
            r = (form.bl_interest / 100) / 12;
            n = form.bl_amortization * 12;
            bankLoanPmt = (this.amortizationCalculation(r, p, n) * 12);
            //Create array of bank loan payments
            var bankLoanAmort = form.bl_amortization;
            var bankLoanPmts = Array.apply(null, Array(bankLoanAmort)).map(Number.prototype.valueOf, bankLoanPmt);
            //#For reuse purposes in different tables
            form.captureLoanData.bankLoanPmt = bankLoanPmt;
            //Creates the array of loan payments to make each year
            yearlyLoanPayments = this.combineArrays(yearlyLoanPayments, bankLoanPmts);
            //Add the other loans the user added which have a different format than reg. bank loan
            for (var i = 0; i < addedBankLoansLength; i++) {
                if (addedBankLoans[i].add_bl_interestOnly == "yes") {
                    //current loan payment for the year
                    curStlPaymentAmount = addedBankLoans[i].add_bl_loanAmount * (addedBankLoans[i].add_bl_interest / 100);
                    //Creates the array for the current loan payments for length of its amortization
                    var currentLoanAmort = addedBankLoans[i].add_bl_amortization;
                    var currentLoanArray = Array.apply(null, Array(currentLoanAmort)).map(Number.prototype.valueOf, curStlPaymentAmount);
                    //#For reuse purposes in different tables
                    form.captureLoanData.addedBankLoans.push({ pmt: curStlPaymentAmount });
                    //Add the currentLoanArray to the rest of the loan arrays
                    //since they might all have different amortizations I wrote a special function
                    yearlyLoanPayments = this.combineArrays(yearlyLoanPayments, currentLoanArray);
                    //if ballon pmt. was added, then the yearly loan payments change
                    if (addedBankLoans[i].add_bl_balloon) {
                        //Adds the Ballon Payment to the given ballon year
                        var ballonYear = addedBankLoans[i].add_bl_balloon - 1;
                        yearlyLoanPayments[ballonYear] = yearlyLoanPayments[ballonYear] + addedBankLoans[i].add_bl_loanAmount;
                        //#For reuse purposes in different tables
                        form.captureLoanData.addedBankLoans[i].ballonYear = ballonYear;
                        form.captureLoanData.addedBankLoans[i].ballonAmount = addedBankLoans[i].add_bl_loanAmount;
                        //All loanpayments after ballon payment are 0 
                        for (var j = ballonYear + 1; j < currentLoanAmort; j++) {
                            yearlyLoanPayments[j] = yearlyLoanPayments[j] - curStlPaymentAmount;
                        }
                    }
                }
                else if (addedBankLoans[i].add_bl_interestOnly == "no") {
                    //Calculate Loan Payment
                    p = addedBankLoans[i].add_bl_loanAmount;
                    r = (addedBankLoans[i].add_bl_interest / 100) / 12;
                    n = addedBankLoans[i].add_bl_amortization * 12;
                    //Current year's loan payment
                    curStlPaymentAmount = (this.amortizationCalculation(r, p, n) * 12);
                    //Creates the array for the current loan payments for length of its amortization
                    var currentLoanAmort = addedBankLoans[i].add_bl_amortization;
                    var currentLoanArray = Array.apply(null, Array(currentLoanAmort)).map(Number.prototype.valueOf, curStlPaymentAmount);
                    //#For reuse purposes in different tables
                    form.captureLoanData.addedBankLoans.push({ pmt: curStlPaymentAmount });
                    //Add the currentLoanArray to the rest of the loan arrays
                    //since they might all have different amortizations I wrote a special function
                    yearlyLoanPayments = this.combineArrays(yearlyLoanPayments, currentLoanArray);
                    //if ballon pmt. was added, then the yearly loan payments change
                    if (addedBankLoans[i].add_bl_balloon) {
                        //Adds the Ballon Payment to the given ballon year
                        var ballonYear = addedBankLoans[i].add_bl_balloon - 1;
                        var ballonAmount = this.calculateNoInterestBalloonPayoff(addedBankLoans[i].add_bl_loanAmount, addedBankLoans[i].add_bl_interest, addedBankLoans[i].add_bl_balloon, curStlPaymentAmount, form);
                        yearlyLoanPayments[ballonYear] = yearlyLoanPayments[ballonYear] + ballonAmount;
                        //#For reuse purposes in different tables
                        form.captureLoanData.addedBankLoans[i].ballonYear = ballonYear;
                        form.captureLoanData.addedBankLoans[i].ballonAmount = ballonAmount;
                        //All loanpayments after ballon payment are 0 
                        for (var j = ballonYear + 1; j < currentLoanAmort; j++) {
                            yearlyLoanPayments[j] = yearlyLoanPayments[j] - curStlPaymentAmount;
                        }
                    }
                }
            }
        }
        else if (view == "specialTermsLoan") {
            for (var i = 0; i < specialTermsLoansLength; i++) {
                if (specialTermsLoans[i].stl_interestOption == "yes") {
                    //Current year's loan payment
                    curStlPaymentAmount = specialTermsLoans[i].stl_amount * (specialTermsLoans[i].stl_interest / 100);
                    //Creates the array for the current loan payments for length of its amortization
                    var currentLoanAmort = specialTermsLoans[i].stl_amortization;
                    var currentLoanArray = Array.apply(null, Array(currentLoanAmort)).map(Number.prototype.valueOf, curStlPaymentAmount);
                    //#For reuse purposes in different tables
                    form.captureLoanData.specialTermsLoans.push({ pmt: curStlPaymentAmount });
                    //Add the currentLoanArray to the rest of the loan arrays
                    //since they might all have different amortizations I wrote a special function
                    yearlyLoanPayments = this.combineArrays(yearlyLoanPayments, currentLoanArray);
                    //if the current loan has a ballon payment
                    if (specialTermsLoans[i].stl_balloon) {
                        //Adds the Ballon Payment to the given ballon year
                        var ballonYear = specialTermsLoans[i].stl_balloon - 1;
                        yearlyLoanPayments[ballonYear] = yearlyLoanPayments[ballonYear] + specialTermsLoans[i].stl_amount;
                        //#For reuse purposes in different tables
                        form.captureLoanData.specialTermsLoans[i].ballonYear = ballonYear;
                        form.captureLoanData.specialTermsLoans[i].ballonAmount = specialTermsLoans[i].stl_amount;
                        //All loanpayments after ballon payment are 0 
                        for (var j = ballonYear + 1; j < currentLoanAmort; j++) {
                            yearlyLoanPayments[j] = yearlyLoanPayments[j] - curStlPaymentAmount;
                        }
                    }
                }
                else if (specialTermsLoans[i].stl_interestOption == "no") {
                    //calculate current year's amortization
                    p = specialTermsLoans[i].stl_amount;
                    r = (specialTermsLoans[i].stl_interest / 100) / 12;
                    n = specialTermsLoans[i].stl_amortization * 12;
                    //Current Year's loan payment
                    curStlPaymentAmount = (this.amortizationCalculation(r, p, n) * 12);
                    //Creates the array for the current loan payments for length of its amortization
                    var currentLoanAmort = specialTermsLoans[i].stl_amortization;
                    var currentLoanArray = Array.apply(null, Array(currentLoanAmort)).map(Number.prototype.valueOf, curStlPaymentAmount);
                    //#For reuse purposes in different tables
                    form.captureLoanData.specialTermsLoans.push({ pmt: curStlPaymentAmount });
                    //Add the currentLoanArray to the rest of the loan arrays
                    //since they might all have different amortizations I wrote a special function
                    yearlyLoanPayments = this.combineArrays(yearlyLoanPayments, currentLoanArray);
                    //if the current loan has a ballon payment
                    if (specialTermsLoans[i].stl_balloon) {
                        //Adds the Ballon Payment to the given ballon year
                        var ballonYear = specialTermsLoans[i].stl_balloon - 1;
                        var ballonAmount = this.calculateNoInterestBalloonPayoff(specialTermsLoans[i].stl_amount, specialTermsLoans[i].stl_interest, specialTermsLoans[i].stl_balloon, curStlPaymentAmount, form);
                        yearlyLoanPayments[ballonYear] = yearlyLoanPayments[ballonYear] + ballonAmount;
                        //#For reuse purposes in different tables
                        form.captureLoanData.specialTermsLoans[i].ballonYear = ballonYear;
                        form.captureLoanData.specialTermsLoans[i].ballonAmount = ballonAmount;
                        //All loanpayments after ballon payment are 0 
                        for (var j = ballonYear + 1; j < currentLoanAmort; j++) {
                            yearlyLoanPayments[j] = yearlyLoanPayments[j] - curStlPaymentAmount;
                        }
                    }
                }
            }
        }
        return yearlyLoanPayments;
    };
    RentalCalculatorService.prototype.amortizationCalculation = function (r, p, n) {
        var dividend = (r * (Math.pow((1 + r), n)));
        var divisor = ((Math.pow((1 + r), n)) - 1);
        return p * (dividend / divisor);
    };
    /*
    * Description: Helper function which adds each item of an array to another
    *              Since the arrays can have different lengths the shorter array will get
    *              added to the longer array
    * Parameters:  Int arrays expected, could have different lengths
    */
    RentalCalculatorService.prototype.combineArrays = function (firstArray, secondArray) {
        var length;
        var resultArray;
        var shorterArray;
        //Assign variables based on array length
        if (firstArray.length > secondArray.length) {
            length = secondArray.length;
            resultArray = firstArray;
            shorterArray = secondArray;
        }
        else {
            length = firstArray.length;
            resultArray = secondArray;
            shorterArray = firstArray;
        }
        //add each item of the shorterArray to the resultArray
        for (var i = 0; i < length; i++) {
            resultArray[i] += shorterArray[i];
        }
        return resultArray;
    };
    RentalCalculatorService.prototype.balloonPmtCashFlow = function (years, form) {
        var view = form.loanInfoView;
        var addedBankLoans = form.loans || [];
        var addedBankLoansLength = Object.keys(addedBankLoans).length;
        var specialTermsLoans = form.specialTermsLoans || [];
        var specialTermsLoansLength = Object.keys(specialTermsLoans).length;
        var balloonPmt = 0;
        var resultArray = Array.apply(null, Array(years)).map(Number.prototype.valueOf, 0);
        if (view === "bankLoan") {
            for (var i = 0; i < addedBankLoansLength; i++) {
                if (addedBankLoans[i].add_bl_interestOnly === "yes") {
                    if (addedBankLoans[i].add_bl_balloon) {
                        //Calculate Balloon Payment
                        var ballonYear = addedBankLoans[i].add_bl_balloon - 1;
                        balloonPmt = addedBankLoans[i].add_bl_loanAmount;
                    }
                }
                else if (addedBankLoans[i].add_bl_interestOnly === "no") {
                    if (addedBankLoans[i].add_bl_balloon) {
                        //Calculate Loan Payment
                        var p = addedBankLoans[i].add_bl_loanAmount;
                        var r = (addedBankLoans[i].add_bl_interest / 100) / 12;
                        var n = addedBankLoans[i].add_bl_amortization * 12;
                        //Current year's loan payment
                        var curStlPaymentAmount = (this.amortizationCalculation(r, p, n) * 12);
                        //Calculate Balloon Payment
                        var ballonYear = addedBankLoans[i].add_bl_balloon - 1;
                        balloonPmt = this.calculateNoInterestBalloonPayoff(addedBankLoans[i].add_bl_loanAmount, addedBankLoans[i].add_bl_interest, addedBankLoans[i].add_bl_balloon, curStlPaymentAmount, form);
                    }
                }
                //Amortization for current loan
                var currentLoanAmort = addedBankLoans[i].add_bl_amortization;
                //after ballon year cash flow needs to contain ballon payments 
                var currentLoanAmort = addedBankLoans[i].add_bl_amortization;
                for (var j = ballonYear + 1; j < currentLoanAmort; j++) {
                    resultArray[j] += balloonPmt;
                }
            }
        }
        else if (view === "specialTermsLoan") {
            for (var i = 0; i < specialTermsLoansLength; i++) {
                if (specialTermsLoans[i].stl_interestOption === "yes") {
                    if (specialTermsLoans[i].stl_balloon) {
                        //Adds the Ballon Payment to the given ballon year
                        var ballonYear = specialTermsLoans[i].stl_balloon - 1;
                        balloonPmt = specialTermsLoans[i].stl_amount;
                    }
                }
                else if (specialTermsLoans[i].stl_interestOption === "no") {
                    if (specialTermsLoans[i].stl_balloon) {
                        //calculate current year's amortization
                        p = specialTermsLoans[i].stl_amount;
                        r = (specialTermsLoans[i].stl_interest / 100) / 12;
                        n = specialTermsLoans[i].stl_amortization * 12;
                        //Current Year's loan payment
                        curStlPaymentAmount = (this.amortizationCalculation(r, p, n) * 12);
                        var ballonYear = specialTermsLoans[i].stl_balloon - 1;
                        balloonPmt = this.calculateNoInterestBalloonPayoff(specialTermsLoans[i].stl_amount, specialTermsLoans[i].stl_interest, specialTermsLoans[i].stl_balloon, curStlPaymentAmount, form);
                    }
                }
                //after ballon year cash flow needs to contain ballon payments 
                var currentLoanAmort = specialTermsLoans[i].stl_amortization;
                for (var j = ballonYear + 1; j < currentLoanAmort; j++) {
                    resultArray[j] += balloonPmt;
                }
            }
        }
        return resultArray;
    };
    /* Dont judge the naming convention here..terrible at naming things*/
    RentalCalculatorService.prototype.calculateNoInterestBalloonPayoff = function (loanAmount, interest, balloonYear, loanPayment, form) {
        var ballonPayoffResult;
        var interestPerMonth = (interest / 100) / 12;
        var temp = Math.pow(1 + interestPerMonth, balloonYear * 12);
        var monthlyLoanPayment = loanPayment / 12;
        var valueOne = loanAmount * temp;
        var valueTwo = monthlyLoanPayment * ((temp - 1) / (interestPerMonth));
        ballonPayoffResult = valueOne - valueTwo;
        return ballonPayoffResult;
    };
    RentalCalculatorService.prototype.sumOfSpecialTermsLenderPoints = function (form) {
        var lenderPointsSumResult = 0, view = form.loanInfoView, addedBankLoans = form.loans || [], addedBankLoansLength = Object.keys(addedBankLoans).length, specialTermsLoans = form.specialTermsLoans || [], specialTermsLoansLength = Object.keys(specialTermsLoans).length;
        if (view === 'bankLoan') {
            for (var i = 0; i < addedBankLoansLength; i++) {
                lenderPointsSumResult += addedBankLoans[i].add_bl_upFrontLenderPoints || 0;
            }
        }
        else if (view === 'specialTermsLoan') {
            for (var i = 0; i < specialTermsLoansLength; i++) {
                lenderPointsSumResult += specialTermsLoans[i].stl_upFrontLenderPoints || 0;
            }
        }
        return Math.round(lenderPointsSumResult);
    };
    RentalCalculatorService.prototype.sumOfSpecialTermsLoanAmounts = function (view, form) {
        var specialTermsLoanAmountsResult = 0;
        var addedBankLoans = form.loans || [];
        var addedBankLoansLength = Object.keys(addedBankLoans).length;
        var specialTermsLoans = form.specialTermsLoans || [];
        var specialTermsLoansLength = Object.keys(specialTermsLoans).length;
        if (view == "bankLoan") {
            for (var i = 0; i < addedBankLoansLength; i++) {
                specialTermsLoanAmountsResult += addedBankLoans[i].add_bl_loanAmount;
            }
        }
        else if (view == "specialTermsLoan") {
            for (var i = 0; i < specialTermsLoansLength; i++) {
                specialTermsLoanAmountsResult += specialTermsLoans[i].stl_amount;
            }
        }
        return specialTermsLoanAmountsResult;
    };
    RentalCalculatorService.prototype.calculateIncome = function (year, dataRows, incomeColumn, form) {
        var incomeResult;
        var rentIncrease = form.ri_annualRentIncrease || 0;
        if (year == 0) {
            incomeResult = this.calculateFirstYearIncome(form);
        }
        else {
            incomeResult = dataRows[year - 1][incomeColumn] * ((rentIncrease / 100) + 1);
        }
        return Math.round(incomeResult);
    };
    RentalCalculatorService.prototype.calculateFirstYearIncome = function (form) {
        var income;
        var supplementalIncomes = form.supplementalIncomes || [];
        var units = form.units || [];
        var supplementalIncomesLength = Object.keys(supplementalIncomes).length;
        var unitsLength = Object.keys(units).length;
        var sumOfGrossMonthlySupplementalIncome = 0;
        var sumOfGrossMonthlyUnitIncome = 0;
        for (var i = 0; i < supplementalIncomesLength; i++) {
            if (supplementalIncomes[i].si_grossMonthlyIncome) {
                sumOfGrossMonthlySupplementalIncome += supplementalIncomes[i].si_grossMonthlyIncome;
            }
        }
        for (var i = 0; i < unitsLength; i++) {
            if (units[i].ri_grossMonthlyIncome) {
                sumOfGrossMonthlyUnitIncome += units[i].ri_grossMonthlyIncome;
            }
        }
        income = (sumOfGrossMonthlySupplementalIncome + sumOfGrossMonthlyUnitIncome) * 12;
        return income;
    };
    RentalCalculatorService.prototype.calculateCashOnCash = function (cashFlowData, capExSumData, lenderPointsSum, loanSum, balloonPmt, form) {
        var cashOnCashResult;
        var view = form.loanInfoView;
        var addedBankLoans = form.loans || [];
        var closingCost = form.bl_closingCost || 0;
        var dividend = cashFlowData;
        var divisor;
        var addedBankLoansLength = Object.keys(addedBankLoans).length;
        if (view === "cash") {
            divisor = capExSumData + form.li_purchasePrice;
        }
        else if (view === "bankLoan") {
            //If there is only one bankloan
            if (addedBankLoansLength == 0) {
                divisor = capExSumData + form.bl_downPaymentDollar + closingCost + balloonPmt;
            }
            else {
                divisor = capExSumData + lenderPointsSum + form.bl_downPaymentDollar + closingCost + balloonPmt;
            }
        }
        else if (view === "specialTermsLoan") {
            divisor = capExSumData + lenderPointsSum + (form.li_purchasePrice - loanSum) + balloonPmt;
        }
        if (divisor <= 0) {
            cashOnCashResult = 0;
        }
        else {
            //* 100 to display in percentage format                
            cashOnCashResult = (dividend / divisor) * 100;
        }
        return Math.round(cashOnCashResult);
    };
    RentalCalculatorService.prototype.calculateExpenses = function (year, dataRows, expenseColumn, incomeData, form) {
        var expenseResult;
        var expenseIncrease = form.e_annualExpenseIncrease || 0;
        if (year == 0) {
            expenseResult = this.calculateFirstYearExpense(incomeData, form);
        }
        else {
            expenseResult = dataRows[year - 1][expenseColumn] * ((expenseIncrease / 100) + 1);
        }
        return Math.round(expenseResult);
    };
    RentalCalculatorService.prototype.calculateFirstYearExpense = function (firstYearIncome, form) {
        var monthlyExpenses = 0;
        var yearlyExpenses = 0;
        var expenseResult = 0;
        var addedUtilities = form.addedUtilities || [];
        //DO TO HERE SHOULD BE ERROR HANDLING INSTEAD
        var water = form.u_water || 0;
        var sewer = form.u_sewer || 0;
        var garbage = form.u_garbage || 0;
        var electricity = form.u_electricity || 0;
        var naturalGas = form.u_naturalGas || 0;
        var maintenanceCost = form.m_costAmount || 0;
        var yardMaitenance = form.o_yardMaintenance || 0;
        var insurance = form.o_insurance || 0;
        var managementFee = form.pm_managementFeeAmount || 0;
        var tenantPlacementFee = form.pm_tenantPlacementFee || 0;
        var propertyTaxes = form.o_propertyTaxes || 0;
        var addedUtilitiesLength = Object.keys(addedUtilities).length;
        var vacancyRate = (form.o_vacancyRate || 0) / 100;
        //add up all monthly default utility costs and 
        monthlyExpenses = water + sewer + garbage
            + electricity + naturalGas
            + maintenanceCost
            + yardMaitenance + insurance
            + managementFee;
        //add up all monthly custom utility costs added by User
        for (var i = 0; i < addedUtilitiesLength; i++) {
            monthlyExpenses += addedUtilities[i].add_u_amount;
        }
        //convert all monthly expenses to yearly cost 
        yearlyExpenses = 12 * ((tenantPlacementFee * vacancyRate)
            + monthlyExpenses);
        //add the rest of yearly expenses
        expenseResult = yearlyExpenses + propertyTaxes
            + (vacancyRate * firstYearIncome);
        return expenseResult;
    };
    RentalCalculatorService.prototype.createCashFlowProjectionComboChart = function (form) {
        var rawDataArray = form.cashFlowTableData;
        var cashFlow = 5;
        var year = 0;
        var cashOnCash = 6;
        var chartData = [];
        var result = {};
        //Specify axis information
        result.options = {
            series: {
                0: { axis: 'CashFlow', type: 'bars' },
                1: { axis: 'CashOnCash', type: 'line', targetAxisIndex: 1 }
            },
            axes: {
                y: {
                    CashFlow: { label: 'Cash Flow ($)' },
                    CashOnCash: { label: 'Cash on Cash (%)' }
                }
            },
            hAxis: { title: 'Years' },
            vAxes: [{ title: 'Cash Flow ($)' }, { title: 'Cash on Cash (%)' }],
            width: '100%',
            height: '100%'
        };
        //Add columns to the data 
        chartData.push(["Year", "Cash Flow ($)", "Cash on Cash (%)"]);
        //Add data rows to the data
        rawDataArray.forEach(function (row) {
            var dataRow = [];
            dataRow.push(row[year]);
            dataRow.push(row[cashFlow]);
            dataRow.push(row[cashOnCash]);
            chartData.push(dataRow);
        });
        result.data = chartData;
        return result;
    };
    RentalCalculatorService.prototype.createIncomePieChart = function (form) {
        var result = {};
        var dataArray = [];
        var units = form.units || [];
        var unitsLength = Object.keys(units).length;
        var supplementalIncomes = form.supplementalIncomes || [];
        var supplementalIncomesLength = Object.keys(supplementalIncomes).length;
        var sumOfGrossMonthlyUnitIncome = 0;
        var colorArray = [
            '#008000',
            '#004080',
            '#990000',
            '#660066',
            '#00004d',
            '#cccc00',
            '#999966',
            '#1f1f14',
            '#00cccc',
            '#ff80ff',
            '#cc6666',
            '#ff6600'
        ];
        //add columns to the data 
        dataArray.push(["Description", "IncomeAmount"]);
        //add unit income
        for (var i = 0; i < unitsLength; i++) {
            sumOfGrossMonthlyUnitIncome += units[i].ri_grossMonthlyIncome;
        }
        dataArray.push(["Rental Income", sumOfGrossMonthlyUnitIncome]);
        //add new row for each supplemental income
        for (var i = 0; i < supplementalIncomesLength; i++) {
            var description = supplementalIncomes[i].si_description, value = supplementalIncomes[i].si_grossMonthlyIncome;
            dataArray.push([description, value]);
        }
        result.data = dataArray;
        //When we create labels without including the header descriptions
        var dataArrayWithoutHeader = dataArray.slice(); //slice returns a new array so that we are not altering the old array
        dataArrayWithoutHeader.shift();
        //Since we do not like the google charts legend label display, let's make our own 
        result.labels = this.createLabelArray(colorArray, dataArrayWithoutHeader);
        //Set up display preferences
        result.options = {
            width: '100%',
            height: '100%',
            is3D: true,
            legend: "none",
            fontSize: 11,
            pieSliceText: 'none',
            colors: colorArray
        };
        return result;
    };
    RentalCalculatorService.prototype.createExpensePieChart = function (form) {
        var result = {};
        var dataArray = [];
        var monthlyExpenses = 0;
        var yearlyExpenses = 0;
        var expenseResult = 0;
        var addedUtilities = form.utilities || [];
        var addedUtilitiesLength = Object.keys(addedUtilities).length;
        var colorArray = [
            '#008000',
            '#004080',
            '#990000',
            '#660066',
            '#00004d',
            '#cccc00',
            '#999966',
            '#1f1f14',
            '#00cccc',
            '#ff80ff',
            '#cc6666',
            '#ff6600'
        ];
        //add columns to the data 
        dataArray.push(["Description", "ExpenseAmount"]);
        if (form.u_water) {
            dataArray.push(["Water", form.u_water]);
        }
        if (form.u_sewer) {
            dataArray.push(["Sewer", form.u_sewer]);
        }
        if (form.u_garbage) {
            dataArray.push(["Garbage", form.u_garbage]);
        }
        if (form.u_electricity) {
            dataArray.push(["Electricity", form.u_electricity]);
        }
        if (form.u_naturalGas) {
            dataArray.push(["Natural Gas", form.u_naturalGas]);
        }
        if (form.m_costAmount) {
            dataArray.push(["Cost Amount", form.m_costAmount]);
        }
        if (form.o_yardMaintenance) {
            dataArray.push(["Yard Maintenance", form.o_yardMaintenance]);
        }
        if (form.o_insurance) {
            dataArray.push(["Insurance", form.o_insurance]);
        }
        if (form.pm_managementFeeAmount || (form.pm_tenantPlacementFee && form.o_vacancyRate)) {
            var tenantFee = form.pm_tenantPlacementFee || 0;
            var vacancyRate = form.o_vacancyRate || 0;
            var monthlyTenantFee = tenantFee * vacancyRate;
            var managementFee = form.pm_managementFeeAmount + monthlyTenantFee;
            dataArray.push(["Property Management", managementFee]);
        }
        if (form.o_propertyTaxes) {
            var propTaxes = form.o_propertyTaxes / 12;
            dataArray.push(["Property Taxes", propTaxes]);
        }
        if (form.o_vacancyRate) {
            var vacancyRate = form.o_vacancyRate / 100;
            //we are dividing by 12 because the function return income per year
            var income = Math.round(this.calculateFirstYearIncome(form) / 12);
            var vacancyPerMonth = income * vacancyRate;
            dataArray.push(["Vacancy", vacancyPerMonth]);
        }
        //add up all monthly custom utility costs added by User
        for (var i = 0; i < addedUtilitiesLength; i++) {
            dataArray.push([addedUtilities[i].add_u_name, addedUtilities[i].add_u_amount]);
        }
        result.data = dataArray;
        //When we create labels without including the header descriptions
        var dataArrayWithoutHeader = dataArray.slice();
        dataArrayWithoutHeader.shift();
        //Since google charts legend label display sucks I am creating our own 
        result.labels = this.createLabelArray(colorArray, dataArrayWithoutHeader);
        result.options = {
            width: '100%',
            height: '100%',
            is3D: true,
            legend: "none",
            pieSliceText: 'none',
            colors: colorArray
        };
        return result;
    };
    RentalCalculatorService.prototype.createTotalReturnTable = function (form) {
        var tableData = {};
        //Create Columns
        tableData.columns = ["Year", "Appreciation ($)", "Loan Paydown ($)", "Cash Flow ($)", "Total Return ($)", "Total Return (%)"];
        //Create Rows
        tableData.rows = this.createTotalReturnDataRows(tableData.columns, form);
        //Table display options
        tableData.options = { width: '100%', height: '300px' };
        return tableData;
    };
    RentalCalculatorService.prototype.createCashOnEquityTable = function (form) {
        var tableData = {};
        //Create Columns
        tableData.columns = ["Year", "Property Value ($)", "Remaining Loan ($)", "Equity ($)", "Cash Flow ($)", "Cash on Equity (%)"];
        //Create Rows
        tableData.rows = this.createCashOnEquityTableDataRows(tableData.columns, form);
        //Table display options
        tableData.options = { width: '100%', height: '300px' };
        return tableData;
    };
    RentalCalculatorService.prototype.calculateRemainingLoan = function (years, form) {
        var view = form.loanInfoView;
        var addedBankLoans = form.loans || [];
        var addedBankLoansLength = Object.keys(addedBankLoans).length;
        var specialTermsLoans = form.specialTermsLoans || [];
        var specialTermsLoansLength = Object.keys(specialTermsLoans).length;
        var loanPmtData = form.captureLoanData;
        var r;
        var p;
        var n;
        var A;
        var remLoan = Array.apply(null, Array(years)).map(Number.prototype.valueOf, 0);
        for (var i = 0; i < years; i++) {
            if (view == "bankLoan") {
                if (i < (form.bl_amortization)) {
                    //Calculate remaining loan for bank Loan
                    p = form.li_purchasePrice - form.bl_downPaymentDollar;
                    r = (form.bl_interest / 100) / 12;
                    n = (i + 1) * 12;
                    A = loanPmtData.bankLoanPmt / 12;
                    remLoan[i] += this.remainingLoanFormula(p, r, n, A);
                }
                else {
                    //current year (i) is past loan amoprt so remaining loan is 0
                    remLoan[i] += 0;
                }
                //Add the other loans the user added which have a different format (Stl) than reg. bank loan
                for (var j = 0; j < addedBankLoansLength; j++) {
                    if (i < addedBankLoans[j].add_bl_amortization) {
                        if (addedBankLoans[j].add_bl_balloon && i > addedBankLoans[j].add_bl_balloon - 1) {
                            remLoan[i] += 0;
                        }
                        else {
                            if (addedBankLoans[j].add_bl_interestOnly === "no") {
                                //Calculate remaining loan 
                                p = addedBankLoans[j].add_bl_loanAmount;
                                r = (addedBankLoans[j].add_bl_interest / 100) / 12;
                                n = (i + 1) * 12;
                                A = loanPmtData.addedBankLoans[j].pmt / 12;
                                remLoan[i] += this.remainingLoanFormula(p, r, n, A);
                            }
                            else {
                                remLoan[i] += addedBankLoans[j].add_bl_loanAmount;
                            }
                        }
                    }
                    else {
                        //current year (i) is past loan amoprt so remaining loan is 0
                        remLoan[i] += 0;
                    }
                }
            }
            else if (view == "specialTermsLoan") {
                for (var j = 0; j < specialTermsLoansLength; j++) {
                    if (i < (specialTermsLoans[j].stl_amortization)) {
                        if (specialTermsLoans[j].stl_balloon && i > specialTermsLoans[j].stl_balloon - 1) {
                            remLoan[i] += 0;
                        }
                        else {
                            if (specialTermsLoans[j].stl_interestOption == "no") {
                                //Calculate remaining loan 
                                p = specialTermsLoans[j].stl_amount;
                                r = (specialTermsLoans[j].stl_interest / 100) / 12;
                                n = (i + 1) * 12;
                                A = loanPmtData.specialTermsLoans[j].pmt / 12;
                                remLoan[i] += this.remainingLoanFormula(p, r, n, A);
                            }
                            else {
                                remLoan[i] += specialTermsLoans[j].stl_amount;
                            }
                        }
                    }
                    else {
                        //current year (i) is past loan amoprt so remaining loan is 0
                        remLoan[i] += 0;
                    }
                }
            }
        }
        return remLoan;
    };
    RentalCalculatorService.prototype.remainingLoanFormula = function (p, r, n, a) {
        var originalBalance;
        var annuity;
        var remLoanResult;
        if (p && r && n && a) {
            originalBalance = p * Math.pow((1 + r), n);
            annuity = a * ((Math.pow((1 + r), n) - 1) / r);
            remLoanResult = originalBalance - annuity;
        }
        return remLoanResult;
    };
    RentalCalculatorService.prototype.calculatePropertyValue = function (year, form) {
        var propertyValueResult;
        var arv = form.e_arv;
        var assumedAppreciation = form.bp_assumedAppreciation || 0;
        var purchasePrice = form.li_purchasePrice;
        var multiplier = Math.pow(1 + (assumedAppreciation / 100), year);
        if (arv && arv > 0) {
            propertyValueResult = arv * multiplier;
        }
        else {
            propertyValueResult = purchasePrice * multiplier;
        }
        return Math.round(propertyValueResult);
    };
    /*
    * Helper Function:
    * Creates the data that goes into each columns
    */
    RentalCalculatorService.prototype.createCashOnEquityTableDataRows = function (columns, form) {
        var dataRows = [];
        var years = this.getYears(form);
        var remainingLoan = this.calculateRemainingLoan(years, form);
        for (var i = 0; i < years; i++) {
            var column = [], yearData, propertyValueData, remLoanData, equityData, cashFlowData, cashOnEquityData;
            //Calculations
            yearData = i + 1;
            propertyValueData = this.calculatePropertyValue(yearData, form);
            remLoanData = remainingLoan[i];
            equityData = propertyValueData - remLoanData;
            cashFlowData = form.cashFlowTableData[i][5];
            cashOnEquityData = (cashFlowData / equityData) * 100;
            //Build the column
            column.push(yearData);
            column.push(propertyValueData);
            column.push(remLoanData);
            column.push(equityData);
            column.push(cashFlowData);
            column.push(cashOnEquityData);
            //Add to datarow
            dataRows.push(column);
        }
        //to reuse on combo chart
        form.cashOnEquityTableData = dataRows;
        return dataRows;
    };
    /*
    * Description: Helper function to create labels for pie charts
    *                This was create because default goog chart labels suck
    * Params:      Colors: colors used in the pie chart so I can add color coding)
    *              Data: the sections added into the pie charts
    */
    RentalCalculatorService.prototype.createLabelArray = function (colors, data) {
        var result = [], errormsg, descIndex = 0, valueIndex = 1, i = 0;
        //Create the label array with colors in it
        for (i; i < data.length; i++) {
            //check data format
            if (typeof (data[i][descIndex]) == 'undefined'
                || typeof (data[i][valueIndex]) == 'undefined') {
                //TODO: throw error
            }
            else {
                var description = data[i][descIndex], value = data[i][valueIndex], colorIndex = 0, temp;
                //when we have more data sections then colors
                //we start to reloop the colors
                if (colors.length >= i) {
                    colorIndex = i;
                }
                else {
                    colorIndex = i - (colors.length - 1);
                }
                result.push({ description: description, value: value, color: colors[colorIndex] });
            }
        }
        return result;
    };
    RentalCalculatorService.prototype.createCashFlowSummary = function (form) {
        var cashflowData = form.cashFlowTableData;
        var sum = 0;
        var cashflow = 5;
        var result = [];
        if (5 < cashflowData.length) {
            result.push({ years: 5, totalReturn: 0 });
        }
        if (15 < cashflowData.length) {
            result.push({ years: 15, totalReturn: 0 });
        }
        if (30 < cashflowData.length) {
            result.push({ years: 30, totalReturn: 0 });
        }
        for (var i = 0; i < cashflowData.length; i++) {
            sum += cashflowData[i][cashflow];
            for (var j = 0; j < result.length; j++) {
                if ((i + 1) == result[j].years) {
                    result[j].totalCashflow = Math.round(sum);
                    break;
                }
            }
        }
        return result;
    };
    RentalCalculatorService.prototype.roundToNearestDecimal = function (precision, number) {
        var factor = Math.pow(10, precision);
        var tempNumber = number * factor;
        var roundedTempNumber = Math.round(tempNumber);
        return roundedTempNumber / factor;
    };
    RentalCalculatorService.prototype.createCashOnEquityComboChart = function (form) {
        var rawDataArray = form.cashOnEquityTableData;
        var yearIndex = 0;
        var equityIndex = 3;
        var cashOnEquityIndex = 5;
        var chartData = [];
        var result = {};
        //Specify axis information
        result.options = {
            series: {
                0: { axis: 'Equity', type: 'bars' },
                1: { axis: 'CashOnEquity', type: 'line', targetAxisIndex: 1 }
            },
            axes: {
                y: {
                    Equity: { label: 'Equity ($)' },
                    CashOnEquity: { label: 'Cash on Equity (%)' }
                }
            },
            hAxis: { title: 'Years' },
            vAxes: [{ title: 'Equity ($)' }, { title: 'Cash on Equity (%)' }],
            width: '100%',
            height: '100%'
        };
        //Add columns to the data 
        chartData.push(["Year", "Equity ($)", "Cash on Equity (%)"]);
        //Add data rows to the data
        rawDataArray.forEach(function (row) {
            var dataRow = [];
            dataRow.push(row[yearIndex]);
            dataRow.push(row[equityIndex]);
            dataRow.push(row[cashOnEquityIndex]);
            chartData.push(dataRow);
        });
        result.data = chartData;
        return result;
    };
    RentalCalculatorService.prototype.calculateLoanPayDown = function (years, form) {
        var view = form.loanInfoView;
        var firstYearLoanAmount = 0;
        var remLoanIndex = 2;
        var purchasePrice = form.li_purchasePrice;
        var downPayment = form.bl_downPaymentDollar;
        var addedBankLoans = form.loans || [];
        var addedBankLoansLength = Object.keys(addedBankLoans).length;
        var specialTermsLoans = form.specialTermsLoans || [];
        var specialTermsLoansLength = Object.keys(specialTermsLoans).length;
        var capturedBankLoans = form.captureLoanData.addedBankLoans;
        var capturedSpecialTermsLoans = form.captureLoanData.specialTermsLoans;
        var loanPayDownResult = Array.apply(null, Array(years)).map(Number.prototype.valueOf, 0);
        //Year 1 Loan PayDown
        if (view === "bankLoan") {
            //Bank Loan
            firstYearLoanAmount += purchasePrice - downPayment;
            //Added STL Loans
            for (var i = 0; i < addedBankLoansLength; i++) {
                firstYearLoanAmount += addedBankLoans[i].add_bl_loanAmount;
            }
        }
        else if (view === "specialTermsLoan") {
            for (var i = 0; i < specialTermsLoansLength; i++) {
                firstYearLoanAmount += specialTermsLoans[i].stl_amount;
            }
        }
        loanPayDownResult[0] = firstYearLoanAmount - form.cashOnEquityTableData[0][remLoanIndex];
        //Years after first of loan Paydowns
        for (var i = 1; i < years; i++) {
            var lastYear = i - 1;
            loanPayDownResult[i] = form.cashOnEquityTableData[lastYear][remLoanIndex] - form.cashOnEquityTableData[i][remLoanIndex];
        }
        //if there are balloon payments subtract them from the loanPayDownResult
        if (view === "bankLoan") {
            for (var i = 0; i < capturedBankLoans.length; i++) {
                //if we have a balloon payment that year
                if (capturedBankLoans[i].ballonYear) {
                    //the ballon paydown is reflected in the next year of the loan paydown
                    //that is why we need to subtract ballon from following yr
                    loanPayDownResult[capturedBankLoans[i].ballonYear + 1] -= capturedBankLoans[i].ballonAmount;
                }
            }
        }
        else if (view === "specialTermsLoan") {
            for (var i = 0; i < capturedSpecialTermsLoans.length; i++) {
                //if we have a balloon payment that year
                if (capturedSpecialTermsLoans[i].ballonYear) {
                    //the ballon paydown is reflected in the next year of the loan paydown
                    //that is why we need to subtract ballon from following yr
                    loanPayDownResult[capturedSpecialTermsLoans[i].ballonYear + 1] -= capturedSpecialTermsLoans[i].ballonAmount;
                }
            }
        }
        return loanPayDownResult;
    };
    RentalCalculatorService.prototype.calculateAppreciation = function (year, form) {
        var appreciationResult;
        var arv = form.e_arv;
        var propertyValue = form.cashOnEquityTableData[year][1];
        var purchasePrice = form.li_purchasePrice;
        var firstYear = 0;
        var capex = 3;
        if (year === 0) {
            if (arv && arv > 0) {
                appreciationResult = propertyValue - arv + (arv - (form.cashFlowTableData[firstYear][capex] + purchasePrice));
            }
            else {
                appreciationResult = propertyValue - purchasePrice;
            }
        }
        else {
            var prioYear = form.cashOnEquityTableData[year - 1][1];
            appreciationResult = propertyValue - prioYear;
        }
        return appreciationResult;
    };
    RentalCalculatorService.prototype.createTotalReturnDataRows = function (columns, form) {
        var dataRows = [];
        var years = this.getYears(form);
        var loanPayDowns = this.calculateLoanPayDown(years, form);
        var cashFlows = this.calculateCashFlowWithoutBalloon(years, form);
        var cashFlowIndex = 4;
        var equityIndex = 3;
        for (var i = 0; i < years; i++) {
            var column = [], yearData, appreciationData, loanPayDownData, cashFlowData, totalReturnDollarData, totalReturnDollarPercent;
            //Calculations
            yearData = i + 1;
            appreciationData = this.calculateAppreciation(i, form);
            loanPayDownData = loanPayDowns[i];
            cashFlowData = cashFlows[i];
            totalReturnDollarData = appreciationData + loanPayDownData + cashFlowData;
            totalReturnDollarPercent = (totalReturnDollarData / form.cashOnEquityTableData[i][equityIndex]) * 100;
            //Build the column
            column.push(yearData);
            column.push(appreciationData);
            column.push(loanPayDownData);
            column.push(cashFlowData);
            column.push(totalReturnDollarData);
            column.push(totalReturnDollarPercent);
            //Add to datarow
            dataRows.push(column);
        }
        //to reuse on combo chart
        form.totalReturnTableData = dataRows;
        return dataRows;
    };
    RentalCalculatorService.prototype.calculateCashFlowWithoutBalloon = function (years, form) {
        var cashFlowIndex = 4;
        var capturedBankLoans = form.captureLoanData.addedBankLoans;
        var capturedSpecialTermsLoans = form.captureLoanData.specialTermsLoans;
        var view = form.loanInfoView;
        var cashFlowDataResult = Array.apply(null, Array(years)).map(Number.prototype.valueOf, 0);
        //Copy the cash flow data from previous table
        for (var i = 0; i < years; i++) {
            //copy the cashFlow value over - it contains the subtracted balloon payment
            cashFlowDataResult[i] = form.cashOnEquityTableData[i][cashFlowIndex];
        }
        //if there are balloon payments add it back to the cashflowData
        if (view === "bankLoan") {
            for (var j = 0; j < capturedBankLoans.length; j++) {
                //if we have a balloon payment that year
                if (capturedBankLoans[j].ballonYear) {
                    cashFlowDataResult[capturedBankLoans[j].ballonYear] += capturedBankLoans[j].ballonAmount;
                }
            }
        }
        else if (view === "specialTermsLoan") {
            for (var j = 0; j < capturedSpecialTermsLoans.length; j++) {
                //if we have a balloon payment that year
                if (capturedSpecialTermsLoans[j].ballonYear) {
                    cashFlowDataResult[capturedSpecialTermsLoans[j].ballonYear] += capturedSpecialTermsLoans[j].ballonAmount;
                }
            }
        }
        return cashFlowDataResult;
    };
    return RentalCalculatorService;
}());
RentalCalculatorService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], RentalCalculatorService);
exports.RentalCalculatorService = RentalCalculatorService;
//# sourceMappingURL=rental-property-calculator.service.js.map