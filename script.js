// Data storage for income and expenses
const monthlyData = {
    income: {},
    expense: {}
};

// Months array
const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

let chart = null;

function getAllLabels() {
    // query for all html label tags
    const labels = document.getElementsByTagName("label");
    return labels;
}

function initializeMonthInputs() {
    const container = document.getElementById("monthsContainer");
    container.innerHTML = "";
    
    months.forEach((month, index) => {
        const monthDiv = document.createElement("div");
        monthDiv.className = "col-md-6 col-lg-4";
        monthDiv.innerHTML = `
            <div class="month-group">
                <h6>${month}</h6>
                <div class="input-group mb-2">
                    <label for="income-${index}">Income:</label>
                    <input 
                        type="number" 
                        class="form-control" 
                        id="income-${index}" 
                        placeholder="0.00" 
                        min="0" 
                        step="0.01"
                        value="${monthlyData.income[month] || ''}"
                    >
                </div>
                <div class="input-group">
                    <label for="expense-${index}">Expense:</label>
                    <input 
                        type="number" 
                        class="form-control" 
                        id="expense-${index}" 
                        placeholder="0.00" 
                        min="0" 
                        step="0.01"
                        value="${monthlyData.expense[month] || ''}"
                    >
                </div>
            </div>
        `;
        container.appendChild(monthDiv);
        
        // Add event listeners for auto-update
        document.getElementById(`income-${index}`).addEventListener('input', updateChart);
        document.getElementById(`expense-${index}`).addEventListener('input', updateChart);
    });
}

function collectMonthlyData() {
    months.forEach((month, index) => {
        const incomeInput = document.getElementById(`income-${index}`).value;
        const expenseInput = document.getElementById(`expense-${index}`).value;
        
        monthlyData.income[month] = incomeInput ? parseFloat(incomeInput) : 0;
        monthlyData.expense[month] = expenseInput ? parseFloat(expenseInput) : 0;
    });
}

function updateChart() {
    // Collect data from inputs
    collectMonthlyData();
    
    // Prepare data for chart
    const incomeData = months.map(month => monthlyData.income[month] || 0);
    const expenseData = months.map(month => monthlyData.expense[month] || 0);
    
    // Get or create canvas context
    const ctx = document.getElementById("myChart").getContext("2d");
    
    // Destroy previous chart if it exists
    if (chart) {
        chart.destroy();
    }
    
    // Create new chart
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: months,
            datasets: [
                {
                    label: 'Income',
                    data: incomeData,
                    backgroundColor: 'rgba(102, 126, 234, 0.8)',
                    borderColor: 'rgba(102, 126, 234, 1)',
                    borderWidth: 2,
                    borderRadius: 8,
                    hoverBackgroundColor: 'rgba(102, 126, 234, 1)'
                },
                {
                    label: 'Expense',
                    data: expenseData,
                    backgroundColor: 'rgba(220, 38, 38, 0.8)',
                    borderColor: 'rgba(220, 38, 38, 1)',
                    borderWidth: 2,
                    borderRadius: 8,
                    hoverBackgroundColor: 'rgba(220, 38, 38, 1)'
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            size: 14,
                            weight: 'bold'
                        },
                        padding: 15,
                        usePointStyle: true
                    }
                },
                title: {
                    display: true,
                    text: 'Monthly Income vs Expense',
                    font: {
                        size: 16,
                        weight: 'bold'
                    },
                    padding: 20
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Amount ($)'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Month'
                    }
                }
            }
        }
    });
}

function downloadChart() {
    // Get the canvas element
    const canvas = document.getElementById("myChart");
    
    // Convert canvas to blob and download
    canvas.toBlob(function(blob) {
        // Create a temporary URL for the blob
        const url = URL.createObjectURL(blob);
        
        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = url;
        link.download = `income_expense_chart_${new Date().toISOString().split('T')[0]}.png`;
        
        // Trigger the download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        // Clean up the URL object
        URL.revokeObjectURL(url);
    }, 'image/png');
}

window.onload = function() {
    const labels = getAllLabels();
    initializeMonthInputs();
    
    // Add event listener for download button
    const downloadBtn = document.getElementById('downloadBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', downloadChart);
    }
}