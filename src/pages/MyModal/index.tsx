import React, { ReactElement } from 'react'

interface Props {
  handleClick: any
}

export default function MyModal ({ handleClick } : Props): ReactElement {
  return (
    <div>
      <button onClick={handleClick}>打开modal</button>
    </div>
  )
}
