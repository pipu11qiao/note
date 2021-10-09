setTimeout(_ => console.log(1))
new Promise((resolve, reject) => {
    resolve()
    console.log(2)
    reject()
    console.log(3)
}).then(_ => {
    setTimeout(_ => console.log(4))
    console.log(5)
    Promise.resolve().then(_ => {
        console.log(6)
    }).then(_ => {
        Promise.resolve().then(_ => {
            console.log(7)
        })
    })
}).catch(_ => {
    console.log(8)
})
console.log(9)

23956714
