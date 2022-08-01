// console.log(typeof 2n)
// console.log(typeof tang)
//
// let s1 = Symbol.for("name")
// let s2 = Symbol.for("name")
// console.log(s1===s2)
// console.log(Symbol.keyFor(s1))

console.log(typeof null)
console.log(typeof undefined)
console.log(null == undefined)
console.log(null === undefined)

let a =[{}]
console.log(Object.prototype.toString.call(a)==='[object Array]')
console.log(a.__proto__===Array.prototype)
console.log([]===[])
console.log({}==={})
console.log(a instanceof Array)
console.log(Object.prototype.toString.call(""))
