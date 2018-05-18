import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onButtonSubmit, value}) => {
  return (
    <div>
      <div className='center'>
        <div className='center pa4 br4 shadow-5' style={{width:'500px'}}>
          <input className='f4 pa2 w-70 center' type='text' placeholder='enter url of image' onChange={onInputChange} value={value}/>
          <button className='w-30 grow f4 link ph3 pv2 dib ttu' onClick={onButtonSubmit}>
            Detect
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImageLinkForm;
