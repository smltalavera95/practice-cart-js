'use strict'

window.addEventListener('load', ()=>{
    window.addEventListener('scroll', headerSticky);
});

const headerSticky = ()=>{
  
    const headerContainer= document.getElementById('c-header');
    const bannerElement = document.querySelector('.c-banner');
    const headerHeight = headerContainer.offsetHeight;
    const headerHeightHalf = headerHeight/2;
    let posY = window.pageYOffset;
    if(posY >= headerHeight){
        headerContainer.classList.add('js-header-stuck');
        bannerElement.style.marginTop= `${headerHeight}px`;
    }else if(posY<=headerHeightHalf){
        headerContainer.classList.remove('js-header-stuck');
        bannerElement.style.marginTop=`0px`;
    }
}