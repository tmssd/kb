# React

## React Essentials

!!! info ""

    **Reference:**

    + [Official website](https://reactjs.org/){target=_blank}

    + [React/Redux Links :material-github:](https://github.com/markerikson/react-redux-links){target=_blank}

    + [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react#basic-rules){target=_blank}

    + Learn React JS - Full Course for Beginners - Tutorial 2019 (by freeCodeCamp.org)

        ![type:video](https://www.youtube.com/embed/DLX62G4lc44)

    + Full React Course 2020 - Learn Fundamentals, Hooks, Context API, React Router, Custom Hooks (by freeCodeCamp.org)

        ![type:video](https://www.youtube.com/embed/4UZrsTqkcW4)

    + React JS Crash Course 2021

        ![type:video](https://www.youtube.com/embed/w7ejDZ8SWv8)

    + ReactJS - Путь Самурая

        <iframe width="400vw" height="225vw" src="https://www.youtube.com/embed/gb7gMluAeao?list=PLcvhF2Wqh7DNVy1OCUpG3i5lyxyBWhGZ8" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    + React JS - Путь Самурая 2.0

        <iframe width="400vw" height="225vw" src="https://www.youtube.com/embed/jSV2IPQz3ak?list=PLcvhF2Wqh7DM3z1XqMw0kPuxpbyMo3HvN" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    + ReactJS. Основы (Владилен Минин)

        <iframe width="400vw" height="225vw" src="https://www.youtube.com/embed/nwLMqAxNxKA?list=PLD-piGJ3Dtl0WEK67FD1bUGryqqaY_eU-" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

    **Cheatsheets:**

    + [React Cheat Sheet](https://reactcheatsheet.com/){target=_blank}

    **Books:**

    + [Atomic Design by Brad Frost](https://atomicdesign.bradfrost.com/){target=_blank}

    + [The React Handbook (by freeCodeCamp)](https://www.freecodecamp.org/news/the-react-handbook-b71c27b0a795/){target=_blank}

### Installation

Installation made by using **Create React App** npm package:

!!! info ""

    [Official Docs](https://create-react-app.dev/docs/getting-started), [Github](https://github.com/facebook/create-react-app){target=_blank}

!!! note

    Create React App uses *webpack*, *Babel*, *ESLint*, and other amazing projects to power our app. If we ever want an advanced configuration, we can ”eject” from Create React App and edit their config files directly.

!!! note

    Projects created with CRA are responsive out of the box.

Quick Start:

```bash
npx create-react-app my-app
cd my-app
npm start
```

### Deployment

!!! info ""

    [Official Docs](https://create-react-app.dev/docs/deployment){target=_blank}

### Definition

+ React is a **view** library.

    !!! note

        A view is simply the web page we see. A page that displays the text, images of a website. If you build websites with HTML, then every page you create is the view like the homepage, about page, and the contact page. *More precisely:* a view is just another special template page that will be generated on the user request. It will display only the things that matter to the user’s request([source](https://medium.com/front-end-weekly/what-is-a-view-in-web-application-6a2836eed4eb){target=_blank}).

+ React helps to re-use component easily, change the view.

### Concepts

#### One Way Data Flow

Change the parent, only their children need to be re-rendered.

#### src/index.js

Index.js is the main "JS" file for React App. All packages/dependencies we import there, will be imported for all the subsequent files thus allowing us to use it everywhere.

!!! warning

    This is true for importing React(`#!js import React from 'react';`) in *function-based dumb components* as well since React v.17 and above, i.e. there is no need anymore to import react for JSX only. For older versions of React and for *class-based components* we still need to import it in each ==[component](#components)== file in order to make JSX work in the component when we compile it before bundling it up, i.e. because each module has it's own scope, it needs to understand JSX(Source: [Stackoverflow](https://stackoverflow.com/questions/44404730/why-do-you-need-to-import-react-multiple-times-in-parent-and-child-components){target=_blank}). Underneath the hood, this is all compiled and bundled by *webpack*. Futher reading: [Webpack Tutorial: Understanding How it Works](https://medium.com/ag-grid/webpack-tutorial-understanding-how-it-works-f73dfa164f01){target=_blank}

```js
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import reportWebVitals from './reportWebVitals';
import 'tachyons';


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

**`#!js import React from 'react';`**: It's the core of the package that *in our case(our website)* does the DOM manipulation for us.

**`#!js import ReactDOM from 'react-dom';`**: We can plug and play different libraries like React VR(for Virtual Reality) or React Native(for building mobile apps) based on what screen we're rendering to. Here we plug ReactDom library.

**`import 'tachyons';`**: Packages like this can just be imported in the index.js file because they can be *"global"* like **dependencies** that have to be imported just once. But technically **it's not global**. Webpack can convert these dependencies into modules - they will have a much tighter scope (which is safer). Additionally by converting our dependencies into Modules, Webpack can manage our dependencies for us - Webpack will pull in the dependant Modules at the right time, in the correct scope.

**`#!js render()`** function: It is a built in function that connected to the ecosystem - which handles any changes in the view. This method should only contain the final result of what we want to return from the ==[component](#components)==.

#### JSX

React uses **JSX** language to build its own **VirtualDOM**. It looks like *javascript with html-like syntax* and has following rules:

1. Regarding self-closing elements both **HTML** (linebreak `<br>`, horizontal rule `<hr>`, `<input>` and `<img>`) and **user defined** (e.g. `<CardList />`):

    In XML compliant HTML we must include the `/` in the tag. HTML5 permits us to not include a space character, so we may write,

      `<img/>` or `<img />`

    React.js requires that we use the XHTML syntax, and always include a space. We cannot break up a self-closing tag. It must appear on the same line.

      `<br />`

2. Use `<div className=''>` instead of *class*

3. <space>

    ```js
    return (html...
    {
    javascript expression
    }
    html...);
    ```

     + **html...** - what the JSX processor does, essentially, is e.g. turn this:

        ```js
        <div className="sidebar"></div>
        ```

        into this:

        ```js
        React.createElement(
          'div',
          {className: 'sidebar'},
          null
        )
        ```

     + **{ javascript expression }** - we need curly braces around js expressions to tell the compiler to distinguish between them and the remaining JSX(= only statements which we want to render out).

     + **return (...)** - when we return multiple lines we have to wrap them with brackets to make a *javascript expression*.

#### Components

!!! info ""

    [React.Component(from official docs)](https://reactjs.org/docs/react-component.html){target=_blank}

+ Component is like a function, and it need to be exported, need to be Capitalized.

+ We always have to return just one element from a component. Previously, for this purpose we wrapped our components in `<div></div>`. From React 16.2 we can use `<React.Fragment></React.Fragment>` instead, which won't render in the actual Dom. Futher reading: [Rendering child elements in React using Fragments](https://blog.logrocket.com/rendering-child-elements-react-fragments/){target=_blank}. The use of Fragment is quite simple. If we don't want our component affecting the content flow in a specific way (because we might have done the basic layout in the parent component) and we still want to return more than one element, we can use Fragment to wrap the other elements because we can only return one element. In other words we should use Fragment every time we don't want the component which we import to have an effect on the other components on the page (from a layout point of few).

    !!! note

        `Fragment` will act like there is nothing. By using a `div` instead of `Fragment`, we will end up getting a block element which get pushed onto the **next line** by default.

+ In a Project Structure:
    + **src/components** - includes *dumb components*
    + **src/containers** - includes  *smart components*: things like pages or overall app container and their css

+ **Dumb/Pure(presentational) Components:**
    + Their **only** responsibility is to *present* something to the DOM.
    + So they are only used to outsource special parts of the parent smart component.
    + And we only have access to properties which such an component can receive from a smart.
    + So technically, our view only rerenders because the *parent smart component* forces the *child dumb component* to do that.
    + The components themselves only have a `render()` method (they don’t need any others) and are often just Javascript pure functions that receive something and return something(determenistic).

        ```js
        const Footer = (props) => {
          return(
          <div>
            <ul>
              <li>Footer Information</li>
            </ul>
          </div>
          )
        }
        ```

+ **Smart(container) Components:**
    + They are responsible for keeping track of *state*, i.e. we can use the *state management of React* and care about how the app works.
    + So they used as an overall components which should dynamically change the view with new data.
    + The **container components** pass the data down to the **presentational components** as *props*.
    + These components also often contain other callback functions that are used to *update the state* and get passed down to their child components as *props*. E.g. we have access to the *lifecycle hooks* like `componentDidMount` wich is needed to to fetch(извлечь) data and `setState` at the right time.
    + They can be *class-based* components and have their own state defined in their `constructor()` functions **or** *function-based* components using *hooks*.

        Example of class-based smart component(without callback functions):

        ```js
        class App extends Component {
          constructor(props){
            super(props);

            this.state = {pictures : []};
          }
        }
        ```

        > **Rule from official docs reference:** If you don’t initialize state and you don’t bind methods, you don’t need to implement a constructor for your React component.
        >
        > The constructor for a React component is called before it is mounted. When implementing the constructor for a `React.Component` subclass, you should call `super(props)` before any other statement. Otherwise, `this.props` will be undefined in the constructor, which can lead to bugs.
        >
        > Typically, in React constructors are only used for two purposes:
        >
        > 1. Initializing ==[local state](#state)== by assigning an object to `this.state`.
        >
        > 2. Binding [event handler](https://reactjs.org/docs/handling-events.html){target=_blank} methods to an instance.

    + Using ==[**props**](#props)== parameter inside `constructor()` and `super()` functions:

        In general, we can use props also in class based components.

        If `<MyComponent/>` would be a class based component, then this

        `<MyComponent prop1={"I'm prop1"} prop2={"I'm prop2"} />`

        also works and we can use it with props.

        The only gotcha is, that we have to pass the props within the constructor if we wanna use them inside of the constructor:

        ```js
        constructor(props){
            super(props);
            console.log(props);
        }
        ```

        And if we don't wanna use the props inside of the constructor, then `this.props` will be available in our class methods.

+ **Smart Component vs Dumb Component Example:**

    ```js
    // class-based smart component
    import React, {Component} from 'react';

    class Hello extends Component {
        render() {
            return (
                <div>
                  <h1>Hello world!</h1>
                  <h3>{this.props.greeting}</h3>
                </div>
            )
        }
    }
    ```

    vs

    ```js
    // function-based dumb component
    import React from 'react';

    const Hello = (props) => {
        return (
            <div>
                <h1>Hello world!</h1>
                <h3>{props.greeting}</h3>
            </div>
        )
    }
    ```

#### Props

+ `props` are inputs to a React component. They are data passed down from a parent component to a child component.
+ `props` are simply things that come out of ==[state](#state)==.

    For example:

    given the following in the *index.js*:

    ```js
    ReactDOM.render(
        <div>
          <Card id=array[0].id name=array[0].name email=array[0].email />
        </div>
    )
    ```

    we can get these props inside *Card.js* as follows:

    ```js
    // in class-based component
    class Card extends React.Component {
      render() {
        return (
            <div>
                <h4>{this.props.name}</h4>
                <p>{this.props.email}</p>
                <p>{this.props.id}</p>
            </div>
        );
      }
    }

    // in function-based component
    const Card = (props) => {
        return (
            <div>
                <h4>{props.name}</h4>
                <p>{props.email}</p>
                <p>{props.id}</p>
            </div>
        );
    }

    // in function-based component using destructuring in function parameter
    const Card = ({ name, email, id }) => {
        return (
            <div>
                <h4>{name}</h4>
                <p>{email}</p>
                <p>{id}</p>
            </div>
        );
    }

    // same as above but with example of passing prop into string usnin template string
    const Card = ({ name, email, id }) => {
        return (
            <div className="tc bg-light-green dib br3 pa3 ma2 grow bw2 shadow-5">
                <img src={`https://robohash.org/${id}?size=200x200`} alt="robots" /> // passing id using template string
                <div>
                    <h4>{name}</h4>
                    <p>{email}</p>
                </div>
            </div>
        );
    }
    ```

+ `props` are readonly. They should not be modified in any way. If you need to modify some value in response to user input or a network response, use `state` instead.
+ `props.children` is available on every component. It contains the content between the opening and closing tags of a component, e.g.:

    Given `<Welcome>Hello world!</Welcome>` the string `Hello world!` is available in `props.children` (for function-based component) or `this.props.children` (for class-based component) in the `Welcome` component.

#### Key Prop

+ Keys help React identify which items have changed, are added, or are removed. Keys should be given to the elements inside the array to give the elements a *stable identity*.

    ```js
    const numbers = [1, 2, 3, 4, 5];
    const listItems = numbers.map((number) =>
      <li key={number.toString()}>
        {number}
      </li>
    );
    ```

+ *Stable Identity:* The best way to pick a key is to use a string that uniquely identifies a list item among its siblings. Most often we would use IDs from our data as keys. When that's not the case, we can add a new ID property to our model or hash some parts of the content to generate a key.

    !!! note

        For example: if the user.id or mongo key are completely unique with no specific order to them (or too much of a revealing information about the user's secrets), either is a good choice. Also if it is a string, the comparison will be faster.

+ Keys used within arrays should be unique among their siblings. However they don’t need to be globally unique. We can use the same keys when we produce two different arrays.

+ Keys serve as a hint to React but they don’t get passed to your components.

+ When we don’t have stable IDs for rendered items, we may use the item index as a key as a last resort.

    ```js
    const todoItems = todos.map((todo, index) =>
      // Only do this if items have no stable IDs
      <li key={index}>
        {todo.text}
      </li>
    );
    ```

    !!! note

        If you choose not to assign an explicit key to list items then React will default to using indexes as keys.

    !!! warning

        It's not recommended using indexes for keys if the order of items may change. This can *negatively impact performance* (because if we remove an item in the middle of the array, all of the index numbers of the items following it need to be updated which is expensive) and may *cause issues with component state*. Futher reading: [Index as a key is an anti-pattern](https://robinpokorny.medium.com/index-as-a-key-is-an-anti-pattern-e0349aece318){target=_blank}, [:fontawesome-brands-youtube: Все ли вы знаете о React key?](https://www.youtube.com/watch?v=OtAlPwW8DNU&list=PLz_dGYmQRrr-g02jHDzuu-6VlOt8-8Uu5&index=2){target=_blank}, [Understanding unique keys for array children in React.js(Stackoverflow)](https://stackoverflow.com/questions/28329382/understanding-unique-keys-for-array-children-in-react-js/43892905#43892905){target=_blank}.

#### State

!!! info ""

    Reference: [State and Lifecycle(from official docs)](https://reactjs.org/docs/state-and-lifecycle.html){target=_blank}

+ A "state" is simply an object - an object that describes our application.
+ State can change and affect our app.
+ We can setup state using *class-based* component.

    ```js
    class App extends Component {
      constructor() {
          super();
          this.state = {
              robots: [],
              searchfield: '',
          }
      }

      componentDidMount() {
          fetch('https://jsonplaceholder.typicode.com/users')
              .then(response => response.json())
              .then(users => this.setState({ robots: users }));
      }

      onSearchChange = (event) => {
          this.setState({searchfield: event.target.value})
      }

      render() {
          const { robots, searchfield } = this.state;
          const filteredRobots = robots.filter(robot => {
              return robot.name.toLowerCase().includes(searchfield.toLowerCase());
          });
          return !robots.length ?
              <h1 className="tc">Loading</h1> :
              (
                  <div className="tc">
                      <h1 className="f1">RoboFriends</h1>
                      <SearchBox searchChange={this.onSearchChange} />
                      <Scroll>
                          <ErrorBoundry>
                              <CardList robots={filteredRobots} />
                          </ErrorBoundry>``
                      </Scroll>
                  </div>
              );
        };
    }
    ```

    !!! note

        **Rule of thumb:** Any time we create our own methods on a class-based smart component, we use an arrow function. Futher reading: [Handling Events.](https://reactjs.org/docs/handling-events.html){target=_blank}

    From the code block above:

    ```js
    // we write this
    // because this makes sure that the "this" value is according to where it was created, which is our smart component
    onSearchChange = (event) => {
          this.setState({searchfield: event.target.value})
      }

    // instead of this
    // because here the value of "this" is the "input" from the SearchBox.js component and it doesn't have "state.robots"
    onSearchChange (event){
          this.setState({searchfield: event.target.value})
      }
    ```

    + **setState()**

        !!! info ""

            Reference: [Understanding React 'setState'](https://css-tricks.com/understanding-react-setstate/#top-of-site)

        + This is the method that comes with React. Any time we want to *change state* we **always** do use it and we don't do e.g. `this.state.searchfield =`.

        + On each **state change** the virtual DOM(that is just a javascript object) collects this entire state and React uses this state by calling the `render()` function to render and pass its properties down as *props* to pure components that are rerendered accordingly to their changed *props*. **Only the component which changes gets rerendered** and this is the power of React!

        + `setState()` in React is a *async* method. This means, that its value is not accessible in a synchronized way. React will batch multiple calls to `setState()` into a single call, and then re-render the component a single time, rather than re-rendering for every state change. So geting the state right after we setState might get the old state. Further reading: [React Docs](https://reactjs.org/docs/react-component.html#setstate){target=_blank}.

            **Solution**: use `componentDidUpdate` or a setState callback: `setState(updater, callback)`

            For example if we want to console.log the **actual** value of our state, we have to use the callback: `this.setState({property: value}, () => console.log(this.state.property)`,e.g.:

            ```js
            this.setState({robots: users}, () => {
                console.log('state.robots inside from setState', this.state.robots);
            })
            ```

        + Setitng initial state:

            ```js
                const initialState = {
                input: '',
                imageUrl: '',
                box: {},
                route: 'signin',
                isSignedIn: false,
                user: {
                id: '',
                    name: '',
                    entries: 0,
                    joined: '',
                }
            }

            class App extends React.Component {
            constructor() {
                super();
                this.state = initialState;
            }
            .
            .
            .
            }
            ```

            When we use `setState`, we actually do not work with the same `initialState` object anymore. `setState` makes a copy of the `state` object first and makes the changes to the copy instead. This means, technically we don't access the `iniitalState` object anymore at this point.

            Although `this.state` is referencing the `initalState` object at first, after `setState` was called this is not the case anymore.

#### Lifecycle (update needed...)

[Lifecycle Hooks(from official docs)](https://reactjs.org/docs/react-component.html)

**mounting**: start the web page by checking `constructor()`, `componentWillMount()`, `render(),` `componentDidMount()`, these functions are pre-built by react, and are called without parameters

**updating**: touch the web, it rerender component when receive new input

**unmounting**: when a component is removed from a page, like when we change to different page

#### Error Boundary (обработка ошибок)

Wrap a component, if any error take place in children, it will catch it and show something instead to the user in the production.

```js
import React, { Component } from 'react';

class ErrorBoundry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    componentDidCatch(error, info) {
        this.setState({ hasError: true })
    }

    render() {
        if (this.state.hasError) {
            return <h1>Oooops. That is not good</h1>
        }
        return this.props.children
    }
}

export default ErrorBoundry;
```

## Hooks

+ [Robofirends application using hooks](https://github.com/rogueco/robot-friends){target=_blank}

## Tips & Tricks

### A common way to work with forms in React

One state property takes care of the user input and the another state object takes care of passing it as a prop. Further reading about how forms are handled in React: [React Docs](https://reactjs.org/docs/forms.html){target=_blank}.

For example in face-recongition-brain app the `input` state takes care of storing the *user input* and the `imageUrl` state is the state which we *pass as prop into the face recognition component*.

## 50 Job Interview Questions(Rus)

**YouTube:**

![type:video](https://www.youtube.com/embed/-cZOdWjFwXw)

**Offline:**

![type:video](react-50-job-interview-questions(rus)_-cZOdWjFwXw.mp4)

<object data="./react-50-job-interview-questions(rus).pdf" type="application/pdf" class="pdf"></object>
