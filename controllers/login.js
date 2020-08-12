const app = new Vue({
    el: '#app',
    data: {
        username: '',
        password: '',
        // errors: '',
        loading: false,
    },

    methods: {
        loginUsers() {
            // this.errors = []
            this.loading = true;

            axios.post(Base_URL + '/users/token/obtain', {
                username: this.username,
                password: this.password,
            })
                .then(response => {
                    data = response.data;
                    sessionStorage.setItem('accessToken', data.access);
                    sessionStorage.setItem('refreshToken', data.refresh);
                    if (data.is_superuser) {
                        sessionStorage.setItem('is_superuser', JSON.stringify(data.is_superuser));
                        window.location.href = 'admin.html';
                    } else{
                        window.location.href = 'index.html';
                    }
                     
                })
                .catch((error) => {
                    errorData = error.response;
                    toast(toastr.error(error));
                    this.loading = false;
                    toast(toastr.error(errorData.data.detail));
                })
        },

    }
})
