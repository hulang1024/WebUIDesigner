
$(function(){
    var designer = new Designer();

    var componentLibsPath = '../component_libs';
    loadjs([
        'dom/DOMComponentClassFactory',
        'dom/TextNode',
        'easyui/code',
        'easyui/DataOptionsItemAttribute',
        'easyui/EasyuiComponent',
        'easyui/FormInput',
        'easyui/ValidateBox',
        'easyui/TextBox',
        'easyui/Combo',
        'easyui/ComboBox',
        'easyui/NumberBox',
        'easyui/DateBox',
        'easyui/DateTimeBox',
        'easyui/Spinner',
        'easyui/NumberSpinner',
        'easyui/TimeSpinner',
        'easyui/Slider',
        'easyui/FileBox',
        'easyui/Datagrid',
        'my/FormTable',
        'my/FormTableTr'
    ].map(function(fileName) {
        return componentLibsPath + '/' + fileName + '.js'
    }), {
        async: false,
        success: function() {
            var componentClassTree = [
                {
                    text: 'My',
                    children: [
                        FormTable,
                        FormTableTr
                    ]
                },
                {
                    text: 'Easyui',
                    children: [
                        {
                            text: '布局',
                            children: []
                        },
                        {
                            text: '表单',
                            children: [
                                TextBox,
                                NumberBox,
                                ComboBox,
                                DateBox,
                                DateTimeBox,
                                NumberSpinner,
                                TimeSpinner,
                                Slider,
                                FileBox
                            ]
                        },
                        {
                            text: '数据表格',
                            children: [
                                Datagrid
                            ]
                        }
                    ]
                },
                {
                    text: 'DOM',
                    children: [
                        TextNode
                    ].concat(DOMComponentClassFactory.createClasses())
                }
            ];

            designer.loadComponentClassTree(componentClassTree);
        }
    });
});
