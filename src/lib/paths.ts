/** Strips the file extension from an image path, e.g.
 * "/images/gallery/placeholder-01.jpg" -> "/images/gallery/placeholder-01".
 * Used to turn a data file's canonical `src` into the `basePath` the
 * responsive <Image> component expects. */
export function toBasePath(src: string): string {
  return src.replace(/\.[^/.]+$/, '');
}
