jsonifyInDataOptions = function(o) {
    return jsonify(o);
    // 非严格json，属性名不要引号
    function jsonify(o) {
        var s = '';
        if (o.constructor == Array) {
            s += '[';
            o.forEach(function(item, i) {
                s += jsonify(item);
                if (i < o.length - 1) {
                    s += ',';
                }
            });
            s += ']';
        } else if (o.constructor == Object) {
            s += '{';
            var pCount = Object.keys(o).length, i = 0;
            for (var p in o) {
                s += p + ':' + jsonify(o[p]);
                if (i++ < pCount - 1)
                    s += ',';
            }
            s += '}';
        } else if (o.constructor == String) {
            return String.squote(o);
        } else {
            return o;
        }
        return s;
    }
}

function generateDataOptionsCode(dataOptions, level, excludes, notItemAutoIndent) {
    if (!Object.keys(dataOptions).length)
        return '';

    excludes = excludes || [];
    var code = '';
    var opts = [];
    for (var k in dataOptions) {
        if (excludes.includes(k)) {
            continue;
        }
        var v = dataOptions[k];
        if (typeof v == 'string') {
            v = String.squote(v);
        } else if (typeof v == 'object') {
            v = jsonifyInDataOptions(v);
        }
        opts.push(k + ':' + v);
    }
    if (opts.length) {
        code += ' data-options="' + opts.join(',') + '"';
        if (!notItemAutoIndent && code.length - 1 > 80) {
            code = ' data-options="';
            var indent = CodeGenerate.indent(level + 1);
            code += '\n' + indent;
            code += opts.join(',\n' + indent) + '"';
        }
    }

    return code;
}
