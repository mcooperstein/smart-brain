import React from 'react';

const Rank = ({user, rank, entries, isLoggedIn}) => {
  return isLoggedIn ?
  (
    <div>
      <div className='white f3'>
        {user}
      </div>
      <div className='white f5'>
        {`Rank: ${rank}`}
      </div>
      <div className='white f6'>
        {`# of entries: ${entries}`}
      </div>
    </div>
  ) :
  (
    <div>
      <div className='white f3'>
        {user}
      </div>
      <div className='white f5'>
        {`Rank: ${rank}`}
      </div>
    </div>
  )
}

export default Rank;
