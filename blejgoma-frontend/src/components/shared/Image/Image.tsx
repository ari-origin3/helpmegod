import React, { CSSProperties, useRef, useState } from "react";
import cs from "classnames";
import fallbackImage from "../../../assets/images/blejgoma-fallback-image.jpg";

import "./Image.scss";

interface Props {
  src?: string;
  alt?: string;
  srcSet?: string;
  className?: string;
  dynamicFit?: boolean;
  style?: CSSProperties;
  imagePlaceholder?: string;
  id?: string;
}

export const Image = (props: Props) => {
  const [loaded, setLoaded] = useState(false);
  const [containImage, setContainImage] = useState(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const imgPlaceholder = props.imagePlaceholder ?? fallbackImage;
  const handleOnLoad = () => {
    if (!imgRef.current) {
      setLoaded(true);
      return;
    }

    setContainImage(
      imgRef.current?.naturalHeight <= imgRef.current?.naturalWidth
    );
    setLoaded(true);
  };

  const handleRef = (el: HTMLImageElement) => {
    if (!props.dynamicFit) {
      return;
    }

    imgRef.current = el;
  };

  const handleError = (e: any) => {
    e.target.src = imgPlaceholder;
  };

  return props.src ? (
    <img
      className={cs("Image", props.className, {
        "Image--contain": containImage,
        "Image--loading": props.dynamicFit && !loaded,
      })}
      id={props.id}
      src={props.src}
      alt={props?.alt}
      style={props.style}
      ref={handleRef}
      onLoad={handleOnLoad}
      onError={handleError}
      srcSet={props.srcSet}
    />
  ) : (
    <span className="Image--default">
      <img src={imgPlaceholder} alt={props.alt || "BlejGoma logo"} />
    </span>
  );
};
