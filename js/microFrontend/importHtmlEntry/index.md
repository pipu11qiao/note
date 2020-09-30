
抛出importEntry方法,记载入口模版
#### Paragraph Name ####
数据缓存
```javascript
const styleCache = {};
const scriptCache = {};
const embedHTMLCache = {};

```


#### 默认的fetch 和 获取模版函数 ####

```javascript
export function importEntry(entry, opts = {}) {
}
```

opts说明

```javascript
const defaultFetch = window.fetch.bind(window);
function defaultGetTemplate(tpl) { return tpl; }
getPublicPath
```
#### getExternalStyleSheet 和 getExecutableScript,getExternalScripts ####
getExecutableScript 获取css文件内容，如果是inline格式直接返回，如果是链接，查看是否缓存放回文本


```javascript

function getExecutableScript(scriptSrc, scriptText, proxy, strictGlobal) {
	const sourceUrl = isInlineCode(scriptSrc) ? '' : `//# sourceURL=${scriptSrc}\n`;

	window.proxy = proxy;
	// TODO 通过 strictGlobal 方式切换切换 with 闭包，待 with 方式坑趟平后再合并
	return strictGlobal
		? `;(function(window, self){with(window){;${scriptText}\n${sourceUrl}}}).bind(window.proxy)(window.proxy, window.proxy);`
		: `;(function(window, self){;${scriptText}\n${sourceUrl}}).bind(window.proxy)(window.proxy, window.proxy);`;
}


```
execScripts获得外部的js 区分inline和链接，如果是async模式,返回一个对象，content属性能异步加载js的文件

#### execScripts ####

```javascript
	const {
		fetch = defaultFetch, strictGlobal = false, success, error = () => {
		}, beforeExec = () => {
		},
	} = opts;

```

```javascript
			const geval = (code) => {
				beforeExec();
				(0, eval)(code);
			};
```

用eval执行js代码,如果是strictGlobal就将所有的属性挂载在代理上，不是直接挂载在window上。

如果是入口文件:
    通过util中的noteGlobalProps和getGlobalProp方法，来获取在执行代码后挂载到全局的属性,并将其包装成exports对象的形式抛出
其他文件
    不是异步，执行，是异步加载并执行



#### getEmbedHTML 方法 ####

请求所有外部的css并将其以style的方式嵌入html中
```javascript
/**
 * convert external css link to inline style for performance optimization
 * @param template
 * @param styles
 * @param opts
 * @return embedHTML
 */
function getEmbedHTML(template, styles, opts = {}) {
	const { fetch = defaultFetch } = opts;
	let embedHTML = template;

	return getExternalStyleSheets(styles, fetch)
		.then(styleSheets => {
			embedHTML = styles.reduce((html, styleSrc, i) => {
				html = html.replace(genLinkReplaceSymbol(styleSrc), `<style>/* ${styleSrc} */${styleSheets[i]}</style>`);
				return html;
			}, embedHTML);
			return embedHTML;
		});
}

```


#### importHTML 方法 ####
如果入口是string，就调用importHTML方法

```javascript
// 通过fetch获取的html文件,经过processTpl解析
		.then(html => {
			const assetPublicPath = getPublicPath(url);
			const { template, scripts, entry, styles } = processTpl(getTemplate(html), assetPublicPath);

			return getEmbedHTML(template, styles, { fetch }).then(embedHTML => ({
				template: embedHTML,
				assetPublicPath,
				getExternalScripts: () => getExternalScripts(scripts, fetch),
				getExternalStyleSheets: () => getExternalStyleSheets(styles, fetch),
				execScripts: (proxy, strictGlobal) => {
					if (!scripts.length) {
						return Promise.resolve();
					}
					return execScripts(entry, scripts, proxy, { fetch, strictGlobal });
				},
			}));
		}));
```


#### 返回值 ####
```javascript
{
				template: embedHTML, 
				assetPublicPath,
				getExternalScripts: () => getExternalScripts(scripts, fetch),
				getExternalStyleSheets: () => getExternalStyleSheets(styles, fetch),
				execScripts: (proxy, strictGlobal) => {
					if (!scripts.length) {
						return Promise.resolve();
					}
					return execScripts(entry, scripts, proxy, { fetch, strictGlobal });
				},
}

```
