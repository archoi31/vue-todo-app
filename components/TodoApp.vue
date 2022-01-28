<template>
    <div>    
        <todo-item />
        <todo-creator/>
    </div>
</template>

<script>
import { Low, JSONFile } from 'lowdb'
import lodash from 'lodash'
import cryptoRandomString from 'crypto-random-string'
import TodoCreator from './TodoCreator'
import TodoItem from './TodoItem'

export default{
    components:{
        TodoCreator,
        TodoItem
    },
    data(){
            const adapter = new JSONFile('./db.json')//DB
            const db = new Low(adapter)
        return{
            
            db: db
        }
    },
    created(){
        this.initDB()
    },
    methods : {
        initDB(){
                
            console.log(this.db)
                    
          
            // If file.json doesn't exist, db.data will be null
            // Set default data
            // db.data = db.data || { posts: [] } // Node < v15.x
            this.db.data ||= { todos: [] }             // Node >= 15.x

            // Create and query items using plain JS
            this.db.data.todos.push('hello world')
            this.db.data.todos[0]


        },
        createTodo(title){
           
            const newTodo = {
                id : cryptoRandomString({length:10}),
                title,
                createdAt : new Date(),
                updateAt : new Date(),
                done:false
            }
            this.db.chain = lodash.chain(this.db.data)
            
            this.db.chain
            .get('todos') //lodash
            .find(newTodo) //lodash
            .value()//lowdb
        }
    }
}
</script>
