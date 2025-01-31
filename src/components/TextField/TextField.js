import './TextField.scss'
import { Translation } from 'i18nano';

export default function TextField() {
    return (
        <div>
            <label><Translation path="text-field-label" />(<span><Translation path="text-field-label-span" /></span>)</label>
            <textarea
                placeholder="Enter post your here ..."
            />
           
        </div>

    );
}
