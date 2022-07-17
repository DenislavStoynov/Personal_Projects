import React from 'react'

const DigitButton = ({digit, insertNumbers}) => {
  return <button style={{width: '25%', height: '100%', fontSize: '21px', textAlign: 'center'}} onClick={() => {insertNumbers(digit)}}>{digit}</button>
}

export default DigitButton