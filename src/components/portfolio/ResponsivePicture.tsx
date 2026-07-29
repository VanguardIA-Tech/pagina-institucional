type ResponsivePictureProps = {
  base: string
  alt: string
  width: number
  height: number
  className?: string
  loading?: 'eager' | 'lazy'
  fetchPriority?: 'high' | 'low' | 'auto'
  fallbackExtension?: 'png' | 'jpg'
  fallbackSrc?: string
}

export default function ResponsivePicture({
  base,
  alt,
  width,
  height,
  className,
  loading = 'lazy',
  fetchPriority = 'auto',
  fallbackExtension = 'png',
  fallbackSrc,
}: ResponsivePictureProps) {
  return (
    <picture className={className}>
      <source srcSet={`${base}.avif`} type="image/avif" />
      <source srcSet={`${base}.webp`} type="image/webp" />
      <img
        src={fallbackSrc ?? `${base}.${fallbackExtension}`}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={loading === 'eager' ? 'sync' : 'async'}
      />
    </picture>
  )
}
