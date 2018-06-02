import React from 'react';

const Rank = ({user, rank, entries, isLoggedIn, totalUsers}) => {
  return isLoggedIn ?
  (
    <div>
      <div className='white f3'>
        {`User: ${user}`}
      </div>
      <div className='white f5'>
        {`Rank: ${ordinal_suffix_of(rank)} out of ${totalUsers} users`}
      </div>
      <div className='white f6'>
        {`Total # of entries: ${entries}`}
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

function ordinal_suffix_of(i) {
    var j = i % 10,
        k = i % 100;
    if (j == 1 && k != 11) {
        return i + "st";
    }
    if (j == 2 && k != 12) {
        return i + "nd";
    }
    if (j == 3 && k != 13) {
        return i + "rd";
    }
    return i + "th";
}

export default Rank;
