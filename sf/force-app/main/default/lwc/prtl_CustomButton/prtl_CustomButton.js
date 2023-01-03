import { LightningElement, api, track } from 'lwc';

export default class Prtl_CustomButton extends LightningElement {

    @api detailsObj;
    @api disabled;

    connectedCallback(){
        var css = this.template.host.style;
        if(this.detailsObj && this.detailsObj.btnWidth){
            css.setProperty('--btnWidth',  this.detailsObj.btnWidth);
        }
    }

    renderedCallback(){
        this.setCursor(this.disabled);
    }
    
    clickBtn(event){
        console.log('clickBtn',  this.detailsObj);
        event.stopPropagation();
        this.dispatchEvent( new CustomEvent('click', {detail: this.detailsObj}));
    }

    @api 
    isDisable(event){
        this.setCursor(event.detail.isDisable);
    }

    setCursor(isDisable){
        let button = this.template.querySelector('button');
        if(isDisable){
            button.classList.add('disabled');
        }
        else{
            button.classList.remove('disabled');
        }
    }


    get iconBtnWrapperCls(){
        return !this.detailsObj || !this.detailsObj.iconBtnWrapperCls ? "iconBtnWrapper-ten-percent" : this.detailsObj.iconBtnWrapperCls;
    }

    get btnClass(){
        return !this.detailsObj ? undefined : this.detailsObj.btnClass;
    }

    get firstSvgURL(){
        return !this.detailsObj ? undefined : this.detailsObj.firstSvgURL;
    }

    get secondSvgURL(){
        return !this.detailsObj ? undefined : this.detailsObj.secondSvgURL;
    }


}