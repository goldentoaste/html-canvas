import logo from './logo.svg';
import './App.css';
import Canvas from './scripts/canvas';
import Vector2 from './scripts/vector2';
import { useRef } from 'react';
import { TransformGrid, CanvasTransforms } from './scripts/transformGrid';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const print = (item) => {
    console.log(item);
};

const proto = CanvasRenderingContext2D.prototype;
const transforms = [
    new CanvasTransforms(proto.translate, [200, 200]),

    new CanvasTransforms(proto.rotate, [Vector2.d2r(45)]),
    new CanvasTransforms(proto.scale, [0.5, 1]),
];
const objects = [new TransformGrid(transforms)];

const reorder = (list, startIndex, endIndex) => {
    const [removed] = list.splice(startIndex, 1);
    list.splice(endIndex, 0, removed);
};

const onDragEnd = (result) => {
    if (!result.destination) {
        return;
    }
    reorder(transforms, result.source.index, result.destination.index);
};

const itemStyle = (isDragging, draggableStyle) => ({
    padding: 12,
    background: '#f0f0f0',
    ...draggableStyle,
});

const transformContainer = (item) => {
    switch (item.func) {
        case proto.translate:
            return (
                <div>
                    <label>Translation</label>
                    <div>
                        <label>X:</label>
                        <input
                            type={'number'}
                            onChange={(eve) => {
                                item.params[0] = parseInt(eve.target.value);
                            }}
                        ></input>
                    </div>
                    <div>
                        <label>Y:</label>
                        <input
                            type={'number'}
                            onChange={(eve) => {
                                item.params[1] = parseInt(eve.target.value);
                            }}
                        ></input>
                    </div>
                </div>
            );
        case proto.rotate:
            return (
                <div>
                    <label>Rotation</label>
                    <div>
                        <label>Angle(degrees):</label>
                        <input
                            type={'number'}
                            onChange={(eve) => {
                                item.params[0] = Vector2.d2r(parseInt(eve.target.value));
                            }}
                        ></input>
                    </div>
                </div>
            );
        case proto.scale:
            return (
                <div>
                    <label>Scale</label>
                    <div>
                        <label>X:</label>
                        <input
                            type={'number'}
                            onChange={(eve) => {
                                item.params[0] = parseFloat(eve.target.value);
                            }}
                        ></input>
                    </div>
                    <div>
                        <label>Y:</label>
                        <input
                            type={'number'}
                            onChange={(eve) => {
                                item.params[1] = parseFloat(eve.target.value);
                            }}
                        ></input>
                    </div>
                </div>
            );
        default:
            print('get fucked!');
    }
};

function App() {
    let listRef = useRef(objects);
    return (
        <div className='App'>
            <Canvas
                objects={listRef}
                onClick={(eve, ctx) => {}}
                onRelease={(eve, ctx) => {}}
                onMove={(eve, ctx) => {}}
                onRender={(ctx) => {}}
                needRendering={true}
                props={{ width: 1000, height: 1000 }}
            />
            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId='wow!'>
                    {(provided, snapshot) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            style={{ width: 200, padding: 6, background: '#40f076' }}
                        >
                            {transforms.map((item, index) => (
                                <Draggable key={index} draggableId={'' + index} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={itemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                        >
                                            {transformContainer(item)}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default App;
