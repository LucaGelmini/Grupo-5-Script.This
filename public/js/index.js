console.log('Cargó JS')
function PreviewImage() {
    var oFReader = new FileReader();
    oFReader.readAsDataURL(document.getElementById("img-crear").files[0]);

    oFReader.onload = (oFREvent) =>{
        document.getElementById("preview-user").src = oFREvent.target.result;
    };
};
