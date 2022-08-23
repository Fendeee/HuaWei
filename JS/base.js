(function flexible(window, document){
    var docEl = document.documentElement;       /* 获取 html 根元素 */
    var dpr = window.devicePixelRatio || 1;     /* dpr 物理像素比 */

    // adjust body font size 设置body 的字体大小
    function setBodyFontSize() {
        if (document.body) {
            // 如果有 body，就设置字体大小为 12 * dpr + 'px
            document.body.style.fontSize = (12 * dpr) + 'px';
        } else {
            // 如果页面当中没有 body，就等着页面加载完毕后在去设置 body的字体大小
            document.addEventListener('DOMContentLoaded', setBodyFontSize)
        }
    }
    setBodyFontSize();

    // set 1rem = viewWidth / 10 设置 html 元素的文字大小 !!!!!!!
    function setRemUnit() {
        var rem = docEl.clientWidth / 12;               /* html 的宽度 / 10，划分成 10 等份 */
        docEl.style.fontSize = rem + 'px';
    }
    setRemUnit();

    // reset rem unit on page resize 设置页面尺寸变化时，重新设置 html 元素的文字大小
    window.addEventListener('resize', setRemUnit);
            // pageshow 是我们重新加载页面是触发的事件
    window.addEventListener('pageshow', function (e) {
        if (e.persisted) {         /* e.persisted 返回的是 true，如果这个页面是从缓存取过来的页面，也要从新计算一下rem的大小 */
            setRemUnit();
        }
    });

    // detect 0.5px supports 检测有些移动端是否支持 0.5px 像素的写法
    if (dpr >= 2) {
        var fakeBody = document.createElement('body');
        var testElement = document.createElement('div');
        testElement.style.border = '.5px solid transparent';
        fakeBody.appendChild(testElement);
        docEl.appendChild(fakeBody);
        if (testElement.offsetHeight === 1) {
            docEl.classList.add('hairLines');
        }
        docEl.removeChild(fakeBody);
    }

}(window, document));