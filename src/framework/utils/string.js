String.dquote = function(s) {
    return '"' + s + '"';
}

String.squote = function(s) {
    return "'" + s + "'";
}

CodeGenerate = (function() {
    function indent(level) {
        var s = '';
        for (var n = level * 4; n > 0; n--) {
            s += ' ';
        }
        return s;
    }

    return {
        indent: indent
    }
})();
