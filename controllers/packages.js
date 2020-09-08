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
          plans: [],
          code: '',
          use: '',
          amount: '',
          planId: 'Freelancer'

    },

    mounted() {
        axios.get(Base_URL + plan_URL, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
            }
        })
        .then(response => {
            this.plans = response.data.plans;
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
                $('#exampleModal').modal('hide');
                success = response.data;
                toast(toastr.success('Plan created Successful'));

            }).catch((error) => {
                errorData = error.response;
                toast(toastr.error(error));
                this.loading = false
            })
        },
        CreateVoucher () {
            this.loading = true
            axios.post(Base_URL + voucher_URL, {
                'code': this.code,
                'amount': this.amount,
                'no_of_use': this.use,
                'plan': this.planId
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
                }
            }).then(response => {
                this.loading = false;
                this.code = '',
                this.amount = '',
                this.use = '',
                this.plan = '',
                $('#exampleModal').modal('hide');
                success = response.data;
                console.log(success)
                toast(toastr.success('Voucher created Successful'));

            }).catch((error) => {
                errorData = error.response;
                toast(toastr.error(error));
                toast(toastr.error(errorData));
                
            })
        }
    }

})