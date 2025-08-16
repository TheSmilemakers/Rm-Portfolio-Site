"use client";

import Masonry from "react-masonry-css";
import { Media, TiltFx, RevealFx } from "@once-ui-system/core";
import styles from "./Gallery.module.scss";
import { gallery } from "@/resources";
import type { GalleryImage } from "@/types";

export default function MasonryGrid() {
  const breakpointColumnsObj = {
    default: 2,
    720: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className={styles.masonryGrid}
      columnClassName={styles.masonryGridColumn}
    >
      {gallery.images.map((image, index) => (
        <RevealFx
          key={index}
          translateY="24"
          delay={Math.min(index * 0.1, 0.5)}
        >
          <TiltFx
            aspectRatio={image.orientation === "horizontal" ? 16/9 : 3/4}
            radius="m"
            style={{ width: "100%" }}
          >
            <Media
              priority={index < 10}
              sizes="(max-width: 560px) 100vw, 50vw"
              radius="m"
              aspectRatio={image.orientation === "horizontal" ? "16 / 9" : "3 / 4"}
              src={image.src}
              alt={image.alt}
              className={styles.gridItem}
              style={{ width: "100%", height: "auto" }}
            />
          </TiltFx>
        </RevealFx>
      ))}
    </Masonry>
  );
}
