;
Dropzone.autoDiscover = false

var uploadZone = document.getElementsByClassName('upload-zone')[0];
var orderStorage = new OrderStorage(localStorage);

orderStorage.reset();

var resetButton = document.getElementById('order-ctrl--reset');

resetButton.addEventListener("click", function() {
    orderStorage.reset();
    location.reload();
}, false);


var myDropzone = new Dropzone(
    "form.upload-zone",
    {
        init: function() {
            this.on('success', function(file, data) {
                console.log(data);
                orderStorage.addItem(data.key);
            })
        },
        url: uploadZone.getAttribute("data-upload-url"),
        paramName: 'uploaded_media'
    }
);

var confirmationForm = document.getElementById('order-ctrl--confirm');

var orderHandler = new OrderHandler(
    orderStorage,
    new OrderService(confirmationForm.getAttribute('action'), axios)
);

