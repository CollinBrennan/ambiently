import { PlayIcon, PauseIcon } from '@heroicons/react/20/solid'
import { useEffect, useRef, useState } from 'react'

const Player = ({ src }: { src: string }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const volume = getVolume()
  const audio = useRef(new Audio(src))

  function getVolume() {
    const storedVolume = localStorage.getItem('volume')
    return storedVolume ? Number(storedVolume) : 0.5
  }

  useEffect(() => {
    audio.current.loop = true
  }, [])

  useEffect(() => {
    audio.current.src = src
    audio.current.load()
    if (isPlaying) audio.current.play()
  }, [src])

  function handleVolumeChange(newVolume: number) {
    audio.current.volume = newVolume
    localStorage.setItem('volume', newVolume.toString())
  }

  function toggleAudio() {
    if (isPlaying) {
      audio.current.pause()
      setIsPlaying(false)
    } else {
      audio.current.play()
      setIsPlaying(true)
    }
  }

  return (
    <div className="backdrop-blur backdrop-brightness-95 rounded-[1.5rem] flex flex-row gap-4 p-6 justify-center items-center">
      <button onClick={toggleAudio}>
        {!isPlaying ? (
          <PlayIcon className="w-12 scale-100 transition-transform hover:scale-110 text-white" />
        ) : (
          <PauseIcon className="w-12 scale-100 transition-transform hover:scale-110 text-white" />
        )}
      </button>
      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        defaultValue={volume}
        onChange={(e) => handleVolumeChange(Number(e.target.value))}
      />
    </div>
  )
}

export default Player
