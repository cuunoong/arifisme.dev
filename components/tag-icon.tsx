import { LessonTag } from '../models/lesson'
import FigmaOriginalIcon from 'react-devicons/figma/original'
import AndroidOriginalIcon from 'react-devicons/android/original'
import AppleOriginalIcon from 'react-devicons/apple/original'
import FlutterOriginalIcon from 'react-devicons/flutter/original'
import NextjsOriginalIcon from 'react-devicons/nextjs/original'
import NodejsOriginalIcon from 'react-devicons/nextjs/original'
import PhpOriginalIcon from 'react-devicons/php/original'
import ReactOriginalIcon from 'react-devicons/react/original'
import TailwindcssPlainIcon from 'react-devicons/tailwindcss/plain'

const TagIcon = (props: { tag: LessonTag }) => {
  switch (props.tag) {
    case 'android':
      return <AndroidOriginalIcon className="!h-6 !w-auto" />
    case 'ios':
      return <AppleOriginalIcon className="!h-6 !w-auto dark:!fill-white" />
    case 'flutter':
      return <FlutterOriginalIcon className="!h-6 !w-auto" />
    case 'nextjs':
      return <NextjsOriginalIcon className="!h-6 !w-auto" />
    case 'nodejs':
      return <NodejsOriginalIcon className="!h-6 !w-auto" />
    case 'php':
      return <PhpOriginalIcon className="!h-6 !w-auto" />
    case 'tailwindcss':
      return <TailwindcssPlainIcon className="!h-6 !w-auto" />
    case 'react':
      return <ReactOriginalIcon className="!h-6 !w-auto" />
    case 'figma':
      return <FigmaOriginalIcon className="!h-6 !w-auto" />
    default:
      return null
  }
}
export default TagIcon
