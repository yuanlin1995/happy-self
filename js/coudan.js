$(function () {
    //渲染导航
    $.ajax({
        url: 'http://mmb.ittun.com/api/getgsshop',
        dataType: 'json',
        type: 'get',
        success: function (res) {
            var html = template('showTpl', {
                list: res.result
            });
            $('.topBar .shopList').html(html);
        }
    });


    $.ajax({
        url: 'http://mmb.ittun.com/api/getgsshoparea',
        dataType: 'json',
        type: 'get',
        success: function (res) {
            var html = template('areaTpl', {
                list: res.result
            });
            $('.topBar .areaList').html(html);
        }
    });

    //先隐藏所有的列表盒子(注意这个思想)
    $('.topBar .shop').click(function () {
        $('.list ul').hide();
        $(this).find('i').toggleClass('fa-caret-up');
        $(this).find('i').toggleClass('fa-caret-down');
        $(this).siblings('span').find('i').removeClass('fa-caret-down').addClass('fa-caret-up');
        if ($(this).find('i').hasClass('fa-caret-down')) {
            $('.topBar .shopList').show();
        }
    });

    $('.topBar .area').click(function () {
        $('.list ul').hide();
        $(this).find('i').toggleClass('fa-caret-up');
        $(this).find('i').toggleClass('fa-caret-down');
        $(this).siblings('span').find('i').removeClass('fa-caret-down').addClass('fa-caret-up');
        if ($(this).find('i').hasClass('fa-caret-down')) {
            $('.topBar .areaList').show();
        }
    });

    //点击列表隐藏,渲染数据
    $('.topBar .list').on('click', 'li', function () {
        $('.list ul').hide();
        $('.nav i').removeClass('fa-caret-down').addClass('fa-caret-up');
    });


    function render(sid, aid) {
        $.ajax({
            url: 'http://mmb.ittun.com/api/getgsproduct',
            data: {
                shopid: sid,
                areaid: aid
            },
            dataType: 'json',
            success: function (res) {
                console.log(res);
                var html = template('productTpl', {
                    list: res.result
                });
                $('.product ul').html(html);
            }
        });
    }

    //设置变量存储id值
    var shopId = 0,
        areaId = 0;
    render(shopId, areaId);

    $('.shopList').on('click', 'li', function () {
        //点击完好切换id值
        shopId = $(this).data('shopid');
        render(shopId, areaId);
        $('.nav .shop em').html($(this).text());
        //切换对勾
        $(this).find('.check').html('<i class="fa fa-check"></i>').end().siblings('li').find('i').remove();
    });

    $('.areaList').on('click', 'li', function () {
        areaId = $(this).data('areaid');
        render(shopId, areaId);
        var str = $(this).html();
        var index = str.indexOf('（');
        $('.nav .area em').html(str.substring(0, index));
        $(this).find('.check').html('<i class="fa fa-check"></i>').end().siblings('li').find('i').remove();
    });
});