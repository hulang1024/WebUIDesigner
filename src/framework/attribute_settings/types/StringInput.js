class StringInput {
    constructor(attribute) {
        var span = document.createElement('span');
        var input = document.createElement('input');
        input.className = 'easyui-textbox';
        input.style.width = '250px';
        input.value = attribute.value;
        span.appendChild(input);
        $(input).textbox({
            onChange: function() {
                attribute.onValueChange($(this).textbox('getValue'));
            }
        });
        return span;
    }
}
