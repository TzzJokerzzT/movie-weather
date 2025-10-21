export type DataType = 'movies' | 'weather';

export interface TableColumn {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'image' | 'date';
}
