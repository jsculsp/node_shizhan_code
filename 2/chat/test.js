let t1 = Date.now()

const timerObj = setTimeout(() => {
    let t2 = Date.now()
    console.log('呵呵');
}, 300);

// if left alone, this statement will keep the above
// timeout from running, since the timeout will be the only
// thing keeping the program from exiting
timerObj.unref();

// we can bring it back to life by calling ref() inside
// an immediate
setTimeout(() => {
    timerObj.ref();
}, 1000);

// setTimeout(() => {
//     console.log(123)
// }, 300)

// setTimeout(() => {console.log(123)}, 500)