import './InputTitle.scss'
import { Translation } from 'i18nano';

export default function InputTitle({inputId, inputName}) {
    return (
        <div>
            <input type="checkbox" id={inputId} name={inputName} />
            <label for={inputName}><Translation path={{inputName} + '-title'} /></label>
        </div>

    );
}