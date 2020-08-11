let app = new Vue({
    el: '#app',
    data: {
        message: ''
    },

    mounted: function () {
        if (localStorage.getItem("accessToken") === null ) {
            localStorage.removeItem('accessToken');
            window.location.href = 'login.html';
        } else {
            axios.get(Base_URL + '/common/dashboard/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
                }
            })
            .then(response => {
                movie = response.data.movie;
                paymentHistory = response.data.payment_history;
                profile = response.data.profile;
                console.log(profile)
                toast(toastr.success(`Welcome ${profile.username}!`)); 
                this.message = profile.username
            })
        }
             
    }
})