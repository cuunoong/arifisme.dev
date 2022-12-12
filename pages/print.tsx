import Router from 'next/router'
import React, { useEffect } from 'react'

function Links() {
  useEffect(() => {
    open(
      'https://drive.google.com/drive/folders/1N56XYHwozCMEgoOfcjRGn5PxlOmucI-T?usp=share_link',
      '__blank'
    )
    Router.back()
  }, [])
  return <div></div>
}

export default Links
