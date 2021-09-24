import React from 'react'

function MessageBox(props) {
    return (
        <div className = {`alert alert-${props.variant || 'info'}`}>
            {props.children} {/* children shows the content of the MessageBox */}
        </div>
    )
}

export default MessageBox
