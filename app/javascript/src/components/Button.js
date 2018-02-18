import React from 'react'

function Button({
    children,
    onClick,
    Route = false,
    Display = false,
    New = false,
    Update = false,
    Delete = false
  }) {

  let colour
  if (Route) colour = 'route'
  else if (Display) colour = 'display'
  else if (New) colour = 'new'
  else if (Update) colour = 'update'
  else if (Delete) colour = 'delete'
  else colour = 'route'

  return (
      <button
          className={`Button ${ colour }`}
          onClick={ onClick }
      >
        { children }
      </button>
  )
}

export default Button