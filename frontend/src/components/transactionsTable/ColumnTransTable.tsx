import { format } from 'date-fns';
import { cs } from 'date-fns/locale';
import { Column } from './types'; // Adjust the path if necessary

const formatDate = (value: string | Date | number) => {
    const parsedDate = typeof value === 'string' || typeof value === 'number' ? new Date(value) : value;
    return format(parsedDate, 'HH:mm', { locale: cs });
};

export const columns: readonly Column[] = [
    { id: 'id', label: 'ID' },
    { id: 'dateTimeTrans', label: 'Datum', format: formatDate },
    {
        id: 'amount',
        label: 'Částka',
        format: (value: string | number) => (typeof value === 'number' ? <b>{value.toLocaleString('en-US')} CZK</b> : `${value}`),
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
        id: 'transType',
        label: 'Typ transakce',
        format: (value: string | number) => value.toString(),
    },
];
