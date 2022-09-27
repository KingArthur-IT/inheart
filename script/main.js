document.addEventListener('DOMContentLoaded', () => {

    const inputElement = document.querySelectorAll('input[data-type="date"] ').forEach((element) => {
        IMask(
            element,
            {
              mask: Date,
              min: new Date(1990, 0, 1),
              max: new Date(2050, 0, 1),
              lazy: false
            });
    }) 
})