import React from 'react'

const GridLayout = ({ children }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 h-full'>
      {children}
    </div>
  )
}

export default GridLayout