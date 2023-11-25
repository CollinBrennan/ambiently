import { PlayIcon, PauseIcon } from '@heroicons/react/20/solid'
import { useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'

const Player = ({ src }: { src: string }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(getVolume())
  const audioRef = useRef<HTMLAudioElement>(null)

  const volumeMin = 0.0
  const volumeMax = 1.0

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
          setVolume((prev) =>
            Math.min(Math.max(prev + volumeMax * 0.05, volumeMin), volumeMax)
          )
          break
        case 'ArrowDown':
          setVolume((prev) =>
            Math.min(Math.max(prev - volumeMax * 0.05, volumeMin), volumeMax)
          )
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
      localStorage.setItem('volume', JSON.stringify(volume))
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
          min={volumeMin}
          max={volumeMax}
          step={0.01}
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
        />
      ) : null}
    </>
  )
}

export default Player
