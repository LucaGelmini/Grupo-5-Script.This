document.addEventListener("DOMContentLoaded", function(){
    const imageInput = document.querySelector('#userfile');
    const imagePreview = document.querySelector('#preview-usr-image');
    
    imageInput.onchange = ()=>{
        console.log('BUENAS')
        
        let oFReader = new FileReader();
        oFReader.readAsDataURL(imageInput.files[0]);
    
        oFReader.onload = (oFREvent) =>{
            imagePreview.src = oFREvent.target.result;
        }
    }
});