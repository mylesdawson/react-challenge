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
    fetch('http://127.0.0.1:5000/posts')
      .then(res => res.json())
      .then(res => this.setState({ posts: res }))
  }


  render() {
    const { posts } = this.state;
    const allPosts = posts.map(item => {
      return <Card key={item.id} description={item.description} title={item.title}/>
    });

    return (
      <div className="container">
        <Form/>
        {allPosts}
      </div>
    )
  }
}
