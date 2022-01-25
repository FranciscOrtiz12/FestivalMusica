document.addEventListener('DOMContentLoaded', function(){
    creargaleria();

});

function creargaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    
    for( let i = 1; i <= 12; i++){
        const imagen = document.createElement('IMG');
        imagen.src = `build/img/thumb/${i}.webp`;
        imagen.dataset.imagenId = i;

        //Añádir la funcion de mostrarImagen
        imagen.onclick = mostrarImagen;

        const lista = document.createElement('LI');
        lista.appendChild(imagen);

        galeria.appendChild(lista);
    }
}

function mostrarImagen(e){
    const id = parseInt(e.target.dataset.imagenId ); //.target es, a que elemento le dimos click
    
    const imagen = document.createElement('IMG');
    imagen.src = `build/img/grande/${id}.webp`;

    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');

    //Boton para cerrar la imagen
    const cerrarImagen = document.createElement('P')
    cerrarImagen.textContent = 'X';
    cerrarImagen.classList.add('btn-cerrar');

    overlay.appendChild(cerrarImagen);

    //Cuando se da click en cualquier lado se cierra la iamgen
    overlay.onclick = () => overlay.remove();

    //Cuando se presiona se cierra la imagen
    cerrarImagen.onclick = () => overlay.remove();

    //Mostrar en el HTML
    
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList
};