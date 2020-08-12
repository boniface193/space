const app = new Vue({
    el: '#app',
    data: {
        message: '',
        showModal: false,
        date: '',
        fileDownload: '',
        address: '',
        download_file: '',
    },

    mounted() {
        // dashboard tour
        let enjoyhint_instance = new EnjoyHint({});

        enjoyhint_instance.set([
            {
                'next .search': '<text style="font-family: cursive; color: yellow">Search for a drug you\'re familiar with here + </text>'
            },
            {
                'next .notification': '<text style="font-family: cursive; color: yellow">You will get notified by our Admin </text>'
            },
            {
                'click .settings': '<text style="font-family: cursive; color: yellow">Click to see how to change your settings</text>'
            },
            {
                'next .manageAcct': '<text style="font-family: cursive; color: yellow">Here is where you manage your Account Settings</text>'
            },
            {
                'next .navigation': '<text style="font-family: cursive; color: yellow">Navigation bars to navigate through the pages.</text>',
            },
        ]);
        enjoyhint_instance.run();

        // return false;
        if (sessionStorage.getItem("accessToken") === null) {
            sessionStorage.removeItem('accessToken');
            window.location.href = 'login.html';
        } else {
            axios.get(Base_URL + '/common/dashboard/', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            })
                .then(response => {
                    // movie = response.data.movie;
                    // paymentHistory = response.data.payment_history;
                    profile = response.data.profile;
                    console.log(profile)
                    this.showModal = profile.plan == null ? true : false;
                    this.date = moment(profile.date_joined).format('MMMM D, YYYY');
                    toast(toastr.success(`Welcome ${profile.username}!`));
                    this.message = profile.username;
                    this.fileDownload = profile.agreement_link
                    this.address = profile.address;
                })
                .catch(error => {
                    console.error(error)
                    if (error.response.status == 401) {
                        sessionStorage.removeItem('accessToken');
                        window.location.href = 'login.html';
                    }
                })
        }

    },

    methods: {
        downloadFile() {
            let blob = new Blob([profile.agreement_link], { "type": "pdf/plain" });
            let link = document.createElement('a')
            link.href = window.URL.createObjectURL(blob)
            link.download = profile.agreement_link
            link.click()
        }
    },

})