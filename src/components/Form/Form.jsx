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
      image: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit = (e) => {
    const { title, description, image } = this.state;
    this.props.handleSubmit(title, description)
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
        <TextField
          name='image'
          label='Image Url'
          value={this.state.image}
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
