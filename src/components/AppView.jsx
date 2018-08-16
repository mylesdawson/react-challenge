import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from './Card/CustomCard.jsx';
import NavBar from './NavBar/NavBar.jsx';
import '../index.css';

export default class App extends React.Component {
  state = {
    posts: [],
    search: '',
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = () => {
    return fetch('http://127.0.0.1:5000/posts')
      .then(res => res.json())
      .then((res) => {
        res = res.sort((a, b) => b.id - a.id);
        this.setState({ posts: res });
      });
  };

  createPost = (title, description) => {
    return fetch('http://127.0.0.1:5000/posts', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        title,
        description,
      }),
    });
  }

  createImage = (image, postId) => {
    return fetch('http://127.0.0.1:5000/images', {
      method: 'post',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        url: image,
        post_id: postId,
      }),
    });
  }

  deletePost = (id) => {
    return fetch(`http://127.0.0.1:5000/posts/${id}`, { method: 'delete' })
      .then(res => this.fetchPosts());
  }

  handleSubmit = (title, description, images) => {
    this.createPost(title, description)
      .then(r => r.json())
      .then((r) => {
        // let urls = images.map(image => {
        //   return image.image;
        // })
        const promises = images.map((image) => {
          return this.createImage(image.image, r.id);
        });
        Promise.all(promises)
          .then(res => this.fetchPosts());
      });
  }

  handleSearch = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { posts, search } = this.state;
    let allPosts = posts.map((item) => {
      return (
        <Card
          key={item.id}
          id={item.id}
          description={item.description}
          images={item.images}
          title={item.title}
          handleDelete={this.deletePost}/>
      );
    });

    if (search) {
      // console.log(`search is: ${search}`);
      allPosts = allPosts.filter((item) => {
        const title = item.props.title.toLowerCase();
        return title.includes(search);
      });
    }

    return (
      <Fragment>
        <CssBaseline/>
        <NavBar
          addClick={this.addClick}
          modalSubmit={this.handleSubmit}
          handleSearch={this.handleSearch}
        />
        <div className="container">
          {allPosts}
        </div>
      </Fragment>
    );
  }
}
