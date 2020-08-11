// const frmSubmit = document.getElementById('frmSubmit');

// frmSubmit.addEventListener('submit', login);

// function login() {
//     if (status == 200) {
        
//     toast(toastr.success('Welcome home!'));
//     } else{
//         toast(toastr.error('too bad!'));
//     }
// }

function toast() {
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
