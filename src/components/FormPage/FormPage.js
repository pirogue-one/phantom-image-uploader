import { Fragment } from 'react'
import './FormPage.scss'
import { Translation } from 'i18nano';

export default function FormPage() {
    return (
        <Fragment>
            <div className='form-container'>
                <div className='feedback-text-container'>
                    <p className='feedback-main-text'><Translation path="feedback" /></p>
                    <p className='feedback-text'><Translation path="feedback-form" /></p>
                </div>
                <div className='feedback-container'>
                    <label className='feedback-label' for="name"><Translation path="feedback-name" /></label>
                    <input type="text" name="name" id="name"></input>
                </div>
                <div className='feedback-container'>
                    <label className='feedback-label' for="email"><Translation path="feedback-email" /></label>
                    <input type="text" name="email" id="email"></input>
                </div>
                <div className='feedback-container'>
                    <label className='feedback-label' for="description"><Translation path="feedback-description" /></label>
                    <textarea rows={4} id="description"
                    />
                </div>
                <button className='feedback-btn'><Translation path="feedback-button" /></button>
            </div>
        </Fragment>
    );
}