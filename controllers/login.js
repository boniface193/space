const app = new Vue({
    el: '#app',
    data: {
        username: '',
        password: '',
        loading: false,
        errors: [],
    },

    methods: {
        loginUsers() {
            this.loading = true;
            axios.post(Base_URL + loginToken, {
                username: this.username,
                password: this.password,
            })
                .then(response => {
                    data = response.data;
                    sessionStorage.setItem('accessToken', data.access);
                    sessionStorage.setItem('refreshToken', data.refresh);
                   if (data.is_superuser === true || !data.is_superuser) {
                       sessionStorage.setItem('is_superuser', JSON.stringify(data.is_superuser));
                       window.location.href = 'index.html';
                   }else{
                       this.errors.push('You do not have access to login');
                   }
                    this.loading = false;
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
