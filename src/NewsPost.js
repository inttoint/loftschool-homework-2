import React, {Component} from 'react';
import Comment from './Comment';
import './App.css';

let id = 0;

function getCommentId() {
  id += 1;
  return id;
}

class NewsPost extends Component {
  state = {
    commentInput: '',
    comments: [ ]
  };

  handleChange = event => {
    const value = event.target.value;
    this.setState({commentInput: value});
  };

  handleKeyDown = event => {
    if (event.keyCode === 13) {
      const {commentInput, comments} = this.state;
      const newComment = {id: getCommentId(), text: commentInput};
      this.setState({commentInput: '', comments: [...comments, newComment]});
    }
  };

  handleDelete = id => {
    this.setState(state => ({
      comments: state.comments.filter(comment => id !== comment.id)
    }));
  };

  render() {
    const {text} = this.props;
    const {commentInput, comments} = this.state;

    return (
      <div>
        <h3>Новость </h3>
        <p>{text}</p>
        <input
          value={commentInput}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <div>
          {comments.map(comment => (
            <Comment
              key={comment.id}
              id={comment.id}
              text={comment.text}
              onDelete={this.handleDelete}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default NewsPost;
