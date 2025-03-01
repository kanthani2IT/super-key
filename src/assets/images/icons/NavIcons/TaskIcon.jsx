import React from 'react'

const TaskIcon = ({ fill = '#7C7C7C' }) => {
    return (
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 11V16C18 16.5304 17.7893 17.0391 17.4142 17.4142C17.0391 17.7893 16.5304 18 16 18H2C1.46957 18 0.960859 17.7893 0.585786 17.4142C0.210714 17.0391 0 16.5304 0 16V2C0 1.46957 0.210714 0.960859 0.585786 0.585786C0.960859 0.210714 1.46957 0 2 0H7V2H2V16H16V11H18Z" fill={fill} />
            <path d="M18 4H14V0H12V4H8V6H12V10H14V6H18V4Z" fill={fill} />
        </svg>

    )
}

export default TaskIcon