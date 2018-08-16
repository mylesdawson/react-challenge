import React from 'react';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import { MobileStepper, CardActions, CardContent, CardHeader, CardMedia, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ThumbsUpAlt from '@material-ui/icons/ThumbUpSharp';
import Delete from '@material-ui/icons/Delete';
import SwipeableViews from 'react-swipeable-views';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  card: {
    margin: 10,
    minWidth: 400,
    maxWidth: 600,
    width: '60%',
  },
  cardMedia: {
    height: 0,
    paddingTop: '80%',
  },
  deleteIcon: {
    marginLeft: 'auto',
  },
};

class CustomCard extends React.Component {
  state = {
    activeStep: 0,
  }

  handleNext = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(prevState => ({
      activeStep: prevState.activeStep - 1,
    }));
  };

  handleStepChange = activeStep => this.setState({ activeStep });

  render() {
    const { title, images, description, id } = this.props;
    const { activeStep } = this.state;
    const maxSteps = images.length;

    const mappedImages = images.map((image) => {
      return (
        <CardMedia
          style={styles.cardMedia}
          image={image.url}
          key={image.id}/>
      );
    });

    return (
      <div className='flex-container'>
        <Card style={styles.card}>
          <CardHeader
            title={title}/>
          <SwipeableViews
            index={activeStep}
            onChangeIndex={this.handleStepChange}
            enableMouseEvents>
            {mappedImages}
          </SwipeableViews>
          {maxSteps > 1 &&
            <MobileStepper
              steps={maxSteps}
              position="static"
              activeStep={activeStep}
              nextButton={
                <Button size="small" onClick={this.handleNext} disabled={activeStep === maxSteps - 1}>
                  Next
                </Button>
              }
              backButton={
                <Button size="small" onClick={this.handleBack} disabled={activeStep === 0}>
                  Back
                </Button>
              }
            />
          }
          <CardContent>
            {description}
          </CardContent>
          <CardActions>
            <IconButton>
              <ThumbsUpAlt />
            </IconButton>
            <IconButton style={styles.deleteIcon} onClick={() => this.props.handleDelete(id)}>
              <Delete />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    );
  }
}

CustomCard.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  images: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default withStyles(styles)(CustomCard);
