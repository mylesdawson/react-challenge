import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import ThumbsUpAlt from '@material-ui/icons/ThumbUpSharp';
import Delete from '@material-ui/icons/Delete';
import './CustomCard.css';

export default class CustomCard extends React.Component {

  onDelete = () => {
    this.props.handleDelete(this.props.id);
  }

  render() {
    return (
      <div className='flex-container'>
        <Card className='card'>
          <CardHeader
            title={this.props.title}/>
          <CardMedia
            className='card-media'
            image='https://www.tesla.com/sites/default/files/blog_images/model-s-photo-gallery-06.jpg'/>
          <CardContent>
            {this.props.description}
          </CardContent>
          <CardActions>
            <IconButton>
              <ThumbsUpAlt/>
            </IconButton>
            <IconButton onClick={this.onDelete}>
              <Delete />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    )
  }

};