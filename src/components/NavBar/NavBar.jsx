import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import AddCircle from '@material-ui/icons/AddCircle';
import Search from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';
import ModalForm from '../ModalForm/ModalForm.jsx';

const styles = {
  navbar: {
    flexGrow: 1,
  },
  navIcon: {
    marginLeft: 'auto',
  },
  appbar: {
    color: 'black',
    backgroundColor: 'white',
  },
};

class NavBar extends Component {
  state = { open: false }

  openModal = () => {
    this.setState({
      open: true,
    });
  }

  closeModal = () => {
    this.setState({
      open: false,
    });
  }

  render() {
    return (
      <div className="navbar" style={styles.navbar}>
        <AppBar position="static" className="appbar" style={styles.appbar}>
          <Toolbar>
            <Typography variant="title" color="inherit">
              InstaClone
            </Typography>
            <TextField
              style={styles.navIcon}
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
        {this.state.open &&
          <ModalForm
            handleClose={this.closeModal}
            open={this.state.open}
            modalSubmit={this.props.modalSubmit}/>
        }
      </div>
    );
  }
}

NavBar.propTypes = {
  addClick: PropTypes.func.isRequired,
  modalSubmit: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default withStyles(styles)(NavBar);
