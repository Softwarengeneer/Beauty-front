import { MatPaginatorIntl } from '@angular/material/paginator';

const rusRangeLabel = (page: number, pageSize: number, length: number) => {
  if (length === 0 || pageSize === 0) { return `0 из ${length}`; }

  length = Math.max(length, 0);

  const startIndex = page * pageSize;

  // If the start index exceeds the list length, do not try and fix the end index to the end.
  const endIndex = startIndex < length ?
    Math.min(startIndex + pageSize, length) :
    startIndex + pageSize;

  return `${startIndex + 1} - ${endIndex} из ${length}`;
};


export function getRusPaginatorIntl(): any {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Строк на странице';
  paginatorIntl.nextPageLabel     = '';
  paginatorIntl.previousPageLabel = '';
  paginatorIntl.firstPageLabel = '';
  paginatorIntl.lastPageLabel = '';
  paginatorIntl.getRangeLabel = rusRangeLabel;

  return paginatorIntl;
}
