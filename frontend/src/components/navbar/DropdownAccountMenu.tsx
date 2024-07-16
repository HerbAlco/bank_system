import React from 'react';
import { FormControl, Select, MenuItem, OutlinedInput, InputLabel } from '@mui/material';
import { useAccountContext } from '../../accountContextApi/AccountContext';
import { SelectChangeEvent } from '@mui/material/Select';

interface AccountMenuProps {
    anchorEl: null | HTMLElement;
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleClose: () => void;
}

const ALL_ACCOUNTS_ID = -1;

const AccountMenu: React.FC<AccountMenuProps> = ({ anchorEl, handleClick, handleClose }) => {
    const { accounts, setSelectedAccount } = useAccountContext();
    const [selectedAccountId, setSelectedAccountId] = React.useState<number>(ALL_ACCOUNTS_ID);

    const handleChange = (event: SelectChangeEvent<number>) => {
        const accountId = event.target.value as number;
        setSelectedAccountId(accountId);

        if (accountId === ALL_ACCOUNTS_ID) {
            setSelectedAccount(null);
        } else {
            const selectedAccount = accounts.find(account => account.id === accountId);
            if (selectedAccount) {
                setSelectedAccount(selectedAccount);
            }
        }
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="account-name-label">Výběr účtu</InputLabel>
                <Select
                    labelId="account-name-label"
                    id="account-name"
                    value={selectedAccountId}
                    onChange={handleChange}
                    input={<OutlinedInput label="Select Account" />}
                >
                    <MenuItem value={ALL_ACCOUNTS_ID}>Všechny účty</MenuItem>
                    {accounts.map((account) => (
                        <MenuItem key={account.id} value={account.id}>
                            {account.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default AccountMenu;