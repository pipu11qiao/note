console.log('sync', 1);
const raf = requestAnimationFrame(() => {
    console.log('raf', 1)
    cancelAnimationFrame(raf)
});
const timer = setTimeout(() => {
    console.log('timeout', 1)
}, 10);
let i = 0;
while (i < 100000000) {
    i++
}
console.log('sync', i)
