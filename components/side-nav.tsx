import { Dialog, Transition } from '@headlessui/react'
import Link from 'next/link'
import React, { Fragment } from 'react'
import Button from './button'
import { NavigationItem } from './header'
import Decoration from './icons/decoration'
import RoundedIcon from './icons/rounded'

function SideNav(props: { open: boolean; onCLose: () => void }) {
  return (
    <Transition appear show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.onCLose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50" />
        </Transition.Child>
        <div className="fixed inset-0">
          <div className="relative h-full">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="-left-full"
              enterTo="left-0"
              leave="ease-in duration-300"
              leaveFrom="left-0"
              leaveTo="-left-full"
            >
              <Dialog.Panel className="relative flex h-full w-full max-w-xs transform flex-col  justify-between bg-white py-8 px-6 text-left shadow-xl transition-all dark:bg-black">
                <Decoration className="absolute -bottom-[400px] -left-[400px] z-0 scale-50 text-brand" />

                <div className="flex flex-col items-center justify-center space-y-4">
                  {/* Logo */}
                  <Link href="/">
                    <a
                      className="flex select-none items-center space-x-4 px-3 py-2"
                      onClick={props.onCLose}
                    >
                      <img
                        src="/avatar.png"
                        alt="Arif Iskandar"
                        className="h-6 w-6 rounded-full md:h-10 md:w-10"
                      />
                      <span className="font-semibold">It’s me</span>
                    </a>
                  </Link>
                  {/* Navigation */}
                  <ul className="flex w-full flex-col space-y-2 text-center">
                    <NavigationItem
                      title="home"
                      href="/"
                      onClick={props.onCLose}
                    />
                    <NavigationItem
                      title="about"
                      href="#about"
                      onClick={props.onCLose}
                    />
                    <NavigationItem
                      title="contact"
                      href="mailto:arif19iskandar@gmail.com"
                      onClick={props.onCLose}
                    />
                  </ul>
                </div>

                <Button
                  type="filled"
                  className="relative mb-6"
                  onClick={props.onCLose}
                >
                  Download CV
                </Button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default SideNav
