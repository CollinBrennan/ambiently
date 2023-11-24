import { useEffect, useState } from 'react'
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

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      e.preventDefault()
      switch (e.code) {
        case 'ArrowRight':
          nextScene()
          break
        case 'ArrowLeft':
          prevScene()
          break
        case 'KeyD':
          toggleDim()
          break
      }
    }
    preloadImages()
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  function preloadImages() {
    scenes.forEach((scene) => {
      new Image().src = scene.image
    })
  }

  function toggleDim() {
    setIsDim((prev) => !prev)
  }

  function nextScene() {
    setIsSceneChanging(true)
    setTimeout(() => {
      setSceneIndex((prev) => (prev + 1) % scenes.length)
      setIsSceneChanging(false)
    }, transitionDuration)
  }

  function prevScene() {
    setIsSceneChanging(true)
    setTimeout(() => {
      setSceneIndex((prev) => (prev === 0 ? scenes.length : prev) - 1)
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
          className="group absolute right-0 h-full w-1/4 flex flex-row outline-none"
        >
          <div className="bg-white/0 h-full w-24 group-hover:bg-white/25 rounded-l-[50%] transition-colors group-active:bg-white/25"></div>
          <div className="bg-white/0 h-full w-full flex items-center justify-center transition-colors group-hover:bg-white/25 group-active:bg-white/25">
            <ChevronRightIcon className="w-12 text-white/50 group-hover:scale-110 transition-transform group-hover:text-white/100 group-active:scale-110 -translate-x-1/2" />
          </div>
        </button>

        <button
          onClick={prevScene}
          className="group absolute left-0 h-full w-1/4 flex flex-row-reverse outline-none"
        >
          <div className="bg-white/0 h-full w-24 group-hover:bg-white/25 rounded-r-[50%] transition-colors group-active:bg-white/25"></div>
          <div className="bg-white/0 h-full w-full flex items-center justify-center transition-colors group-hover:bg-white/25 group-active:bg-white/25">
            <ChevronLeftIcon className="w-12 text-white/50 group-hover:scale-110 transition-transform group-hover:text-white/100 translate-x-1/2 group-active:scale-110" />
          </div>
        </button>

        <div className="absolute bottom-24 backdrop-blur backdrop-brightness-95 rounded-3xl flex flex-row gap-4 p-6 justify-center items-center">
          <button className="outline-none" onClick={toggleDim}>
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
