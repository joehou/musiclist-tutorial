import React from 'react';
import { Card, CardBlock, CardText, CardTitle } from 'reactstrap';

const formatAlbum = (album) => {
  if (!album) {
    return null;
  }

  return (
    <span className="text-center">
      <img src={album.thumb} alt="album thumb" /><br />
      { album.title }
    </span>
  );
};

export default function Sidebar(props) {
  const { latestAlbum } = props; 
  return (
    <aside className="col-sm-12 col-md-4">
      <Card>
        <CardTitle className="text-center">Latest Album</CardTitle>
        <CardBlock>
          <CardText className="text-center">
            { latestAlbum && latestAlbum.title ? formatAlbum(latestAlbum) : null }
          </CardText>
        </CardBlock>
      </Card>
    </aside>
  );
}
