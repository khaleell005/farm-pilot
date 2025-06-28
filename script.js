        // Global data storage
        let eggCollections = [];
        let welfareRecords = [];
        let salesRecords = [];
        let expenses = [];
        let employees = [
            {name: 'Alhassan Ibrahim', phone: '08012345678', role: 'Farm Worker', salary: 50000, startDate: '2024-01-15', status: 'Active'},
            {name: 'Yusuf Ibrahim', phone: '08087654321', role: 'Supervisor', salary: 75000, startDate: '2024-02-01', status: 'Active'},
            {name: 'Bashir Ibrahim', phone: '08055555555', role: 'Manager', salary: 120000, startDate: '2024-01-01', status: 'Active'}
        ];

        // Initialize the system
        document.addEventListener('DOMContentLoaded', function() {
            // Set today's date as default
            const today = new Date().toISOString().split('T')[0];
            document.getElementById('collectionDate').value = today;
            document.getElementById('welfareDate').value = today;
            document.getElementById('saleDate').value = today;
            document.getElementById('expenseDate').value = today;
            
            updateDashboard();
            renderEmployeeTable();
        });

        // Navigation function
        function showModule(moduleId) {
            // Hide all modules
            const modules = document.querySelectorAll('.module');
            modules.forEach(module => module.classList.remove('active'));
            
            // Show selected module
            document.getElementById(moduleId).classList.add('active');
            
            // Update active tab
            const tabs = document.querySelectorAll('.nav-tab');
            tabs.forEach(tab => tab.classList.remove('active'));
            event.target.classList.add('active');
        }

        // Egg Collection Functions
        function addEggCollection() {
            const collection = {
                date: document.getElementById('collectionDate').value,
                time: document.getElementById('collectionTime').value,
                employee: document.getElementById('employeeName').value,
                batch: document.getElementById('batchNumber').value,
                goodEggs: parseInt(document.getElementById('goodEggs').value),
                crackedEggs: parseInt(document.getElementById('crackedEggs').value)
            };

            if (!collection.date || !collection.employee || !collection.batch || !collection.goodEggs) {
                alert('Please fill in all required fields');
                return;
            }

            collection.total = collection.goodEggs + collection.crackedEggs;
            collection.id = Date.now();
            
            eggCollections.push(collection);
            renderEggCollectionTable();
            clearEggForm();
            updateDashboard();
            showAlert('Egg collection recorded successfully!', 'success');
        }

        function clearEggForm() {
            document.getElementById('collectionTime').value = '';
            document.getElementById('employeeName').value = '';
            document.getElementById('batchNumber').value = '';
            document.getElementById('goodEggs').value = '';
            document.getElementById('crackedEggs').value = '0';
        }

        function renderEggCollectionTable() {
            const tbody = document.getElementById('eggCollectionTable');
            tbody.innerHTML = '';
            
            eggCollections.forEach(collection => {
                const row = tbody.insertRow();
                row.innerHTML = `
                    <td>${collection.date}</td>
                    <td>${collection.time}</td>
                    <td>${collection.employee}</td>
                    <td>${collection.batch}</td>
                    <td>${collection.goodEggs}</td>
                    <td>${collection.crackedEggs}</td>
                    <td>${collection.total}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteEggCollection(${collection.id})">Delete</button>
                    </td>
                `;
            });
        }

        function deleteEggCollection(id) {
            if (confirm('Are you sure you want to delete this record?')) {
                eggCollections = eggCollections.filter(c => c.id !== id);
                renderEggCollectionTable();
                updateDashboard();
            }
        }

        // Chicken Welfare Functions
        function addWelfareRecord() {
            const record = {
                date: document.getElementById('welfareDate').value,
                batch: document.getElementById('welfareBatch').value,
                feed: parseFloat(document.getElementById('feedQuantity').value) || 0,
                water: parseFloat(document.getElementById('waterConsumption').value) || 0,
                medication: document.getElementById('medicationName').value,
                dosage: document.getElementById('medicationDosage').value,
                mortality: parseInt(document.getElementById('mortalityCount').value) || 0,
                cause: document.getElementById('mortalityCause').value
            };

            if (!record.date || !record.batch) {
                alert('Please fill in date and batch');
                return;
            }

            record.id = Date.now();
            
            welfareRecords.push(record);
            renderWelfareTable();
            clearWelfareForm();
            showAlert('Welfare record added successfully!', 'success');
        }

        function clearWelfareForm() {
            document.getElementById('welfareBatch').value = '';
            document.getElementById('feedQuantity').value = '';
            document.getElementById('waterConsumption').value = '';
            document.getElementById('medicationName').value = '';
            document.getElementById('medicationDosage').value = '';
            document.getElementById('mortalityCount').value = '0';
            document.getElementById('mortalityCause').value = '';
        }

        function renderWelfareTable() {
            const tbody = document.getElementById('welfareTable');
            tbody.innerHTML = '';
            
            welfareRecords.forEach(record => {
                const row = tbody.insertRow();
                row.innerHTML = `
                    <td>${record.date}</td>
                    <td>${record.batch}</td>
                    <td>${record.feed}</td>
                    <td>${record.water}</td>
                    <td>${record.medication || 'N/A'}</td>
                    <td>${record.mortality}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteWelfareRecord(${record.id})">Delete</button>
                    </td>
                `;
            });
        }

        function deleteWelfareRecord(id) {
            if (confirm('Are you sure you want to delete this record?')) {
                welfareRecords = welfareRecords.filter(r => r.id !== id);
                renderWelfareTable();
            }
        }

        // Sales Functions
        function addSale() {
            const sale = {
                date: document.getElementById('saleDate').value,
                customer: document.getElementById('customerName').value,
                phone: document.getElementById('customerPhone').value,
                quantity: parseInt(document.getElementById('quantitySold').value),
                price: parseFloat(document.getElementById('pricePerCrate').value),
                paymentMethod: document.getElementById('paymentMethod').value
            };

            if (!sale.date || !sale.customer || !sale.quantity || !sale.price || !sale.paymentMethod) {
                alert('Please fill in all required fields');
                return;
            }

            sale.total = sale.quantity * sale.price;
            sale.id = Date.now();
            
            salesRecords.push(sale);
            renderSalesTable();
            clearSalesForm();
            updateDashboard();
            showAlert('Sale recorded successfully!', 'success');
        }

        function clearSalesForm() {
            document.getElementById('customerName').value = '';
            document.getElementById('customerPhone').value = '';
            document.getElementById('quantitySold').value = '';
            document.getElementById('paymentMethod').value = '';
        }

        function renderSalesTable() {
            const tbody = document.getElementById('salesTable');
            tbody.innerHTML = '';
            
            salesRecords.forEach(sale => {
                const row = tbody.insertRow();
                row.innerHTML = `
                    <td>${sale.date}</td>
                    <td>${sale.customer}</td>
                    <td>${sale.quantity}</td>
                    <td>₦${sale.price.toLocaleString()}</td>
                    <td>₦${sale.total.toLocaleString()}</td>
                    <td>${sale.paymentMethod}</td>
                    <td>
                        <button class="btn btn-secondary" onclick="generateInvoiceForSale(${sale.id})">Invoice</button>
                        <button class="btn btn-danger" onclick="deleteSale(${sale.id})">Delete</button>
                    </td>
                `;
            });
        }

        function deleteSale(id) {
            if (confirm('Are you sure you want to delete this sale?')) {
                salesRecords = salesRecords.filter(s => s.id !== id);
                renderSalesTable();
                updateDashboard();
            }
        }

        function generateInvoice() {
            const customer = document.getElementById('customerName').value;
            const quantity = document.getElementById('quantitySold').value;
            const price = document.getElementById('pricePerCrate').value;
            
            if (!customer || !quantity || !price) {
                alert('Please fill in customer details first');
                return;
            }
            
            const total = quantity * price;
            const invoiceContent = `
                SIDDIQA FARM INVOICE
                ==================
                Date: ${new Date().toLocaleDateString()}
                Customer: ${customer}
                
                Item: Eggs (Crates)
                Quantity: ${quantity}
                Price per Crate: ₦${parseFloat(price).toLocaleString()}
                Total Amount: ₦${total.toLocaleString()}
                
                Thank you for your business!
            `;
            
            alert(invoiceContent);
        }

        function generateInvoiceForSale(id) {
            const sale = salesRecords.find(s => s.id === id);
            if (!sale) return;
            
            const invoiceContent = `
                SIDDIQA FARM INVOICE
                ==================
                Date: ${sale.date}
                Customer: ${sale.customer}
                Phone: ${sale.phone || 'N/A'}
                
                Item: Eggs (Crates)
                Quantity: ${sale.quantity}
                Price per Crate: ₦${sale.price.toLocaleString()}
                Total Amount: ₦${sale.total.toLocaleString()}
                Payment Method: ${sale.paymentMethod}
                
                Thank you for your business!
            `;
            
            alert(invoiceContent);
        }

        // Financial Functions
        function addExpense() {
            const expense = {
                date: document.getElementById('expenseDate').value,
                category: document.getElementById('expenseCategory').value,
                amount: parseFloat(document.getElementById('expenseAmount').value),
                description: document.getElementById('expenseDescription').value
            };

            if (!expense.date || !expense.category || !expense.amount || !expense.description) {
                alert('Please fill in all fields');
                return;
            }

            expense.id = Date.now();
            
            expenses.push(expense);
            renderExpenseTable();
            clearExpenseForm();
            updateDashboard();
            showAlert('Expense added successfully!', 'success');
        }

        function clearExpenseForm() {
            document.getElementById('expenseCategory').value = '';
            document.getElementById('expenseAmount').value = '';
            document.getElementById('expenseDescription').value = '';
        }

        function renderExpenseTable() {
            const tbody = document.getElementById('expenseTable');
            tbody.innerHTML = '';
            
            expenses.forEach(expense => {
                const row = tbody.insertRow();
                row.innerHTML = `
                    <td>${expense.date}</td>
                    <td>${expense.category}</td>
                    <td>${expense.description}</td>
                    <td>₦${expense.amount.toLocaleString()}</td>
                    <td>
                        <button class="btn btn-danger" onclick="deleteExpense(${expense.id})">Delete</button>
                    </td>
                `;
            });
        }

        function deleteExpense(id) {
            if (confirm('Are you sure you want to delete this expense?')) {
                expenses = expenses.filter(e => e.id !== id);
                renderExpenseTable();
                updateDashboard();
            }
        }

        // Employee Functions
        function addEmployee() {
            const employee = {
                name: document.getElementById('empName').value,
                phone: document.getElementById('empPhone').value,
                role: document.getElementById('empRole').value,
                salary: parseFloat(document.getElementById('empSalary').value),
                startDate: document.getElementById('empStartDate').value,
                status: document.getElementById('empStatus').value
            };

            if (!employee.name || !employee.phone || !employee.role || !employee.salary || !employee.startDate) {
                alert('Please fill in all required fields');
                return;
            }

            employee.id = Date.now();
            
            employees.push(employee);
            renderEmployeeTable();
            clearEmployeeForm();
            showAlert('Employee added successfully!', 'success');
        }

        function clearEmployeeForm() {
            document.getElementById('empName').value = '';
            document.getElementById('empPhone').value = '';
            document.getElementById('empRole').value = '';
            document.getElementById('empSalary').value = '';
            document.getElementById('empStartDate').value = '';
            document.getElementById('empStatus').value = 'Active';
        }

        function renderEmployeeTable() {
            const tbody = document.getElementById('employeeTable');
            tbody.innerHTML = '';
            
            employees.forEach(employee => {
                const row = tbody.insertRow();
                row.innerHTML = `
                    <td>${employee.name}</td>
                    <td>${employee.phone}</td>
                    <td>${employee.role}</td>
                    <td>₦${employee.salary.toLocaleString()}</td>
                    <td>${employee.startDate}</td>
                    <td><span class="status ${employee.status.toLowerCase()}">${employee.status}</span></td>
                    <td>
                        <button class="btn btn-secondary" onclick="editEmployee(${employee.id})">Edit</button>
                        <button class="btn btn-danger" onclick="deleteEmployee(${employee.id})">Delete</button>
                    </td>
                `;
            });
        }

        function deleteEmployee(id) {
            if (confirm('Are you sure you want to delete this employee?')) {
                employees = employees.filter(e => e.id !== id);
                renderEmployeeTable();
            }
        }

        function editEmployee(id) {
            const employee = employees.find(e => e.id === id);
            if (!employee) return;
            
            document.getElementById('empName').value = employee.name;
            document.getElementById('empPhone').value = employee.phone;
            document.getElementById('empRole').value = employee.role;
            document.getElementById('empSalary').value = employee.salary;
            document.getElementById('empStartDate').value = employee.startDate;
            document.getElementById('empStatus').value = employee.status;
            
            // Remove the employee to allow re-adding with updates
            employees = employees.filter(e => e.id !== id);
            renderEmployeeTable();
        }

        // Dashboard Update Function
        function updateDashboard() {
            // Calculate today's egg collection
            const today = new Date().toISOString().split('T')[0];
            const todayCollections = eggCollections.filter(c => c.date === today);
            const todayEggs = todayCollections.reduce((sum, c) => sum + c.goodEggs, 0);
            document.getElementById('todayEggs').textContent = todayEggs;

            // Calculate total inventory (simplified)
            const totalEggs = eggCollections.reduce((sum, c) => sum + c.goodEggs, 0);
            const soldEggs = salesRecords.reduce((sum, s) => sum + (s.quantity * 30), 0); // Assuming 30 eggs per crate
            const currentInventory = Math.max(0, totalEggs - soldEggs);
            document.getElementById('totalInventory').textContent = Math.floor(currentInventory / 30); // Convert to crates

            // Calculate today's sales
            const todaySales = salesRecords
                .filter(s => s.date === today)
                .reduce((sum, s) => sum + s.total, 0);
            document.getElementById('todaySales').textContent = todaySales.toLocaleString();

            // Calculate financial summary
            const totalRevenue = salesRecords.reduce((sum, s) => sum + s.total, 0);
            const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
            const netProfit = totalRevenue - totalExpenses;
            const outstandingCredits = salesRecords
                .filter(s => s.paymentMethod === 'Credit')
                .reduce((sum, s) => sum + s.total, 0);

            document.getElementById('totalRevenue').textContent = totalRevenue.toLocaleString();
            document.getElementById('totalExpenses').textContent = totalExpenses.toLocaleString();
            document.getElementById('netProfit').textContent = netProfit.toLocaleString();
            document.getElementById('outstandingCredits').textContent = outstandingCredits.toLocaleString();
        }

        // Reports Functions
        function generateReport() {
            const reportType = document.getElementById('reportType').value;
            const startDate = document.getElementById('reportStartDate').value;
            const endDate = document.getElementById('reportEndDate').value;
            const format = document.getElementById('reportFormat').value;

            if (!reportType || !startDate || !endDate) {
                alert('Please fill in all report parameters');
                return;
            }

            let reportData = '';
            
            switch(reportType) {
                case 'egg-production':
                    reportData = generateEggProductionReport(startDate, endDate);
                    break;
                case 'sales-report':
                    reportData = generateSalesReport(startDate, endDate);
                    break;
                case 'expense-report':
                    reportData = generateExpenseReport(startDate, endDate);
                    break;
                case 'welfare-report':
                    reportData = generateWelfareReport(startDate, endDate);
                    break;
                case 'profit-loss':
                    reportData = generateProfitLossReport(startDate, endDate);
                    break;
            }

            // Simulate report generation
            alert(`${reportType.toUpperCase()} Report generated successfully!\n\nFormat: ${format.toUpperCase()}\nPeriod: ${startDate} to ${endDate}\n\nReport would be downloaded in a real implementation.`);
        }

        function previewReport() {
            const reportType = document.getElementById('reportType').value;
            const startDate = document.getElementById('reportStartDate').value;
            const endDate = document.getElementById('reportEndDate').value;

            if (!reportType || !startDate || !endDate) {
                alert('Please fill in all report parameters');
                return;
            }

            const previewDiv = document.getElementById('reportPreview');
            const contentDiv = document.getElementById('reportContent');
            
            let reportContent = '';
            
            switch(reportType) {
                case 'egg-production':
                    reportContent = generateEggProductionPreview(startDate, endDate);
                    break;
                case 'sales-report':
                    reportContent = generateSalesPreview(startDate, endDate);
                    break;
                default:
                    reportContent = '<p>Report preview not available for this type.</p>';
            }
            
            contentDiv.innerHTML = reportContent;
            previewDiv.style.display = 'block';
        }

        function generateEggProductionPreview(startDate, endDate) {
            const filteredCollections = eggCollections.filter(c => 
                c.date >= startDate && c.date <= endDate
            );
            
            const totalEggs = filteredCollections.reduce((sum, c) => sum + c.goodEggs, 0);
            const totalCracked = filteredCollections.reduce((sum, c) => sum + c.crackedEggs, 0);
            
            return `
                <h4>Egg Production Report (${startDate} to ${endDate})</h4>
                <p><strong>Total Good Eggs:</strong> ${totalEggs}</p>
                <p><strong>Total Cracked Eggs:</strong> ${totalCracked}</p>
                <p><strong>Total Collections:</strong> ${filteredCollections.length}</p>
                <p><strong>Average Daily Production:</strong> ${Math.round(totalEggs / Math.max(1, filteredCollections.length))}</p>
            `;
        }

        function generateSalesPreview(startDate, endDate) {
            const filteredSales = salesRecords.filter(s => 
                s.date >= startDate && s.date <= endDate
            );
            
            const totalRevenue = filteredSales.reduce((sum, s) => sum + s.total, 0);
            const totalQuantity = filteredSales.reduce((sum, s) => sum + s.quantity, 0);
            
            return `
                <h4>Sales Report (${startDate} to ${endDate})</h4>
                <p><strong>Total Revenue:</strong> ₦${totalRevenue.toLocaleString()}</p>
                <p><strong>Total Crates Sold:</strong> ${totalQuantity}</p>
                <p><strong>Number of Transactions:</strong> ${filteredSales.length}</p>
                <p><strong>Average Sale Value:</strong> ₦${Math.round(totalRevenue / Math.max(1, filteredSales.length)).toLocaleString()}</p>
            `;
        }

        // Utility Functions
        function showAlert(message, type) {
            const alertDiv = document.createElement('div');
            alertDiv.className = `alert alert-${type}`;
            alertDiv.textContent = message;
            
            const mainContent = document.querySelector('.main-content');
            mainContent.insertBefore(alertDiv, mainContent.firstChild);
            
            setTimeout(() => {
                alertDiv.remove();
            }, 3000);
        }

        // Initialize chart 
        function initChart() {
            const canvas = document.getElementById('productionChart');
            const ctx = canvas.getContext('2d');
            
            // Simple bar chart representation
            ctx.fillStyle = '#4a7c4a';
            const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
            const values = [120, 135, 100, 145, 167, 143, 156];
            
            for (let i = 0; i < days.length; i++) {
                const barHeight = (values[i] / 200) * 150;
                ctx.fillRect(i * 50 + 20, 180 - barHeight, 30, barHeight);
                ctx.fillStyle = '#2d5a2d';
                ctx.font = '12px Arial';
                ctx.fillText(days[i], i * 50 + 25, 195);
                ctx.fillText(values[i], i * 50 + 20, 175 - barHeight);
                ctx.fillStyle = '#4a7c4a';
            }
        }

        // Initialize chart when dashboard is loaded
        setTimeout(initChart, 100);

    // let salesCtx  = document.getElementById("productionChart").getContext("2d")
    // let salesChart  = new Chart(salesCtx, {
    //     type: "bar",
    //     options: {
    //         responsive: true,
    //         title: {
    //             display: CSSFontFeatureValuesRule,
    //             text:""
    //         }
    //     }
    // })
function exportToCsv(filename, data) {
    const csvRows = [];
    const headers = Object.keys(data[0]); // Assuming data is an array of objects
    csvRows.push(headers.join(','));

    for (const row of data) {
        const values = headers.map(header => {
            let value = row[header];
            if (typeof value === 'string') {
                value = value.replace(/"/g, '""'); // Escape double quotes
                if (value.includes(',') || value.includes('\n') || value.includes('"')) {
                    value = "${value}"; // Enclose in double quotes if needed
                }
            }
            return value;
        });
        csvRows.push(values.join(','));
    }

    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}