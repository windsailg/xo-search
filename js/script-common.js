
$(document).ready(function() {

    //word ellipsis
    $('.content').find('.article').addClass('ellipsis');
    $('.ellipsis').text().replace('/&nbsp;/g', '');
    //lazyLoad

    $('#product-tab').children('li').click(function(){
       var tabthis = $(this);
       
       startLazy();
    });
    
    startLazy();
    function startLazy(){
        setTimeout(() => {
            $(".lazy").Lazy({
                // your configuration goes here
                scrollDirection: 'vertical',
                effect: 'fadeIn',
                effectTime:200, //duration
                throttle:800,//delay
                visibleOnly: true,
                onError: function(element) {
                    console.log('lazy error loading' + element.data('src'));
                },
                beforeLoad: function(element) {
                    var img = new Image();
                    img.src = element.data('src');
    
                    // Create virtual img to set imgs src src
                    console.log(element);
                    
                    //get width and height
                    var img_RW = img.width;
                    var img_RH = img.height;
                    
                    //set every attribute
                    element.parent('.focuspoint').attr({
                        'data-focus-x':"0.00",
                        'data-focus-y':"0.00",
                        'data-image-w':img_RW,
                        'data-image-h':img_RH,
                    });
                },
                afterLoad(element){
                    element.parent('.focuspoint').focusPoint();
                    },
                onFinishedAll(){
                    console.log('Lazy Complete');
                },
             });     
        }, 200);

    };



    // $('.focuspoint').each(function() {
    //     var thisimg = new Image();
    //     // Create virtual img to set imgs src src
    //     var imgs = $(this).find('img');
    //     thisimg.src = imgs.attr('src');
    //     console.log('fpdata')
    //     var is = thisimg.src;
    //     //get width and height
    //     var img_RW = thisimg.width;
    //     var img_RH = thisimg.height;

    //     //set every attribute
    //     $(this).attr({
    //         'data-focus-x':"0.00",
    //         'data-focus-y':"0.00",
    //         'data-image-w':img_RW,
    //         'data-image-h':img_RH,
    //     });
    //     $(imgs).attr({
    //         'data-src':thisimg.src,
    //         'class':'lazy',
    //     });
    // });

    
});