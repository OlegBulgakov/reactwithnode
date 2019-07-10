import React, {Component} from "react";
import Checkbox from "../Checkbox/Checkbox";
import "./TodoItem.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";

class TodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            inputData: props.item.text
        };
    };

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.props.changeData(this.props.item.key, this.state.inputData);
            this.setState({editMode: false})
        }
    };

    showInputOnClick = () => this.setState({editMode: true});

    onBlur = () => {
        this.props.changeData(this.props.item.key, this.state.inputData);
        this.setState({editMode: false})
    };

    handleChanges = (e) => {
        const {value} = e.target;
        this.setState({
            inputData: value
        });
    };

    editorMode = (edit) => {
        if (edit) {
            return (
                <input
                    autoFocus
                    onKeyDown={this._handleKeyDown.bind(this)}
                    onBlur={this.onBlur}
                    onChange={this.handleChanges}
                    value={this.state.inputData}
                    className={"editorInput"}
                />
            )
        } else {
            return (
                <div id="tasks_text"
                     onDoubleClick={this.showInputOnClick}
                >{this.props.item.text}
                </div>
            )
        }
    };

    render() {
        const {editMode} = this.state;
        const {checked, key} = this.props.item;
        return (
            <li
                className={editMode ? 'edit-mode' : ''}
                id="tasks_block">
                <Checkbox isChecked={checked}
                          itemKey={key}
                          toggleChange={this.props.changeCompleted}
                />
                {this.editorMode(this.state.editMode)}
                <button className={"delete_button"}
                        onClick={() => this.props.delete(this.props.item.key)}>
                    <FontAwesomeIcon icon={faTimes} size="lg"/>
                </button>
            </li>
        )
    }
}

export default TodoItem;