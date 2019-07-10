import React, {Component} from "react";
import TodoItem from "../TodoItem/TodoItem";
import "./TodoList.css";
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import load from '../API/load'
import axios from 'axios';

class TodoList extends Component {
    state = {
        inputValue: '',
        items: [],
        filter: {
            All: true,
            Active: false,
            Completed: false,
        }
    };

    componentDidMount() {
        this.loadData();
    }

    loadData() {
        load().then(data => {
                const itemsToInsert = data.data.todoitems.map((item) => {
                    return {
                        key: item._id,
                        text: item.text,
                        checked: item.checked
                    }
                });
                this.setState({items: [...this.state.items, ...itemsToInsert]})
            })
    };

    addItem(e) {
        e.preventDefault();
        if (this.state.inputValue.trim() !== '') {
            const newItem = {
                text: this.state.inputValue,
                checked: false
            };
            axios.post(`/`, {newItem})
                .then((res) => {
                    const newItem = {
                        key: res.data.item._id,
                        text: res.data.item.text,
                        checked: res.data.item.checked
                    };
                    this.setState({items: [...this.state.items, newItem], inputValue: ''})
                });
            this.notify("Item was added", false);
        }
    };

    handleChange(event) {
        this.setState({
            ...this.state,
            inputValue: event.target.value
        })
    };

    deleteItem(key) {
        axios.delete(`/${key}`)
            .then((res) => {
                if (res.status === 200) {
                    const filteredItems = this.state.items.filter((item) => {
                        return (item.key !== key)
                    });
                    this.setState({
                        items: filteredItems
                    });
                    toast.success("Item was removed")
                }
            })
    };

    deleteCompleted() {
        const filterForFetch = this.state.items.filter((item) => {
            return (item.checked === true)
        });
        axios.delete(`/`, {filterForFetch})
            .then((res) => {
                if (res.status === 200) {
                    const filtered = this.state.items.filter((item) => {
                        return (item.checked === false)
                    });
                    this.setState({
                        items: filtered
                    });
                    toast.success("Items were removed")
                }
            })
    };

    changeData(key, data) {
        const itemToCheck = this.state.items.find((item) => {
            return (item.key === key)
        });
        itemToCheck.text = data;
        axios.put(`/`, {itemToCheck})
            .then((res) => {
                if (res.status === 200) {
                    if (data.trim().length !== 0) {
                        itemToCheck.text = data;
                        this.setState({
                            ...this.state.items,
                            itemToCheck
                        })
                    }
                }
            })
    };

    changeCompleted(key) {
        const itemToCheck = this.state.items.find((item) => {
            return (item.key === key)
        });
        itemToCheck.checked = !itemToCheck.checked;
        axios.put(`/`, {itemToCheck})
            .then((res) => {
                if (res.status === 200) {
                    const itemToCheck = this.state.items.find((item) => {
                        return (item.key === key)
                    });
                    this.setState({
                        ...this.state.items,
                        itemToCheck
                    });
                    const textToRender = itemToCheck.checked ? 'Item was completed' : 'Item was uncompleted';
                    this.notify(textToRender, !itemToCheck.checked)
                }
            })
    };

    checkAll() {
        if (this.state.items.length === 0) return;
        const checkAll = this.state.items.every((item) => {
            return item.checked === true;
        });
        axios.put(`setAll`, {checkAll})
            .then((res) => {
                if (res.status === 200) {
                    if (checkAll) {
                        this.notify("All is unchecked", checkAll);

                    } else {
                        this.notify("All is checked!", checkAll);
                    }
                    const newItems = this.state.items.map((item) => {
                        return item.checked = !checkAll
                    });
                    this.setState({
                        newItems
                    })
                }
            })
    };

    changeFilter(key) {
        const filter = this.state.filter;
        Object.keys(filter).forEach((filterKey) => {
            filter[filterKey] = false
        });
        filter[key] = true;
        this.setState({
            ...this.state.items,
            filter
        })
    };

    selectItemsToRender() {
        if (this.state.filter.All) {
            return this.state.items
        } else if (this.state.filter.Active) {
            return this.state.items.filter((item) => item.checked === false)
        } else {
            return this.state.items.filter((item) => item.checked === true)
        }
    };

    notify = (text, checked) => {
        if (checked) {
            toast.info(text)
        } else {
            toast.success(text)
        }
    };

    render() {

        const existChecked = this.state.items.some((item) => {
            return item.checked === true;
        });

        return (
            <div className="todoListMain">
                <ToastContainer
                    autoClose={1000}/>
                <div className="header">
                    <div id="input_add_block">
                        <button id="checkAll" onClick={this.checkAll.bind(this)}>
                            <FontAwesomeIcon icon={faCheck} size="lg"/>
                        </button>
                        <form onSubmit={this.addItem.bind(this)}>
                            <input id="input_add" autoComplete="off" value={this.state.inputValue}
                                   onChange={this.handleChange.bind(this)} placeholder="What needs to be done?"
                            />
                        </form>
                        <button id="addButton" onClick={this.addItem.bind(this)}>
                            ADD
                        </button>
                    </div>
                </div>
                <ul className="theList">
                    {this.selectItemsToRender().map((item) => (
                        <TodoItem changeData={this.changeData.bind(this)} item={item} key={item.key}
                                  delete={this.deleteItem.bind(this)}
                                  changeCompleted={this.changeCompleted.bind(this)}
                        />
                    ))}
                </ul>
                <div id="bottom_wrapper">
                    <div id="items_left">
                        <p >
                            Items left {this.state.items.filter((item) => item.checked === false).length}
                        </p>
                    </div>
                    <div id="filter">
                        {Object.keys(this.state.filter).map((key) => {
                            return (
                                <button key={key}
                                        className={this.state.filter[key] ? 'filter_button active' : 'filter_button'}
                                        onClick={() => this.changeFilter(key)}
                                >{key}
                                </button>
                            )
                        })}
                    </div>
                    <button id="clear_completed"
                            className={existChecked ? 'filter_button showClean' : 'filter_button hidden'}
                            onClick={this.deleteCompleted.bind(this)}>Clear Completed
                    </button>
                </div>
            </div>
        );
    }
}

export default TodoList;