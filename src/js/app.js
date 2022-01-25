console.log('listo');

document.addEventListener('DOMContentLoaded', () => scrollNav(), navegacionFija());

function navegacionFija(){

    const barra = document.querySelector('.header');

    //Registrar el intersection Observer
    const observer = new IntersectionObserver( entries =>{
        if(entries[0].isIntersecting){
            barra.classList.remove('fijo')
        }else{
            barra.classList.add('fijo')
        }


    })

    //Elemento a observar
    observer.observe(document.querySelector('.primer-contenido'));
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a')

    enlaces.forEach( (enlace) => {
        enlace.addEventListener('click', function(e){
            e.preventDefault();

            const seccion = document.querySelector(e.target.attributes.href.value);

            seccion.scrollIntoView({
                behavior: 'smooth',
            });
        });
    });
};