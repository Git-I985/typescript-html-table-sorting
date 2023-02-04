# typescript-html-table-sorting

```ts
import { Comparator, initTableSorting, noSort } from './sorting';
import './style.css';

const firstColumn: Comparator = (row1, row2, order) =>
  parseInt((order ? row1 : row2).cells[0].innerText) -
  parseInt((order ? row2 : row1).cells[0].innerText);

const secondColumn: Comparator = (row1, row2, order) =>
  parseInt((order ? row1 : row2).cells[2].innerText) -
  parseInt((order ? row2 : row1).cells[2].innerText);

const columnsSorting = [firstColumn, noSort, secondColumn];

initTableSorting(document.querySelector('table'), columnsSorting);
```
