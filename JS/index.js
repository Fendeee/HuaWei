window.addEventListener('load', function() {
    var banner_ul = document.querySelector('.banner_img');
    var banner = document.querySelector('.banner');
    var banner_width = banner.offsetWidth;                                          /* 轮播图 */
    
    var banner_img_icon = document.querySelector('.banner_img_icon');               /* 创建 banner轮播图 小圆点 */
    var lengthNum = banner_ul.children.length;                                      /* li length */
    for (i=0;i < lengthNum; i++) {
        var li = document.createElement('li');
        li.setAttribute('data-index', i);
        banner_img_icon.appendChild(li);
    }

    banner_img_icon.children[0].className = 'beColor';
    var banner_img_icon_lis = banner_img_icon.children;                             /* 事件改变 this 属性 */
    for (var i=0; i<banner_img_icon_lis.length; i++) {                              /* 排他思想 改变样式 */
        banner_img_icon_lis[i].addEventListener('click', function() {
            for (var i=0; i<banner_img_icon_lis.length; i++) {
                banner_img_icon_lis[i].className = '';
            }
            this.className = 'beColor';

            var index = this.getAttribute('data-index');
            num = index;                                                            /* 将当前索引号赋值给全局变量 num */
            circle = index;                                                         /* 将当前索引号赋值给全局变量 circle */
            animation(banner_ul, -index * banner_width);
        });
    }

    var cloneFirst = banner_ul.children[0].cloneNode(true);                         /* 克隆第一张图片li 并插入到 ul的最后一个位置 */
    banner_ul.appendChild(cloneFirst);
    var num = 0, circle = 0;
    var flag = true;                                                                /* 节流阀 */
    var L_icon = banner.querySelector('.L_icon');
    var R_icon = banner.querySelector('.R_icon');
    R_icon.addEventListener('click', function() {                                   /* R 绑定切图事件 */
        if (flag) {
            flag = false;                                                           /* 关闭节流阀 */
            if (num == banner_ul.children.length - 1) {
                banner_ul.style.left = '0px'
                num = 0;
            }
            num++;
            animation(banner_ul, -num * banner_width, function() {
                flag = true;                                                        /* 开启节流阀 */
            });
            circle++;
            if (circle == banner_ul.children.length - 1) {
                circle = 0;
            }
            LR_icon();
        }
    })
    L_icon.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = banner_ul.children.length - 1;
                banner_ul.style.left = -num * banner_width + 'px';
            }
            num--;
            animation(banner_ul, -num * banner_width, function() {
                flag = true;                                                        /* 开启节流阀 */
            });
            circle--;
            circle = circle < 0 ? banner_img_icon_lis.length - 1 : circle;
            LR_icon();
        }
    })


                                                                    // 左右箭头此功能一样，封装函数方便调用
    function LR_icon() {
        // 小圆圈跟着变化
        for (var i=0; i<banner_img_icon_lis.length; i++) {                                           /* 排他思想 改变样式 */
        banner_img_icon_lis[i].className = '';
        }
        banner_img_icon_lis[circle].className = 'beColor';
    }
                                                                    // 定时器
    var timer = setInterval(function() {
        R_icon.click();
    }, 3000);
    banner.addEventListener('mouseover', function() {
        clearInterval(timer);
        timer = null;
    });
    banner.addEventListener('mouseout', function() {
        timer = setInterval(function() {
            R_icon.click();
        }, 3000);
    });

    var head_box = document.querySelector('.head_box');
                                                                    // head_nav_text icon 事件变化
    var head_nav_text = head_box.querySelectorAll('.head_nav_text');
    var head_nav_icon = head_box.querySelectorAll('.head_nav_icon');
    var shop_car = head_box.querySelector('.shop_car');
    for(var i=0; i<head_nav_text.length; i++) {
        head_nav_text[i].addEventListener('mouseover', function() {
            for (var i=0; i<head_nav_text.length; i++) {
                head_nav_text[i].style.color = '#b3b3b3';
            }
            this.style.color = '#fff';
        });
        head_nav_text[i].addEventListener('mouseout', function() {
            this.style.color = '#b3b3b3';
        });
    }
    for (var i=0; i<head_nav_icon.length; i++) {                /* icon */
        head_nav_icon[i].addEventListener('mouseover', function() {
            for (var i=0; i<head_nav_icon.length; i++) {
                head_nav_icon[i].style.backgroundColor = 'transparent';
                head_nav_icon[i].children[0].style.color = '#b3b3b3';
                shop_car.style.backgroundColor = '#424242';
            }
            this.style.backgroundColor = '#fff';
            this.children[0].style.color = '#CF0A2C';
        });
        head_nav_icon[i].addEventListener('mouseout', function() {
            this.style.backgroundColor = 'transparent';
            this.children[0].style.color = '#b3b3b3';
            shop_car.style.backgroundColor = '#424242';
        });
    }

    var more_brilliant = head_box.querySelectorAll('.more_brilliant');     /* 黑色导航栏 隐藏动画 */
    for (var i=0; i<more_brilliant.length; i++) {
        more_brilliant[i].addEventListener('mouseover', function() {
            this.children[1].style.display = 'block';
        });
        more_brilliant[i].addEventListener('mouseout', function() {
            this.children[1].style.display = 'none';
        });
    }

                                                                    // 粘性 logo板块 动画
    var logo_box = document.querySelector('.logo_box');
    var logo_nav = document.querySelector('.logo_nav');
    document.addEventListener('scroll', function() {
        if (window.pageYOffset >= head_box.clientHeight) {
            logo_nav.style.position = 'fixed';
            logo_nav.style.top = '0px';
        } else if (window.pageYOffset < logo_box.offsetTop) {
            logo_nav.style.position = '';
        }
    });
                                                                    // 点击隐藏 广告
    var Head_advertising = document.querySelector('.Head_advertising');
    var Head_advertising_i = Head_advertising.querySelector('i');
    setTimeout(function() {
        Head_advertising_i.style.display = 'block';
        Head_advertising_i.addEventListener('click', function() {
            this.parentNode.style.display = 'none';
        });
    }, 5000);

                                                                    // search 按钮事件
    var search = document.querySelector('.search');
    var search_box = document.querySelector('.search_box');
    var del_search = search_box.querySelector('.right');
    search.addEventListener('click', function() {
        this.parentNode.style.display = 'none';
        search_box.style.display = 'block';
        del_search.parentNode.style.display = 'block';
    });
    del_search.addEventListener('click', function() {
        search_box.style.display = 'none';
        search.parentNode.style.display = 'block';
    });

                                                                    // hotWord_nav fixed_none 滚动事件  隐藏/显示节点
    var create_text = document.querySelector('.create_text');
    var hotWord_nav = document.querySelector('.hotWord_nav');
    var fixed_none_li = document.querySelector('.fixed_none_li');
    document.addEventListener('scroll', function() {
        if (window.pageYOffset >= hotWord_nav.offsetTop - (head_box.clientHeight / 2)) {
            create_text.children[0].style.display = 'block';
            fixed_none_li.style.display = 'block';
        } else {
            create_text.children[0].style.display = 'none';
            fixed_none_li.style.display = 'none';
        }
    });
    fixed_none_li.addEventListener('click', function() {
        goBackUp(window, 0);
    });

                                                                    // 秒杀倒计时     2个计时器
    var hour = document.querySelector('.hour'),
    minute = document.querySelector('.minute'),
    second = document.querySelector('.second'),
    hour_2 = document.querySelector('.hour_2'),
    minute_2 = document.querySelector('.minute_2'),
    second_2 = document.querySelector('.second_2');
    var inputTime = +new Date('2023-07-23 20:10:00');       /* 用户输入时间的总毫秒数 */
    countdown(hour, minute, second);                        /* 定时器 1 */
    countdown(hour_2, minute_2, second_2);                  /* 定时器 2 */
    contDownTimer = setInterval(function () {
        countdown(hour, minute, second);                    /* 定时器 1 */
        countdown(hour_2, minute_2, second_2);              /* 定时器 2 */
    }, 1000);
    function countdown(hour, minute, second) {
        var nowTime = +new Date();                          /* 返回当前时间的总毫秒数 */
        var times = (inputTime - nowTime) / 1000;           /* times 是剩余时间的总毫秒数 */
        var d = parseInt(times / 60 / 60 /24);              /* 计算天数 */
        d = d < 10 ? '0' + d : d;
        var h = parseInt(times / 60 / 60 % 24);             /* 小时 */
        h = h < 10 ? '0' + h : h;
        hour.innerHTML = h;                                 /* 文本填充 */
        var m = parseInt(times / 60 % 60);                  /* 分钟 */
        m = m < 10 ? '0' + m : m;
        minute.innerHTML = m;                               /* 文本填充 */
        var s = parseInt(times % 60);                       /* 秒钟 */
        s = s < 10 ? '0' + s : s;
        second.innerHTML = s;                               /* 文本填充 */
    }


});