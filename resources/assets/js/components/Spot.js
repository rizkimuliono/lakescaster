import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

export default class Spot extends Component{
    constructor(props){
        super(props)
        this.state = {
            apiPath: window.location.origin + '/api/' + this.props.path,
            data: [],
            date: this.props.date
        }
    }

    componentWillMount(){
        const path = this.state.apiPath
        axios.get(path)
            .then((res) => {
                console.log(res.data)
                this.setState({data: res.data})
            }).catch(err => console.log(err))
    }

    render(){
      return (
            <Fragment>
                <h3 className="text-center">{this.state.date}</h3>
            </Fragment>
        )
    }
}

if (document.getElementById('spot')) {
    const element = document.getElementById('spot')
    const props = Object.assign({}, element.dataset)
    ReactDOM.render(<Spot {...props} />, document.getElementById('spot'))
}