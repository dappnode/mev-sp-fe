export const formatTime = (seconds: number | undefined): string => {
    if (!seconds) return '0'
  
    const days = Math.floor(seconds / 86400)
    const remainingSeconds = seconds % 86400
  
    const date = new Date(0)
    date.setUTCSeconds(remainingSeconds)
  
    const hours = date.getUTCHours().toString().padStart(2, '0')
    const minutes = date.getUTCMinutes().toString().padStart(2, '0')
  
    return `${
      days ? `${days.toString().padStart(2, '0')}d ` : ''
    }${hours}h ${minutes}m`
  }