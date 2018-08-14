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
        id: 0,
        image: '',
        imageErrorMsg: '',
      }
    ],
    nextImageId: 1,
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleUrlChange = (e) => {
    let updatedImages = this.state.images;
    updatedImages[e.target.name].image = e.target.value;
    this.setState({
      images: updatedImages,
    })
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

  // fieldsAreValid = (title, description, images) => {
  //   this.setState({
  //     titleErrorMsg: '',
  //     descriptionErrorMsg: '',
  //   });

  //   let errorMessages = {};
  //   let imageErrorMessages = {};
  //   if(this.fieldIsEmpty(title)) {
  //     errorMessages.titleErrorMsg = 'No title set';
  //   }
  //   if(this.fieldIsEmpty(description)) {
  //     errorMessages.descriptionErrorMsg = 'No description set';
  //   }
  //   // if(this.fieldIsEmpty(imageUrl)) {
  //   //   errorMessages.imageErrorMsg = 'No image url set';
  //   // }

  //   for(let i in images) {
  //     console.log(images[i]);
  //     if(!this.urlIsValid(images[i].url)) {
  //       imageErrorMessages.imageErrorMsg = 'Invalid image url';
  //     }
  //   }

  //   this.setState({
  //     ...errorMessages,
  //   })
  //   if(Object.keys(errorMessages).length === 0){
  //     this.setState({
  //       title: '',
  //       description: '',
  //     })
  //     return true;
  //   }
  //   return false;
  // }

  handleSubmit = (e) => {
    const { title, description } = this.state;
    let { images } = this.state;
    // if(!this.fieldsAreValid(title, description, images)) {
    //   return;
    // }
    this.props.modalSubmit(title, description, images);
  }

  render() {
    const { images, title, titleErrorMsg, description, descriptionErrorMsg } = this.state;

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
            {images.map((image, index) => {
              return (
                <TextField
                  error={!!image.imageErrorMsg}
                  name={`${index}`}
                  label={`Image ${index} url`}
                  value={image.image}
                  onChange={this.handleUrlChange}
                  helperText={image.imageErrorMsg}
                  inputProps={{ maxLength: 128 }}
                  key={index}
                  margin="dense"
                  className='text-field'
                />
              );
            })}
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
