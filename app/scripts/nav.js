import React from 'react'
// import NavLink from './NavLink'
import { Link } from 'react-router'


export default React.createClass({
  render() {
    return (
      <div>
        <p>Welcome to Textbook Exchange!</p>
        <ul role="nav">
          <li><Link to="/" >Home</Link></li>
          <li><Link to="/sell">Sell Textbook</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})