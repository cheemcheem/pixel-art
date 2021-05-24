import { useMedia } from "react-use";

export default function useDarkMode() {
    return useMedia("(prefers-color-scheme: dark)");
}