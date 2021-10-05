postcss plugin写法

```css

module.exports = postcss.plugin('postcss-px-to-viewport', function(options) {

    var opts = objectAssign({}, defaults, options);

    var pxRegex = getUnitRegexp(opts.unitToConvert);
    var satisfyPropList = createPropListMatcher(opts.propList);
    var landscapeRules = [];

    return function(css) {
        console.log('css', JSON.stringify(css));
        css.walkRules(function(rule) {
            // console.log('rule', rule);
            // Add exclude option to ignore some files like 'node_modules'
            var file = rule.source && rule.source.input.file;

            if (opts.exclude && file) {
                if (Object.prototype.toString.call(opts.exclude) === '[object RegExp]') {
                    if (isExclude(opts.exclude, file)) return;
                } else if (Object.prototype.toString.call(opts.exclude) === '[object Array]') {
                    for (let i = 0; i < opts.exclude.length; i++) {
                        if (isExclude(opts.exclude[i], file)) return;
                    }
                } else {
                    throw new Error('options.exclude should be RegExp or Array.');
                }
            }

            if (blacklistedSelector(opts.selectorBlackList, rule.selector)) return;

            if (opts.landscapeAll && !rule.parent.params) {
                var landscapeRule = rule.clone().removeAll();

                rule.walkDecls(function(decl) {
                    if (decl.value.indexOf(opts.unitToConvert) === -1) return;
                    const next = decl.next();
                    const commentText = next && next.type == 'comment' && next.text;
                    if (!satisfyPropList(decl.prop)) return;
                    let value = decl.value.replace(pxRegex, createPxReplace(opts, opts.landscapeUnit, opts.landscapeWidth))

                    if (commentText === opts.disableConvertComment) {
                        value = decl.value;
                    };

                    landscapeRule.append(decl.clone({
                        value: value,
                    }));
                });

                if (landscapeRule.nodes.length > 0) {
                    landscapeRules.push(landscapeRule);
                }
            }

            if (!validateParams(rule.parent.params, opts.mediaQuery, opts.landscapeManual)) return;

            rule.walkDecls(function(decl, i) {
                if (decl.value.indexOf(opts.unitToConvert) === -1) return;
                if (!satisfyPropList(decl.prop)) return;
                const next = decl.next();
                const commentText = next && next.type == 'comment' && next.text;
                if (commentText === opts.disableConvertComment) {
                    commentText === opts.disableConvertComment && next.remove();
                    return;
                }

                var unit;
                var size;
                var params = rule.parent.params;
                if ((opts.landscapeAll || opts.landscapeManual) && params && params.indexOf('landscape') !== -1) {
                    unit = opts.landscapeUnit;
                    size = opts.landscapeWidth;
                } else {
                    unit = getUnit(decl.prop, opts);
                    size = opts.viewportWidth;
                }

                var value = decl.value.replace(pxRegex, createPxReplace(opts, unit, size));

                if (declarationExists(decl.parent, decl.prop, value)) return;

                if (opts.replace) {
                    decl.value = value;
                } else {
                    decl.parent.insertAfter(i, decl.clone({ value: value }));
                }
            });
        });

        if (landscapeRules.length > 0) {
            var landscapeRoot = new postcss.atRule({ params: '(orientation: landscape)', name: 'media' });

            landscapeRules.forEach(function(rule) {
                landscapeRoot.append(rule);
            });
            css.append(landscapeRoot);
        }
    };
});


```
其中用到的api和属性
* walkRules
* rule.source source.input.file
* rule.selector
* rule.clone.removeAll()
* rule.walkDecls
* decl.next 判断下一个节点是否是off
* type commetn.text
* rule.append
* decl.clone
* rule.push
* remove
* parent.params
* insertAfter

