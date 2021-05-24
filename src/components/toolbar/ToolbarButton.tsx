import { Color } from "../../common/Types"

type ToolbarButtonProps = {
    gridArea: string,
    text: string,
    disabled?: boolean,
    onClick?: () => void,
} & (React.PropsWithChildren<{ colour?: undefined }> | {
    children: undefined,
    colour: Color,
});

export default function ToolbarButton({ gridArea, text, disabled, onClick, children, colour }: ToolbarButtonProps) {

    console.log({children})
    return (
        <button id="colour"
            className={`toolbar-item toolbar-button`}
            disabled={disabled}
            onClick={onClick}
            style={{ gridArea, background: colour && colour.toHexString() }}
            about={text}>
            {children}
            <span className="button-text"> {text}</span>
        </button>
    )
}