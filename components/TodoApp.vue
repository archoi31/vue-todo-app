<template>
    <div>    
        <todo-item />
        <todo-creator @create-todo="createTodo" />
    </div>
</template>

<script>
import { join, dirname } from 'path'
import { LowSync, JSONFile } from 'lowdb'
import { Url } from 'url'
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
        return{
            db: null
        }
    },
    created(){ //TodoApp 생성 직 후 실행
        this.initDB()
    },
    methods : {
        initDB(){
            
            const adapter = new LowSync(new LocalStorage('todo-app'))
            this.db = new Low(adapter)
            console.log("adapter")
            this.db.data ||= { 
                todos: [] //Collection
            }      
            this.db.write()

        },
        createTodo(title){
          
            const newTodo = {
                id : cryptoRandomString({length:10}),
                title,
                createdAt : new Date(),
                updateAt : new Date(),
                done:false
            }
           this.db.data.push(newTodo)
            
            
            this.db.write()
            // this.db.chain = lodash.chain(this.db.data)
            
            // this.db.chain
            // .get('todos') //lodash
            // .find(newTodo) //lodash
            // .value()//lowdb

        }
    }
}
</script>
