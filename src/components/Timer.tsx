import { useEffect, useRef, useState } from 'react'
import { formatSeconds } from '../lib/format'
import { IconPause, IconPlay, IconReset } from './Icons'

export function Timer({ seconds }: { seconds: number }) {
  const [left, setLeft] = useState(seconds)
  const [running, setRunning] = useState(false)
  const endAt = useRef(0)

  useEffect(() => {
    if (!running) return
    const t = setInterval(() => {
      const remaining = Math.max(0, Math.round((endAt.current - Date.now()) / 1000))
      setLeft(remaining)
      if (remaining === 0) {
        setRunning(false)
        navigator.vibrate?.([200, 100, 200])
      }
    }, 250)
    return () => clearInterval(t)
  }, [running])

  const start = () => {
    const from = left === 0 ? seconds : left
    endAt.current = Date.now() + from * 1000
    setLeft(from)
    setRunning(true)
  }

  const done = left === 0
  const pct = 1 - left / seconds
  const r = 15
  const circ = 2 * Math.PI * r

  return (
    <div className={`timer ${running ? 'is-running' : ''} ${done ? 'is-done' : ''}`}>
      <svg viewBox="0 0 36 36" width="36" height="36" aria-hidden="true" className="timer-ring">
        <circle cx="18" cy="18" r={r} className="timer-track" />
        <circle
          cx="18"
          cy="18"
          r={r}
          className="timer-progress"
          strokeDasharray={circ}
          strokeDashoffset={circ * (1 - pct)}
        />
      </svg>
      <span className="timer-time" role="timer" aria-live={done ? 'assertive' : 'off'}>
        {done ? 'Done!' : formatSeconds(left)}
      </span>
      {running ? (
        <button type="button" className="icon-btn sm" onClick={() => setRunning(false)} aria-label="Pause timer">
          <IconPause width={16} height={16} />
        </button>
      ) : (
        <button
          type="button"
          className="icon-btn sm"
          onClick={start}
          aria-label={done ? 'Restart timer' : 'Start timer'}
        >
          <IconPlay width={16} height={16} />
        </button>
      )}
      {(left !== seconds || running) && (
        <button
          type="button"
          className="icon-btn sm"
          onClick={() => {
            setRunning(false)
            setLeft(seconds)
          }}
          aria-label="Reset timer"
        >
          <IconReset width={16} height={16} />
        </button>
      )}
    </div>
  )
}
