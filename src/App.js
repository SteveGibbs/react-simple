import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

var todos = [
    {
        todoTitle: "My first todo",
        todoResponsible: "steve",
        todoDescription: "my first description",
        todoPriority: "low"
    },
    {
        todoTitle: "My second todo",
        todoResponsible: "steve",
        todoDescription: "my second description",
        todoPriority: "medium"
    },
    {
        todoTitle: "My third todo",
        todoResponsible: "steve",
        todoDescription: "my third description",
        todoPriority: "high"
    },
]

//Code follows CodingTheSmartWay tutorial to help set up structure for first React Website!!!

class App extends Component {

    constructor(props){   //set initial state in the constructor and pass in parameter props
        super(props);  //pass props parameter to parent constructor by calling super
        this.state = {  //assign todos to initial state which makes it available to use
            todos
        };

        this.handleAddTodo = this.handleAddTodo.bind(this);
    }

  handleRemoveTodo(index){
        this.setState({
            todos: this.state.todos.filter(function(e, i){
                return i != index; //"new" todos will be the result of the existing todos array filtered to exclude
                // the specific todos selected.  The filter returns an array of all todos which have an index not
                // equal to the index of the selected todos.
            })
        })
  }

handleAddTodo(todo){
      this.setState({todos: [...this.state.todos, todo]})
}


  render() {
    return (
    <div className="container">
        <TodoInput onAddTodo={this.handleAddTodo}></TodoInput>
        <hr/>
    <h4>Todo Count: <span className="badge">{this.state.todos.length}</span></h4>
    <ul className="list-group">
        {this.state.todos.map((todo, index) =>
        <li className="list-group-item" key="{index}">
            <h4 className="list-group-item-heading">{todo.todoTitle} <small><span className="label label-info">{todo.todoPriority}</span></small></h4>
            <p><span className="glyphicon glyphicon-user">{todo.todoResponsible}</span></p>
            <p>{todo.todoDescription}</p>
            <button className="btn btn-danger btn-sm" onClick={this.handleRemoveTodo.bind(this, index)}><span className="glyphicon glyphicon-trash">Delete</span></button>
        </li>
        )}
    </ul>
    </div>
    );
  }
}

class TodoInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            todoTitle: '',
            todoResponsible: '',
            todoDescription: '',
            todoPriority: 'Lowest'
        }
        this.handleInputChange = this.handleInputChange.bind(this); //binding method to this for handleInputChange to have access to object values
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event){  //value is bound to state property and this always shows the states current value.
        // need to update the state and value so that changes can be registered.
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        })
    }

    handleSubmit(event){
        event.preventDefault(); //prevent page refresh - which is default behaviour of submitting form
        this.props.onAddTodo(this.state);
        this.setState({
            todoTitle: '',
            todoResponsible: '',
            todoDescription: '',
            todoPriority: 'Lowest'  //reset the state after submit so everything goes back to blank
        })
    }
        render()
        {
            return (
                <div>
                    <h4>Add New Todo</h4>
                    <form className="form-horizontal" onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="inputTodoTitle" className="col-sm-2 control-label">Todo</label>
                            <div className="col-sm-10">
                                <input  name="todoTitle"
                                        type="text"
                                        className="form-control"
                                        id="inputTodoTitle"
                                        value= {this.state.todoTitle}
                                        onChange= {this.handleInputChange}
                                        placeholder="Title"></input>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputTodoResponsible" className="col-sm-2 control-label">Responsible</label>
                            <div className="col-sm-10">
                                <input  name="todoResponsible"
                                        type="text"
                                        className="form-control"
                                        id="inputTodoResponsible"
                                        value={this.state.todoResponsible}
                                        onChange={this.handleInputChange}
                                        placeholder="Responsible"></input>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputTodoDesc" className="col-sm-2 control-label">Description</label>
                            <div className="col-sm-10">
                                <textarea   name="todoDescription"
                                        className="form-control"
                                        rows="3"
                                        id="inputTodoDesc"
                                        value={this.state.todoDescription}
                                        onChange={this.handleInputChange}></textarea>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputTodoPriority" className="col-sm-2 control-label">Priority</label>
                            <div className="col-sm-10">
                                <select   name="todoPriority"
                                          className="form-control"
                                          id="inputTodoPriority"
                                          value={this.state.todoPriority}
                                          onChange={this.handleInputChange}>
                                    <option>Lowest</option>
                                    <option>Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                    <option>Highest</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-offset-2 col-sm-10">
                                <button type="submit" className="btn btn-success">Add Todo</button>
                            </div>
                        </div>
                    </form>
                </div>
            );
        }


}

export default App;
