import React, { useEffect } from 'react';
import { FormControl, Select, MenuItem, OutlinedInput, styled } from '@mui/material';
import { useAccountContext } from '../../accountContextApi/AccountContext';
import { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


const CustomSelect = styled(Select)({
    '& .MuiSelect-icon': {
        color: 'white',
    },
    '& .MuiOutlinedInput-root': {
        color: 'white',
    },
});

const AccountMenu: React.FC = () => {
    const { accounts, setSelectedAccount, selectedAccount, selectedAccountId, setSelectedAccountId } = useAccountContext();

    useEffect(() => {
        if (selectedAccount) {
            setSelectedAccountId(selectedAccount.id);
        }
    }, [selectedAccount, setSelectedAccountId]);

    const handleChange = (event: SelectChangeEvent<number | unknown>) => {
        const accountId = event.target.value as number;
        setSelectedAccountId(accountId);

        if (accountId === selectedAccountId) {
            setSelectedAccount(null);
        } else {
            const selectedAccount = accounts.find(account => account.id === accountId) || null;
            setSelectedAccount(selectedAccount);
        }
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 200, backgroundColor: 'green', borderRadius: '8px' }}>
                <CustomSelect
                    labelId="simple-select-label"
                    id="simple-select"
                    value={selectedAccountId ?? 'Náhled'}
                    onChange={handleChange}
                    input={<OutlinedInput sx={{ color: 'white' }} />}
                    IconComponent={(props) => (
                        <KeyboardArrowDownIcon {...props} />
                    )}
                >
                    <MenuItem value='Náhled'>Náhled</MenuItem>
                    {Array.isArray(accounts) && accounts.map((account) => (
                        <MenuItem key={account.id} value={account.id}>
                            {account.name}
                        </MenuItem>
                    ))}
                </CustomSelect>
            </FormControl>
        </div>
    );
};

export default AccountMenu;