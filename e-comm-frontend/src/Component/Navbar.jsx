import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LoginIcon from '@mui/icons-material/Login';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import LogoutIcon from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MailIcon from '@mui/icons-material/Mail';
import InfoIcon from '@mui/icons-material/Info';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from 'react-router-dom';
import { Divider } from '@mui/material';
export default function Navbar(props) {
  let Auth = localStorage.getItem('E-comm_token');
  const Profile_image=localStorage.getItem('E-comm_avatar');
  const [profile, setprofile] = React.useState('inline-flex');
  React.useEffect(() => {
    if (!Auth) {
      setprofile('none')
    }
    else {
      setprofile('inline-flex')
    }
  },[Auth])
  let navigate = useNavigate()
  function logout() {
    localStorage.clear();
    navigate('/login');
  }
  // ==========Desktop Profile toggle====
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // ================= Mobile Navbar toggle===
  const [state, setState] = React.useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState(open);
  };
  // ==============Profile Avatar Component================
  function Profile_template() {
    return (
      <>
        <Tooltip title="Account settings">
          <IconButton
            className='profile'
            onClick={handleClick}
            size="medium"
            sx={{ ml: 2, display: profile }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }} alt="Hi" src={Profile_image ? Profile_image : "/avatar.png"} />
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: 'visible',
              filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&:before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem>
            <Avatar alt="User" src={localStorage.getItem('E-comm_avatar')} />{localStorage.getItem('E-comm_name')}
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <MailIcon fontSize="medium" />
            </ListItemIcon>
            {localStorage.getItem('E-comm_email')}
          </MenuItem>
          <MenuItem onClick={logout}>
            <ListItemIcon>
              <LogoutIcon fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </>
    )
  }
  // ==================== Navlink Component===========
  const Template = (props) => {
    return (
      <NavLink to={props.redirect}>
        <ListItem disablePadding sx={{ width: props.width }}>
          <ListItemButton >
            <ListItemIcon>
              <props.icon />
            </ListItemIcon>
            <ListItemText primary={props.name} />
          </ListItemButton>
        </ListItem>
      </NavLink>
    )
  }

  const Menulist = () => (
    Auth ?
      <>
        <Template width={'auto'} redirect={'/'} name={'Home'} icon={HomeIcon} />
        <Template width={'auto'} redirect={'/productlist'} name={'Product List'} icon={ProductionQuantityLimitsIcon} />
        <Template width={'auto'} redirect={'/addproduct'} name={'Add Product'} icon={AddShoppingCartIcon} />
        <Divider/>
        <Template width={'auto'} redirect={'/about'} name={'About Us'} icon={InfoIcon} />
        <Template width={'auto'} redirect={'/contact'} name={'Contact Us'} icon={ContactMailIcon} />

      </>
      :
      <>
        <Template width={'auto'} redirect={'/signup'} name={'Sign Up'} icon={HowToRegIcon} />
        <Template width={'auto'} redirect={'/login'} name={'Login'} icon={LoginIcon} />
      </>
  );


  return (
    <>
      <Box
        sx={{
          width: 'auto',
          display: { xs: 'none', md: 'flex' },
          backgroundColor: 'skyblue',
          alignItems: 'center'
        }}
        className="navbar"
      >
        <List sx={{ display: 'flex' }}>
          <Menulist />
        </List>
        {Profile_template()}
      </Box>


      <Box className='mobile-navbar' sx={{display:{xs:'flex',md:'none'}}}>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer(true)}
          edge="start"
          sx={{ mr: 2, display: { xs: 'block', md: 'none' }, marginLeft: 1 }}
        >
          <MenuIcon />
        </IconButton>
        <div className='mobile-profile'>
        {Profile_template()}
        </div>

      </Box>
      <SwipeableDrawer
        anchor={'left'}
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Box
          sx={{ width: 'auto' }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
          className="Navbar"
        >
          <List>
            <Menulist />
          </List>
        </Box>
      </SwipeableDrawer>
    </>

  );
}
