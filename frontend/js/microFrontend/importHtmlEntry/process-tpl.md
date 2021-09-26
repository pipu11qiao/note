一些正则
```javascript
const ALL_SCRIPT_REGEX = /(<script[\s\S]*?>)[\s\S]*?<\/script>/gi; // 所有script标签
const SCRIPT_TAG_REGEX = /<(script)\s+((?!type=('|")text\/ng-template\3).)*?>.*?<\/\1>/is; // // 不是 ng-template的script 正向否定查找
const SCRIPT_SRC_REGEX = /.*\ssrc=('|")?([^>'"\s]+)/; //script 上的 src
const SCRIPT_TYPE_REGEX = /.*\stype=('|")?([^>'"\s]+)/; // script 上的type
const SCRIPT_ENTRY_REGEX = /.*\sentry\s*.*/; // 
const SCRIPT_ASYNC_REGEX = /.*\sasync\s*.*/;
const SCRIPT_NO_MODULE_REGEX = /.*\snomodule\s*.*/;
const SCRIPT_MODULE_REGEX = /.*\stype=('|")?module('|")?\s*.*/;
const LINK_TAG_REGEX = /<(link)\s+.*?>/isg;
const LINK_PRELOAD_OR_PREFETCH_REGEX = /\srel=('|")?(preload|prefetch)\1/;
const LINK_HREF_REGEX = /.*\shref=('|")?([^>'"\s]+)/;
const LINK_AS_FONT = /.*\sas=('|")?font\1.*/;
const STYLE_TAG_REGEX = /<style[^>]*>[\s\S]*?<\/style>/gi;
const STYLE_TYPE_REGEX = /\s+rel=('|")?stylesheet\1.*/;
const STYLE_HREF_REGEX = /.*\shref=('|")?([^>'"\s]+)/;
const HTML_COMMENT_REGEX = /<!--([\s\S]*?)-->/g;
const LINK_IGNORE_REGEX = /<link(\s+|\s+.+\s+)ignore(\s*|\s+.*|=.*)>/is;
const STYLE_IGNORE_REGEX = /<style(\s+|\s+.+\s+)ignore(\s*|\s+.*|=.*)>/is;
const SCRIPT_IGNORE_REGEX = /<script(\s+|\s+.+\s+)ignore(\s*|\s+.*|=.*)>/is;

```


一些方法
```javascript
export const genLinkReplaceSymbol = (linkHref, preloadOrPrefetch = false) => `<!-- ${preloadOrPrefetch ? 'prefetch/preload' : ''} link ${linkHref} replaced by import-html-entry -->`;
export const genScriptReplaceSymbol = (scriptSrc, async = false) => `<!-- ${async ? 'async' : ''} script ${scriptSrc} replaced by import-html-entry -->`;
export const inlineScriptReplaceSymbol = `<!-- inline scripts replaced by import-html-entry -->`;
export const genIgnoreAssetReplaceSymbol = url => `<!-- ignore asset ${url || 'file'} replaced by import-html-entry -->`;
export const genModuleScriptReplaceSymbol = (scriptSrc, moduleSupport) => `<!-- ${moduleSupport ? 'nomodule' : 'module'} script ${scriptSrc} ignored by import-html-entry -->`;
```
生成html中资源的说明，例如加载了‘./a.css’就会生成 <!--  link /a.css replaced by import-html-entry -->

processTpl 方法
处理html中的js，css以，入口文件和html模版本身，将符合条件的css和js提取出来（加载css和js的标签）并将其替换掉
```javascript
	let scripts = [];
	const styles = [];
	let entry = null;
	const template = tpl
```


* 去掉html的注释
* 处理html中<link>元素相关的逻辑

```javascript
		.replace(LINK_TAG_REGEX, match => {
			/* change the css link */
            code...
			return match;
		})
```
    * 检查是否是样式文件，如果是尝试获取地址，有地址的如果是忽略直接替代成忽略标签，不是添加进styles数组，替代成样式标签。
    * 如果不满足样式文件，查看是否是预加载（有地址并且不是字体文件）,替代成预加载样式标签
    * 都不符合，不做处理
* 检查<style>元素，如果是忽略，替代成忽略标签
* 检查script 元素，替代

```javascript
		.replace(ALL_SCRIPT_REGEX, (match, scriptTag) => {
            // code ...
		});
```
    * 检查是否是符合js类型的type，不符合不作处理
    * 检查是否含有src，若果有采取类似link的处理，不同的是js有可能是异步async的
    * 检查是否是inline-code,如果是提取出来
    * 将符合条件的推入scripts数组，其他的不作处理

