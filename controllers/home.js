const app = new Vue({
    el: '#app',
    data: {
        message: 'No Information Provided yet',
        showModal: false,
        date: '',
        fileDownload: '',
        address: '',
        download_file: '',
        email: 'No information Provided yet',
        wifi: 'No information Provided yet',
        firstname: 'No Information Provided Yet',
        lastname: 'No Information Provided Yet',
        surname: 'No Information Provide Yet',
        gender: 'No Information provided Yet',
        lastlogin: 'No Information Provided yet',
        number: '',
        natureWork: 'No Information Provided Yet',
        team: 'No Information Provided Yet',
        planExpire: 'No Information Provided Yet',
        plan: 'No Information Provided Yet',
        // customer of the month
        customerImage: '',
        customerUsername: '',
        customerGender: '',
        customerWorkNature: '',
        customerDateJoined: '',
        // movie Poll
        title: 'No Movie Title Yet',
        startDate: '',
        endDate: '',
        movies: [],
        // slides: [
        //     { image: 'https://blogdesuperheroes.es/wp-content/plugins/BdSGallery/BdSGaleria/4780.jpg', active: true, carousel: 'carousel-item'},
        //     { image: 'https://empirecinema.com.mt/wp-content/uploads/2019/07/AngelHasFallen_banner.jpg', active: false, carousel: 'carousel-item' }
        // ],

    },

    mounted() {
        // dashboard tour
        // let enjoyhint_instance = new EnjoyHint({});

        // enjoyhint_instance.set([
        //     {
        //         'click .settings': '<text style="font-family: cursive; color: yellow">Click to see how to change your settings</text>'
        //     },
        //     {
        //         'next .navigation': '<text style="font-family: cursive; color: yellow">Navigation bars to navigate through the pages.</text>',
        //     },
        // ]);
        // enjoyhint_instance.run();

        // auth users
        if (sessionStorage.getItem("accessToken") === null) {
            sessionStorage.removeItem('accessToken');
            window.location.href = 'login.html';
        } else {
            // endpoint for dashboard
            axios.get(Base_URL + dashboard, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            })
            .then(response => {
                // return profile to dashboard
                console.log(response)
                profile = response.data.profile;
                this.showModal = profile.plan == null ? true : false;
                this.date = moment(profile.date_joined).format('MMMM D, YYYY');
                toast(toastr.success(`Welcome ${profile.username}!`));
                this.message = profile.username;
                this.fileDownload = profile.agreement_link
                this.address = profile.address;
                this.email = profile.email;
                this.wifi = profile.wifi_password;
                this.firstname = profile.first_name;
                this.lastname = profile.last_name;
                this.gender = profile.gender;
                this.lastlogin = moment(profile.last_login).format('MMMM D, YYYY');
                this.number = profile.phone;
                this.natureWork = profile.work_nature;
                this.team = profile.team;
                this.planExpire = profile.plan_expiry;
                this.plan = profile.plan;
                // return movie poll to dashboard
                movie = response.data.movie[0];
                this.title = movie.tag_name;
                this.startDate = moment(movie.vote_start).format('MMMM D, YYYY');
                this.endDate = moment(movie.vote_end).format('MMMM D, YYYY');
                movieschoice = movie.choices;
                this.movies = movieschoice;
                // for (let i = 0; i < movies.length; i++) {
                //     const element = movies[i];
                //     this.moviesName = element.movie_name;

                //     console.log(this.moviesName)
                // }
                // movieName = movie.choices[0];
                // movieDes = movie.choices[1];
                // this.moviesName = movieName.movie_name;
                // this.moviesDes = movieDes.description;
            })
            .catch(error => {
                toast(toastr.error(error));
                toast(toastr.error(error.response.data.detail));
                if (error.response.status == 401 || 403) {
                    sessionStorage.removeItem('accessToken');
                    window.location.href = 'login.html';
                }
            })
            // endpoint for customer of the month
            axios.get(Base_URL + customer_URL, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            })
            .then(response => {
                customerInfo = response.data.member
                this.customerImage = customerInfo.image,
                    this.customerGender = customerInfo.gender,
                    this.customerWorkNature = customerInfo.work_nature,
                    this.customerUsername = customerInfo.username,
                    this.customerDateJoined = moment(customerInfo.date_joined).format('MMMM D, YYYY');
            })
            .catch(error => {
                toast(toastr.error(error.response.data.detail));
            })

            // axios.get(Base_URL + moviePoll, {
            //     headers: {
            //         'Content-Type': 'application/json',
            //         'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
            //     }
            // })
            // .then(response => {
            //     data = response.data,
            //     console.log(data)
            // })
        }

    },

    methods: {
        downloadFile() {
            if (this.fileDownload == null) {
                toast(toastr.warning('Nothing to download'));
            } else {
                const fileLink = document.createElement('a');
                fileLink.href = this.fileDownload;
                fileLink.setAttribute('download', 'agreement.pdf');
                document.body.appendChild(fileLink);
                fileLink.click();
                toast(toastr.success('Successfully downloaded'));
            }
        }
    },

})