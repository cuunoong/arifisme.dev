import { useRouter } from 'next/router'
import React from 'react'
import translate from '../utils/translate'
import Button from './button'

function Footer() {
  const router = useRouter()
  return (
    <footer className="flex h-[400px] items-center justify-center">
      <div className="max-w-xs text-center md:max-w-lg">
        <h3 className="text-4xl font-light ">
          {translate(router.locale).footer.text}
        </h3>
        <Button
          type="filled"
          className="mt-8"
          onClick={() => router.push('/#lessons')}
        >
          {translate(router.locale).footer.button}
        </Button>
      </div>
    </footer>
  )
}

export default Footer
