import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrello } from '@fortawesome/free-brands-svg-icons';
import theme from '../../styles/theme';

function Navbar() {


  return (
    <>
      <AppBar position="static" color="primary" sx={{px: 0, py: 1}}>
        <Toolbar style={{width: "80%", margin: "0 auto", padding:"0px"}}>
          <IconButton edge="start" style={{ marginRight: "15px"}} aria-label="logo" >
            <FontAwesomeIcon style={{ color: theme.palette.primary.contrastText , fontSize: "2rem"}} icon={faTrello} />
          </IconButton>
          <Typography variant="h1" sx={{ flexGrow: 1 }} style={{textTransform: "uppercase", fontWeight: "700"}}>
            Trello
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Navbar;
