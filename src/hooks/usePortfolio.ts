import { useState, useMemo } from "react";

export type PortfolioCategory =
  | "All"
  | "Wedding"
  | "Sangeet"
  | "Haldi"
  | "Engagement"
  | "Couple Shoot"
  | "Baby Shower";

export const PORTFOLIO_CATEGORIES: PortfolioCategory[] = [
  "All",
  "Wedding",
  "Sangeet",
  "Haldi",
  "Engagement",
  "Couple Shoot",
  "Baby Shower",
];

export interface PortfolioImage {
  id: number;
  src: string;
  alt: string;
  categories: PortfolioCategory[];
}

export function usePortfolio(images: PortfolioImage[]) {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>("All");

  const filtered = useMemo(() => {
    if (activeCategory === "All") return images;
    return images.filter((img) => img.categories.includes(activeCategory));
  }, [images, activeCategory]);

  return {
    activeCategory,
    setActiveCategory,
    filtered,
  };
}
