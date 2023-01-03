import { LightningElement } from 'lwc';
import { labels } from "./labels";
import FORM_FACTOR from '@salesforce/client/formFactor'


const isMobile = () => {
    return (FORM_FACTOR == 'Small' || FORM_FACTOR == 'Medium');
};

export {
    isMobile, labels
}