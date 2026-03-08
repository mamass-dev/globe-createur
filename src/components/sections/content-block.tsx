"use client"

import Image from "next/image"
import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { AnimateOnScroll } from "@/components/ui/animate"
import { cn } from "@/lib/utils"

type ContentBlockProps = {
  title: string
  description: string
  image?: string
  imageAlt?: string
  ctaLabel?: string
  ctaHref?: string
  reverse?: boolean
  badge?: string
  children?: React.ReactNode
}

export function ContentBlock({
  title,
  description,
  image,
  imageAlt,
  ctaLabel,
  ctaHref,
  reverse = false,
  badge,
  children,
}: ContentBlockProps) {
  return (
    <section className="py-20 lg:py-28">
      <Container>
        <AnimateOnScroll>
          <div
            className={cn(
              "grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center",
              reverse && "lg:[direction:rtl] lg:[&>*]:[direction:ltr]"
            )}
          >
            {/* Text side */}
            <div>
              {badge && (
                <span className="inline-block font-mono-accent text-xs font-medium text-primary tracking-wider uppercase mb-4">
                  {badge}
                </span>
              )}
              <h2 className="text-[1.875rem] sm:text-4xl font-bold tracking-tight text-foreground">
                {title}
              </h2>
              <p className="mt-4 text-gray-400 leading-relaxed">
                {description}
              </p>
              {children && <div className="mt-6">{children}</div>}
              {ctaLabel && ctaHref && (
                <div className="mt-8">
                  <Button href={ctaHref}>{ctaLabel}</Button>
                </div>
              )}
            </div>

            {/* Image side */}
            {image && (
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-50">
                <Image
                  src={image}
                  alt={imageAlt ?? title}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            )}
          </div>
        </AnimateOnScroll>
      </Container>
    </section>
  )
}
