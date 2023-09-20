/* eslint-disable react/prop-types */
import Data from "./Data";

const Todos = ({todos , onEdit, onDelete}) => {
    
    return(
        <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
            {todos.map(todo => {
                return(<Data 
                        key={todo.id} 
                        todo={todo}
                        onEdit={onEdit} 
                        onDelete={onDelete}
                        />
            )})}
        </div>
    )
}

export default Todos;