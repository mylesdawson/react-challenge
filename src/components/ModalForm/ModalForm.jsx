import React, { Component } from 'react';
import { Button, TextField, Modal } from '@material-ui/core';
import './ModalForm.css';

export default class ModalForm extends Component {
  state = {
    title: '',
    titleErrorMsg: '',
    description: '',
    descriptionErrorMsg: '',
    images: [
      {
        image: '',
      }
    ]
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
    console.log(e.target.name)
    let updatedImages = this.state.images;
    updatedImages[e.target.name].image = e.target.value;
    this.setState({
      images: updatedImages,
    })
  }

  handleSubmit = (e) => {
    const { title, description, image } = this.state;
    // if(!this.fieldsAreValid(title, description, images)) {
    //   return;
    // }
    this.setState({
      images: [{ image: '' }],
      title: '',
      description: '',
    })
    this.props.modalSubmit(title, description, image);
  }

  render() {
    const { image, images, title, titleErrorMsg, description, descriptionErrorMsg } = this.state;

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
    console.log(imageUrls);

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
              error={!!titleErrorMsg}
              name='title'
              label='Title'
              value={title}
              onChange={this.handleChange}
              className='text-field'
              margin="dense"
              helperText={this.state.titleErrorMsg}
              inputProps={{ maxLength: 128 }}
            />
            <TextField
              error={!!descriptionErrorMsg}
              name='description'
              label='Description'
              value={description}
              onChange={this.handleChange}
              className='text-field'
              margin="dense"
              helperText={descriptionErrorMsg}
              inputProps={{ maxLength: 128 }}
            />
            {/* <TextField
              name='image'
              label='Image'
              value={image}
              onChange={this.handleChange}
              inputProps={{ maxLength: 128 }}
              margin="dense"
              className='text-field'
            /> */}
            {imageUrls}
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
