const app = new Vue({
    el: '#app',
    data: { 
        is_superuser: JSON.parse(sessionStorage.getItem("is_superuser")),
        planName: '',
        planPrice: '',
        duration: 'daily',
        loading: false,
        options: [
            { text: 'daily', value: 'daily' },
            { text: 'weekly', value: 'weekly' },
            { text: 'monthly', value: 'monthly' }
          ],
          plans: []
    },

    mounted() {
        axios.get(Base_URL + plan_URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        })
        .then(response => {
            this.plans = response.data.plans
        })
        .catch(error => {
            toast(toastr.error(error.response.data));
        })
    },

    methods: {
        createPlan() {
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
                this.loading = false,
                this.planName = '',
                this.planPrice = '',
                this.duration = '',
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