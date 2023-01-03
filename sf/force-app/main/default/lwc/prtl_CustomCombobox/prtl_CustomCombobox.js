import { LightningElement, api, track } from 'lwc';
import { labels } from 'c/prtl_Utils';
import NEW_PORTAL_ASSETS from '@salesforce/resourceUrl/newPortalAssets';

export default class Prtl_CustomCombobox extends LightningElement {

    labels = labels;

    @api comboBoxDetailsObj;
    @api showDropdown;
    @track actionSvgURL;

    connectedCallback(){
        var css = this.template.host.style;
        if(this.comboBoxDetailsObj){
            if(this.comboBoxDetailsObj.width){
                css.setProperty('--btnWidth',  this.comboBoxDetailsObj.width);
            }
            if(this.comboBoxDetailsObj.heightBtn){
                css.setProperty('--heightBtn',  this.comboBoxDetailsObj.heightBtn);
            }
            else{
                css.setProperty('--heightBtn',  "auto");
            }
            if(this.comboBoxDetailsObj.containerWidth){
                css.setProperty('--containerWidth',  this.comboBoxDetailsObj.containerWidth);
            }
            else{
                css.setProperty('--containerWidth',  this.comboBoxDetailsObj.width);
            }
            this.actionSvgURL = this.comboBoxDetailsObj.collapseSvgURL;
        }
    }

    get btnClass(){
        return !this.comboBoxDetailsObj ? undefined : this.comboBoxDetailsObj.btnClass;
    }
    get iconBtnWrapperCls(){
        return !this.comboBoxDetailsObj || !this.comboBoxDetailsObj.iconBtnWrapperCls ? "iconBtnWrapper-ten-percent" : this.comboBoxDetailsObj.iconBtnWrapperCls;
    }
    /*get width(){
        return !this.comboBoxDetailsObj ? undefined : this.comboBoxDetailsObj.width;
    }*/

    get btnLabel(){
        return !this.comboBoxDetailsObj ? undefined : this.comboBoxDetailsObj.btnLabel;
    }
    get firstSvgURL(){
        return !this.comboBoxDetailsObj ? undefined : this.comboBoxDetailsObj.firstSvgURL;
    }

    clickBtn(event){
        this.showDropdown = !this.showDropdown;
        this.actionSvgURL = this.showDropdown ? this.comboBoxDetailsObj.closeSvgURL : this.comboBoxDetailsObj.collapseSvgURL;
    }

    blurBtn(){
        console.log('blurBtn');
        this.showDropdown = false;
        this.actionSvgURL = this.comboBoxDetailsObj.collapseSvgURL;
    }

    onMouseDown(event){
        console.log('onMouseDown');
        console.log('combobox ' + event.currentTarget.dataset.action + ' ' +  event.currentTarget.dataset.recid + ' ' +  event.currentTarget.dataset.lineid);
        const selectedEvent = new CustomEvent('select', { detail: {action: event.currentTarget.dataset.action, id: event.currentTarget.dataset.recid, lineId: event.currentTarget.dataset.lineid} });
        this.dispatchEvent(selectedEvent);
    }
}