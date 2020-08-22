Vue.component('component-footer', {
    computed: {
        year() {
            let d = new Date();
            let year = d.getFullYear();
            return year;
        }
    },
    template: `<footer class="content-footer">
                        <div>© {{year}} First Pavilion Technologies - <a href="http://firstpavitech.com" target="_blank">Pavilion Tech Space Hub</a></div>
                    </footer>`
}); 
