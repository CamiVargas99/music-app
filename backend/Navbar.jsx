import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
  <nav className="navbar">
    <NavLink to="/">Songs</NavLink>
    <NavLink to="/playlists">Playlists</NavLink>
    <NavLink to="/add-song">Add Song</NavLink>
    <NavLink to="/add-playlist">Add Playlist</NavLink>
  </nav>
);

export default Navbar;
