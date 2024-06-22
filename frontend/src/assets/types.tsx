export interface Column {
    id: keyof Data;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (value: string | number) => string | JSX.Element;
}

export interface Data {
    transaction_id: string;
    datum: string;
    amount: number;
    accountNumber: string;
    symbol: string;
    description: string;
    typeTransaction: string;
}
