//Async function per creare una tabella iniziale con i dati API
async function populateTable() {

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');

        if (!response.ok) {
            throw new Error('Error loading data');
        }

        const data = await response.json();
        
        data.forEach(item => {
        const row = document.createElement('tr');

        const idCell = document.createElement('td');
        idCell.innerText = `${item.id}`;

        const nameCell = document.createElement('td');
        nameCell.innerText = `${item.name}`;

        const emailCell = document.createElement('td');
        emailCell.innerText = `${item.email}`;

        const userCell = document.createElement('td');
        userCell.innerText = `${item.username}`;

        row.appendChild(idCell);
        row.appendChild(nameCell);
        row.appendChild(emailCell);
        row.appendChild(userCell);

        tableBody.appendChild(row);
    });
    }
        catch (error) {
        console.error(error);
        const errorMsg = document.createElement('div');
        errorMsg.textContent = 'Error loading data';
        document.body.appendChild(errorMsg);
    }
}
populateTable();


//Funzione per filtrare l'input dal search e per poter riportare la tabella allo stato iniziale
function filterTable() {

    let input, filter, tableBody, tr, td, i, selectValue;
    
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    tableBody = document.getElementById("tableBody");
    tr = tableBody.getElementsByTagName("tr");
    selectValue = document.getElementById("filter-select").value;

    for (i = 0; i < tr.length; i++) {
      let visible = false;

      for (let j = 0; j < tr[i].getElementsByTagName("td").length; j++) {
        td = tr[i].getElementsByTagName("td")[j];
        let columnValue = td.textContent || td.innerText;

        if (columnValue.toUpperCase().indexOf(filter) > -1) {
          visible = true;
          break;
        }
      }

      if (selectValue === "generic" || selectValue === "") {
        tr[i].style.display = visible ? "" : "none";
      } else {
        var filterColumnIndex = {
          "name": 1,    
          "email": 2,   
          "username": 3 
        }[selectValue];

        if (filterColumnIndex !== undefined) {
          td = tr[i].getElementsByTagName("td")[filterColumnIndex];
          columnValue = td.textContent || td.innerText;
          tr[i].style.display = (columnValue.toUpperCase().indexOf(filter) > -1) ? "" : "none";
        }
      }
    }
  }