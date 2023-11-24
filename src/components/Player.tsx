import { PlayIcon, PauseIcon } from '@heroicons/react/20/solid'
import { useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'

const Player = ({ src }: { src: string }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audio = useRef(new Audio(src))
  const [volume, setVolume] = useState(getVolume())

  audio.current.loop = true
  audio.current.volume = volume

  function getVolume() {
    if (isMobile) return 1.0
    return Number(localStorage.getItem('volume') ?? 0.5)
  }

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      e.preventDefault()
      switch (e.code) {
        case 'Space':
          togglePlay()
          break
        case 'ArrowUp':
          setVolume((prevVolume) =>
            Math.min(Math.max(prevVolume + 0.05, 0.0), 1.0)
          )
          break
        case 'ArrowDown':
          setVolume((prevVolume) =>
            Math.min(Math.max(prevVolume - 0.05, 0.0), 1.0)
          )
          break
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    audio.current.src = src
    audio.current.load()
    if (isPlaying) audio.current.play()
  }, [src])

  useEffect(() => {
    if (isPlaying) {
      audio.current.play()
    } else {
      audio.current.pause()
    }
  }, [isPlaying])

  useEffect(() => {
    if (!isMobile) {
      audio.current.volume = volume
      localStorage.setItem('volume', volume.toString())
    }
  }, [volume])

  function togglePlay() {
    setIsPlaying((prevIsPlaying) => !prevIsPlaying)
  }

  return (
    <>
      <button className="outline-none" onClick={togglePlay}>
        {!isPlaying ? (
          <PlayIcon className="w-12 scale-100 transition-transform hover:scale-110 text-white" />
        ) : (
          <PauseIcon className="w-12 scale-100 transition-transform hover:scale-110 text-white" />
        )}
      </button>
      {!isMobile ? (
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      ) : null}
    </>
  )
}

export default Player
