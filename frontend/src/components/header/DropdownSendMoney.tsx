import React from 'react';
import { Button, Menu, MenuItem, Divider } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface DropdownSendMoneyProps {
  setView: React.Dispatch<React.SetStateAction<string>>;
}

const DropdownSendMoney: React.FC<DropdownSendMoneyProps> = ({ setView }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTuzemskaPlatbaClick = () => {
    setView('sendPayment');
    handleClose();
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        style={{ textTransform: 'lowercase' }}
      >
        Poslat peníze
      </Button>
      <Menu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem onClick={handleTuzemskaPlatbaClick} disableRipple>
          Tuzemská platba
        </MenuItem>
        <MenuItem onClick={handleClose} disableRipple>
          Platba zahraničí
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem onClick={handleClose} disableRipple>
          Převod mezi účty
        </MenuItem>
      </Menu>
    </div>
  );
};

export default DropdownSendMoney;
