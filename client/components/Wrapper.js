import React from 'react'

import '../styles/wrapper.css'

export default class Wrapper extends React.Component{
    render() {
        return (
            <div className='wrapper'>
                {this.props.children}
            </div>
        )
    }
}