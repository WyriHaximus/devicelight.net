function DeviceLightNet() {
    var self = this;
    self.elements = {
        html: document.querySelector('html'),
        lux: document.querySelector('#lux'),
        luxValue: document.querySelector('#lux .value'),
        level: document.querySelector('#level'),
        levelValue: document.querySelector('#level .value')
    };
    self.status = {
        browserIsAble: false,
        lux: 0
    };
    self.determineLevel = function(lux) {
        /**
         * Following the recommendations from http://www.w3.org/TR/ambient-light/#event-handlers-1
         */
        switch (true) {
            default:
            case (lux < 50):
                return 'dim';
            case (lux > 50 && lux < 10000):
                return 'normal';
            case (lux > 10000):
                return 'bright';
        }
    };
    self.draw = function() {
        self.elements.html.classList.remove('dim');
        self.elements.html.classList.remove('normal');
        self.elements.html.classList.remove('bright');
        var lux = self.status.lux;
        var level = self.determineLevel(lux);
        self.elements.html.classList.add(level);
        self.elements.levelValue.textContent  = level;

        self.elements.luxValue.textContent = lux + ' lux';
    };
    self.onDeviceLight = function(event) {
        self.status.browserIsAble = true;
        self.status.lux = event.value;
        self.draw();
    };
    self.demo = function() {
        self.timer = setInterval(function() {
            var lux = window.DeviceLightNet.status.lux;
            switch (true) {
                default:
                case (lux < 50):
                    lux = lux + 5;
                    break;
                case (lux > 50 && lux < 10000):
                    lux = lux + 500;
                    break;
                case (lux > 10000 && lux < 20000):
                    lux = lux + 750;
                    break;
                case (lux > 10000):
                    lux = 1;
                    break;
            }
            window.DeviceLightNet.onDeviceLight({value: lux});
        }, 100);
    };

    window.addEventListener('devicelight', self.onDeviceLight);
}

window.DeviceLightNet = new DeviceLightNet();

window.DeviceLightNet.demo();