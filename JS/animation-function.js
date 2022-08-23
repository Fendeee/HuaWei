
//        X轴方向的动画函数     常用 《轮播图》

// 简单 动画函数封装        对象    值    回调函数
function animation(obj, target, callback) {                                         /* obj 目标对象，target 目标位置 */
// 清除上一个执行的定时器，这样我们的元素就只有一个定时器，添加事件的时候就不会多次触发
    clearInterval(obj.timer);
// 不同的元素 指定不同的 定时器对象属性 obj.timer
    obj.timer = setInterval(function() {                                            /* obj.timer 给对象添加属性，不再开辟新空间 */ 
// 计算步长值写在定时器里面  目标值target - 当前位置obj.offsetLeft / 10
        var step = (target - obj.offsetLeft) / 60;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);                       /* >0 向上取整，<0 向下取整 */
        if (obj.offsetLeft == target) {                                             /* offsetLeft 获取盒子当前位置 */
            clearInterval(obj.timer);                                               /* 停止动画 停止定时器 */

            // if (callback) {                                                      /* 判断是否有回调函数传递进来 */
            // callback();                                                          /* 调用回调函数 */
            // }
            callback && callback();                                                 /* 判断是否有回调函数传递进来 《短路运算》 */
        }
    obj.style.left= obj.offsetLeft + step + 'px';                                   /* 把每次 +1 的步长值改为慢慢变小的值 — 让他速度变慢 */
    },5);                                                                           /* 每 10ms + step步长 */
}

//        Y轴方向的动画函数     常用  《返回顶部》

// goBackUp(window, 0);  <<<<< 调用函数

// 简单 动画函数封装        对象    值    回调函数
function goBackUp(obj, target, callback) {                                          /* obj 目标对象，target 目标位置 */
// 清除上一个执行的定时器，这样我们的元素就只有一个定时器，添加事件的时候就不会多次触发
    clearInterval(obj.timer);
// 不同的元素 指定不同的 定时器对象属性 obj.timer
    obj.timer = setInterval(function() {                                            /* obj.timer 给对象添加属性，不再开辟新空间 */ 
// 计算步长值写在定时器里面  目标值target - 当前位置obj.offsetLeft / 10
        var step = (target - window.pageYOffset) / 10;
        step = step > 0 ? Math.ceil(step) : Math.floor(step);                       /* >0 向上取整，<0 向下取整 */
        if (window.pageYOffset == target) {                                         /* offsetLeft 获取盒子当前位置 */
            clearInterval(obj.timer);                                               /* 停止动画 停止定时器 */
        
            // if (callback) {                                                      /* 判断是否有回调函数传递进来 */
            // callback();                                                          /* 调用回调函数 */
            // }
            callback && callback();                                                 /* 判断是否有回调函数传递进来 《短路运算》 */
        }
    window.scroll(0, window.pageYOffset + step);
    },10);                                                                          /* 每 10ms + step步长 */
}
