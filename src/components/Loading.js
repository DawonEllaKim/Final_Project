import React from 'react';
import styled from 'styled-components';
import ReactLoading from 'react-loading';

function Loading({type, color}) {
    return (
        <IsLoading>
            <ReactLoading type={'bars'} color={'#ff5656'} weight={'20px'} height={'20px'}/>
        </IsLoading>
    )
}

const IsLoading = styled.div`
    width: 100%;
    text-align: center;
`
export default Loading;
