import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// 合并CSS类名
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 生成唯一ID
export function generateId(): string {
  return Math.random().toString(36).substr(2, 9)
}

// 格式化日期
export function formatDate(date: Date | string | undefined | null): string {
  if (!date) return ''
  let d: Date
  if (typeof date === 'string') {
    d = new Date(date)
  } else {
    d = date
  }
  if (!(d instanceof Date) || isNaN(d.getTime())) return ''
  return new Intl.DateTimeFormat('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

// 防抖函数
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// 节流函数
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
} 