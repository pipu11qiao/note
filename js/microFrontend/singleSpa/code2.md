# single-spa 源码解析2 #


简化后的代码：

```javascript
// 简化版 single-spa 子应用加载器  状态机

// App statuses
import {toUnloadPromise} from "../originalCode/src/lifecycles/unload";

const NOT_LOADED = "NOT_LOADED";
const LOADING_SOURCE_CODE = "LOADING_SOURCE_CODE";
const NOT_BOOTSTRAPPED = "NOT_BOOTSTRAPPED";
const BOOTSTRAPPING = "BOOTSTRAPPING";
const NOT_MOUNTED = "NOT_MOUNTED";
const MOUNTING = "MOUNTING";
const MOUNTED = "MOUNTED";
const UPDATING = "UPDATING";
const UNMOUNTING = "UNMOUNTING";
const UNLOADING = "UNLOADING";
const LOAD_ERROR = "LOAD_ERROR";
const SKIP_BECAUSE_BROKEN = "SKIP_BECAUSE_BROKEN";

const apps = [];
const defaultAppProps = {
    loadErrorTime: null,
    status: NOT_LOADED,
}
const _exports = module.exports;

/**
 *
 * @param appName String app 名称
 * @param app Function 加载app的方法
 * @param activeWhen Function 激活的判断方法
 * @param customProps Object 自定义属性
 */
function registerApplication(appName, app, activeWhen, customProps) {
    const registration = {name: appName, loadApp: app, activeWhen, customProps};
    apps.push(Object.assign({}, defaultAppProps, registration))
}

function reroute() {
    const currentUrl = location.href;
    const {appToLoad, appToMount, appToUnload, appToUnmount} = getAppChange(apps, currentUrl);
    // 加载和卸载同时进行，装载需等所有取消装载都完成再开始
    Promise.all(appToUnmount.map(toUnload)); // 执行卸载
    const unmountPromises = Promise.all(appToUnmount.map(toUnmount));
    const loadPromises = Promise.all(appToLoad.map(toLoad)).then(()=>{
        // 等所有需要卸载的卸载完
        return unmountPromises.then(()=>{
            return Promise.all(
                appToMount.concat(appToLoad).map(toMount)
            )

        }).catch(()=>{})
    });

}

function getAppChange(apps, url) {
    const toLoad = [];
    const toMount = [];
    const toUnmount = [];
    const toUnload = [];
    const currentTime = Date.now();
    apps.forEach(app => {
        const {status} = app;
        const shouldBeActive = app.status !== SKIP_BECAUSE_BROKEN && app.activeWhen(url);
        switch (status) {
            case LOAD_ERROR:
                if (shouldBeActive && currentTime - app.loadErrorTime >= 200) {
                    toLoad.push(app);
                }
                break;
            case NOT_LOADED:
            case LOADING_SOURCE_CODE:
                if (shouldBeActive) {
                    toLoad.push(app);
                }
                break
            case NOT_MOUNTED:
                if (shouldBeActive) {
                    toMount.push(app);
                } else {
                    toUnload.push(app);
                }
                break
            case MOUNTED:
                if (!shouldBeActive) {
                    toUnmount.push(app);
                }
            default:
                break;
        }
    })
    return {
        appToLoad: toLoad,
        appToMount: toMount,
        appToUnload: toUnload,
        appToUnmount: toUnmount
    }

}

function toLoad(app) {
    // if loaded return app
    return new Promise((resolve, reject) => {
        app.loadApp().then((subAppOpts) => {
            app.status = NOT_BOOTSTRAPPED;
            app.bootstrap = subAppOpts.bootstrap;
            app.mount = subAppOpts.mount;
            app.unmount = subAppOpts.unmount;
            app.unload = subAppOpts.unload;

            resolve(app);
        }).catch(() => {
            app.status = LOAD_ERROR;
            reject(app);
        })
    })
}
function toMount(app){
    return app.mount().then(()=>{
        app.status = MOUNTED;
    }).catch(()=>{
        app.status = SKIP_BECAUSE_BROKEN;
    })
}
function toUnmount(app){
    return app.unmount().then(()=>{
        app.status = NOT_MOUNTED;
    }).catch(()=>{
        app.status = SKIP_BECAUSE_BROKEN;
    })
}
function toUnload(app){
    return app.unload().then(()=>{
        app.status = NOT_MOUNTED;
    }).catch(()=>{
        app.status = SKIP_BECAUSE_BROKEN;
    })
}


_exports.registerApplication = registerApplication;

```

