import Router from 'next/router'
import React, { useEffect } from 'react'

function Links() {
  useEffect(() => {
    open('https://linktr.ee/cuunoong', '__blank')
    Router.back()
  }, [])
  return <div></div>
}

export default Links
