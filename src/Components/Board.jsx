import React from 'react';
import BoardItem from "./BoardItem";

const Board = ({
                   board,
                   setBoards,
                   boards,
                   text,
                   setText,
                   setCurrentItem,
                   setCurrentBoard,
                   currentBoard,
                   currentItem

               }) => {


    const dragOverHandler = (e) => {
        e.preventDefault();
    }

    function dragLeaveHandler(e) {

    }

    function dragEngHandler(e) {
    }

    function dragStartHandler(e, board, item) {
        setCurrentItem(item)
        setCurrentBoard(board)
    }

//Tuuuuuuuut
    function dropHandler(e, board, item) {
        e.preventDefault()
        const currentIndex = currentBoard.items.indexOf(currentItem)
        currentBoard.items.splice(currentIndex, 1)
        const dropIndex = board.items.indexOf(item)
        board.items.splice(dropIndex + 1, 0, currentItem)
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                return board
            }
            if (b.id === currentBoard.id) {
                return currentBoard
            }
            return b

        }))
    }


    function dropCardHandler(e, board) {
        const currentId = board.items.map(item => item.id)
        if (!currentId.includes(currentItem.id)) {
            board.items.push(currentItem)
            const currentIndex = currentBoard.items.indexOf(currentItem)
            currentBoard.items.splice(currentIndex, 1)
            setBoards(boards.map(b => {
                if (b.id === board.id) {
                    return board
                }
                if (b.id === currentBoard.id) {
                    return currentBoard
                }
                return b
            }))
        }
    }


    const addItemToBoard = (board) => {
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                board.items.push({id: Date.now(), title: text})
                return board
            }
            return b
        }))
        setText(" ")
        board.isInput = false;
        board.isButton = true
    }

    const closeItemAdder = (board) => {
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                board.isInput = false;
                board.isButton = true
                return board
            }
            return b
        }))
    }

    const addItemToBoardIsClose = (board) => {
        console.log(board)
        setBoards(boards.map(b => {
            if (b.id === board.id) {
                board.isInput = true;
                board.isButton = false
                return board
            }
            return b
        }))
    }

    const changeTheBoardTitle = (e, id) => {
        setBoards(boards.map(b => {
            if (id === b.id) {
                b.title = e.target.value
                return b
            }
            return b
        }))
    }

    const changeTheItemTitle = (e, item, board) => {
        setBoards(boards.map(b => {
            if (board.id === b.id) {
                b.items.map(i => {
                    if (i.id === item.id) {
                        i.title = e.target.value
                        return i
                    }
                    return i
                })
                return b
            }
            return b
        }))
    }

    const editTheBoardItem = (board, item, e) => {
        setBoards(boards.map(b => {
            if (board.id === b.id) {
                b.items.map(i => {
                    if (i.id === item.id) {
                        i.isEdit = !i.isEdit
                        return i
                    }
                    return i
                })
                return b
            }
            return b
        }))
        console.log(item.isEdit)
    }


    return (
        <div className="bg-gray-100 w-72 h-max border border-black rounded-xl m-1"
             onDragOver={(e) => {
                 dragOverHandler(e)
             }}
             onDrop={(e => {
                 dropCardHandler(e, board)
             })}
        >

            <div className="font-medium p-2 pl-4">
                <input type="text" className="bg-gray-100 w-full h-max" value={board.title} onChange={(e) => {
                    changeTheBoardTitle(e, board.id)
                }}></input>
            </div>
            <hr/>
            {board.items.map((item =>
                    item.isEdit ? <div>
                            <div className="top-0 left-0 w-screen h-screen bg-black bg-opacity-60 fixed"
                                 onClick={(e) => {
                                     editTheBoardItem(board, item, e)
                                 }}>
                                <div className="w-6/12 h-screen m-auto mt-10 z-50 bg-gray-50 rounded p-5" onClick={(e) => {
                                    e.stopPropagation()
                                }}>
                                    <div className="flex">
                                        <i className="bi bi-keyboard text-2xl mr-2"></i> <input type="text"
                                                                                                className="w-full h-8 bg-gray-50 font-bold text-xl"
                                                                                                value={item.title}
                                                                                                onChange={(e) => {
                                                                                                    changeTheItemTitle(e, item, board)
                                                                                                }}
                                    />
                                        <div
                                            className="text-2xl font-light ml-3 w-10 h-9 hover:bg-gray-300 rounded-3xl text-center cursor-pointer "
                                            onClick={(e) => {
                                                editTheBoardItem(board, item, e)
                                            }}>×
                                        </div>
                                    </div>

                                    <span className="text-sm font-light ml-8">В колонці </span><span
                                    className="text-sm font-light underline">{board.title}</span>

                                    <div className="flex mt-8">
                                        <div className="w-3/4 h-full">
                                            <i className="bi bi-justify-left text-2xl"></i><span
                                            className="text-lg font-medium ml-2">Опис</span> <br/>
                                            <button
                                                className="mt-3 ml-8 mr-14 h-14 bg-gray-200 rounded w-5/6 text-left pb-5 p-2 text-sm font-light hover:bg-gray-300">Добавити
                                                більш докладний опис...
                                            </button>
                                            <div className="mt-10 flex justify-between">
                                                <div>
                                                    <i className="bi bi-list-ul text-2xl"></i>
                                                    <span className="text-lg font-medium pl-2">Дії</span>
                                                </div>
                                                <button className="w-44 bg-gray-200 rounded h-8 hover:bg-gray-300 text-sm">Показати
                                                    подробиці
                                                </button>
                                            </div>

                                        </div>
                                        <div className="w-1/4 h-full h-96"></div>
                                    </div>

                                </div>
                            </div>

                        </div> :
                        <BoardItem item={item} board={board} dragOverHandler={dragOverHandler}
                                   dragLeaveHandler={dragLeaveHandler} dragEngHandler={dragEngHandler}
                                   dragStartHandler={dragStartHandler} dropHandler={dropHandler}
                                   editTheBoardItem={editTheBoardItem}></BoardItem>
            ))}
            {board.isInput ? <div><input className="h-16 w-64 p-2 m-3 shadow" value={text} type={"text"}
                                         onChange={(e) => setText(e.target.value)} placeholder="Введіть заголовок для цієї
                         картки"/>
                <button className="w-40 bg-blue-700 m-3 text-white p-2 rounded"
                        onClick={() => addItemToBoard(board)}>Добавити картку
                </button>
                <button className="text-2xl ml-2 text-center" onClick={() => closeItemAdder(board)}>×
                </button>
            </div> : null}
            {board.isButton ?
                <button className="w-full text-gray-400 text-left p-3"
                        onClick={() => addItemToBoardIsClose(board)}><span className="text-xl">&#43;</span>Добавити
                    картку
                </button> : null}

        </div>
    );
};

export default Board;