document.addEventListener("DOMContentLoaded", function () {
    initProductsEvents();
    initAffix();
    initDraggable();
});

function initProductsEvents() {
    $('.product_home').click(function () {
        var img = $(this).find('img');
        var src = img.attr('src');
        var body = $('body');
        var container = $('<div class="full-screen"></div>');
        var imgElement = $('<img src="' + src + '">');
        container.append(imgElement);
        container.hide().appendTo(body).fadeIn('normal');

        body.addClass('modal-open');
        $('.full-screen').click(closeModal);
    });

    $(document).keyup(function (e) {
        // On escape click
        if (e.keyCode == 27) {
            closeModal();
        }
    });
}

function closeModal() {
    $('.full-screen').fadeOut('normal', function () {
        $(this).remove();
    });
    $('body').removeClass('modal-open');
}

function initAffix() {
    $('.background').affix({ offset: { bottom: getBottomOffset() } });
    // 49 is card container top padding
    $('.cart-container').affix({ offset: { bottom: getBottomOffset() + 49 } });
}

function initDraggable() {
    $('.cart-container .item').on('dragend', function (event) {
        var target = $(this)
        var elementWidth = target.outerWidth();
        var movedHorizontally = event.offsetX;
        if (movedHorizontally > elementWidth) {
            event.preventDefault();
            $(this).remove();
            // You can add handling callback here (To call API e.g.)
        }
    });
}

function getBottomOffset() {
    var footerHeight = $('.footer').outerHeight();
    var lineHeight = $('.line').outerHeight();
    var donorsHeight = $('.donors').outerHeight();
    return footerHeight + lineHeight + donorsHeight;
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    var selector = '#' + data;
    var el = $(selector);
    var imgSrc = el.find('img').attr('src');
    var productName = el.find('.product-name').text();
    var productPrice = el.find('.product-price').text();
    var html = '<div class="item" draggable="true">' +
                  '<img src="' + imgSrc + '" alt="">' +
                  '<span>' + productName + '</span>' +
                  '<span>' + productPrice + '</span>' +
                '</div>';
    var newEl = $(html);
    $('.cart').append(newEl);
    initDraggable();
}