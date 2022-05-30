import React from 'react';

const BoardItem = ({board, item, dragOverHandler, dragLeaveHandler, dragStartHandler, dragEngHandler, dropHandler, editTheBoardItem}) => {
    return (
        <div className="border m-2 rounded bg-white p-1 shadow hover:bg-gray-100"
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
             onClick={(e) =>{
                 editTheBoardItem(board,item,e)
             }}
        >
            {item.title}
        </div>
    );
};

export default BoardItem;