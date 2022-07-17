import React from 'react';

const OperationButton = ({operation, setOperation, setOperationPicked}) => {
  return <button style={{width: '25%', height: '100%', fontSize: '21px', textAlign: 'center'}} onClick={() => {setOperation(operation); setOperationPicked(true)}}>{operation}</button>
}

export default OperationButton;