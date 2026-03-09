"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

const revealVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

type AnimateOnScrollProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: any
}

export function AnimateOnScroll({
  children,
  className,
  delay = 0,
  as = "div",
}: AnimateOnScrollProps) {
  const Component = (motion as any)[as] || motion.div

  return (
    <Component
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1], // Expo out
      }}
      className={cn(className)}
    >
      {children}
    </Component>
  )
}

type StaggerContainerProps = {
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.1,
}: StaggerContainerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      transition={{ staggerChildren: staggerDelay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <motion.div
      variants={revealVariants}
      transition={{
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], // Expo out
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
