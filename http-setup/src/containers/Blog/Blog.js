import React, {Component} from 'react';
import {Route, NavLink, Switch} from 'react-router-dom';

import Posts from './Posts/Posts';
// import FullPost from './FullPost/FullPost';
// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';
import './Blog.css';

const AsyncNewPost = asyncComponent(() => import('./NewPost/NewPost'));

class Blog extends Component {

    render() {
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><NavLink exact to="/">Home</NavLink></li>
                            <li><NavLink to="/new-post">New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path='/new-post' component={AsyncNewPost} />
                    <Route path='/' component={Posts} />
                    {/*<Route path='/:id' exact component={FullPost} />*/}
                </Switch>
            </div>
        );
    }
}

export default Blog;