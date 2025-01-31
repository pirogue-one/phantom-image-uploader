import './InputContent.scss'
import { Translation } from 'i18nano';

export default function InputContent({inputType, inputPlaceholder}) {
    return (
        <div>
            <input type={inputType} placeholder={inputPlaceholder} />
        </div>

    );
}