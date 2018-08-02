import React from 'react';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import './form.css'

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      description: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    return
  }

  render() {
    return (
      <form className='flex-container'>
        <TextField
          name='title'
          label='Title'
          value={this.state.title}
          onChange={this.handleChange}
          className='text-field'
          margin="normal"
        />
        <TextField
          name='description'
          label='Description'
          value={this.state.description}
          onChange={this.handleChange}
          className='text-field'
          margin="normal"
        />
        <Button
          variant='contained'
          color='primary'
          onClick={this.handleSubmit}
          className='form-button'>
          Submit
        </Button>
      </form>
    )
  }
};



