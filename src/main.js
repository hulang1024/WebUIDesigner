

$(function(){
    var designer = new Designer();
    var componentLibsPath = 'component_libs';

    loadjs([
        'dom/DOMComponentClassFactory',
        'dom/TextNode',
        'easyui/DataOptionsItemAttribute',
        'easyui/EasyuiComponent',
        'easyui/ValidateBox',
        'easyui/TextBox',
        'easyui/Combobox'
    ].map(function(fileName) {
        return componentLibsPath + '/' + fileName + '.js'
    }), {
        success: function() {
            var componentClasses = [
                TextBox,
                Combobox,
                TextNode
            ];
            componentClasses = componentClasses.concat(new DOMComponentClassFactory().createClasses());
            designer.configureComponents(componentClasses);
        }
    });


});
