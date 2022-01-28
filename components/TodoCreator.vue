<template>
    <div>
        <button @click="createTodo">추가</button>
        <input 
        v-model="title"
        placeholder="할 일을 추가하세요!"
        type="text" 
        @input="title = $event.target.value"
        @keypress.enter="createTodo"
        />
    </div>
</template>

<script>
export default{
    data(){
        return{
            title : '',
            placeholder : '할 일을 추가하세요!'
        }
    },
    methods:{
        createTodo(){
            //생성
            this.$emit('create-todo',this.title)

            console.log(this.title)
        }
    }
}
</script>
