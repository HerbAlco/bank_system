import { format } from 'date-fns';
import { cs } from 'date-fns/locale';
import { Column } from './types';

const formatDate = (value: string | Date | number) => {
    // Pokud je value typu string, převedeme ho na objekt Date
    const parsedDate = typeof value === 'string' || typeof value === 'number' ? new Date(value) : value;
    // Formátujeme datum a čas
    return format(parsedDate, 'HH:mm', { locale: cs });
};


export const columns: readonly Column[] = [
    { id: 'transaction_id', label: 'ID' },
    { id: 'datum', label: 'Datum', format: formatDate },
    {
        id: 'amount',
        label: 'Částka',
        format: (value: string | number) => (typeof value === 'number' ? <b>{value.toLocaleString('en-US')} CZK</b> : `${value}`),
    },
    {
        id: 'accountNumber',
        label: 'Číslo účtu',
        format: (value: string | number) => value.toString(),
    },
    {
        id: 'symbol',
        label: 'Symbol',
        format: (value: string | number) => value.toString(),
    },
    {
        id: 'description',
        label: 'Popis',
        format: (value: string | number) => value.toString(),
    },
    {
        id: 'typeTransaction',
        label: 'Typ transakce',
        format: (value: string | number) => value.toString(),
    },
];