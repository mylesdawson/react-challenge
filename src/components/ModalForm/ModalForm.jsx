import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Button, TextField, Modal, FormHelperText } from '@material-ui/core';
import { fieldIsEmpty, urlIsValid } from '../../utils/utils';

const styles = {
  modalForm: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    padding: 32,
    backgroundColor: '#fff',
  },
  textField: {
    width: 300,
  },
  formButton: {
    marginTop: 10,
    width: 300,
  },
};

class ModalForm extends Component {
  state = {
    title: '',
    description: '',
    images: [{ image: '' }],
    errorMsg: '',
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  addImageUrl = (e) => {
    const { images } = this.state;
    images.push({ image: '' });
    this.setState({
      images,
    });
  }

  handleUrlChange = (e) => {
    const updatedImages = this.state.images;
    updatedImages[e.target.name].image = e.target.value;
    this.setState({
      images: updatedImages,
    });
  }

  handleSubmit = (e) => {
    let err = false;
    const { title, description, images } = this.state;

    if (fieldIsEmpty(title) || fieldIsEmpty(description)) {
      this.setState({ errorMsg: 'Title or Description is empty' });
      return;
    }

    Object.values(images).forEach((value) => {
      if (!urlIsValid(value.image)) {
        this.setState({ errorMsg: 'One or more image urls are invalid' });
        err = true;
      }
    });
    if (err) {
      return;
    }

    this.setState({
      images: [{ image: '' }],
      title: '',
      description: '',
      errorMsg: '',
    });
    this.props.modalSubmit(title, description, images);
  }

  render() {
    const { images, title, description, errorMsg } = this.state;

    const imageUrls = images.map((image, index) => {
      return (
        <TextField
          name={`${index}`}
          autoFocus
          label='Image'
          key={index}
          id={`${index}`}
          value={image.image}
          onChange={this.handleUrlChange}
          inputProps={{ maxLength: 128 }}
          margin="dense"
          style={styles.textField}
        />
      );
    });

    return (
      <Fragment>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.props.open}
          onClose={this.props.handleClose}
        >
          <form className='flex-container' style={styles.modalForm}>
            <TextField
              name='title'
              label='Title'
              value={title}
              onChange={this.handleChange}
              style={styles.textField}
              margin="dense"
              inputProps={{ maxLength: 128 }}
            />
            <TextField
              name='description'
              label='Description'
              value={description}
              onChange={this.handleChange}
              style={styles.textField}
              margin="dense"
              inputProps={{ maxLength: 128 }}
            />
            {imageUrls}
            <FormHelperText
              name='error'
              label='error'
              error
              margin="dense"
              style={styles.textField}>
              {errorMsg}
            </FormHelperText>
            <Button
              variant='contained'
              color='secondary'
              style={styles.formButton}
              onClick={this.addImageUrl}>
              Add Image Url
            </Button>
            <Button
              variant='contained'
              color='primary'
              onClick={this.handleSubmit}
              style={styles.formButton}>
              Submit
            </Button>
          </form>
        </Modal>
      </Fragment>
    );
  }
}

ModalForm.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  modalSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(ModalForm);
