import { useState } from "react";

// Screenshot carousel with prev/next controls, dot indicators, and a caption.
// Falls back to hiding a slide's image if it fails to load.
function Carousel({ images, title }) {
  const [index, setIndex] = useState(0);
  const [broken, setBroken] = useState(() => new Set());

  // Only keep slides whose image actually loads.
  const slides = images.filter((_, i) => !broken.has(i));
  if (slides.length === 0) return null;

  const safeIndex = Math.min(index, images.length - 1);
  const current = images[safeIndex];
  const many = images.length > 1;

  const go = (dir) => {
    setIndex((i) => (i + dir + images.length) % images.length);
  };

  return (
    <div className="carousel">
      <div className="carousel__viewport">
        {images.map((img, i) => (
          <img
            key={img.src}
            className={`carousel__slide ${i === safeIndex ? "is-active" : ""}`}
            src={img.src}
            alt={`${title} — ${img.caption || `screenshot ${i + 1}`}`}
            loading="lazy"
            aria-hidden={i !== safeIndex}
            onError={() =>
              setBroken((prev) => {
                const next = new Set(prev);
                next.add(i);
                return next;
              })
            }
          />
        ))}

        {many && (
          <>
            <button
              type="button"
              className="carousel__nav carousel__nav--prev"
              onClick={() => go(-1)}
              aria-label="Previous screenshot"
            >
              ‹
            </button>
            <button
              type="button"
              className="carousel__nav carousel__nav--next"
              onClick={() => go(1)}
              aria-label="Next screenshot"
            >
              ›
            </button>
          </>
        )}
      </div>

      {many && (
        <div className="carousel__footer">
          <span className="carousel__caption mono-label">
            {current.caption}
          </span>
          <div className="carousel__dots" role="tablist" aria-label="Screenshots">
            {images.map((img, i) => (
              <button
                key={img.src}
                type="button"
                className={`carousel__dot ${i === safeIndex ? "is-active" : ""}`}
                onClick={() => setIndex(i)}
                aria-label={img.caption || `Screenshot ${i + 1}`}
                aria-selected={i === safeIndex}
                role="tab"
              />
            ))}
          </div>
          <span className="carousel__count mono-label">
            {safeIndex + 1} / {images.length}
          </span>
        </div>
      )}
    </div>
  );
}

export default Carousel;
