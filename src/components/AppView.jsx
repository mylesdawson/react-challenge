import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from './Card/CustomCard.jsx';
import NavBar from './NavBar/NavBar.jsx';
import { getPosts, createPost, deletePost, createImages, deleteImages } from '../utils/api';
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

  fetchPosts = async () => {
    const posts = await getPosts();
    const jsonData = await posts.json();

    const sortedPosts = jsonData.sort((a, b) => b.id - a.id);
    this.setState({ posts: sortedPosts });
  };

  handleDelete = async (id) => {
    const data = await deletePost(id);
    const jsonData = await data.json();
    await deleteImages(jsonData.images, jsonData.id);

    const posts = this.filterPosts(id);
    this.setState({ posts });
  }

  handleSubmit = async (title, description, images) => {
    const data = await createPost(title, description);
    const jsonData = await data.json();
    await createImages(images, jsonData.id);
    await this.fetchPosts();
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
