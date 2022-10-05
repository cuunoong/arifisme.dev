import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Button from './button'
import IconItem from './icon-item'
import GithubIcon from './icons/github'
import InstagramIcon from './icons/instagram'
import MenuIcon from './icons/menu'
import TiktokIcon from './icons/tiktok'
import YoutubeIcon from './icons/youtube'
import SideNav from './side-nav'
const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL
export interface HeaderProp {
  title?: string
  description?: string
  image?: string
}

function Header({ title, description, image }: HeaderProp) {
  const [isOpenSideNav, setIsOpenSideNav] = useState(false)
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark')

  useEffect(() => {
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      setCurrentTheme('dark')
      document.documentElement.classList.add('dark')
    } else {
      setCurrentTheme('light')
      document.documentElement.classList.remove('dark')
    }
  }, [])

  const changeTheme = (val: 'dark' | 'light') => {
    setCurrentTheme(val)
    // if set via local storage previously
    if (localStorage.getItem('color-theme')) {
      if (localStorage.getItem('color-theme') === 'light') {
        document.documentElement.classList.add('dark')
        localStorage.setItem('color-theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('color-theme', 'light')
      }

      // if NOT set via local storage previously
    } else {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('color-theme', 'light')
      } else {
        document.documentElement.classList.add('dark')
        localStorage.setItem('color-theme', 'dark')
      }
    }
  }

  const router = useRouter()

  return (
    <>
      <NextSeo
        title={title ? `${title} - Arif Iskandar` : undefined}
        description={description}
        openGraph={{
          title: title ? `${title} - Arif Iskandar` : undefined,

          url: `${NEXT_PUBLIC_APP_URL}${router.pathname}`,
          images: image ? [{ url: image }] : undefined,
        }}
      />
      <header className="fixed top-0 z-10 w-full bg-gradient-to-b from-white dark:from-black">
        <div className="mx-auto flex items-center justify-between px-4 py-3 md:max-w-5xl md:py-0 md:px-2 xl:max-w-7xl">
          {/* Left Header */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <Link href="/">
              <a className="flex select-none items-center space-x-4 px-3 py-2">
                <img
                  src="/avatar.png"
                  alt="Arif Iskandar"
                  className="h-6 w-6 rounded-full md:h-10 md:w-10"
                />
                <span className="font-semibold">It’s me</span>
              </a>
            </Link>

            {/* Navigation */}
            <ul className=" hidden space-x-2 md:flex">
              <NavigationItem title="home" href="/" />
              <NavigationItem title="about" href="/#about" />
              <NavigationItem
                title="contact"
                href="mailto:arif19iskandar@gmail.com"
              />
              <NavigationItem title="links" href="/links" />
            </ul>
          </div>

          {/* Right Header */}
          <div className="flex items-center space-x-3 md:space-x-6">
            <IconItem
              href="https://github.com/cuunoong"
              className="hidden xl:block"
              icon={GithubIcon}
            />
            <IconItem
              href="https://www.instagram.com/cuunoong/"
              className="hidden xl:block"
              icon={InstagramIcon}
            />
            <IconItem
              href="https://www.tiktok.com/@cuunoong"
              className="hidden xl:block"
              icon={TiktokIcon}
            />
            <IconItem
              href="https://www.youtube.com/channel/UCrjziO1uYfcBxbcTNjB2M_w"
              className="hidden xl:block"
              icon={YoutubeIcon}
            />
            <Button
              className="hidden md:block"
              onClick={() => {
                open('/CV-Arif Iskandar.pdf', '__blank')
              }}
            >
              Download CV
            </Button>

            <button
              className="rounded-lg p-2.5 text-sm text-brand hover:bg-brand/20 "
              onClick={() =>
                changeTheme(currentTheme == 'dark' ? 'light' : 'dark')
              }
            >
              {currentTheme === 'dark' ? (
                <svg
                  id="theme-toggle-dark-icon"
                  className=" h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
              ) : (
                <svg
                  className=" h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  ></path>
                </svg>
              )}
            </button>

            {/* Open sidenav */}
            <button
              className="p-2 md:hidden"
              onClick={() => setIsOpenSideNav(true)}
            >
              <MenuIcon />
            </button>
          </div>
        </div>
      </header>
      <SideNav open={isOpenSideNav} onCLose={() => setIsOpenSideNav(false)} />
    </>
  )
}

export const NavigationItem = (props: {
  href?: string
  title: string
  onClick?: () => void
}) => (
  <li>
    <Link href={props.href || ''}>
      <a
        className="block px-4 py-3 text-sm hover:text-brand md:px-3 md:py-2"
        onClick={props.onClick}
      >
        {props.title}
      </a>
    </Link>
  </li>
)

export default Header
