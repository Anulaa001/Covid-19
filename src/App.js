import {React, useState} from 'react';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Drawer,
  CssBaseline,
  Toolbar,
  List,
  Typography,
  IconButton,
  ListItemText,
  ListItemIcon,
  Alert
}from '@mui/material';

import {
  Menu,
  ChevronLeft,
  ChevronRight,
  HomeRounded,
  InfoRounded
} from '@mui/icons-material';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Home from './pages/Home'
import Info from './pages/Info'
import {
  AppBar,
  Main,
  DrawerHeader,
  ListItemStyled,
  LinkStyled,
  Footer
} from "./styles/helper"


function App() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <Menu />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Covid-19
          </Typography>
        </Toolbar>
      </AppBar>
      <Router>
      <Drawer
        sx={{
          width: "220px",
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '220px',
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </DrawerHeader>
        <List>
          <nav>
              <LinkStyled to="/">
                <ListItemStyled button key="home">
                <ListItemIcon>
                  <HomeRounded/>
                </ListItemIcon>
                <ListItemText primary="Home"/>
                </ListItemStyled>
              </LinkStyled>
              <LinkStyled to="/info">
                <ListItemStyled button key="info">
                  <ListItemIcon>
                    <InfoRounded/>
                  </ListItemIcon>
                  <ListItemText primary="Info Page"/>
                </ListItemStyled>
            </LinkStyled>
          </nav>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Routes>
          <Route path="/info" element={<Info />}/>
          <Route path="/" element={<Home />}/>
        </Routes>
      </Main>
    </Router>
    </Box>
    <Footer>
    <Alert severity="info">All data used provided by "https://disease.sh/" and "https://www.who.int/"</Alert>
    </Footer>
    </div>
  );
}

export default App;
