import React, { Fragment } from 'react';
import Card from './Card/CustomCard.jsx';
import Form from './Form/Form.jsx';
import NavBar from './NavBar/NavBar.jsx';

export default class App extends React.Component {
  state = { posts: [] }

  componentDidMount() {
    this.fetchPosts()
  }

  fetchPosts = () => {
    return fetch('http://127.0.0.1:5000/posts')
      .then(res => res.json())
      .then(res => {
        res = res.sort((a, b) => b.id - a.id)
        this.setState({ posts: res });
      })
  };

  createPost = (title, description) => {
    return fetch('http://127.0.0.1:5000/posts', { 
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ 
        title,
        description,
      })
    });
  }

  createImage = (image, postId) => {
    return fetch('http://127.0.0.1:5000/images', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        url: image,
        post_id: postId,
      })
    })
  }

  deletePost = (id) => {
    return fetch(`http://127.0.0.1:5000/posts/${id}`, { method: 'delete' })
      .then(res => {
        this.fetchPosts();
      })
  }

  handleSubmit = (title, description, image) => {
    this.createPost(title, description)
      .then(r => r.json())
      .then(r => {
        console.log(r);
        this.createImage(image, r.id)
        .then(r => {
          this.fetchPosts();
        })
      })
  }

  render() {
    const { posts } = this.state;
    const allPosts = posts.map(item => {
      return (
        <Card 
          key={item.id} 
          id={item.id} 
          description={item.description} 
          images={item.images}
          title={item.title} 
          handleDelete={this.deletePost}/>
      ) 
    });

    return (
      <Fragment>
        <NavBar addClick={this.addClick} modalSubmit={this.handleSubmit}/>
        <div className="container">
          {allPosts}
        </div>
      </Fragment>
    )
  }
}
