import React from 'react'
import { useResultContext } from '../../context/customContext'

import GroupIcon from '../../assets/GroupIcon.svg'

const EmptyChannel = () => {
    const { setIsCreating, isCreating } = useResultContext()
    return (
        <div className='empty__channel-container'>
            <button type='button' onClick={() => setIsCreating(!isCreating)}>
                <img src={GroupIcon} alt="" />
            </button>
        </div>
    )
}

export default EmptyChannel