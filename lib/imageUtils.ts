export const THUMBNAIL_IMAGE_MAP: Record<string, string> = {
  image1:
    "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=400&h=400&fit=crop",
  image2:
    "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=400&fit=crop",
  image3:
    "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=400&fit=crop",
  image4:
    "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=400&fit=crop",
  image5:
    "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=400&h=400&fit=crop",
  image6:
    "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=400&h=400&fit=crop",
};

export const THUMBNAIL_IMAGES = Object.values(THUMBNAIL_IMAGE_MAP);

/**
 * Get thumbnail image URL from identifier
 * @param imageId - Image identifier (e.g., "image1", "image2") or direct URL
 * @returns The corresponding image URL
 */
export function getThumbnailUrl(imageId?: string | null): string {
  if (!imageId) {
    return THUMBNAIL_IMAGES[0];
  }

  if (imageId.startsWith("http://") || imageId.startsWith("https://")) {
    return imageId;
  }

  return THUMBNAIL_IMAGE_MAP[imageId.toLowerCase()] || THUMBNAIL_IMAGES[0];
}

/**
 * Get a random thumbnail URL based on an index
 * Useful for fallback scenarios when no specific image is provided
 * @param index - Index to determine which image to use
 * @returns The thumbnail URL
 */
export function getRandomThumbnail(index: number): string {
  return THUMBNAIL_IMAGES[index % THUMBNAIL_IMAGES.length];
}

/**
 * Get thumbnail URL with fallback logic
 * Tries to get the specified imageId, falls back to index-based selection
 * @param imageId - Image identifier from server
 * @param fallbackIndex - Index to use if imageId is not available
 * @returns The thumbnail URL
 */
export function getThumbnailWithFallback(
  imageId?: string | null,
  fallbackIndex: number = 0
): string {
  if (imageId) {
    return getThumbnailUrl(imageId);
  }
  return getRandomThumbnail(fallbackIndex);
}
