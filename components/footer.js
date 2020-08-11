Vue.component('component-footer', {
    computed: {
        year: function () {
            var d = new Date();
            var year = d.getFullYear();
            return year;
        }
    },
    template: `<footer class="content-footer">
                        <div>© {{year}} First Pavilion Technologies - <a href="http://firstpavitech.com" target="_blank">Laborasyon</a></div>
                        <div>
                            <nav class="nav">
                                <a href="agreement.html" class="nav-link">Licenses</a>
                                <a href="contact.html" class="nav-link">Change Log</a>
                                <a href="contact.html" class="nav-link">Get Help</a>
                            </nav>
                        </div>
                    </footer>`
}); 
