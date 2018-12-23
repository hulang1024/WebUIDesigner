class Toolbar {
    constructor(designer) {
        var editor = new Editor();
        var dialog = $('#openCodeViewDialog').dialog({
            width: '50%',
            height: '80%',
            title: 'Code',
            closed: true,
            maximizable: true,
            resizable: true,
            modal: true
        });
        $('#openCodeView').click(function() {
            dialog.dialog('open');
            editor.setValue(designer.generateCodeAll());
        });
    }
}
