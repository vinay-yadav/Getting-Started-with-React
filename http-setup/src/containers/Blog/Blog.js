import React, {Component} from 'react';
// import axios from "axios";
import axios from "../../axios";

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {
    state = {
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount() {
        axios.get('/posts')
            .then(response => {
                // console.log(response);
                const posts = response.data.slice(0, 8);
                const updatedPost = posts.map(post => {
                    return {
                        ...post,
                        author: 'Vinay'
                    }
                })
                this.setState({posts: updatedPost});
            })
            .catch(err => {
                this.setState({error: true});
                console.log(err);
            });
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id});
    }

    render() {
        let posts = <p>Something went wrong</p>;

        if (!this.state.error) {
            posts = this.state.posts.map(element => {
                return <Post
                    key={element.id}
                    title={element.title}
                    author={element.author}
                    clicked={() => this.postSelectedHandler(element.id)}
                />
            })
        }

        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost/>
                </section>
            </div>
        );
    }
}

export default Blog;