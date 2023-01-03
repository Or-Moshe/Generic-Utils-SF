/*
    Author  :   Or Moshe
    Since   :   15/12/22
*/
import { api, LightningElement } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class DataTableLwc extends NavigationMixin(LightningElement){

    @api tableDetails;


    openModal(event){
        const accId = event.currentTarget.dataset.accId;
        const month = event.currentTarget.dataset.month;
        const rows = JSON.parse(JSON.stringify( this.tableDetails.rows));
        const foundRow = rows.find((rowItem) => rowItem.accId === accId);
        const modalDataName = month + "ModalData";
        console.log('accId', accId);
        console.log('modalDataName', modalDataName);
        console.log('foundRow', foundRow);
        console.log('modalData', foundRow[modalDataName]);
        this.dispatchEvent(new CustomEvent('openmodal', { detail: foundRow[modalDataName] }));
    }

    redirect(event){
        const accId = event.currentTarget.dataset.accId;
        this.navigateToRecordPage(accId, 'Account', 'view');
    }

    navigateToRecordPage(recordId, objectName, action) {
        this[NavigationMixin.GenerateUrl]({
            type: 'standard__recordPage',
            attributes: {
                recordId: recordId,
                actionName: action,
            },
        }).then((url) => {
            window.open(url, "_blank"); 
        });
    }


    get gridColumns(){
        return !this.tableDetails || !this.tableDetails.columns ? undefined : this.tableDetails.columns;
    }

    get gridData(){
        return !this.tableDetails || !this.tableDetails.rows ? undefined : this.tableDetails.rows;
    }
    get showMonthlyTable(){
        return !this.tableDetails || !this.tableDetails.showMonthlyTable ? false : this.tableDetails.showMonthlyTable;
    }
    get accNameColLabel(){
        return !this.tableDetails || !this.tableDetails.accNameColLabel ? undefined : this.tableDetails.accNameColLabel;
    }
}