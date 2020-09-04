const app = new Vue({
    el: '#app',
    data: {
        users: [],
        title: "",
        body: "",
        singleTitle: '',
        singleBody: '',
        loading: false
    },

    mounted() {
        if (sessionStorage.getItem("accessToken") === null) {
            sessionStorage.removeItem('accessToken');
            window.location.href = 'login.html';
        } else {
            
            axios.get(Base_URL + announcement, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            })
            .then(response => {
                data = response.data.announcements
                this.users = data
            })
            .catch(error => {
                toast(toastr.error(error.response.data.detail));
                if (error.response.status == 401) {
                    sessionStorage.removeItem('accessToken');
                    window.location.href = 'login.html';
                }
            })
        }
    },

    methods: {
        createAnnouncement(e) {
            e.preventDefault();
            this.loading = true;
            if (!this.title || !this.body ) {
                toast(toastr.error('Please fill in the details Properly'));
                this.loading = false
                return false
            } else {
                users = {
                    "title": this.title,
                    "message": this.body,
                }

                axios.post(Base_URL + announcement,
                    users,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                        }
                    })
                    .then(response => {
                        data = response.data.data
                        this.users = data
                        toast(toastr.success('Announcement sent Successfully!'));
                    })
                    .catch(error => {
                        toast(toastr.error(error?.response?.request?.response));
                        this.loading = false;
                        if (error?.response?.status == 401) {
                            sessionStorage.removeItem('accessToken');
                            window.location.href = 'login.html';
                        }
                    })
            }
        },

        // updateAnn() {
        //     changeName = event.target.tagName;
        //     changeName.
        //     console.log(changeName)
        // }
    }

})