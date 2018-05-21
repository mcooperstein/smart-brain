import React from 'react';

const Rank = ({user, rank}) => {
  return (
    <div>
      <div className='white f5'>
        {user}
      </div>
      <div className='white f3'>
        {`Rank: ${rank}`}
      </div>
    </div>
  )
}

export default Rank;
