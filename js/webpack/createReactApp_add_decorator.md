### create react app 添加decoration ###

es6 语法中的decoration还没有在浏览器统一实现，如果要使用需通过babel处理一下。create react app 中没有额外的方法给你支持babel配置（估计以后会有，vue中就处理的很好），只能通过eject来配置了。

1.eject crate react app 提供了释放webpack+react配置的原项目的方法，释放完以后就变成了webpack构建的react的完整项目，脱离了create react app的封装，可以自行进行webpack和其他相关构建工具的配置。

```
npm run eject
```

2.添加.babelrc文件，并开启decoration。通过npm安装对应的插件

```

{
    "presets": [ "react-app" ],
    "plugins": [
        [ "@babel/plugin-proposal-decorators", { "legacy": true } ] ]
}

```

安装插件
```
npm i @babel/plugin-proposal-decorators -D
```

OK! 可以运行 `npm start` 。

