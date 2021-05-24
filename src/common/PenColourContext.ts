import React, { createContext } from "react";
import { Color, DEFAULT_COLOUR } from "./Types";

type PenColourContextType = { penColour: Color, setPenColour: React.Dispatch<React.SetStateAction<Color>> };

const defaultContext: PenColourContextType = {
    penColour: DEFAULT_COLOUR,
    setPenColour: () => {},
};

export default createContext(defaultContext);