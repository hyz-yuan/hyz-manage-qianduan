import React, { Component } from  'react'
import './index.css'

class rightBodyHeaderBar extends Component {
    state = {
    };

    render() {
        return (
            <div className='rightBodyHeaderBar'>
                {this.props.title}
            </div>
        );
    }
}

export default rightBodyHeaderBar