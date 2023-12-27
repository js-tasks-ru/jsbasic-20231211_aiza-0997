function makeDiagonalRed(table) {
  for (let row of table.rows) {
    for (let td of row.cells) {
      if (row.rowIndex === td.cellIndex) {
        td.style.backgroundColor = 'red';
      }
    }
  }
}
