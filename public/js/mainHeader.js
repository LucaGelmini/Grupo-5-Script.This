document.addEventListener("DOMContentLoaded", function(){
    //dom is fully loaded, but maybe waiting on images & css files
    
    console.log('js cargadooooo')

    let searchButton = document.getElementById('headerSearchButton');
    let searchForm = document.getElementById('headerSearchForm');
    let burgerButton = document.querySelector('.burger-container');
    let navsContainer = document.querySelector('.navs-container');

    searchButton.addEventListener('click', function(){
        searchForm.submit();
    });

    searchForm.onkeydown = e => {
        e.key === "Enter" ? searchForm.submit : null;
    };

    burgerButton.onclick = ()=> {
        navsContainer.classList.toggle('navs-container-closed');
        navsContainer.classList.toggle('navs-container-open');
        
    }
    //Este comentario es para ver si se mergea bien esto
});