// Load saved data
let items = JSON.parse(localStorage.getItem("items")) || [];

// Initial render
renderTable();

function addItem() {
  let name = document.getElementById("itemName").value.trim();
  let qty = document.getElementById("itemQty").value.trim();

  if (!name || !qty) {
    showMessage("Please fill all fields");
    return;
  }

  if (qty <= 0) {
    showMessage("Quantity must be greater than 0");
    return;
  }

  // Prevent duplicate items
  let exists = items.some(item => item.name.toLowerCase() === name.toLowerCase());
  if (exists) {
    showMessage("Item already exists");
    return;
  }

  let item = {
    name: name,
    qty: Number(qty)
  };

  items.push(item);
  saveData();
  renderTable();

  document.getElementById("itemName").value = "";
  document.getElementById("itemQty").value = "";
}

/* SAVE TO LOCAL STORAGE */
function saveData() {
  localStorage.setItem("items", JSON.stringify(items));
}

/* RENDER TABLE */
function renderTable() {
  let table = document.getElementById("table");
  table.innerHTML = "";

  let lowStock = 0;

  items.forEach((item, index) => {
    let row = table.insertRow();

    row.insertCell(0).innerText = item.name;
    row.insertCell(1).innerText = item.qty;

    // Low stock logic
    if (item.qty < 5) lowStock++;

    let deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = () => deleteItem(index);

    let cell = row.insertCell(2);
    cell.appendChild(deleteBtn);
  });

  // Update dashboard cards
  document.getElementById("count").innerText = items.length;

  let lowStockEl = document.getElementById("lowStock");
  if (lowStockEl) lowStockEl.innerText = lowStock;
}

/* DELETE ITEM */
function deleteItem(index) {
  items.splice(index, 1);
  saveData();
  renderTable();
}

/* SEARCH */
function searchItem() {
  let input = document.getElementById("search").value.toLowerCase();
  let rows = document.getElementById("table").getElementsByTagName("tr");

  for (let i = 0; i < rows.length; i++) {
    let item = rows[i].getElementsByTagName("td")[0];

    if (item) {
      let text = item.innerText.toLowerCase();
      rows[i].style.display = text.includes(input) ? "" : "none";
    }
  }
}

/* LOGOUT */
function logout() {
  localStorage.removeItem("user"); // optional
  window.location.href = "login.html";
}

/* BETTER MESSAGE SYSTEM */
function showMessage(msg) {
  alert(msg); // can upgrade later to toast UI
}
