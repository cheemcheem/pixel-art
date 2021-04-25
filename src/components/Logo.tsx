import React, {memo, useEffect, useRef, useState} from "react";
import {useWindowSize} from "react-use";

type LogoImageProps = {
  letter: "p" | "i" | "x" | "e" | "l",
  leftInPixels: number,
  topInPixels: number,
};
const LogoImage = ({letter, leftInPixels, topInPixels}: LogoImageProps) => {
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

  return <>
    {/* <babylon-image
        onBeforeDrawObservable={(image: Image, _: EventState) => {
          image.host.getContext().imageSmoothingEnabled = false;
        }}
        rotation={rotation}
        name={"pic"}
        widthInPixels={40}
        heightInPixels={40}
        topInPixels={40 + topInPixels}
        leftInPixels={leftInPixels}
        url={`/pixel/${letter}.png`}
        // onCreated={(image, scene) => ref.current = image}
    /> */}
  </>
};

const Logo = (_: { trigger: any }) => {
  const {width, height} = useWindowSize();

  const isHorizontal = width > height;

  return <>
    <LogoImage letter={"p"} topInPixels={isHorizontal ? -40 - height / 3 : -40 - height * 0.45}
               leftInPixels={isHorizontal ? -width * 0.45 : -width / 3}/>
    <LogoImage letter={"i"} topInPixels={isHorizontal ? -40 - height / 6 : -40 - height * 0.45}
               leftInPixels={isHorizontal ? -width * 0.45 : -width / 6}/>
    <LogoImage letter={"x"} topInPixels={isHorizontal ? -40 : -40 - height * 0.45}
               leftInPixels={isHorizontal ? -width * 0.45 : 0}/>
    <LogoImage letter={"e"} topInPixels={isHorizontal ? -40 + height / 6 : -40 - height * 0.45}
               leftInPixels={isHorizontal ? -width * 0.45 : +width / 6}/>
    <LogoImage letter={"l"} topInPixels={isHorizontal ? -40 + height / 3 : -40 - height * 0.45}
               leftInPixels={isHorizontal ? -width * 0.45 : +width / 3}/>
  </>
}

export default memo(Logo, ({trigger: prev}, {trigger: next}) => prev === next);