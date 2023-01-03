import { LightningElement, track, api } from 'lwc';
import desktop from './desktop.html';
import mobile from './mobile.html';
import { isMobile } from 'c/prtl_Utils';

export default class Prtl_MyDetailsItem extends LightningElement {

    isExpanded = false;

    @api iconsDetailsObj;
    @api detailContentDesktopObj;
    @api detailContentMobileObj;
    @api detailClassesDesktopObj;

    render() {
        return isMobile() ? mobile : desktop;
    }

    @api handleClickComp(){
        if(!this.isExpanded){
          this.expand();  
        }
        else{
           this.reduce(); 
        }
    }

    expand(){
        this.isExpanded = true;
        this.dispatchEvent(new CustomEvent('expand'));
    }

    reduce(){
        this.isExpanded = false;
        this.dispatchEvent(new CustomEvent('reduce'));
    }

    get col1(){
        if(!this.detailClassesDesktopObj) return undefined;
        return !this.detailClassesDesktopObj.col1 ? '' : this.detailClassesDesktopObj.col1; 
    }

    get col2(){
        if(!this.detailClassesDesktopObj) return undefined;
        return !this.detailClassesDesktopObj.col2 ? '' : this.detailClassesDesktopObj.col2; 
    }

    get col3(){
        if(!this.detailClassesDesktopObj) return undefined;
        return !this.detailClassesDesktopObj.col3 ? '' : this.detailClassesDesktopObj.col3; 
    }

    get col4(){
        if(!this.detailClassesDesktopObj) return undefined;
        return !this.detailClassesDesktopObj.col4 ? '' : this.detailClassesDesktopObj.col4; 
    }

    get col5(){
        if(!this.detailClassesDesktopObj) return undefined;
        return !this.detailClassesDesktopObj.col5 ? '' : this.detailClassesDesktopObj.col5; 
    }

    get col6(){
        if(!this.detailClassesDesktopObj) return undefined;
        return !this.detailClassesDesktopObj.col6 ? '' : this.detailClassesDesktopObj.col6; 
    }
}