import React from 'react'
import Summary from './Summary'
import Politics from './Politics'
import Society from './Society'
import Economy from './Economy'

import Employment from './Employment'

function Body() {

    return (
        <div className='md:pt-14 pt-10'>
            <Summary />
            <Politics />
            <Society />
            <Economy />
            <Employment />
        </div>
    )
}

export default Body