$(document).ready(function () {

    $("#imageUpload").change(function (data) {

        let imageFile = data.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(imageFile);

        reader.onload = function (evt) {
            $('#imagePreview').attr('src', evt.target.result);
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        }

    });



});
