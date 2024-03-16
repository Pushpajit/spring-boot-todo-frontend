import React from 'react'
import elf from '../assets/image/christmas-elf.gif'
import { Avatar, IconButton, ListItemIcon, ListItemText } from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const navigate = useNavigate();
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate("/signin");
    }

    return (
        <nav className="fixed w-full z-10 top-0 shadow bg-slate-500">
            <div className="w-full container mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
                <div className="pl-4 flex items-center">
                    <div className='w-[50px] h-[50px] cursor-pointer'>
                        <img className='object-contain' src={elf}></img>
                    </div>

                </div>
                <div className="block lg:hidden pr-4">
                    <button className="flex items-center p-1 text-orange-800 hover:text-gray-900">
                        <svg
                            className="fill-current h-6 w-6"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>
                </div>
                <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-white lg:bg-transparent text-black p-4 lg:p-0 z-20">
                    <ul className="list-reset lg:flex justify-end flex-1 items-center">

                        <li>
                            <IconButton size='small' onClick={handleClick}>
                                <Avatar />
                            </IconButton>
                        </li>
                    </ul>
                </div>
            </div>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <AccountBoxIcon fontSize='small' />
                    </ListItemIcon>

                    <ListItemText>
                        Profile
                    </ListItemText>
                </MenuItem>

                <MenuItem onClick={handleClose}>
                    <ListItemIcon>
                        <LogoutIcon fontSize='small' />
                    </ListItemIcon>

                    <ListItemText onClick={handleLogout}>
                        Logout
                    </ListItemText>
                </MenuItem>
            </Menu>
        </nav>
    )
}

export default Navbar


