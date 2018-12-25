class Toolbar {
    constructor(designer) {
        var editor = new Editor();
        var dialog = $('#openCodeViewDialog').dialog({
            width: '60%',
            height: '80%',
            title: 'Code',
            closed: true,
            maximizable: true,
            resizable: true,
            modal: true
        });
        $(document).click(function() {
            if (!dialog.dialog('options').closed) {
                dialog.dialog('close');
            }
        });
        $('#openCodeView').click(function() {
            dialog.dialog('open');
            editor.setValue(designer.generateCodeAll());
            return false;
        });
    }
}
