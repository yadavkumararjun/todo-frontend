import React from 'react'

export default function Button({ name , onClick}) {
  return (
    <div className="flex justify-center mt-6 ">
      <button onClick={onClick} className="bg-pink-300 text-gray-700 hover:bg-green-700 hover:text-white font-bold py-2 px-4 rounded transition duration-300 cursor-pointer">
        {name}
      </button>
    </div>
  )
}