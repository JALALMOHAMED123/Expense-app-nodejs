const form = document.querySelector('form');

form.addEventListener('submit', async function(event) {
    event.preventDefault();
    const amount = event.target.amount.value;
    const description = event.target.description.value;
    const category = event.target.category.value;

    const obj = { amount, description, category };

    try {
        const response = await fetch('/expenses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
        const data = await response.json();
        showDetails(data.id, amount, description, category);
        form.reset();
    } catch (error) {
        console.error('Error:', error);
    }
});

async function fetchExpenses() {
    try {
        const response = await fetch('/expenses');
        const expenses = await response.json();
        expenses.forEach(expense => {
            showDetails(expense.id, expense.amount, expense.description, expense.category);
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

function showDetails(id, amount, description, category) {
    const parent = document.getElementById('expense-list');
    const li = document.createElement('li');
    li.className = 'list-group-item';

    li.innerHTML = `${amount} - ${description} - ${category} &nbsp;
                    <form action="/expenses/delete/${id}" method="POST" style="display:inline;">
                        <button type="submit" class="btn btn-danger btn-sm">Delete</button>
                    </form>
                    &nbsp;
                    <form action="/expenses/edit/${id}" method="POST" style="display:inline;">
                        <button type="submit" class="btn btn-warning btn-sm">Edit</button>
                        <input type="hidden" name="id" value="${id}">
                        <input type="hidden" name="amount" value="${amount}">
                        <input type="hidden" name="description" value="${description}">
                        <input type="hidden" name="category" value="${category}">
                    </form>`;
    parent.appendChild(li);
}

window.onload = fetchExpenses;
