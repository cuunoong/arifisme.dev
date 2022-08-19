import { useRouter } from 'next/router'
import React from 'react'
import translate from '../utils/translate'
import Button from './button'
import IconItem from './icon-item'
import BookIcon from './icons/book'
import Decoration from './icons/decoration'
import GithubIcon from './icons/github'
import InstagramIcon from './icons/instagram'
import SubTaskIcon from './icons/sub-task'
import TiktokIcon from './icons/tiktok'
import YoutubeIcon from './icons/youtube'

function Hero() {
  const router = useRouter()
  return (
    <section className="relative" id="hero">
      <div className="relative mx-auto mt-16 px-6 pt-12 md:mt-24 md:max-w-2xl md:px-2 xl:max-w-7xl">
        {/* Title */}
        <div className="flex flex-col space-y-12 xl:flex-row xl:items-end xl:justify-between xl:space-y-0 xl:px-4">
          <h1 className="flex-1  text-[33.6px] font-light leading-[1.2] md:text-7xl md:leading-[1.2]">
            <span
              className="line relative block h-[40.32px] overflow-hidden md:h-[86.5px]
"
            >
              <span className="line-animate absolute">
                <span className="inline-block">
                  {translate(router.locale).home.hero.title[0]}
                </span>{' '}
                <BookIcon className="inline-block h-8 w-8 align-middle text-purple md:h-14 md:w-14" />
              </span>
            </span>
            <span
              className="line relative block h-[40.32px] overflow-hidden md:h-[86.5px]
"
            >
              <span className="line-animate absolute">
                <span className="inline-block">
                  {translate(router.locale).home.hero.title[1]}
                </span>{' '}
                <SubTaskIcon className="inline-block h-8 w-8 align-middle text-brand md:h-14 md:w-14" />
              </span>
            </span>

            <span
              className="line relative block h-[40.32px] overflow-hidden md:h-[86.5px]
"
            >
              <span className="line-animate absolute">
                <span className="inline-block">
                  {translate(router.locale).home.hero.title[2]}
                </span>
              </span>
            </span>
          </h1>
          <div className="flex max-w-[374px]">
            <div className="desc flex flex-col space-y-8">
              <p>
                {translate(router.locale).home.hero.with[0]}{' '}
                <span className="text-brand">arif iskandar</span>,{' '}
                {translate(router.locale).home.hero.with[1]}
              </p>
              <div className="flex flex-row items-center space-x-4">
                <Button
                  type="filled"
                  className=" w-max"
                  onClick={() => router.push('/#lessons')}
                >
                  {translate(router.locale).home.hero.button}
                </Button>
                <IconItem
                  href="https://github.com/cuunoong"
                  icon={GithubIcon}
                  className=" xl:hidden"
                />
                <IconItem
                  href="https://www.instagram.com/cuunoong/"
                  icon={InstagramIcon}
                  className=" xl:hidden"
                />
                <IconItem
                  href="https://www.tiktok.com/@cuunoong"
                  icon={TiktokIcon}
                  className=" xl:hidden"
                />
                <IconItem
                  href="https://www.youtube.com/channel/UCrjziO1uYfcBxbcTNjB2M_w"
                  icon={YoutubeIcon}
                  className=" xl:hidden"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Background */}
      <Decoration className="absolute top-0 -right-[250px] z-0 h-[500px] w-[500px] text-brand xl:-right-[400px] xl:-top-[180px] xl:h-auto xl:w-auto" />
    </section>
  )
}

export default Hero
