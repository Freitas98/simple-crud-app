interface ButtonProps {
    color?: "green" | "blue" | "gray"
    children: any
    className?: string
    onClick?: () => void
}

export default function Button(props: ButtonProps){
    const color = props.color ?? "gray"
    
    return (
        <button className={`
            bg-gradient-to-r from-${color}-400 to-${color}-700
            text-white px-4 py-2 rounded-md
            ${props.className}
        `} onClick={props.onClick}>
            {props.children}
        </button>
    )
}