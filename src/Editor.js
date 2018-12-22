class Editor {
  constructor() {
    var textarea = document.getElementById('code');
    var codemirror = CodeMirror.fromTextArea(textarea, {
      lineNumbers: true,
      width: '100%',
      height: '100%'
    });
    this.codemirror = codemirror;
    return codemirror;
  }
}
