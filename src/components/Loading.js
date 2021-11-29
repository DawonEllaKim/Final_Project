import React from 'react';
import styled from 'styled-components';

function Loading() {
    return (
        <IsLoading>
            로딩중...
        </IsLoading>
    )
}

const IsLoading = styled.div`
    border: 1px solid red;
    width: 100%;
    height: 30px;
`

export default Loading
