document.addEventListener("DOMContentLoaded", function(){
    //dom is fully loaded, but maybe waiting on images & css files
    
console.log('js cargadooooo')

    searchButton = document.getElementById('headerSearchButton');
    searchForm = document.getElementById('headerSearchForm');


    searchButton.addEventListener('click', function(){
        searchForm.submit();
    })

    searchForm.onkeydown = e => {
        e.keyCode == 13 ? searchForm.submit : null;
    }
    //Este comentario es para ver si se mergea bien esto
});