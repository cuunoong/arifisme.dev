import { useRouter } from 'next/router'
import React from 'react'
import Button from './button'

function Footer() {
  const router = useRouter()
  return (
    <footer className="flex h-[400px] items-center justify-center">
      <div className="max-w-xs text-center md:max-w-lg">
        <h3 className="text-4xl font-light ">So, what are you waiting for?</h3>
        <Button
          type="filled"
          className="mt-8"
          onClick={() => router.push('/#lessons')}
        >
          Let’s start
        </Button>
      </div>
    </footer>
  )
}

export default Footer
