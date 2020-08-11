var app = new Vue({
    el: '#app',
    data: {
        message: 'Hello Vue!',
        username: '',
        password: '',
        // errors: '',
        loading: false,
    },

    methods: {
        loginUsers: function () {
            // this.errors = []
            this.loading = true;

            axios.post(Base_URL + '/users/token/obtain', {
                username: this.username,
                password: this.password,
            })
                .then(response => {
                    data = response.data;
                    console.log(data) //remove console
                    localStorage.setItem('accessToken', data.access);
                    localStorage.setItem('refreshToken', data.refresh);
                    if (data.is_superuser) {
                        localStorage.setItem('is_superuser', JSON.stringify(data.is_superuser));
                        window.location.href = 'admin.html';
                    } else{
                        window.location.href = 'index.html';
                    }
                     
                })
                .catch((error) => {
                    console.log(error)
                    errorData = error.response;
                    toast(toastr.error(errorData.data.detail));
                    // this.errors.push(errorData.data.detail);
                    this.loading = false;
                })
        },

    }
})


// if (response.error) {
//     this.errors.push('please provide password and username')
// }

// if (this.data === false) {
                //     this.errors.push('please provide password and username')
                // } else {

                // }