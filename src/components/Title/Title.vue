<template>
    <div class="title">
        <div class="back" @click="$emit('goBack')">
            <img  src="@/assets/images/Kanban/left.png" alt="">
        </div>
        <div class="font">{{title}}</div>
        <slot></slot>
    </div>
</template>

<script>
import './Title.scss'
    export default {
        props:['title']
    }
</script>