<template>
  <div class="d-flex flex-column">
    <div class="d-flex align-items-center">
      <p class="m-0">Type:</p>
      <button
        class="btn btn-outline-primary mx-1"
        @click="event_type = 'button'"
        :class="{ active: event_type == 'button' }"
      >
        Button
      </button>
      <button
        class="btn btn-outline-primary mx-1"
        @click="event_type = 'form'"
        :class="{ active: event_type == 'form' }"
      >
        Form
      </button>
    </div>
    <div class="d-flex my-2">
      <div class="w-50 mr-1">
        <label for="start_time">Start Time: </label>
        <div id="start_time" class="input-group d-flex">
          <input
            class="form-control"
            type="number"
            v-model="time_start_minute"
            placeholder="mm"
            min="0"
          />
          <input
            class="form-control"
            type="number"
            v-model="time_start_seconds"
            placeholder="ss"
            min="0"
          />
        </div>
      </div>
      <div class="w-50 ml-1">
        <label for="duration">Duration(in seconds): </label>
        <input
          class="form-control"
          type="number"
          id="duration"
          v-model="duration"
          min="2"
        />
      </div>
    </div>
    <div class="d-block" v-if="event_type == 'button'">
      <div class="row my-2" v-for="n in buttonNumber" :key="n">
        <div class="col">
          <div class="card p-4">
            <h4 class="card-title">Button {{ n }}</h4>
            <div class="d-flex">
              <div class="w-50 mr-1">
                <label for="btn_label">Button Label</label>
                <input
                  class="form-control"
                  type="text"
                  id="btn_label"
                  :placeholder="`Enter button ${n} text...`"
                  v-model="buttons[n - 1].text"
                />
              </div>
              <div class="w-50 ml-1">
                <label for="btn_url">Button Url</label>
                <input
                  class="form-control"
                  type="text"
                  id="btn_url"
                  :placeholder="`Enter button ${n} url...`"
                  v-model="buttons[n - 1].link"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        class="btn btn-outline-success shadow-none"
        v-if="buttonNumber < 2"
        @click="buttonNumber += 1"
      >
        Add button
      </button>
      <button
        class="btn btn-outline-danger shadow-none"
        v-if="buttonNumber >= 2"
        @click="buttonNumber -= 1"
      >
        Remove button
      </button>
    </div>
    <div class="d-block" v-if="event_type == 'form'">
      <div class="row">
        <div class="col">
          <label for="input_url">Form Link :</label>
          <input type="text" placeholder="Enter url for sending form data to..." class="form-control" v-model="input_link">
        </div>
      </div>
      <div class="row my-2" v-for="n in inputNumber" :key="n">
        <div class="col">
          <div class="card p-4">
            <h4 class="card-title">Input {{ n }}</h4>
            <div class="input-group">
              <div class="form-control d-flex align-items-center justify-content-between p-0">
                <label for="input_type" class="m-0 ml-2">Input type :</label>
              <select name="input_type" id="input_type" class="form-select border-0 shadow-none m-0 mr-2" v-model="inputs[n-1].type" style="outline:none!important;">
                <option value="text" >Text</option>
                <option value="email">Email</option>
                <option value="textarea">Text Area</option>
              </select>

              </div>
              <input
                class="form-control"
                type="text"
                id="btn_label"
                :placeholder="`Enter Input ${n} name...`"
                v-model="inputs[n - 1].name"
              />
              <input
                class="form-control"
                type="text"
                id="btn_url"
                :placeholder="`Enter input ${n} placeholder...`"
                v-model="inputs[n - 1].placeholder"
              />
            </div>
          </div>
        </div>
      </div>
      <button
        class="btn btn-outline-success shadow-none"
        v-if="inputNumber < 4"
        @click="inputNumber += 1"
      >
        Add input
      </button>
      <button
        class="btn btn-outline-danger shadow-none"
        v-if="inputNumber >= 4"
        @click="inputNumber -= 1"
      >
        Remove input
      </button>
    </div>
    <div class="d-flex justify-content-center border-1 border-top  mt-4">
      <button class="btn btn-outline-success mt-4 px-5" @click="saveEvent()">Add to event list</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventAdder",
  data() {
    return {
      typeButton: true,
      typeForm: false,
      time_start_minute: 0,
      time_start_seconds: 0,
      time_start:null,
      buttonNumber: 1,
      inputNumber: 1,
      event_type: "button",
      input_link:'',
      duration: 0,
      buttons: [{}, {}],
      inputs: [{}, {}, {}, {}],
    };
  },
  watch: {
    time_start_minute() {
      this.time_start =
        this.time_start_minute * 60 + this.time_start_seconds;
    },
    time_start_seconds() {
      this.time_start =
        this.time_start_minute * 60 + this.time_start_seconds;
    },
  },
  methods:{
    saveEvent(){
      if(this.event_type == 'button'){
        let eventObj = {
          time_start:this.time_start,
          duration:this.duration,
          event_type:this.event_type,
          buttons:[]
        }
        let btnData = this.buttons;
        for(let i=0;i< btnData.length;i++){
          if(Object.keys(btnData[i]).length > 1){
            eventObj.buttons.push(btnData[i])
          }
        }
        this.$emit('eventSave', eventObj);
      }
      if(this.event_type == 'form'){
        let eventObj = {
          time_start:this.time_start,
          duration:this.duration,
          event_type:this.event_type,
          input:[],
          link:this.input_link
        }
        let inpData = this.inputs;
        for(let i=0;i< inpData.length;i++){
          if(Object.keys(inpData[i]).length > 1){
            eventObj.input.push(inpData[i])
          }
        }
        this.$emit('eventSave', eventObj);
      }
    }
  }
};
</script>