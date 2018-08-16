import React from 'react';
import Card from '@material-ui/core/Card';
import { MobileStepper, CardActions, CardContent, CardHeader, CardMedia, Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import ThumbsUpAlt from '@material-ui/icons/ThumbUpSharp';
import Delete from '@material-ui/icons/Delete';
import SwipeableViews from 'react-swipeable-views';
import './CustomCard.css';

export default class CustomCard extends React.Component {
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

  handleStepChange = activeStep => {
    this.setState({ activeStep });
  };

  render() {
    const { title, images, description, id} = this.props;
    const { activeStep } = this.state;
    const maxSteps = images.length;

    return (
      <div className='flex-container'>
        <Card className='card'>
          <CardHeader
            title={title}/>
          <SwipeableViews
            index={activeStep}
            onChangeIndex={this.handleStepChange}
            enableMouseEvents>
            {images.map(image => {
              return (
                <CardMedia
                  className='card-media'
                  image={image.url}
                  key={image.id}/>
              )
            })}
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
              <ThumbsUpAlt/>
            </IconButton>
            <IconButton className="delete-icon" onClick={() => this.props.handleDelete(id)}>
              <Delete />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    )
  }

};
