import React from 'react'
import Summary from './Summary'
import Politics from './Politics'
import Economy from './Economy'
import Technology from './Technology'
import Sports from './Sports'
import Health from './Health'

function Body() {

    return (
        <div className='md:pt-14 pt-10'>
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