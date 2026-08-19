import React from 'react'



export const Home = () => {
  return (
    <div className='border border-red-500'>

      <div className='my-10 mx-20 ml-2 border border-red-500 px-2 py-3 h-52'>
        {/* <p className='text-4xl font-bold text-right text-green-700 hover:text-red-500'>Hello wordl</p> */}

        <div className='grid grid-cols-3'>
          <div className='p-5'>
            <p>Name: Pencil</p>
            <p>price: 20</p>
          </div>
          <div className=''>
            <p>Name: Pencil</p>
            <p>price: 20</p>
          </div>
          <div className=''>
            <p>Name: Pencil</p>
            <p>price: 20</p>
          </div>
        </div>

        
      </div>
    </div>
  )
}
