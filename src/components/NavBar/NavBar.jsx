import React from "react";
import { AppBar, Toolbar, IconButton, Badge, MenuItem, Typography, Icon } from "@material-ui/core";
import { ShoppingCart } from "@material-ui/icons";
import { Link, useLocation } from "react-router-dom";
import useStyles from "./styles";

import logo from "../../assets/logo.jpg";

const NavBar = ({totalItems}) => {

    const classes = useStyles();
    const location = useLocation();

    return(
        <div>
            <AppBar position = "fixed" className = {classes.appBar} color = "inherit">
                <Toolbar>
                    <Typography component = {Link} to = "/" variant = "h6" className = {classes.title} color = "inherit">
                        <img src = {logo} alt = "ADM-Shop" height = "25px" className={classes.image} />
                        ADM Shop
                    </Typography>
                    <div className = {classes.grow} />
                    {location.pathname === "/" && (
                        <div className = {classes.button} >
                            <IconButton component = {Link} to = "/cart" aria-label = "Show cart items" color = "inherit">
                                <Badge badgeContent = {totalItems} color = "secondary">
                                    <ShoppingCart />
                                </Badge>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default NavBar;