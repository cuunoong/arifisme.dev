import React from 'react'
import Decoration from './icons/decoration'

function About() {
  return (
    <section className="relative pt-16" id="about">
      <div className="relative mx-auto  px-6 py-12 md:mt-24 md:max-w-2xl md:px-2 xl:max-w-7xl">
        {/* Title */}
        <div className="flex flex-col space-y-12 xl:flex-row xl:items-start xl:justify-between xl:space-y-0 xl:px-4">
          <h1 className="relative flex-1 text-[33.6px] font-light leading-[1.2] md:text-7xl md:leading-[1.2]">
            <span className="inline-block">It’s me</span>
            <img
              src="/avatar.png"
              className="absolute right-0 top-0 inline-block h-16 w-16 align-middle text-purple md:relative md:ml-6"
            />
            <br />
            <span className="inline-block">arif iskandar</span> <br />
          </h1>
          <div className="flex xl:w-1/3">
            <div className="flex flex-col space-y-8">
              <p>
                I like to code and keep it simple, try something new, and learn
                more. I think sharing knowledge is the best practice to improve
                my skills, and I try to do it.
              </p>
              <p>
                I am currently the Chief Technology Officer at{' '}
                <a
                  className="text-brand"
                  href="https://dsociety.id"
                  target={'_blank'}
                >
                  dSociety
                </a>
                , a startup to help students prepare for their exams.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Decoration className="-z-1 absolute -top-[106px] -right-[193px] -z-[1] h-[500px] w-[500px] text-brand opacity-70 md:-left-[400px] md:right-auto md:-top-[180px] md:h-auto md:w-auto" />
    </section>
  )
}

export default About
