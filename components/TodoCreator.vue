<template>
    <div>
        <button>추가</button>
        <input 
        v-model="title"
        placeholder="할 일을 추가하세요!"
        type="text" 
        @input="title = $event.target.value"
        />
    </div>
</template>

<script>
export default{
    data(){
        return{
            title : ''
        }
    }
}
</script>
