import React from 'react'
import { useResultContext } from '../../context/customContext'

import GroupIcon from '../../assets/GroupIcon.svg'

const EmtyList = () => {
    const { setIsCreating, isCreating } = useResultContext()
    return (
        <div className='empty__list-container'>
            <button type='button' onClick={() => setIsCreating(!isCreating)}>
                <img src={GroupIcon} alt="" />
            </button>
        </div>
    )
}

export default EmtyList