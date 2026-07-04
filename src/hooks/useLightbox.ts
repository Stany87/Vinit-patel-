import { useState, useCallback } from "react";

export interface LightboxImage {
  src: string;
  alt: string;
}

export function useLightbox(images: LightboxImage[]) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const open = useCallback(
    (index: number) => {
      setCurrentIndex(index);
      setIsOpen(true);
    },
    [],
  );

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return {
    isOpen,
    currentIndex,
    currentImage: images[currentIndex] ?? null,
    open,
    close,
    next,
    prev,
    goTo,
    total: images.length,
  };
}
