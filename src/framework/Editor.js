class Editor {
  constructor() {
    var textarea = document.getElementById('code');
    var codemirror = CodeMirror.fromTextArea(textarea, {
      lineNumbers: true
    });
    this.codemirror = codemirror;
    codemirror.setSize('100%', '100%');
    return codemirror;
  }
}
