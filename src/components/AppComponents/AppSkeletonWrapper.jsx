import React from 'react'
import AppSkeleton from './AppSkeleton'

const AppSkeletonWrapper = ({ children, loading, width = '100%', height, row = 1 }) => {
    return (
        loading ? <AppSkeleton
            row={row}
            variant={"custom"}
            width={width}
            height={height}
        /> :
            children
    )

}

export default AppSkeletonWrapper