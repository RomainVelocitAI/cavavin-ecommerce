'use client'

import { useEffect, useState } from 'react'
import { Check, X } from 'lucide-react'

interface ToastProps {
  message: string
  type: 'success' | 'error'
  duration?: number
  onClose: () => void
}

export function Toast({ message, type, duration = 3000, onClose }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div className={`fixed bottom-8 right-8 flex items-center gap-3 px-6 py-4 rounded-lg shadow-lg transition-all transform animate-slide-up ${
      type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
    }`}>
      {type === 'success' ? (
        <Check className="h-5 w-5" />
      ) : (
        <X className="h-5 w-5" />
      )}
      <span className="font-medium">{message}</span>
    </div>
  )
}