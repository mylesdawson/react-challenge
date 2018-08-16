import React, { Component } from 'react';
import { Button, TextField, Modal, FormHelperText } from '@material-ui/core';
import { fieldIsEmpty, urlIsValid, imageUrlsAreValid } from '../../utils/utils';
import './ModalForm.css';

export default class ModalForm extends Component {
  state = {
    title: '',
    description: '',
    images: [{ image: '' }],
    errorMsg: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  addImageUrl = (e) => {
    let images = this.state.images;
    images.push({ image: '' });
    this.setState({
      images,
    })
  }

  handleUrlChange = (e) => {
    let updatedImages = this.state.images;
    updatedImages[e.target.name].image = e.target.value;
    this.setState({
      images: updatedImages,
    })
  }

  handleSubmit = (e) => {
    const { title, description, images } = this.state;

    for(let i in images) {
      if(!urlIsValid(images[i].image)) {
        this.setState({ errorMsg: 'One or more image urls are invalid' });
        return
      }
    }
    if(fieldIsEmpty(title) || fieldIsEmpty(description)) {
      this.setState({ errorMsg: 'Title or Description is empty'});
      return
    }

    this.setState({
      images: [{ image: '' }],
      title: '',
      description: '',
    })
    this.props.modalSubmit(title, description, images);
  }

  render() {
    const { images, title, description, errorMsg } = this.state;

    const imageUrls = images.map((image, index) => {
      return (
        <TextField
          name={`${index}`}
          label='Image'
          key={index}
          id={`${index}`}
          value={image.image}
          onChange={this.handleUrlChange}
          inputProps={{ maxLength: 128 }}
          margin="dense"
          className='text-field'
        />
      )
    })

    return (
      <div>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.handleClose}
        >
          <form className='flex-container modal-form'>
            <TextField
              name='title'
              label='Title'
              value={title}
              onChange={this.handleChange}
              className='text-field'
              margin="dense"
              inputProps={{ maxLength: 128 }}
            />
            <TextField
              name='description'
              label='Description'
              value={description}
              onChange={this.handleChange}
              className='text-field'
              margin="dense"
              inputProps={{ maxLength: 128 }}
            />
            {imageUrls}
            <FormHelperText
              name='error'
              label='error'
              error
              margin="dense"
              className='text-field'>
              {errorMsg}
            </FormHelperText>
            <Button
              variant='contained'
              color='secondary'
              onClick={this.addImageUrl}
              className='form-button'>
              Add Image Url
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={this.handleSubmit}
              className='form-button'>
              Submit
            </Button>
          </form>
        </Modal>
      </div>
    )
  }
}
