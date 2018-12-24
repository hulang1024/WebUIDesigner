class EnumInput {
    constructor(attribute) {
        var span = document.createElement('span');
        var input = document.createElement('input');
        input.className = 'easyui-combobox';
        input.style.width = '250px';
        input.value = attribute.value;
        span.appendChild(input);
        $(input).combobox({
            editable: false,
            data: attribute.enumValues.map(function(v) { return {text: v, value: v} }),
            onChange: function() {
                attribute.onValueChange($(this).textbox('getValue'));
            }
        });
        return span;
    }
}
