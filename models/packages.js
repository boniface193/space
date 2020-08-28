const app = new Vue({
    el: '#app',
    data: { 
        is_superuser: JSON.parse(sessionStorage.getItem("is_superuser")),
        planName: '',
        planPrice: '',
        duration: 'Daily',
        loading: false,
        options: [
            { text: 'Daily', value: 'Daily' },
            { text: 'Weekly', value: 'Weekly' },
            { text: 'Monthly', value: 'Monthly' }
          ]
    },

    mounted() {
        axios.get(Base_URL + plan_URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        })
        .then(response => {
            console.log(response.data)
        })
        .catch(error => {
            toast(toastr.error(error.response.data.detail));
           
        })
    },

    methods: {
        createPlan() {
            // formData = {
            //     'name': this.planName,
            //     'price': this.planPrice.map(x => parseInt(x, 10)),
            //     'duration': this.duration
            // }
            // console.log(typeof(formData.price), formData)
            this.loading = true
            axios.post(Base_URL + plan_URL, {
                'name': this.planName,
                'price': this.planPrice,
                'duration': this.duration

            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            }).then(response => {
                this.loading = false
                success = response.data;
                toast(toastr.success('Plan created Successful'));

            }).catch((error) => {
                errorData = error.response;
                toast(toastr.error(error));
                this.loading = false
            })
        }
    }

})