import React from 'react';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import './Form.css'

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      titleError: false,
      titleErrorMsg: '',
      description: '',
      descriptionError: false,
      descriptionErrorMsg: '',
      image: '',
      imageError: false,
      imageErrorMsg: '',
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  fieldIsEmpty = (str) => {
    if(!str) return true;
    return false;
  }

  fieldsAreValid = (title, description, image) => {
    this.setState({
      titleError: false,
      titleErrorMsg: '',
      descriptionError: false,
      descriptionErrorMsg: '',
      imageError: false,
      imageErrorMsg: '',
    });

    let errors = {};
    let errorMessages = {};
    if(fieldIsEmpty(title)) {
      errorMessages.titleErrorMsg = 'No title set';
      errors.titleError = true;
    }
    if(fieldIsEmpty(description)) {
      errorMessages.descriptionErrorMsg = 'No description set';
      errors.descriptionError = true;
    }
    if(fieldIsEmpty(image)) {
      errorMessages.imageErrorMsg = 'No image set';
      errors.imageError = true;
    }

    this.setState({
      ...errors,
      ...errorMessages,
    })

    if(Object.keys(errors).length === 0){
      this.setState({
        title: '',
        description: '',
        image: '',
      })
      return true;
    }
    return false;
  }

  handleSubmit = (e) => {
    const { title, description, image } = this.state;
    
    if(!this.fieldsAreValid(title, description, image)) {
      return;
    }
    this.props.handleSubmit(title, description)
  }


  render() {
    return (
      <form className='flex-container'>
        <TextField
          error={this.state.titleError}
          name='title'
          label='Title'
          value={this.state.title}
          onChange={this.handleChange}
          className='text-field'
          margin="dense"
          helperText={this.state.titleErrorMsg}
        />
        <TextField
          error={this.state.descriptionError}
          name='description'
          label='Description'
          value={this.state.description}
          onChange={this.handleChange}
          className='text-field'
          margin="dense"
          helperText={this.state.descriptionErrorMsg}
        />
        <TextField
          error={this.state.imageError}
          name='image'
          label='Image Url'
          value={this.state.image}
          onChange={this.handleChange}
          className='text-field'
          margin="dense"
          helperText={this.state.imageErrorMsg}
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
