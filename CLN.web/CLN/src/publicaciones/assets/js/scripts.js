$(function() {
  const gallery = document.getElementById('gallery');
  if(gallery != null && gallery != undefined) {
    const cant = document.getElementById('gallery').getAttribute('cant_imgs');
    $('#gallery').pagify(cant, '.pagination__item');
  }
});