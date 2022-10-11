const a = 5;
function func(a) {
    return this.a;
}

console.log(func(10));