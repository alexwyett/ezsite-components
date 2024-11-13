import { ComponentProps } from "react";

export default function Submit({ children, disabled, className }: ComponentProps<'button'>) {
  return (
    <button 
      disabled={disabled} 
      type="submit" 
      className={
        `button disabled:grayscale${className ? ` ${className}` : ''}`
      }
    >
      {children}
    </button>
  )
}