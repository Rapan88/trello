import React, {useState} from "react";
import Board from "./Components/Board";

function App() {
    const [boards, setBoards] = useState([
        {
            id: 1,
            title: "Зробити",
            isInput: false,
            isButton: true,
            items: [{id: 1, title: "Піти в магазин",isEdit: false}, {id: 2, title: "Піти в магазин2",isEdit: false}, {
                id: 3,
                title: "Піти в магазин3",isEdit: false
            }]
        },
        {
            id: 2,
            title: "Доробити",
            isInput: false,
            isButton: true,
            items: [{id: 4, title: "Піти в магазин4",isEdit: false}, {id: 5, title: "Піти в магазин5",isEdit: false}, {
                id: 6,
                title: "Піти в магазин6",isEdit: false
            }]
        },
        {
            id: 3,
            title: "Зроблено",
            isInput: false,
            isButton: true,
            items: [{id: 7, title: "Піти в магазин7",isEdit: false}, {id: 8, title: "Піти в магазин8",isEdit: false}, {
                id: 9,
                title: "Піти в магазин9",isEdit: false
            }]
        }])

    const [currentBoard, setCurrentBoard] = useState()
    const [currentItem, setCurrentItem] = useState()
    const [text, setText] = useState("")
    const [addIsClose, setAddIsClose] = useState(false)
    const [textColumn, setTextColumn] = useState(" ")

    const addColumn = () => {
        if (textColumn) {
            const a = {
                isButton: true,
                isInput: false,
                id: Date.now(),
                title: textColumn,
                items: []
            }
            setTextColumn(" ")
            setBoards([...boards, a])

        }
    }

    return (

        <div className="h-screen w-max flex p-5">
            {boards.map((board =>
                    <Board board={board}
                           boards={boards} currentBoard={currentBoard}
                           currentItem={currentItem} text={text} setText={setText} setBoards={setBoards}
                           setCurrentBoard={setCurrentBoard} setCurrentItem={setCurrentItem}
                    />
            ))}
            <div className="h-max rounded ml-3 bg-gray-100 p-2 w-max">
                {addIsClose ? <div><input className="h-10 w-11/12 p-2 shadow" value={textColumn} type={"text"}
                                          onChange={(e) => setTextColumn(e.target.value)} placeholder="Введіть заголовок для цієї
                         колонки"/>
                        <button className="w-40 bg-blue-700 m-3 text-white p-2 rounded"
                                onClick={() => {
                                    addColumn()
                                }}
                        >Добавити картку
                        </button>
                        <button className="text-2xl ml-2 text-center" onClick={() => {
                            setAddIsClose(false)
                        }}>×
                        </button>
                    </div> :
                    <button className="w-60 text-center" onClick={() => {
                        setAddIsClose(true)
                    }}><span className="text-xl">&#43;</span> Добавити ще одну колонку
                    </button>}

            </div>
        </div>
    );
}

export default App;
