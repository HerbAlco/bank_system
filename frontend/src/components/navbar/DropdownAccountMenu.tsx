import React from 'react';
import { FormControl, Select, MenuItem, OutlinedInput, InputLabel, SvgIcon, Icon, styled } from '@mui/material';
import { useAccountContext } from '../../accountContextApi/AccountContext';
import { SelectChangeEvent } from '@mui/material/Select';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface AccountMenuProps {
    anchorEl: null | HTMLElement;
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleClose: () => void;
}

const ALL_ACCOUNTS_ID = -1;

const CustomSelect = styled(Select)({
    '& .MuiSelect-icon': {
        color: 'white',
    },
    '& .MuiOutlinedInput-root': {
        color: 'white',
    },
});

const AccountMenu: React.FC<AccountMenuProps> = ({ anchorEl, handleClick, handleClose }) => {
    const { accounts, setSelectedAccount } = useAccountContext();
    const [selectedAccountId, setSelectedAccountId] = React.useState<number>(ALL_ACCOUNTS_ID);

    const handleChange = (event: SelectChangeEvent<unknown>) => {
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
            <FormControl sx={{ m: 1, width: 200, backgroundColor: 'green', borderRadius: '8px' }}>
                <CustomSelect
                    labelId="simple-select-label"
                    id="simple-select"
                    value={selectedAccountId}
                    onChange={handleChange}
                    input={<OutlinedInput label="Select Account" sx={{ color: 'white' }} />}
                    IconComponent={(props) => (
                        <KeyboardArrowDownIcon {...props} sx={{ color: 'white' }} />
                    )}
                >
                    <MenuItem value={ALL_ACCOUNTS_ID}>Všechny účty</MenuItem>
                    {accounts.map((account) => (
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