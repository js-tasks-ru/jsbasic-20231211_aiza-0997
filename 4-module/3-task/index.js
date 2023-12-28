function highlight(table) {
  for (let row of table.tBodies[0].rows) {
    let tds = row.cells; 
    
    if (!tds[3].getAttribute("data-available")) {
      row.hidden = true;
    } else {
      if (tds[3].dataset.available === "true") {
        row.classList.add("available")
      } else {
        row.classList.add("unavailable")
      }
    }

    if (tds[2].textContent === "m") {
      row.classList.add("male")
    } else {
      row.classList.add("female")
    }

    if (tds[1].textContent < 18) {
      row.style.textDecoration = "line-through"
    }
  }
}
