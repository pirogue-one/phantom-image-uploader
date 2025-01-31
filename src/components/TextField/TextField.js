import './TextField.scss'
import { Translation } from 'i18nano';

export default function TextField() {
    return (
        <div className='text-field-container'>
            <label className='text-field-label'><Translation path="text-field-label" />&nbsp;(&nbsp;<span className='text-field-label-span'><Translation path="text-field-label-span" /></span>&nbsp;)</label>
            <textarea rows={3} 
                placeholder="введите описание/Enter your description"
            />
           
        </div>

    );
}
