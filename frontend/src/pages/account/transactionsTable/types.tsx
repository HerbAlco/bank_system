export interface Column {
    id: keyof Transaction;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: string | number) => string | JSX.Element;
}

export interface Transaction {
    id: number;
    amount: number;
    dateTimeTrans: string;
    symbol: string;
    description: string;
    transType: string;
}
