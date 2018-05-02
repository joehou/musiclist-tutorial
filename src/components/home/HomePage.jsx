import React from 'react';
import Sidebar from '../shared/Sidebar';
import { Link } from 'react-router-dom';

export default function HomePage(props) {

   const { latestAlbum } = props;
  return (
      <div className="row">
        <div className="col-sm-12 col-md-8">
          <h1>Welcome to MusicList</h1>
          <p>
            This is a react tutorial sample app
          </p>
          <ul>
            <li><h2><Link to="/artists">Search Artists</Link></h2></li>
            <li><h2><Link to="/albums">Search Albums</Link></h2></li>
          </ul>
        </div>
      <Sidebar latestAlbum={latestAlbum} />
    </div>
  );
}
