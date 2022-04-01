<template>
    <div class="card position-fixed sidebar-card">
            <div class="card-header">
                <h4 class="card-title">Event List</h4>
            </div>
        <div class="card-body overflow-auto">
            <div class="card my-2" v-for="(items, index) in eventList" :key="index">
                <div class="card-body">
                    <h5 class="card-title">Event {{index}}</h5>
                    <p>Start time: {{parseFloat(items.time_start/60).toPrecision(3)}} minutes</p>
                    <p>Duration: {{parseFloat(items.duration/60).toPrecision(3)}} minutes</p>
                    <p>Event Type: {{items.event_type}} </p>
                </div>
                <div class="card-footer d-flex justify-content-between">
                    <button class="btn btn-outline-warning" @click="editEvent(index)">Edit</button>
                    <button class="btn btn-outline-danger" @click="deleteEvent(index)">Delete</button>
                </div>
            </div>
        </div>
        <div class="card-footer">
            <button class="btn btn-outline-success w-100" @click="createVideo">Create Video Events</button>
        </div>
    </div>
</template>

<script>
export default {
    name:'EventSidebar',
    props:{
        eventList:Array
    },
    methods:{
        deleteEvent(index){
            this.$emit('deleteEvent', index)
        },
        editEvent(index){
            this.$emit('editEvent', index)
        },
        createVideo(){
            this.$emit('createVideo')
        }
    }

}
</script>

<style scoped>
.sidebar-card{
    top: 0;
    right: 0;
    width: 300px;
    height: 100%;
}
</style>