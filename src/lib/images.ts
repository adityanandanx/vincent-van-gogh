import { StaticImageData } from "next/image";
import potato from "@/assets/potato.jpg";
import asnieres from "@/assets/asnieres.jpg";
import cypresses from "@/assets/cypresses.jpg";
import houses from "@/assets/houses.jpg";
import redvineyards from "@/assets/redvineyards.jpg";
import starrynight from "@/assets/starrynight.jpg";
import wheatfieldcrows from "@/assets/wheatfieldwithcrows.jpg";
import yellowhouse from "@/assets/yellowhouse.jpg";
import almondblossom from "@/assets/almondblossom.jpg";

export type ImageWithAlt = {
  image: StaticImageData;
  title: string;
};

export const images: ImageWithAlt[] = [
  { image: potato, title: "Potato eaters" },
  { image: asnieres, title: "Asnieres" },
  { image: cypresses, title: "Cypresses" },
  { image: houses, title: "Houses" },
  { image: redvineyards, title: "Red Vineyards" },
  { image: starrynight, title: "Starry Night" },
  { image: wheatfieldcrows, title: "Wheat Field with crows" },
  { image: yellowhouse, title: "Yellow House" },
  { image: almondblossom, title: "ALmond Blossom" },
];
