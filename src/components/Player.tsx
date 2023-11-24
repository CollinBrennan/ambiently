import { PlayIcon, PauseIcon } from '@heroicons/react/20/solid'
import { useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'

const Player = ({ src }: { src: string }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(getVolume())
  const audioRef = useRef<HTMLAudioElement>(null)

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
          setVolume((prev) => Math.min(Math.max(prev + 0.05, 0.0), 1.0))
          break
        case 'ArrowDown':
          setVolume((prev) => Math.min(Math.max(prev - 0.05, 0.0), 1.0))
          break
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (isPlaying) {
      audioRef.current!.play()
    } else {
      audioRef.current!.pause()
    }
  }, [isPlaying, src])

  useEffect(() => {
    if (!isMobile) {
      audioRef.current!.volume = volume
      localStorage.setItem('volume', volume.toString())
    }
  }, [volume])

  function togglePlay() {
    setIsPlaying((prev) => !prev)
  }

  return (
    <>
      <audio src={src} ref={audioRef} loop />
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
