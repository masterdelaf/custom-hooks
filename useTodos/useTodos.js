import { useEffect, useReducer } from "react"
import { todoReducer } from "./todoReducer"

const initialState = []
// Funcion para iniciar localStorage,si hay algo lo trae y si no hay nada sería NULL por lo que inicializamos en array vacío
const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || []
}

export const useTodos = () => {

    const [ todos, dispatch ] = useReducer( todoReducer, initialState, init)

    // Cada vez que haya un cambio en todos se almacena en localstorage
    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
      
    }, [todos])
    

    const handleNewTodo = ( todo ) => {
        // Completamos el action con el type y el payload (en este caso un objeto todo)
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }
        //Ejecuta el dispatch a nuestro useReducer
        dispatch(action)
    }

    const handleTodoDelete = ( id ) => {
        
        const action = {
            type: '[TODO] Delete Todo',
            payload: id
        }

        dispatch(action)
    }

    const handleTodoToggle = (id) => {
               
        const action = {
            type: '[TODO] Toggle Todo',
            payload: id
        }

        dispatch(action)
    }

    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter( todo => !todo.done).length,
        handleNewTodo,
        handleTodoDelete,
        handleTodoToggle,
        
    }
}
