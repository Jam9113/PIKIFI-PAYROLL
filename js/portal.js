
fetch('https://payroll-service-bnci.onrender.com/api/payrolls')
  .then(res => res.json())
  .then(data => {
    const tbody = document.querySelector("#payslipTable tbody");
    tbody.innerHTML = '';

    data.forEach(item => {
      const date = new Date(item.payday).toISOString().split('T')[0];
      const employee = item.employeeName || '—';
      const salary = `₱${parseFloat(item.NetSalary).toLocaleString(undefined, { minimumFractionDigits: 2 })}`;

      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${date}</td>
        <td>${employee}</td>
        <td>${salary}</td>
        <td><button class="print-btn" onclick="printPayslip('${employee}', '${date}', '${salary}')">Print</button></td>
      `;
      tbody.appendChild(row);
    });
  })
  .catch(err => {
    console.error("Failed to load payroll data", err);
  });

function printPayslip(name, date, salary) {
  const printWindow = window.open('', '', 'width=600,height=700');
  printWindow.document.write(`
    <html>
    <head>
      <title>Payslip</title>
      <style>
        body { font-family: Poppins, sans-serif; padding: 20px; }
        h2 { text-align: center; }
        .payslip { border: 1px solid #000; padding: 20px; border-radius: 10px; }
        .payslip div { margin-bottom: 10px; }
      </style>
    </head>
    <body>
      <h2>PIKIFI PAYSLIP</h2>
      <div class="payslip">
        <div><strong>Employee:</strong> ${name}</div>
        <div><strong>Pay Date:</strong> ${date}</div>
        <div><strong>Net Salary:</strong> ${salary}</div>
      </div>
      <script>
        window.onload = function() { window.print(); };
      <\/script>
    </body>
    </html>
  `);
  printWindow.document.close();
}


document.getElementById("leaveForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const leaveData = {
    date: document.getElementById("leaveDate").value,
    type: document.getElementById("leaveType").value,
    reason: document.getElementById("reason").value,
  };

  fetch('https://leaves-2diq.onrender.com/api/leaves', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(leaveData)
  })
    .then(res => res.json())
    .then(() => {
      alert("Leave request submitted successfully!");
      document.getElementById("leaveForm").reset();
      loadLeaveRequests();
    })
    .catch(error => {
      console.error("Error submitting leave:", error);
      alert("Error submitting leave request.");
    });
});

function loadLeaveRequests() {
  fetch('https://leaves-2diq.onrender.com/api/leaves')
    .then(res => res.json())
    .then(data => {
      console.log("Leave API response:", data); // Debug line to inspect data

      const tbody = document.querySelector('#leaveTable tbody');
      tbody.innerHTML = '';

      const leaves = Array.isArray(data) ? data : data.leaves || [];

      leaves.forEach(leave => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${leave.date}</td>
          <td>${leave.type}</td>
          <td>${leave.reason}</td>
          <td>${leave.status}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch(err => {
      console.error('Failed to load leave requests', err);
    });
}

function updateLeaveStatus(id, status) {
  fetch(`https://leaves-2diq.onrender.com/api/leaves/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status })
  })
    .then(res => res.json())
    .then(() => {
      alert(`Leave ${status.toLowerCase()} successfully.`);
      loadLeaveRequests();
    })
    .catch(err => {
      console.error('Error updating leave:', err);
    });
}

loadLeaveRequests();
