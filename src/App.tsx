import { useState } from 'react'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid'
import { MoonIcon } from '@heroicons/react/24/solid'
import { MoonIcon as MoonIconOutline } from '@heroicons/react/24/outline'
import Player from './components/Player'
import scenes from './assets/scenes'

function App() {
  const [isDim, setIsDim] = useState(false)
  const [isSceneChanging, setIsSceneChanging] = useState(false)
  const [sceneIndex, setSceneIndex] = useState(0)
  const scene = scenes[sceneIndex]
  const transitionDuration = 150

  function nextScene() {
    setIsSceneChanging(true)
    setTimeout(() => {
      setSceneIndex((prevSceneIndex) => (prevSceneIndex + 1) % scenes.length)
      setIsSceneChanging(false)
    }, transitionDuration)
  }

  function prevScene() {
    setIsSceneChanging(true)
    setTimeout(() => {
      setSceneIndex(
        (prevSceneIndex) =>
          (prevSceneIndex === 0 ? scenes.length : prevSceneIndex) - 1
      )
      setIsSceneChanging(false)
    }, transitionDuration)
  }

  return (
    <div className="absolute inset-0 bg-black">
      <div className="flex items-center justify-center h-full w-full select-none overflow">
        <img
          className={`absolute w-full h-full object-cover transition-opacity object-bottom ${
            isSceneChanging ? 'opacity-0' : isDim ? 'opacity-30' : 'opacity-90'
          } ${'duration-' + transitionDuration}`}
          src={scene.image}
        />

        <button
          onClick={nextScene}
          className="absolute oval rounded-r-none flex justify-center items-center h-full min-w-[20%] transition-colors bg-opacity-0 bg-white hover:bg-opacity-25 active:bg-opacity-25 right-0"
        >
          <ChevronRightIcon className="w-12 mx-12 transition-transform group-hover:scale-110 text-white opacity-50 group-hover:opacity-100 group-active:opacity-100" />
        </button>

        <button
          onClick={prevScene}
          className="group absolute oval rounded-l-none flex justify-center items-center h-full min-w-[20%] transition-colors bg-opacity-0 bg-white hover:bg-opacity-25 active:bg-opacity-25 left-0"
        >
          <ChevronLeftIcon className="w-12 mx-12 transition-transform group-hover:scale-110 text-white opacity-50 group-hover:opacity-100 group-active:opacity-100" />
        </button>

        <div className="absolute bottom-24 backdrop-blur backdrop-brightness-95 rounded-3xl flex flex-row gap-4 p-6 justify-center items-center">
          <button onClick={() => setIsDim((prevIsDim) => !prevIsDim)}>
            {isDim ? (
              <MoonIcon className="w-11 scale-100 transition-transform hover:scale-110 text-white" />
            ) : (
              <MoonIconOutline className="w-11 scale-100 transition-transform hover:scale-110 text-white" />
            )}
          </button>
          <Player src={scene.audio} />
        </div>

        <div className="absolute bottom-0 p-1">
          <footer className="text-white/25 text-xs">
            made by{' '}
            <a
              className="text-white/50 underline"
              href="https://collinbrennan.dev"
            >
              Collin Brennan
            </a>
          </footer>
        </div>
      </div>
    </div>
  )
}

export default App
