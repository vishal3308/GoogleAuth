import * as React from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';

export default function SwipeableTemporaryDrawer(props) {
  let Auth ;
  console.log('Navbar calling..')
  if(localStorage.getItem('E-comm_token')){
    Auth=true
  }
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
  const Template = (props) => {
    return (
      <Link to={props.redirect}>
        <ListItem disablePadding sx={{ width: props.width }}>
          <ListItemButton >
            <ListItemIcon>
              <MailIcon />
            </ListItemIcon>
            <ListItemText primary={props.name} />
          </ListItemButton>
        </ListItem>
      </Link>
    )
  }

  const Menulist = () => (
    Auth ?
      <>
        <Template width={'auto'} redirect={'/'} name={'Home'} />
        <Template width={'auto'} redirect={'/productlist'} name={'Product List'} />
        <Template width={'auto'} redirect={'/addproduct'} name={'Add Product'} />
        <Template width={'auto'} redirect={'/logout'} name={'Logout'} />
      </>
      :
      <>
        <Template width={'auto'} redirect={'/signup'} name={'Sign Up'} />
        <Template width={'auto'} redirect={'/login'} name={'Login'} />
      </>
  );


  return (
    <>
      <Box
        sx={{
          width: 'auto',
          display: { xs: 'none', md: 'flex' },
          backgroundColor: 'skyblue'
        }}
      >
        <List sx={{ display: 'flex' }}>
        <Menulist />
        </List>
      </Box>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer(true)}
        edge="start"
        sx={{ mr: 2, display: { xs: 'block', md: 'none' }, marginLeft: 1 }}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor={'top'}
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
