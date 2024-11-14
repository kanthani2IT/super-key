import ComponentSkeleton from 'pages/component-overview/ComponentSkeleton'
import ComponentWrapper from 'pages/component-overview/ComponentWrapper'
import React from 'react'

const MainContainer = ({ children }) => {
    return (
        <ComponentSkeleton>
            <ComponentWrapper>
                {children}
            </ComponentWrapper>
        </ComponentSkeleton>
    )
}

export default MainContainer