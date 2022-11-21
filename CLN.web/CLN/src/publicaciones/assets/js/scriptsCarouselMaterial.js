document.addEventListener('DOMContentLoaded',()=>{
    const elementosCarousel = document.querySelectorAll('.carousel');
    M.Carousel.init(elementosCarousel,{
        duration: 20,
        fullWidth: true,
        dist: -80,
        shift:5,
        padding:5,
        numvisible: 1,
        indicators: true,
        noWrap:false
    });
    window.setInterval(()=>{
        elementosCarousel.forEach(elementoCarousel=>{
            var l = M.Carousel.getInstance(elementoCarousel);
            l.next();
        })
    },4000)

})
