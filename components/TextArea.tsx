
type Props = {
    label: string,
    id: string,
    value: string,
    name: string,
    rows?: number
}

const TextArea = ({label, id, value, name, rows}: Props) => {
    return (
        <div className="sm:col-span-2">
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">
                {label}
            </label>
            <div className="mt-1">
                <textarea
                    rows={rows || 5}
                    name={name}
                    id={id}
                    className="shadow-sm focus:ring-cyan-500 focus:border-cyan-500 block w-full sm:text-sm border-gray-300 rounded-md disabled:select-none"
                    defaultValue={value || ''}
                    disabled={true}
                />
            </div>
        </div>
    );
}

export default TextArea;