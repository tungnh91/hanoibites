'use client'
import { useEffect } from 'react'
export function BodyClass({ className, dataset }: { className?: string; dataset?: Record<string, string> }) {
  useEffect(() => {
    if (className) document.body.classList.add(...className.split(' '))
    if (dataset) Object.entries(dataset).forEach(([k, v]) => { document.body.dataset[k] = v })
    return () => {
      if (className) document.body.classList.remove(...className.split(' '))
      if (dataset) Object.entries(dataset).forEach(([k]) => { delete document.body.dataset[k] })
    }
  }, [className, dataset])
  return null
}
