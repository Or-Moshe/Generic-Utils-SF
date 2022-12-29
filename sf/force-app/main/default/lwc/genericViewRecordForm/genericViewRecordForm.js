import { LightningElement, api } from 'lwc';

export default class GenericViewRecordForm extends LightningElement {
    
    @api objName;
    @api recordId;
    @api fields;
    @api additionalOutputs;

    clickField(event){
        this.dispatchEvent(new CustomEvent('clickfield', { detail: {recordId: this.recordId} }));
    }
}