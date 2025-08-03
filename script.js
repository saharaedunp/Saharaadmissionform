// Selecting elements
const studentForm = document.getElementById('studentForm');
const studentTableBody = document.querySelector('#studentTable tbody');
const totalFeeSumCell = document.getElementById('totalFeeSum');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');

let totalFeeSum = 0;

// Add Student Function
studentForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get values
    const id = document.getElementById('studentId').value;
    const name = document.getElementById('name').value;
    const contact = document.getElementById('contact').value;
    const address = document.getElementById('address').value;
    const admissionDate = document.getElementById('admissionDate').value;
    const course = document.getElementById('Course').value;
    const totalFee = parseFloat(document.getElementById('totalFee').value);
    const dueFee = document.getElementById('dueFee').value;
    const status = document.getElementById('status').value;
    const remarks = document.getElementById('remarks').value;
    const photoFile = document.getElementById('photo').files[0];

    // Create photo URL
    let photoURL = '';
    if (photoFile) {
        photoURL = URL.createObjectURL(photoFile);
    }

    // Add new row
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td>${id}</td>
        <td>${name}</td>
        <td>${contact}</td>
        <td>${address}</td>
        <td>${admissionDate}</td>
        <td>${course}</td>
        <td>${totalFee}</td>
        <td>${dueFee}</td>
        <td>${status}</td>
        <td>${photoURL ? `<img src="${photoURL}" width="40" height="40" style="border-radius:5px;">` : 'No Photo'}</td>
        <td>${remarks}</td>
        <td><button class="deleteBtn">Delete</button></td>
    `;

    studentTableBody.appendChild(newRow);

    // Update total fee sum
    totalFeeSum += totalFee;
    totalFeeSumCell.textContent = totalFeeSum;

    // Clear form
    studentForm.reset();
});

// Delete Student Function
studentTableBody.addEventListener('click', function (e) {
    if (e.target.classList.contains('deleteBtn')) {
        const row = e.target.closest('tr');
        const fee = parseFloat(row.cells[6].textContent);
        totalFeeSum -= fee;
        totalFeeSumCell.textContent = totalFeeSum;
        row.remove();
    }
});

// Search Function
function searchStudent() {
    const filter = searchInput.value.toLowerCase();
    const rows = studentTableBody.getElementsByTagName('tr');

    for (let row of rows) {
        const id = row.cells[0].textContent.toLowerCase();
        const name = row.cells[1].textContent.toLowerCase();

        if (id.includes(filter) || name.includes(filter)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    }
}

searchBtn.addEventListener('click', searchStudent);
searchInput.addEventListener('keyup', searchStudent);
