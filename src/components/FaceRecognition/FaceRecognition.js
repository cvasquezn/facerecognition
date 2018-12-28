import React from "react";
import './FaceRecognition.css'

const FaceRecognition = ({ imageURL, box }) => {
  console.log("en FaceRecognition")
  console.log(box);
  return (
    <div className='center ma'>
      <div className = 'absolute mt2' >
        <img id='inputimage' alt ='' src={imageURL} width='500px' heigh='auto'/>
        <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>  </div>
      </div>
    </div>
  );
}// end const

export default FaceRecognition
