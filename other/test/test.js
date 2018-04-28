var fs = require('fs')

fs.readFile('../js/all.js', function (params) {
    setImmediate(() => {
        console.log(2)
    })
    
    setTimeout(() => {
        console.log(1)
    },0)
})

// new Promise((resolve, reject) => {
//     resolve()
// }).then(() => {
//     console.log(3)
// })


// process.nextTick(()=> {
//     console.log(4)
// })
