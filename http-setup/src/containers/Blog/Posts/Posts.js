import React, {Component} from 'react';
import Post from "../../../components/Post/Post";
import axios from "../../../axios";
import './Posts.css';
import FullPost from "../FullPost/FullPost";
import {Route} from "react-router-dom";
// import {Link} from 'react-router-dom';

class Posts extends Component {
    state = {
        posts: [],
        // selectedPostId: null,
        // error: false
    }

    postSelectedHandler = (id) => {
        // this.setState({selectedPostId: id});
        this.props.history.push({pathname: '/' + id});
    }

    componentDidMount() {
        console.log(this.props);
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
                // this.setState({error: true});
                console.log(err);
            });
    }

    render() {
         let posts = this.state.posts.map(element => {
            return (
                // <Link to={'/' + element.id} key={element.id}>
                    <Post
                        key={element.id}
                        title={element.title}
                        author={element.author}
                        clicked={() => this.postSelectedHandler(element.id)}
                    />
                // </Link>
            )
        })


        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <Route path='/:id' exact component={FullPost} />
            </div>

        );
    }
}

export default Posts;