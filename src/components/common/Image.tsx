/**
 * Responsive image primitive.
 *
 * Every photo on the site (real or placeholder) is exported by
 * `scripts/generate-placeholders.mjs` as `{basePath}-{width}.{avif,webp,jpg}`
 * plus a width-less `{basePath}.jpg` fallback. This component is the only
 * place that knows that convention, so it's difficult for a page component
 * to accidentally ship an oversized, non-lazy, layout-shifting image.
 */

const FORMATS = [
  { ext: 'avif', type: 'image/avif' },
  { ext: 'webp', type: 'image/webp' },
] as const;

const DEFAULT_WIDTHS = [480, 768, 1200, 1600];

interface ResponsiveImageProps {
  /** Path with no extension and no width suffix, e.g. "/images/hero/hero". */
  basePath: string;
  /** Intrinsic width in px — required, used for the aspect ratio + srcSet cap. */
  width: number;
  /** Intrinsic height in px — required, used for the aspect ratio. */
  height: number;
  alt: string;
  /** Which generated widths actually exist for this image. Defaults to the
   * standard set, capped at the intrinsic width (matches the generator). */
  widths?: number[];
  sizes?: string;
  /** Above-the-fold / LCP images should set this — switches to eager
   * loading + high fetch priority instead of lazy. */
  priority?: boolean;
  className?: string;
  objectFit?: 'cover' | 'contain';
}

export function Image({
  basePath,
  width,
  height,
  alt,
  widths = DEFAULT_WIDTHS,
  sizes = '100vw',
  priority = false,
  className = '',
  objectFit = 'cover',
}: ResponsiveImageProps) {
  const usableWidths = widths.filter((w) => w <= width);
  const finalWidths = usableWidths.length > 0 ? usableWidths : [width];
  const largest = finalWidths[finalWidths.length - 1];

  const srcSet = (ext: string) => finalWidths.map((w) => `${basePath}-${w}.${ext} ${w}w`).join(', ');

  return (
    <picture>
      {FORMATS.map(({ ext, type }) => (
        <source key={ext} type={type} srcSet={srcSet(ext)} sizes={sizes} />
      ))}
      <img
        src={`${basePath}-${largest}.jpg`}
        srcSet={srcSet('jpg')}
        sizes={sizes}
        width={width}
        height={height}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={className}
        style={{ aspectRatio: `${width} / ${height}`, objectFit }}
        onError={(e) => {
          // Graceful degradation: never let a missing/broken image break
          // the layout — collapse to a soft ivory/wine placeholder tile.
          const img = e.currentTarget;
          img.onerror = null;
          img.removeAttribute('srcset');
          img.style.background = 'linear-gradient(135deg, var(--color-warm-white), var(--color-gold-light))';
          img.src =
            'data:image/svg+xml;charset=UTF-8,' +
            encodeURIComponent(
              `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><rect width="100%" height="100%" fill="#FAF7F0"/></svg>`,
            );
        }}
      />
    </picture>
  );
}
