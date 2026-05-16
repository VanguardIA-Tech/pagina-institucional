import type { ReactNode, HTMLAttributes } from 'react'

type SectionContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode
  as?: 'div' | 'section' | 'article' | 'header' | 'footer'
}

export default function SectionContainer({
  children,
  as: Tag = 'div',
  className = '',
  ...rest
}: SectionContainerProps) {
  return (
    <Tag
      className={`max-w-7xl mx-auto px-5 sm:px-8 ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
