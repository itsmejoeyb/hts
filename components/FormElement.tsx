import Input from '@components/Input'
import TextArea from '@components/TextArea'

type Props = {
    field: {
        label: string,
        id: string,
        placeholder?: string,
        value?: string
        name: string,
        type?: string,
        rows?: number
    }
}

const FormElement = ({ field: { type, label, id, placeholder, value, name, rows } }: Props) => {

    switch (type) {
        case "text":
            return (<Input type={type} label={label} id={id} placeholder={placeholder || ''} name={name} value={value || ''} />)

        case "shipping":
            return (
                <div className='flex w-full'>
                    <Input type="text" width="full" label={label} id={id} placeholder={placeholder || ''} name={name} value={value || ''} />
                    <a href='#' className="self-end ml-2">
                        <span className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">
                        View
                        </span>
                    </a>
                </div>
            )
    
        default:
            return (<TextArea label={label} id={id} name={name} value={value || ''} rows={rows || 4} />)
    }
}

export default FormElement;