import { useState } from 'react'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid'
import Player from './components/Player'
import scenes from './scenes'

function App() {
  const [sceneIndex, setSceneIndex] = useState(0)
  const scene = scenes[sceneIndex]

  function nextScene() {
    setSceneIndex((prevSceneIndex) => (prevSceneIndex + 1) % scenes.length)
  }

  function prevScene() {
    setSceneIndex(
      (prevSceneIndex) =>
        (prevSceneIndex === 0 ? scenes.length : prevSceneIndex) - 1
    )
  }

  return (
    <div className="absolute inset-0">
      <div className="flex items-center justify-center h-full w-full select-none">
        <img
          className="absolute w-full h-full brightness-[80%] object-cover object-bottom"
          src={scene.image}
        />

        <button
          onClick={nextScene}
          className="group absolute flex justify-center items-center h-full w-1/5 transition-colors bg-opacity-0 bg-white hover:bg-opacity-25 active:bg-opacity-25 right-0"
        >
          <ChevronRightIcon className="w-12 scale-100 transition-transform group-hover:scale-110 text-white opacity-50 group-hover:opacity-100 group-active:opacity-100" />
        </button>

        <button
          onClick={prevScene}
          className="group absolute flex justify-center items-center h-full w-1/5 transition-colors bg-opacity-0 bg-white hover:bg-opacity-25 active:bg-opacity-25 left-0"
        >
          <ChevronLeftIcon className="w-12 scale-100 transition-transform group-hover:scale-110 text-white opacity-50 group-hover:opacity-100 group-active:opacity-100" />
        </button>

        <div className="absolute bottom-24">
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
