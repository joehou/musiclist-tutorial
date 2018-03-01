import React from 'react';
import Sidebar from '../shared/Sidebar';
import {Button} from 'reactstrap'

export default function HomePage() {
  const showAlert = () =>{
    alert('You clicked the button')
  }

  return (
      <div className="row">
        <div className="col-sm-12 col-md-8">
          <p>This is the home page now.</p>
          <Button onClick={showAlert}>Clickme</Button>
        </div>
        <Sidebar />
        </div>
  );
}