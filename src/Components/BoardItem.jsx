import React from 'react';

const BoardItem = ({board, item, dragOverHandler, dragLeaveHandler, dragStartHandler, dragEngHandler, dropHandler}) => {
    return (
        <div className="border m-2 rounded bg-white p-2 shadow"
             draggable={true}
             onDragOver={(e) => {
                 dragOverHandler(e)
             }}
             onDragLeave={(e) => {
                 dragLeaveHandler(e)
             }}
             onDragStart={(e) => {
                 dragStartHandler(e, board, item)
             }}
             onDragEnd={(e) => {
                 dragEngHandler(e)
             }}
             onDrop={(e) => {
                 dropHandler(e, board, item)
             }}
        >
            {item.title}
        </div>
    );
};

export default BoardItem;