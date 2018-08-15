import React, { Component } from 'react';
import ModalForm from '../ModalForm/ModalForm.jsx';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddCircle from '@material-ui/icons/AddCircle';
import Search from '@material-ui/icons/Search';
import './NavBar.css';

export default class NavBar extends Component {
  state = { open: false }

  openModal = () => {
    this.setState({
      open: true,
    })
  }

  closeModal = () => {
    this.setState({
      open: false,
    })
  }


  render() {
    // console.log(this.state.open);
    return (
      <div className="navbar">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              InstaClone
            </Typography>
            <TextField
              className="nav-icon search"
              placeholder="Search"
              name="search"
              onChange={this.props.handleSearch}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />
            <IconButton color="secondary" onClick={this.openModal}>
              <AddCircle/>
            </IconButton>
          </Toolbar>
        </AppBar>
        {this.state.open && <ModalForm handleClose={this.closeModal} open={this.state.open} modalSubmit={this.props.modalSubmit}/>}
      </div>
    )
  }
};
