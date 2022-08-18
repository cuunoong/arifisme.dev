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
      return <AndroidOriginalIcon size={20} />
    case 'ios':
      return <AppleOriginalIcon size={20} />
    case 'flutter':
      return <FlutterOriginalIcon size={20} />
    case 'nextjs':
      return <NextjsOriginalIcon size={20} />
    case 'nodejs':
      return <NodejsOriginalIcon size={20} />
    case 'php':
      return <PhpOriginalIcon size={20} />
    case 'tailwindcss':
      return <TailwindcssPlainIcon size={20} />
    case 'react':
      return <ReactOriginalIcon size={20} />
    case 'figma':
      return <FigmaOriginalIcon size={20} />
    default:
      return null
  }
}
export default TagIcon
