import { LightningElement, api, wire  } from 'lwc';
import { CurrentPageReference } from "lightning/navigation";
import { pubsub } from "c/globalService";

export default class ModalPopupLwc extends LightningElement {
    
    @api header;

    isShowModal = true;

    @wire(CurrentPageReference)
    pageRef;
    
    connectedCallback() {
        pubsub.registerListener("closeModalEvent", this.hideModalBox, this);
    }

    showModalBox() {  
        this.isShowModal = true;
    }

    hideModalBox() {  
        this.isShowModal = false;
        const selectEvent = new CustomEvent('clickclosemodal', {});
        this.dispatchEvent(selectEvent);
    }

}