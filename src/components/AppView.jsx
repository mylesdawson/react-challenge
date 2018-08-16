import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from './Card/CustomCard.jsx';
import NavBar from './NavBar/NavBar.jsx';
import { getPosts, createPost, deletePost, createImage, deleteImage, createImages, deleteImages } from '../utils/api';
import '../index.css';

export default class App extends React.Component {
  state = {
    posts: [],
    search: '',
  }

  componentDidMount() {
    this.fetchPosts();
  }

  filterPosts = (id) => {
    const { posts } = this.state;
    return posts.filter((post) => {
      return post.id !== id;
    });
  };

  fetchPosts = () => {
    getPosts()
      .then(res => res.json())
      .then((res) => {
        const sortedPosts = res.sort((a, b) => b.id - a.id);
        this.setState({ posts: sortedPosts });
      });
  };

  handleDelete = (id) => {
    deletePost(id)
      .then(res => res.json())
      .then((res) => {
        deleteImages(res.images, res.id);
      })
      .then(() => {
        const posts = this.filterPosts(id);
        this.setState({ posts });
      });
  }

  handleSubmit = (title, description, images) => {
    createPost(title, description)
      .then(r => r.json())
      .then((r) => {
        const promises = images.map(image => createImage(image.image, r.id));
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
          handleDelete={this.handleDelete}/>
      );
    });

    if (search) {
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
