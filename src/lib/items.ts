import vase from "@/assets/item-vase.jpg";
import painting from "@/assets/item-painting.jpg";
import stool from "@/assets/item-stool.jpg";
import staircase from "@/assets/item-staircase.jpg";

export interface FeedItem {
  id: string;
  title: string;
  creator: string;
  price: number;
  category: string;
  image: string;
  width: number;
  height: number;
  aspect: "portrait" | "square";
  description: string;
}

export const items: FeedItem[] = [
  {
    id: "organic-form-vase",
    title: "Organic Form Vase",
    creator: "Studio Elara",
    price: 180,
    category: "Ceramics",
    image: vase,
    width: 864,
    height: 1080,
    aspect: "portrait",
    description:
      "Hand-thrown stoneware vessel with a matte mineral glaze. Each piece is unique.",
  },
  {
    id: "tethered-horizon",
    title: "Tethered Horizon",
    creator: "Marcus Thorne",
    price: 450,
    category: "Artwork",
    image: painting,
    width: 1024,
    height: 1024,
    aspect: "square",
    description:
      "Monochrome ink and gesso on linen. Part of the Fracture series, 2026.",
  },
  {
    id: "low-tide-stool",
    title: "Low Tide Stool",
    creator: "Atelier Nord",
    price: 240,
    category: "Furniture",
    image: stool,
    width: 864,
    height: 1080,
    aspect: "portrait",
    description:
      "Solid white oak stool finished with natural oil. Designed for quiet corners.",
  },
  {
    id: "stairwell-study-iv",
    title: "Stairwell Study IV",
    creator: "Elena Rossi",
    price: 320,
    category: "Photography",
    image: staircase,
    width: 864,
    height: 1080,
    aspect: "portrait",
    description:
      "Silver gelatin print of a curved concrete stairwell. Edition of twelve.",
  },
];
