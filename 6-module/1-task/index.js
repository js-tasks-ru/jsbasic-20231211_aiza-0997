/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  #elem;

  constructor(rows) {
    let table = document.createElement('table');
    table.createTBody();
    for (let row of rows) {
      let tr = table.insertRow();
      tr.insertCell(0).textContent = row.name;
      tr.insertCell(1).textContent = row.age;
      tr.insertCell(2).textContent = row.salary;
      tr.insertCell(3).textContent = row.city;
      let btn = document.createElement('button');
      btn.textContent = 'X';
      tr.insertCell(4).append(btn);
    }

    this.#elem = table; 

    table.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        event.target.closest('tr').remove(); 
      }
    })
  }

  get elem()
  {
    return this.#elem;
  }
}
