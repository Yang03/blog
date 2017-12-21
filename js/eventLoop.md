### event loop

* 一个eventloop有一个或者多个task queues(任务队列)，一个task queues由有序任务列表组成
* 每一个evnt loop都有一个microtask queue
* task queue =  macrotask != microtask
* 一个task会被pushed 到一个macrotask queue 或者microtask queue
* 当一个task pushed 到一个queue(micro/macro), 一位着准备工作已经结束，task可以执行了


### event loop process model
当一个调用栈为空时，会执行下面的步骤：

1. 从event loop 的task queue里选择一个最早的task(task A）
2. 如果 task A 为空（意味着task queues为空），这时会跳到步骤 6
3. 设置当前运行的task 为 “task A”
4. 执行 "task A"
5. 设置当前的运行task 为 null, 删掉"task A"
6.执行 microtask queue
    * (a) 从microtask queue 里面选择一个最早的task (task x)
    * (b) 如果task x 是空（意味着microtask queues为空）,这时会跳到步骤 (g)
    * (c) 设置当前运行的task 为 “task x”
    * (d) 执行 "task x"
    * (e) 设置当前的运行task 为 null, 删掉"task x"
    * (f) 从microtask queue 里面选择一个下一个最早的task， 跳到步骤（b）
    * (g) 结束microtask queue
7. 更新渲染
8. 如果是一个woker event loop（如：WorkerGlobalScope）如果WorkerGlobalScope 已经关闭和event loop task queues 为空，会销毁这个event loop, 中止这个步骤，恢复运行[worker]:https://html.spec.whatwg.org/multipage/workers.html#workers 的步骤
9. 返回到步骤 1


### other
1. 当一个macrotask 在运行时，可以注册新的事件，所以新的task 会被创建
  * promiseA.then() 的回调函数是一个task
    * resolved/rejected:会被pushed到mircrotask queue 中，在当前的事件循环中
    * pending:  会被pushed到mircrotask queue 中，在当前的事件循环中或者下一个循环中
    * setTimeout(callback, n) 会被pushed 到macrotask queue中，即使n=0
2.  task 在microtask 会在当前循环中执行，macrotask queue 会在下一个event loop 循环中  

3.  click, ajax setTimeout 等的callback都是macrotask

 

