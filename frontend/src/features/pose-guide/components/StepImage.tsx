import { useState } from "react";

type Props = {
  src: string;
  alt: string;
};

export function StepImage({ src, alt }: Props) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl bg-stone-100"
      style={{ aspectRatio: "4/3" }}
    >
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-stone-200" />
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
