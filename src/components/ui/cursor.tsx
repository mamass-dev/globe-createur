"use client"

import { useEffect, useRef } from "react"

export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const outlineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const outline = outlineRef.current
    if (!dot || !outline) return

    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e
      
      // Immediate movement for dot
      dot.style.transform = `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`
      
      // Delayed/Smooth movement for outline
      outline.animate(
        {
          transform: `translate3d(${clientX}px, ${clientY}px, 0) translate(-50%, -50%)`
        },
        {
          duration: 500,
          fill: "forwards",
          easing: "ease-out"
        }
      )
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("hover-trigger")
      ) {
        document.body.classList.add("hovering")
      } else {
        document.body.classList.remove("hovering")
      }
    }

    window.addEventListener("mousemove", moveCursor)
    window.addEventListener("mouseover", handleMouseOver)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      window.removeEventListener("mouseover", handleMouseOver)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot fixed pointer-events-none z-[9999] hidden lg:block" />
      <div ref={outlineRef} className="cursor-outline fixed pointer-events-none z-[9999] hidden lg:block" />
    </>
  )
}
