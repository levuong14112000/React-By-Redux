import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from "@mui/material";
import * as React from 'react';
import { Link, NavLink } from "react-router-dom";
import { StoreContext } from "../features/context/StoreContext";
import { useSelector } from "react-redux";
import { BasketItem } from "../model/basket";

interface Props {
    darkMode: boolean,
    onSetDarkMode: (isDark: boolean) => void
}

export default function Header(props: Props) {
    const{basket} = useSelector((state : any) => state.basket);
    // for ( i = 0 ; i < basketItems.lenght(); i++) {sum = sum + basket.Items[i].quantity}
    const itemsCount = basket?.basketItems.reduce((sum : number , item : BasketItem) => sum + item.quantity , 0)
    const midLinks = [
        {title: 'catalog', path: '/catalog'},
        {title: 'about', path: '/about'},
        {title: 'contact', path: '/contact'},
        {title: 'manage product', path: '/manage-product'},
        
    ];

    const rightLinks = [
        {title: 'login', path: '/login'},
        {title: 'register', path: '/register'},
    ];

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.onSetDarkMode(event.target.checked);
    };

    const navStyles = {
        color: 'inherit',
        '&:hover': {
            color: 'grey.500'
        },
        '&.active': {
            color: 'text.secondary'
        }
    };

    return (
        <AppBar position="static" sx={{mb: 4}}>
            <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
                <Box display={'flex'} alignItems={'center'}>
                    <Typography 
                        variant="h6" 
                        component={NavLink} to={'/'}
                        sx={{color: 'inherit', textDecoration: 'none'}}
                    >
                        My Shop
                    </Typography>
                    <Switch
                        checked={props.darkMode}
                        onChange={handleChange}
                        inputProps={{ 'aria-label': 'controlled' }}
                        color="warning"
                    />
                    <List sx={{display: 'flex'}}>
                        {midLinks.map(({title, path}) => (
                            <ListItem
                                key={path}
                                component={NavLink}
                                to={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>  
                
                <Box display={'flex'} alignItems={'center'}>
                    <IconButton component={Link}
      to="/basket" size="large" sx={{color:'inherit'}}>
                        <Badge badgeContent={itemsCount} color="secondary">
                            <ShoppingCart />
                        </Badge>
                    </IconButton>

                    <List sx={{display: 'flex'}}>
                        {rightLinks.map(({title, path}) => (
                            <ListItem
                                key={path}
                                component={NavLink}
                                to={path}
                                sx={navStyles}
                            >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
                
            </Toolbar>
        </AppBar>
    );
}