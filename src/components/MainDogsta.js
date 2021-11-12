import React from 'react'
import styled from 'styled-components'

function MainDogsta() {
    return (
        <div>
            <Dogsta
                src={'https://media.nature.com/lw800/magazine-assets/d41586-020-01430-5/d41586-020-01430-5_17977552.jpg'}
            ></Dogsta>
        </div>
    )
}

const Dogsta = styled.img`
    width: 80px;
    height: 80px;
    box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.25);
    border-radius: 14px;
`

export default MainDogsta
