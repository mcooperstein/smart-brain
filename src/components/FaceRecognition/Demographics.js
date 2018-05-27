import React from 'react';

const Demographics = (props) => {
  const ages = props.age.map(guess => {
    return guess.name;
  })
  const percentages = props.age.map(percent => {
    return (percent.value * 100).toFixed(2);
  })
  const ethnicities = props.cultural.filter(ethnic => {
    return ethnic.value >= 0.05;
  })
  const genders = props.gender.map(guess => {
    return guess.name
  })
  const genderGuess = props.gender.map(guess => {
    return (guess.value * 100).toFixed(2);
  })

  return (
    <div className='below-img'>
      <div id='genderAppearance'>
        <h1>Demographics Analysis for Face 1 of {props.boxes.length}</h1>
      </div>
      <div id='genderAppearance'>
        <h3>Facial Features:{genderGuess[0]}% {genders[0]}</h3>
      </div>
      <div id='ageAppearance'>
        <h3>Age prediction:{ages[0]} yrs old, Certainty: {percentages[0]}%</h3>
      </div>
      <div id='culturalAppearance'>
        <h3>Possible Ethnicities:</h3>
        <ul>
          {ethnicities.map((guess,index) => {
            return <li key={index} style={{listStyleType: 'none'}}>{guess.name}: {(guess.value * 100).toFixed(2)}%</li>
          })}
        </ul>
      </div>
    </div>
  )
}

export default Demographics;
