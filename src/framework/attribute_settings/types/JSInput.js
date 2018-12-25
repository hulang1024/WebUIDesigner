class JSInput {
    constructor(attribute) {
        var span = document.createElement('span');
        var input = document.createElement('input');
        input.className = 'easyui-textbox';
        input.style.width = '250px';
        input.value = attribute.value;
        span.appendChild(input);
        $(input).textbox({
            onChange: function() {
                try {
                    var obj = eval('(' + $(this).textbox('getValue') + ')');
                } catch(e) {
                    alert('属性' + attribute.title + '输入值有错误:\n' + e);
                }
                attribute.onValueChange(obj);
            }
        });
        return span;
    }
}
