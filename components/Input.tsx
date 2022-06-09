type Props = {
    label: string,
    id: string,
    placeholder: string,
    value: string,
    name: string,
    type: string,
    width?: string
}

const Input = ({label, id, placeholder, value, type, name, width}: Props) => {
    return (
        <div className={width == 'full' ? "w-full" : "sm:col-span-1"}>
            <label htmlFor={name} className="block text-sm font-medium text-gray-500">
                {label}
            </label>
            <div className="mt-1">
                <input
                    type={type}
                    name={name}
                    defaultValue={value || undefined}
                    id={id}
                    className="shadow-sm focus:ring-cyan-500 focus:border-cyan-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder={placeholder || undefined}
                    readOnly={true}
                />
            </div>
        </div>
    );
}

export default Input;