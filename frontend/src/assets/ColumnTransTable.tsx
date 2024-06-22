import { Column } from './types';

export const columns: readonly Column[] = [
    { id: 'transaction_id', label: 'ID', minWidth: 10 },
    { id: 'datum', label: 'Datum', minWidth: 150 },
    {
        id: 'amount',
        label: 'Částka',
        minWidth: 170,
        format: (value: string | number) => (typeof value === 'number' ? <b>{value.toLocaleString('en-US')} CZK</b> : `${value}`),
    },
    {
        id: 'accountNumber',
        label: 'Číslo účtu',
        minWidth: 170,
        format: (value: string | number) => value.toString(),
    },
    {
        id: 'symbol',
        label: 'Symbol',
        minWidth: 170,
        format: (value: string | number) => value.toString(),
    },
    {
        id: 'description',
        label: 'Popis',
        minWidth: 170,
        format: (value: string | number) => value.toString(),
    },
    {
        id: 'typeTransaction',
        label: 'Typ transakce',
        minWidth: 170,
        format: (value: string | number) => value.toString(),
    },
];
