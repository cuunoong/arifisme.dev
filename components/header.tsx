import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const links = [
  { title: 'Home', href: '/' },
  { title: 'About', href: '/about' },
  { title: 'Blog', href: '/blog' },
]

interface Props {
  title: string
}

export default function Header({ title }: Props) {
  const router = useRouter()
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <title>{title}</title>
      </Head>
      <header className="fixed top-[-1px] left-0 right-0 z-[4] bg-header/60 backdrop-blur-[20px] backdrop-saturate-[180%]">
        <div className="mx-auto flex max-w-page flex-row items-center justify-between px-[15px] py-[10px] sm:px-[30px] sm:py-[20px]">
          <Link href="/">
            <a className="mb-0 block">
              <span className="relative m-0 box-border inline-block h-[45px] w-[45px] overflow-hidden border-0 bg-none p-0 opacity-100">
                <Image
                  alt="Arif Iskandar"
                  src="/images/avatar.png"
                  width={45}
                  height={45}
                  priority
                />
              </span>
            </a>
          </Link>
          <nav className="relative top-[-2px] flex items-center sm:top-0">
            <ol className="mr-0 mb-0 flex list-none p-0 text-[14px] font-bold xm:text-[17px]">
              {links.map(({ title, href }) => (
                <li
                  key={title}
                  className={`my-1 mr-[25px]  sm:mr-[35px] md:mr-[75px] ${
                    router.route.split('/')[1] == href.split('/')[1]
                      ? 'shadow-headers'
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <Link href={href}>
                    <a>{title}</a>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </header>
      <div className="mb-[30px] h-[60px] sm:mb-[80px] sm:h-[84px]"></div>
    </>
  )
}
