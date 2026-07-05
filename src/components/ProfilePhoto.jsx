import { useState } from "react";
import { NAME, PROFILE_PHOTO } from "../data/portfolio";

// Derive initials from the name for the fallback (e.g. "Sudhanraja S" → "SS").
const INITIALS = NAME.split(/\s+/)
  .map((part) => part[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

// Profile portrait with a graceful initials fallback if the image is missing.
function ProfilePhoto() {
  const [failed, setFailed] = useState(false);

  return (
    <figure className="photo">
      <div className="photo__frame">
        {failed ? (
          <span className="photo__fallback" aria-label={NAME}>
            {INITIALS}
          </span>
        ) : (
          <img
            className="photo__img"
            src={PROFILE_PHOTO}
            alt={`Portrait of ${NAME}`}
            loading="lazy"
            onError={() => setFailed(true)}
          />
        )}
      </div>
    </figure>
  );
}

export default ProfilePhoto;
