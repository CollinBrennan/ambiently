import { PlayIcon, PauseIcon } from '@heroicons/react/20/solid'
import { useEffect, useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'

const Player = ({ src }: { src: string }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audio = useRef(new Audio(src))
  const volume = getVolume()

  audio.current.loop = true
  audio.current.volume = volume

  function getVolume() {
    if (isMobile) return 1.0
    const storedVolume = localStorage.getItem('volume')
    return storedVolume ? Number(storedVolume) : 0.5
  }

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

  function handleVolumeChange(newVolume: number) {
    if (!isMobile) {
      audio.current.volume = newVolume
      localStorage.setItem('volume', newVolume.toString())
    }
  }

  return (
    <>
      <button onClick={() => setIsPlaying((prevIsPlaying) => !prevIsPlaying)}>
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
          defaultValue={volume}
          onChange={(e) => handleVolumeChange(Number(e.target.value))}
        />
      ) : null}
    </>
  )
}

export default Player
