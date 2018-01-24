### PureComponent

React.PureComponent 和 React.Component 完全一样，但是它实现了 shouldComponentUpdate()的 prop 和 state的浅比较

如果React component's render() function 在相同prop 和 state下呈现相同的结果，你可以使用
React.PureComponent 来提高性能。

注：React.PureComponent的shouldComponentUpdate（）只是浅比较，如果是复杂数据结构，它可能会返回false在需要深层比较的情况下，只有在prop 和 state比较简单的情况下才能extends PureComponent, 或者使用forceUpdate()在你知道深层的数据结构已经改变， 或者使用immutable数据
来更快的做深比较
此外，React.PureComponent 的shouldComponentUpdate() 将跳过所有子组件的更新，确保所有的子组件是“pure”

### Functional stateless components

函数式定义，由于无状态组件没有内部状态，输出的内容取决于作为函数输入的prop

```
    const Helloworld = ({name}) => {
        const sayHi = (event) => {
            console.log('sayhi')     
        }
        return (
                <p onClick={sayHi}>{name}</p>
            )
    }
```



### Dumb component

* 不依赖 app 其余部分，例如 redux action 或 stores。
* 不用指定数据如何加载或修改。
* 接收数据和回调方法只通过 props。
* 很少有属于自己的 state (当有时，他们是 UI state 而不是数据 如 dropMenu)。

### diff pureComponent and Function Stateless components
* pureComponent 有完整的lifecycle
* Functional 只有 render 的输出，不能使用this.state 和 this.setState

### diff functional and Dumb
* dumb 可以有自己的state

### diff PureComponent and Dumb

* prueComponent 可以调用 Redux action 或 stores, Dumb不依赖这些


###presentational components

* 只关心事情看起来怎样
* 内部包含presentational components 和 container components, 并且有自己的DOM标记和样式
* 允许通过this.props.children 实现容器
* 不依赖app其余部分
* 不用指定数据如何加载和修改
* 接受数据和回调只通过props
* 很少有属于自己的 state (当有时，他们是 UI state 而不是数据)。
* 可以写一个functional components, 除非他们需要 state，挂钩生命周期，或执行优化
* 例如：页面，侧边栏，用户信息，列表。


### container components
* 关心事物如何工作的。
* 内部可以包含表现层组件和容器组件但通常没有任何他们自己的 DOM 标记除了一些作为包裹的 div，且永远没有任何样式。
* 提供数据和行为给表现层或其它容器组件
* 通常是有状态的，因为他们通常被作为数据源
* 通常使用高阶组件生成例如 React redux 的 connect()，Relay 的 createContainer(),或 Flux Utils 的 ‘Container.create()’,而不是直接手写。
* 例如：UserPage, FollowersSidebar, StoryContainer, FollowedUserList。

### Benefits of This Approach

* 更好的分离关注点。这种方式写组件更能了解你的 app 和 UI。
* 更好的复用。你可以使用相同的presentational component在完全不同的 state 来源，把这些放到分离的container component使他们能在将来复用。
* 表现层组件实质上是你的 app 的 palette。你可以把他们放到单独的页面， 和让他们的设计者调整所有变化，而无需接触 app 的逻辑。你可以在这个页面运行 screenshot regression tests 
* 强制你提取布局组件例如 Sidebar,Page,ContextMenu 和使用 this.props.children 替代几个组件重复相同的标记和布局。

container components没有 DOM。他只需要提供组合不同 UI 所需要的边界


### 何时使用容器？

我猜测你开始构建你的 app 时首先创建的是表现层组件。最后你会意识到传递了太多 props 到中间组件。当你注意到一些组件不需要用到他们接收到的 props ，只是要转发他们下去并且你重写了所有这些中间组件他们的子组件需要的更多数据，那是使用一些容器组件的好时间。通过这种方式你可以获取数据和行为 props 给叶组件而不需要麻烦树结构中间无关的组件。


* state和stateless。 一些组件使用了 React 的 setState() 方法而一些没使用。容器组件倾向于有状态而表现层组件倾向于无状态，但这不是固定的规则。表现层组件可以是有状态的，而容器也可以是无状态的。

* class和functional。 从 React 0.14 起，组件可以被声明为类和函数。函数组件定义较简单但他们缺乏某些当前只能在类使用的功能。这些限制可能在未来解决但现在还是存在的。因为函数组件更容易明白，我建议你使用他们除非你需要 state，挂钩生命周期，或性能优化，他们只能在类组件中使用。
* pure与 impure。 人们称如果组件保证返回与传入相同的 props 和 state 那么他是纯的。纯组件可以被定义为类和函数，也可以是有状态和无状态的。纯组件另一重要的方面是他们不依靠 props 或 state 的深度改变，因此他们的渲染性能可以通过他们的 shouldComponentUpdate() hoot 浅层比较进行优化。当前只有类可以定义 shouldComponentUpdate() hook 但可能在未来发生变化。


表现层组件和容器组件都可以分为这些两种种类。以我的经验，表现层容器倾向于无状态纯函数，容器倾向于有状态纯类。但这不是规则但根据观察，且我已经发现在特定的情况下会出现完全相反的情况。


