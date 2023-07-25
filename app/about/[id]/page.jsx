import React from 'react'

const page = ({ params }) => {
  return (
    <div>About page with ID: {params.id}</div>
  )
}

export default page