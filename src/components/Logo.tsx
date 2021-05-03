import { memo, useEffect, useRef, useState } from "react";
import './Logo.css';

type LogoLetter = "p" | "i" | "x" | "e" | "l";
const logoLetters: LogoLetter[] = ["p", "i", "x", "e", "l"];
type LogoImageProps = { letter: LogoLetter };

const LogoImage = ({ letter }: LogoImageProps) => {
  const [rotation, setRotation] = useState(Math.random() * 0.6 - 0.3);
  const lastRendered = useRef(Date.now());

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const now = Date.now();
    if ((now - lastRendered.current) > 150) {
      lastRendered.current = now;
      setRotation((prevRotation) => {
        const random = Math.random() * 0.6 - 0.3;
        const newRotation = prevRotation + random;
        return newRotation < -0.3 || newRotation > 0.3
          ? prevRotation - random
          : newRotation;
      })
    }
  })

  return (
    <div className="pixel-logo-img-container">
      <img className="pixel-logo-img"
        key={letter}
        src={`/pixel/${letter}.png`}
        alt={letter}
        style={{ transform: "rotate(" + rotation + "rad)" }}
      />
    </div>
  );

};

const Logo = (_: { trigger: any }) => {
  return <header id="pixel-logo-header">
    {logoLetters.map((letter) => ({ letter })).map(LogoImage)}
  </header>
}

export default memo(Logo, ({ trigger: prev }, { trigger: next }) => prev === next);