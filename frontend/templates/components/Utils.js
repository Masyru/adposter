
export function setHideBodyOverflow(bool) {
    if(bool){
        document.body.style = 'overflow-y: hidden !important';
        document.getElementsByTagName('html')[0].style = 'overflow-y: hidden !important';
    } else {
        document.body.style = 'overflow-y: auto !important';
        document.getElementsByTagName('html')[0].style = 'overflow-y: auto !important';
    }
}
