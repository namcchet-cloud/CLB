import { images } from '../data/images.js?v=5.1.0';
/** Thumbnail selection never mutates/recompresses the artist's full-size original. */
export function imageInfo(src) { return images[src]; }
export function imageVariant(src, target = 560) {
  const items = images[src]?.variants;
  return items?.find(v => v.width >= target) || items?.at(-1) || { src };
}
export function setImage(img, src, { width = 560, sizes = '100vw', lazy = true, responsive = true } = {}) {
  const info = images[src], chosen = imageVariant(src, width);
  img.decoding = 'async'; img.loading = lazy ? 'lazy' : 'eager'; img.draggable = false;
  if (info) {
    img.width = info.width; img.height = info.height;
    if (responsive) {
      img.srcset = info.variants.map(v => `${v.src} ${v.width}w`).join(', ');
      img.sizes = sizes;
    }
  }
  img.src = chosen.src;
}
