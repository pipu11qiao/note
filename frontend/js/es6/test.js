const resolve1 = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(200), 200);
    })
};

const resolve2 = async () => {
    return await new Promise((resolve) => {
        setTimeout(() => resolve(1000), 1000);
    })
};

const resolve3 = () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(2000), 2000);
    })
};



const asyncFunctions = [
    resolve1(),
    resolve2(),
    resolve3(),
];
(async function() {
    let result = await Promise.race(asyncFunctions);
    console.log(result);
})()
// Promise.all(asyncFunctions).then(console.log)
