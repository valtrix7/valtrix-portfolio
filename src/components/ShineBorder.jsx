import React from 'react'
import './ShineBorder.css'

function ShineBorder({
  borderWidth = 1,
  duration = 14,
  shineColor = '#ffffff',
  className = '',
  style = {},
  children,
  ...props
}) {
  const colorStr = Array.isArray(shineColor) ? shineColor.join(',') : shineColor

  return (
    <div
      className={`shine-border-wrapper ${className}`}
      style={{
        '--border-width': `${borderWidth}px`,
        '--duration': `${duration}s`,
        position: 'relative',
        ...style,
      }}
      {...props}
    >
      <div
        className="shine-border-element"
        style={{
          backgroundImage: `radial-gradient(transparent, transparent, ${colorStr}, transparent, transparent)`,
        }}
      />
      {children}
    </div>
  )
}

export { ShineBorder }
