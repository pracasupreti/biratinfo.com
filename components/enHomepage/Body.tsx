import React from 'react'
import Summary from './Summary'
import Politics from './Politics'
import Economy from './Economy'
import Technology from './Technology'
import Sports from './Sports'
import Health from './Health'

function Body() {

    return (
        <div>
            <Summary />
            <Politics />
            <Economy />
            <Technology />
            <Sports />
            <Health />
        </div>
    )
}

export default Body