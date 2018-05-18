import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = (props) => {
  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputImage' src={props.imageURL} alt='' width='500px' height='auto'/>
        {/* <div style={{top:props.box.topRow, right: props.box.right, bottom: props.box.bottomRow, left: props.box.left}} className='bounding-box'></div> */}
        { props.boxes.map((box,index)=>{
           const image = document.getElementById('inputImage');
           const width = image.width;
           const height = image.height;
           // console.log(box);
           let top = box.top_row*height;
           let right = width - box.right_col*width;
           let bottom = height - box.bottom_row*height;
           let left = box.left_col * width;
           return <div className='bounding-box' key={index} style={{
              top: top,
              right: right,
              bottom: bottom,
              left: left
            }}></div>
        })}
      </div>
    </div>
  )
}

export default FaceRecognition;
