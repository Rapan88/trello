import {useState} from "react";

function App() {
    const [boards, setBoards] = useState([
        {
            id: 1,
            title: "Зробити",
            isInput: false,
            isButton: true,
            items: [{id: 1, title: "Піти в магазин"}, {id: 2, title: "Піти в магазин2"}, {
                id: 3,
                title: "Піти в магазин3"
            }]
        },
        {
            id: 2,
            title: "Доробити",
            isInput: false,
            isButton: true,
            items: [{id: 4, title: "Піти в магазин4"}, {id: 5, title: "Піти в магазин5"}, {
                id: 6,
                title: "Піти в магазин6"
            }]
        },
        {
            id: 3,
            title: "Зроблено",
            isInput: false,
            isButton: true,
            items: [{id: 7, title: "Піти в магазин7"}, {id: 8, title: "Піти в магазин8"}, {
                id: 9,
                title: "Піти в магазин9"
            }]
        }])

    const [currentBoard, setCurrentBoard] = useState()
    const [currentItem, setCurrentItem] = useState()
    const [text, setText] = useState("")

    const dragOverHandler = (e) => {
        e.preventDefault();
    }

    function dragLeaveHandler(e) {

    }

    function dragStartHandler(e, board, item) {
        setCurrentItem(item)
        setCurrentBoard(board)
    }

    function dragEngHandler(e) {
    }

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

    return (
        <div className="w-screen h-screen bg-amber-50 flex p-5">
            {boards.map((board =>
                    <div className="bg-gray-100 w-3/12 h-max h-56 border border-black rounded-2xl"
                         onDragOver={(e) => {
                             dragOverHandler(e)
                         }}
                         onDrop={(e => {
                             dropCardHandler(e, board)
                         })}
                    >
                        <div className="text-xl p-2 pl-4">
                            {board.title}
                        </div>
                        <hr/>
                        {board.items.map((item =>
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
                        ))}
                        {board.isInput ? <div><input className="h-16 w-80 p-2 m-3 shadow" value={text} type={"text"}
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
                                    onClick={() => addItemToBoardIsClose(board)}>Добавити
                                картку
                            </button> : null}

                    </div>
            ))}

        </div>

    );
}

export default App;
