import * as React from 'react';
import styled from 'styled-components';

const SWrapper: any = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(255, 255, 255, 0.7);
`;

export const Loader: React.StatelessComponent = () => (
    <SWrapper>
        <div className="spinner">
        <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
            <circle className="length" fill="none" stroke-width="8" stroke-linecap="round" cx="33" cy="33" r="28"/>
        </svg>
        <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
            <circle fill="none" stroke-width="8" stroke-linecap="round" cx="33" cy="33" r="28"/>
        </svg>
        <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
            <circle fill="none" stroke-width="8" stroke-linecap="round" cx="33" cy="33" r="28"/>
        </svg>
        <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
            <circle fill="none" stroke-width="8" stroke-linecap="round" cx="33" cy="33" r="28"/>
        </svg>
    </div>
    </SWrapper>
);