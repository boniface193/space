const app = new Vue({
    el: '#app',
    data: {
        singleTitle: '',
        singleBody: '',
    },

    mounted() {
    // single announcement fetching with ID
    let url_string = window.location.href;
    let url = new URL(url_string);
    let id = url.searchParams.get("id");

    axios.get(Base_URL + announcementID + id, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
        }
    })
        .then(response => {
            data = response.data
            this.singleTitle = data.title
            this.singleBody = data.message
        })
        .catch(error => {
            toast(toastr.error(error));
            if (error.response.status == 401 || 403) {
                sessionStorage.removeItem('accessToken');
                window.location.href = 'login.html';
            }
        })
    }
})