import React from 'react';
import Card from './Card/CustomCard.jsx';
import Form from './Form/Form.jsx';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }

  componentDidMount() {
    this.fetchPosts()
  }

  fetchPosts = () => {
    return fetch('http://127.0.0.1:5000/posts')
      .then(res => res.json())
      .then(res => this.setState({ posts: res }))
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

  deletePost = (id) => {
    fetch(`http://127.0.0.1:5000/posts/${id}`, { 
      method: 'delete',
    });
  }

  handleSubmit = (title, description, image) => {
    this.createPost(title, description)
      .then(res => {
        console.log(res);
      })
  }

  handleDelete = (id) => {
    console.log(id);
    console.log('clicked');
  }

  render() {
    const { posts } = this.state;
    const allPosts = posts.map(item => {
      return <Card key={item.id} id={item.id} description={item.description} title={item.title} handleDelete={this.handleDelete}/>
    });

    return (
      <div className="container">
        <Form  handleSubmit={this.handleSubmit}/>
        {allPosts}
      </div>
    )
  }
}
