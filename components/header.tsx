import { NextSeo } from 'next-seo'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Button from './button'
import IconItem from './icon-item'
import GithubIcon from './icons/github'
import InstagramIcon from './icons/instagram'
import MenuIcon from './icons/menu'
import TiktokIcon from './icons/tiktok'
import YoutubeIcon from './icons/youtube'
import SideNav from './side-nav'
const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL
function Header({
  title,
  description,
  image,
}: {
  title?: string
  description?: string
  image?: string
}) {
  const [isOpenSideNav, setIsOpenSideNav] = useState(false)
  const router = useRouter()
  return (
    <>
      <NextSeo
        title={title ? `${title} | ${description} - Arif Iskandar` : undefined}
        description={description}
        openGraph={{
          title: title ? `${title} - Arif Iskandar` : undefined,

          url: `${NEXT_PUBLIC_APP_URL}${router.pathname}`,
          images: image ? [{ url: image }] : undefined,
        }}
      />
      <header className="fixed top-0 z-10 w-full bg-gradient-to-b from-white dark:from-black">
        <div className="mx-auto flex items-center justify-between px-4 py-3 md:max-w-2xl md:py-0 md:px-2 xl:max-w-7xl">
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
              onClick={() => {
                open('/CV-Arif Iskandar.pdf', '__blank')
              }}
            >
              Download CV
            </Button>

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
