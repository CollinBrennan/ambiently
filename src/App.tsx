import { useEffect, useState } from 'react'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/react/20/solid'
import { MoonIcon } from '@heroicons/react/24/solid'
import { MoonIcon as MoonIconOutline } from '@heroicons/react/24/outline'
import Player from './components/Player'
import scenes from './assets/scenes'

function App() {
  const [isDim, setIsDim] = useState(getIsDim())
  const [sceneIndex, setSceneIndex] = useState(getSceneIndex())
  const scene = scenes[sceneIndex]

  // Preload images
  scenes.forEach((scene) => (new Image().src = scene.image))

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      e.preventDefault()
      switch (e.code) {
        case 'ArrowRight':
          renderNextScene()
          break
        case 'ArrowLeft':
          renderPrevScene()
          break
        case 'KeyD':
          toggleDim()
          break
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  function getIsDim(): boolean {
    const storedIsDim = localStorage.getItem('isDim')
    return storedIsDim ? JSON.parse(storedIsDim) : false
  }

  function getSceneIndex(): number {
    const storedIndex = Number(localStorage.getItem('sceneIndex') ?? 0)
    return storedIndex < scenes.length - 1 ? storedIndex : 0
  }

  function toggleDim() {
    setIsDim((prev) => {
      localStorage.setItem('isDim', JSON.stringify(!prev))
      return !prev
    })
  }

  function renderNextScene() {
    setSceneIndex((prev) => {
      const newIndex = (prev + 1) % scenes.length
      localStorage.setItem('sceneIndex', JSON.stringify(newIndex))
      return newIndex
    })
  }

  function renderPrevScene() {
    setSceneIndex((prev) => {
      const newIndex = (prev === 0 ? scenes.length : prev) - 1
      localStorage.setItem('sceneIndex', JSON.stringify(newIndex))
      return newIndex
    })
  }

  return (
    <div className="absolute inset-0 bg-black">
      <div className="flex items-center justify-center h-full w-full select-none overflow">
        <img
          className={
            'absolute w-full h-full object-cover transition-opacity object-bottom ' +
            (isDim ? ' opacity-30' : ' opacity-90')
          }
          src={scene.image}
        />

        <button
          onClick={renderNextScene}
          className="group absolute right-0 h-full w-1/4 flex flex-row outline-none"
        >
          <div className="bg-white/0 h-full w-24 group-hover:bg-white/25 rounded-l-[50%] transition-colors group-active:bg-white/25"></div>
          <div className="bg-white/0 h-full w-full flex items-center justify-center transition-colors group-hover:bg-white/25 group-active:bg-white/25">
            <ChevronRightIcon className="w-16 text-white/50 group-hover:scale-110 transition-transform group-hover:text-white/100 group-active:scale-110 -translate-x-6" />
          </div>
        </button>

        <button
          onClick={renderPrevScene}
          className="group absolute left-0 h-full w-1/4 flex flex-row-reverse outline-none"
        >
          <div className="bg-white/0 h-full w-24 group-hover:bg-white/25 rounded-r-[50%] transition-colors group-active:bg-white/25"></div>
          <div className="bg-white/0 h-full w-full flex items-center justify-center transition-colors group-hover:bg-white/25 group-active:bg-white/25">
            <ChevronLeftIcon className="w-16 text-white/50 group-hover:scale-110 transition-transform group-hover:text-white/100 translate-x-6 group-active:scale-110" />
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
