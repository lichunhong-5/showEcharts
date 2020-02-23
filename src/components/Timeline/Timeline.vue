<template>
    <div class="timeline" :key="ins">
        <div class="title">{{data.element_title}}</div>
        <div v-for="(record,record_index) in arr" :key="record_index">
            <div class="dis-flex min-height-30px">
                <span class="width-30">{{record.action_title}}</span>
                <span class="width-70">{{record.approve_date}}</span>
            </div>
            <div class="dis-flex min-height-30px font-1_2 dis-flex-start">
                <span>{{`${record.approver_name}(${record.node_name})`}}</span>
            </div>
        </div>
        <div v-if="!data.fields" class="dis-flex">
            {{'该单据暂无审批记录'}}
        </div>
    </div>
</template>

<script>
    import './Timeline.scss'
    export default {
        props:['data','ins'],
        data() {
            return {
                arr: []
            }
        },
        mounted () {
            if(this.data.records){
                if(this.data.records.constructor === Object){
                    this.arr.push(this.data.records);
                }else if(this.data.records.constructor === Array){
                    this.arr = this.data.records;
                }
            }
            
        },
    }
</script>