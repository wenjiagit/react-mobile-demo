import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './index.css';

export default class NavBar extends Component {

    state = {};

    renderItems() {
        const items = [
            {path: '/', text: '首页'},
            {path: '/about', text: '关于'},
            {path: '/mine', text: '我的'},
            {path: '/error404', text: '404'},
            {path: '/error', text: 'error'},
        ];
        const pathname = window.location.pathname;

        return items.map(item => {
            const className = item.path === pathname ? 'nav-bar-active' : '';
            return (
                <Link
                    style={{width: `${100 / items.length}%`}}
                    key={item.path}
                    to={item.path}
                    className={className}
                >{item.text}</Link>
            );
        });
    }

    render() {
        return (
            <div className="nav-bar-container">
                {this.renderItems()}
            </div>
        );
    }
}