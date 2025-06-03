window.addEventListener('DOMContentLoaded', (event) => {
    // Select all table rows inside the tbody
    const rows = document.querySelectorAll('table tbody tr');

    // Loop through the rows and assign the serial number
    rows.forEach((row, index) => {
        const serialNumberCell = row.querySelector('td:first-child');
        serialNumberCell.textContent = index + 1; // S.No. starts from 1
    });
});