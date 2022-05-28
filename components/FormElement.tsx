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
    
        default:
            return (<TextArea label={label} id={id} name={name} value={value || ''} rows={rows || 4} />)
    }
}

export default FormElement;