// function to call alert
const toast = () => {
    $('.preloader').fadeOut(300, function () {
        toastr.options = {
            timeOut: 2000,
            progressBar: true,
            showMethod: "slideDown",
            hideMethod: "slideUp",
            showDuration: 200,
            hideDuration: 200
        };
    });
};

// // function for dashboard movie
// const movie = () => {

// }

// // function for dashboard payment history
// const payHistory = () => {

// }
