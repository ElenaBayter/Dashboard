document.addEventListener('DOMContentLoaded', () => getCustomers(1));

const customersEl = document.querySelector(".table-body");
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const currentPageEl = document.getElementById('currentPage');
let currentPage = 1;
const resultsPerPage = 8;
let totalPages = 1;
let allCustomers = [];

async function getCustomers(page) {
    const response = await fetch(`https://randomuser.me/api/?results=400`);
    const data = await response.json();
    allCustomers = data.results;
    totalPages = Math.ceil(allCustomers.length / resultsPerPage);
    displayCustomers(page);
    updatePaginationButtons(page);
}

function displayCustomers(page) {
    customersEl.innerHTML = ""; // Clear previous data
    const startIndex = (page - 1) * resultsPerPage;
    const endIndex = page * resultsPerPage;
    const customersList = allCustomers.slice(startIndex, endIndex);
    createItems(customersList);
    currentPageEl.textContent = page;
}

function updatePaginationButtons(page) {
    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === totalPages;
}

function createItems(data) {
    data.forEach((item) => {
        customersEl.insertAdjacentHTML(
            "beforeend",
            getItem(item.name.first, item.name.last, item.location.city, item.phone, item.email, item.location.country)
        );
    });
}

function getItem(first, last, company, phone, email, country) {
    return `
        <tr class='table-row'>
            <td>${first} ${last}</td>
            <td>${company}</td>
            <td>${phone}</td>
            <td>${email}</td>
            <td>${country}</td>
            <td><button>Active</button></td>
        </tr>
    `;
}