document.addEventListener('DOMContentLoaded', () => getCustomers(1));

const customersEl = document.querySelector(".table-body");
const customersElMobile = document.querySelector('.mobile-table')
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const pageNumbersEl = document.getElementById('pageNumbers');
let currentPage = 1;
const resultsPerPage = 8;
let totalPages = 1;
let allCustomers = [];

// Fetch customers for a given page
async function getCustomers(page) {
    const response = await fetch(`https://randomuser.me/api/?results=400`);
    const data = await response.json();
    allCustomers = data.results;
    totalPages = Math.ceil(allCustomers.length / resultsPerPage);
    displayCustomers(page);
    updatePaginationButtons(page);
}

// Display customers for the current page
function displayCustomers(page) {
    customersEl.innerHTML = ""; // Clear previous data
    customersElMobile.innerHTML = "";
    const startIndex = (page - 1) * resultsPerPage;
    const endIndex = page * resultsPerPage;
    const customersList = allCustomers.slice(startIndex, endIndex);
    createItems(customersList);
    createMobileItems(customersList);
    currentPage = page;
    createPageNumbers(); // Update page numbers
}

// Create table rows for the customers
function createItems(data) {
    data.forEach((item) => {
        customersEl.insertAdjacentHTML(
            "beforeend",
            getItem(item.name.first, item.name.last, item.location.city, item.phone, item.email, item.location.country)
        );
    });
}
function createMobileItems(data) {
    data.forEach((item) => {
        customersElMobile.insertAdjacentHTML(
            "beforeend",
            getMobileItem(item.name.first, item.name.last, item.phone, item.email)
        );
    });
}
 
// Generate HTML for each table row
function getItem(first, last, company, phone, email, country) {
    return `
        <tr class='table-row'>
            <td>${first} ${last}</td>
            <td>${company}</td>
            <td>${phone}</td>
            <td>${email}</td>
            <td>${country}</td>
            <td><button class='activeBtn'>Active</button></td>
        </tr>
    `;
}
function getMobileItem(first, last, phone, email) {
    return `
        <tr class='table-row'>
            <td>${first} ${last}</td>
            <td>${phone}</td>
            <td>${email}</td>
        </tr>
    `;
}

// Update pagination buttons (disable/enable based on the current page)
function updatePaginationButtons(page) {
    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === totalPages;
}

// Handle previous and next button clicks
prevBtn.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        displayCustomers(currentPage);
        updatePaginationButtons(currentPage);
    }
});

nextBtn.addEventListener('click', () => {
    if (currentPage < totalPages) {
        currentPage++;
        displayCustomers(currentPage);
        updatePaginationButtons(currentPage);
    }
});

// Create numbered page buttons and display them
function createPageNumbers() {
    pageNumbersEl.innerHTML = ""; // Clear previous page numbers
    const maxPagesToShow = 5;
    let startPage, endPage;

    if (totalPages <= maxPagesToShow) {
        startPage = 1;
        endPage = totalPages;
    } else {
        // Show maxPagesToShow pages at a time, with "..." when skipping pages
        if (currentPage <= 3) {
            startPage = 1;
            endPage = maxPagesToShow;
        } else if (currentPage + 2 >= totalPages) {
            startPage = totalPages - maxPagesToShow + 1;
            endPage = totalPages;
        } else {
            startPage = currentPage - 2;
            endPage = currentPage + 2;
        }
    }

    // Add page numbers to the pagination
    if (startPage > 1) {
        pageNumbersEl.insertAdjacentHTML('beforeend', `<button class="page" data-page="1">1</button>`);
        if (startPage > 2) {
            pageNumbersEl.insertAdjacentHTML('beforeend', `<span>...</span>`);
        }
    }

    for (let i = startPage; i <= endPage; i++) {
        pageNumbersEl.insertAdjacentHTML('beforeend', `<button class="page ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`);
    }

    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            pageNumbersEl.insertAdjacentHTML('beforeend', `<span>...</span>`);
        }
        pageNumbersEl.insertAdjacentHTML('beforeend', `<button class="page" data-page="${totalPages}">${totalPages}</button>`);
    }

    // Add event listeners to page buttons
    document.querySelectorAll('.page').forEach(button => {
        button.addEventListener('click', (e) => {
            const page = parseInt(e.target.getAttribute('data-page'));
            displayCustomers(page);
            updatePaginationButtons(page);
        });
    });
}
