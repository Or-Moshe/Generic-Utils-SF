/**
 * Author       :   Or Moshe   
 * Since        :   22/12/22
 */
import lookUp from '@salesforce/apex/CustomLookupCtrl.search';
import { api, LightningElement, track, wire } from 'lwc';


export default class customLookUp extends LightningElement {

    @api details;

    @track selectedName;
    @track records = [];
    @track isValueSelected;
    @track blurTimeout;
    @track showModal = false;
    @track boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    @track inputClass = '';

    noResults;
    searchTerm;

    getResults(){
        lookUp({
            searchTerm  :   this.searchTerm, 
            objName     :   this.details.objName, 
            fields      :   this.details.fields, 
            filter      :   this.details.filter,
            limitStr    :   this.details.limitStr
            })
            .then((result) => {
                this.error = undefined;
                this.records = result;
                this.noResults = result.length == 0;
                console.log(result);
            })
            .catch((error) => {
                this.error = error;
                this.records = undefined;
                console.error(error);
            });
    }

    handleClick() {
        this.searchTerm = '';
        this.showListBox = true;
        this.inputClass = 'slds-has-focus';
        this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open';
    }

    onBlur() {
        this.searchTerm = '';
        this.blurTimeout = setTimeout(() =>  {this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus'}, 300);
    }

    onSelect(event) {
        let selectedId = event.currentTarget.dataset.id;
        let selectedName = event.currentTarget.dataset.name;
        const records = JSON.parse(JSON.stringify( this.records));
        const selectedResult = records.find((item) => item.Id === selectedId);
        this.isValueSelected = true;
        this.selectedName = selectedName;
        if(this.blurTimeout) {
            clearTimeout(this.blurTimeout);
        }
        this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
        this.dispatchEvent(new CustomEvent('lookupselected', {detail:  selectedResult }));
    }

    handleRemovePill() {
        this.isValueSelected = false;
    }

    onChange(event) {
        this.searchTerm = event.target.value;
        if(this.searchTerm.length % 2 == 0){
            this.getResults();
        }
    }

    openNewRecordModal(event){
        this.showModal = true;
    }

    closeModal(){
        this.showModal = false;
    }

    handleCreatedRecordSuccess(event) {
        console.log(event.detail.id);
    }

    get showCreateNewRecordLine(){
        if(!this.details) return undefined;
        return !this.details.showCreateNewRecordLine ? false : true;
    }

    get searchLabel(){
        if(!this.details) return undefined;
        return !this.details.searchLabel ? '' : this.details.searchLabel;
    }

    get iconName(){
        if(!this.details) return undefined;
        return !this.details.iconName ? '' : this.details.iconName;
    }

}