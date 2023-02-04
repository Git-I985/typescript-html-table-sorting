import './style.css';

const log = console.log;

type Order = boolean;

type ColumnIndex = number;

type TableRow = HTMLTableRowElement;

type Comparator = (row1: TableRow, row2: TableRow, order: Order) => number;

type TableSorter = (columnIndex: ColumnIndex, order: Order) => void;

type TableHeaderClickHandlerCallback = (
  tableColumnHeaderIdx: ColumnIndex,
  order: Order
) => any;

type TableHeaderClickHandlerReturn = (e: MouseEvent) => void;

const sortRows = (
  rows: Iterable<TableRow>,
  order: Order,
  comparator: Comparator
): TableRow[] => Array.from(rows).sort((a, b) => comparator(a, b, order));

const createTableSortHeaderClickHandler = (
  callback: TableHeaderClickHandlerCallback
): TableHeaderClickHandlerReturn => {
  let order: Order = true;

  return (e) => {
    const tableColumnHeader = e.target as HTMLTableCellElement;

    const tableColumnHeaderIdx: ColumnIndex = Array.from(
      tableColumnHeader.parentNode.children
    ).indexOf(tableColumnHeader);

    order = !order;

    callback(tableColumnHeaderIdx, order);
  };
};

const createTableSorter =
  (
    table: HTMLTableElement | HTMLTableSectionElement,
    comparators: Comparator[]
  ): TableSorter =>
  (columnIndex, order) => {
    if (!comparators[columnIndex]) return;
    const rows = table.querySelectorAll('tr');
    sortRows(rows, order, comparators[columnIndex]).forEach((row) => {
      table.appendChild(row);
    });
  };

const initTableSorting = (
  table: HTMLTableElement,
  comparators: Comparator[]
) => {
  const tableHeaders = table.querySelectorAll('thead th');
  const sortByColumn = createTableSorter(table, comparators);
  tableHeaders.forEach((tableHeader) => {
    tableHeader.addEventListener(
      'click',
      createTableSortHeaderClickHandler(sortByColumn)
    );
  });
};

const comparators: Comparator[] = [
  (row1, row2, order) => {
    return order
      ? parseInt(row1.cells[0].innerText) - parseInt(row2.cells[0].innerText)
      : parseInt(row2.cells[0].innerText) - parseInt(row1.cells[0].innerText);
  },
];

initTableSorting(document.querySelector('table'), comparators);
