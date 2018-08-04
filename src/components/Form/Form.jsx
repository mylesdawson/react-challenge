import React from 'react';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import './Form.css'

export default class Form extends React.Component {
  state = {
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

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  fieldIsEmpty = (str) => {
    if(!str) return true;
    return false;
  }

  urlIsValid = (url) => {
    const reg = /(https?:\/\/.*\.(?:png|jpg))/;
    // Returns true if url matches regex, false otherwise
    return reg.test(url)
  }

  fieldsAreValid = (title, description, imageUrl) => {
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
    if(this.fieldIsEmpty(title)) {
      errorMessages.titleErrorMsg = 'No title set';
      errors.titleError = true;
    }
    if(this.fieldIsEmpty(description)) {
      errorMessages.descriptionErrorMsg = 'No description set';
      errors.descriptionError = true;
    }
    if(this.fieldIsEmpty(imageUrl)) {
      errorMessages.imageErrorMsg = 'No image url set';
      errors.imageError = true;
    }
    if(!this.urlIsValid(imageUrl)) {
      errorMessages.imageErrorMsg = 'Invalid image url';
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
    this.props.handleSubmit(title, description, image)
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
          inputProps={{ maxLength: 128 }}
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
          inputProps={{ maxLength: 128 }}
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
          inputProps={{ maxLength: 128 }}
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
