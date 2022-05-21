import Image from 'next/image'
import Link from 'next/link'
import { getDatabase } from '../lib/notion'
import { Project, toProjects } from '../models'
import { motion } from 'framer-motion'
export const databaseProjectsId = process.env.NOTION_DATABASE_PROJECTS_ID || ''

export default function Home({ projects }: Props) {
  return (
    <div>
      <div className="mb-[50px] sm:mb-[90px]">
        <motion.h1
          className="mb-3 text-[26px] font-bold tracking-[-.3px] sm:mb-[15px] sm:text-[40px]"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Hi there, it's me Arif iskandar.
        </motion.h1>
        <motion.p
          className="mb-[30px] text-[17px] font-medium leading-6 text-text text-opacity-80 sm:text-[19px]"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          I am an enthusiastic software developer based in Medan, Indonesia. I
          love to code and make it more simple, try something new, and learn
          more. Currently as Chief Technology Officer at{' '}
          <a href="https://dsociety.id" target="_blank" className="text-brand">
            dSociety
          </a>
          , a startup to help students prepare for their tests.
        </motion.p>
        <Link href="/about">
          <a>
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center rounded-full bg-brand/20 py-[10px] px-[18px] text-base font-bold text-brand transition-all ease-out hover:bg-brand/30 focus:bg-brand/30 "
              type="button"
            >
              More about me
            </motion.button>
          </a>
        </Link>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        Selected Projects
      </motion.h2>

      {projects.map(({ id, cover, url, title, description }) => (
        <motion.div
          key={id}
          className="mb-10 w-full sm:mb-[75px]"
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <a href={url} target="_blank">
            <div className="relative mb-[20px] overflow-hidden rounded-[15px] bg-black pb-[50%] md:mx-[-25px]">
              <div className="absolute inset-0 flex h-full w-full flex-col justify-end p-[25px] pb-0">
                <div className="block">
                  <Image
                    src={cover || '/vercer.svg'}
                    layout="responsive"
                    width="100%"
                    height="100%"
                    objectFit="contain"
                    objectPosition="bottom"
                    quality={50}
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </a>
          <h3 className="sm:text-[28px font-bold] mb-[5px] text-[26px]">
            {title}
          </h3>
          <p className="mb-2 text-[16px] opacity-80 sm:mb-3 sm:text-[18px]">
            {description}
          </p>
          <div className="flex flex-col gap-1 sm:flex-row sm:gap-[initial]">
            <a
              href={url}
              className="inline-flex items-center text-base text-brand/60 transition-colors ease-out sm:text-[18px]"
            >
              Visit {new URL(url).host}{' '}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
              </svg>
            </a>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

Home.title = 'It`s me Arif Iskandar - Software Developer'

interface Props {
  projects: Array<Project>
}

export const getStaticProps = async () => {
  const projects = await getDatabase(databaseProjectsId, [
    {
      property: 'Published At',
      direction: 'descending',
    },
  ])
  return {
    props: {
      projects: toProjects(projects),
    },
    revalidate: 1,
  }
}
