$(function () {
    //设置rem的单位大小
    document.querySelector('html').style.fontSize = screen.width / 10 + 'px';
    if (screen.width > 600) {

    }

    $('.back').click(function () {
        history.back();
    });

    $('.fixed, .top').click(function () {
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 500);
        return false;
    });
});