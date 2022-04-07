<template>
  <div class="d-flex flex-column">
    <div class="d-flex align-items-center justify-content-center">
      <b-button-group>
        <button
          class="btn btn-outline-primary"
          @click="event_type = 'button'"
          :class="{ active: event_type == 'button' }"
        >
          Button
        </button>
        <button
          class="btn btn-outline-primary"
          @click="event_type = 'form'"
          :class="{ active: event_type == 'form' }"
        >
          Form
        </button>
        <button
          class="btn btn-outline-primary"
          @click="event_type = 'cta'"
          :class="{ active: event_type == 'cta' }"
        >
          CTA
        </button>
        <b-dropdown id="dropdown-1" text="Position" variant="outline-primary">
          <b-dropdown-item
            class="text-capitalize"
            @click="position = 'top-left'"
            >top left</b-dropdown-item
          >
          <b-dropdown-item
            class="text-capitalize"
            @click="position = 'top-center'"
            >top center</b-dropdown-item
          >
          <b-dropdown-item
            class="text-capitalize"
            @click="position = 'top-right'"
            >top right</b-dropdown-item
          >
          <b-dropdown-item
            class="text-capitalize"
            @click="position = 'middle-left'"
            >middle left</b-dropdown-item
          >
          <b-dropdown-item
            class="text-capitalize"
            @click="position = 'middle-center'"
            >middle center</b-dropdown-item
          >
          <b-dropdown-item
            class="text-capitalize"
            @click="position = 'middle-right'"
            >middle right</b-dropdown-item
          >
          <b-dropdown-item
            class="text-capitalize"
            @click="position = 'bottom-left'"
            >bottom left</b-dropdown-item
          >
          <b-dropdown-item
            class="text-capitalize"
            @click="position = 'bottom-center'"
            >bottom center</b-dropdown-item
          >
          <b-dropdown-item
            class="text-capitalize"
            @click="position = 'bottom-right'"
            >bottom right</b-dropdown-item
          >
        </b-dropdown>
      </b-button-group>
    </div>
    <div class="d-flex my-2">
      <div class="w-50 mr-1">
        <label for="start_time">Start Time (mm:ss): {{ time_start }}</label>
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
      <div v-if="renderInputs == true">
        <div class="row my-2" v-for="(items, index) in buttons" :key="index">
          <FormButtons
            :syncData="items"
            :btnIndex="index"
            @updateBtnData="updateBtnData"
            @deleteButton="deleteButton"
          />
        </div>
      </div>
      <button
        class="btn btn-outline-success shadow-none"
        v-if="buttons.length < 4"
        @click="buttons.push({})"
      >
        Add button
      </button>
      <button
        class="btn btn-outline-danger shadow-none"
        v-if="buttons.length >= 2"
        @click="buttons.pop()"
      >
        Remove button
      </button>
    </div>
    <div class="d-block" v-if="event_type == 'form'">
      <div class="row">
        <div class="col">
          <label for="input_url">Form Title :</label>
          <input
            type="text"
            placeholder="Enter form title"
            class="form-control"
            v-model="form_title"
          />
        </div>
      </div>
      <div v-if="renderInputs == true">
        <div class="row my-2" v-for="(items, index) in inputs" :key="index">
          <FormForms
            :syncData="items"
            :formIndex="index"
            @updateData="updateData"
            @deleteInput="deleteInput"
          />
        </div>
      </div>
      <button
        class="btn btn-outline-success shadow-none"
        v-if="inputs.length < 5"
        @click="inputs.push({})"
      >
        Add input
      </button>
      <button
        class="btn btn-outline-danger shadow-none"
        v-if="inputs.length >= 5"
        @click="inputs.pop()"
      >
        Remove input
      </button>
    </div>
    <div class="d-block" v-if="event_type == 'cta'">
      <div class="block">
        <div class="row">
          <div class="col">
            <label for="input_url">CTA Text :</label>
            <input
              type="text"
              placeholder="Enter CTA text..."
              class="form-control"
              v-model="cta_text"
            />
          </div>
        </div>
        <div v-if="renderInputs == true">
          <div class="row my-2" v-for="(items, index) in inputs" :key="index">
            <FormCta
              :syncData="items"
              :ctaIndex="index"
              @updateData="updateData"
              @deleteInput="deleteInput"
            />
          </div>
        </div>
        <button
          class="btn btn-outline-success shadow-none"
          v-if="inputs.length < 5"
          @click="inputs.push({})"
        >
          Add input
        </button>
        <button
          class="btn btn-outline-danger shadow-none"
          v-if="inputs.length >= 5"
          @click="inputs.pop()"
        >
          Remove input
        </button>
      </div>
    </div>
    <div class="d-flex justify-content-center border-1 border-top mt-4">
      <button class="btn btn-outline-success mt-4 px-5" @click="saveEvent()">
        Add to event list
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "EventAdder",
  props: {
    video_length: Number,
    current_time: Number,
    editEventObj:Object
  },
  data() {
    return {
      time_start_minute: 0,
      time_start_seconds: 0,
      time_start: 0,
      event_type: "button",
      form_title: "",
      duration: 0,
      inputs: [],
      buttons:[],
      position: "top-right",
      cta_text: "",
      renderInputs: true,
    };
  },
  watch: {
    time_start_minute() {
      this.time_start = parseInt(this.time_start_minute) * 60 + parseInt(this.time_start_seconds);
    },
    time_start_seconds() {
      this.time_start = parseInt(this.time_start_minute) * 60 + parseInt(this.time_start_seconds);
    },
    editEventObj(){
      var editObj = this.editEventObj;
      if(editObj!=null && editObj!=undefined && Object.keys(editObj).length > 0){
        console.log('edit',parseInt(editObj.time_start/60),'seconds',editObj.time_start % 60)
        this.time_start_minute = parseInt(editObj.time_start / 60)
        this.time_start_seconds = editObj.time_start % 60
        this.time_start = editObj.time_start
        if(editObj.event_type){this.event_type = editObj.event_type}
        if(editObj.form_title){this.form_title = editObj.form_title}
        if(editObj.duration){this.duration = editObj.duration}
        if(editObj.inputs){this.inputs = editObj.inputs}
        if(editObj.buttons){this.buttons = editObj.buttons}
        if(editObj.position){this.position = editObj.position}
        if(editObj.cta_text){this.cta_text = editObj.cta_text}
        this.renderInputs = false;
        this.$nextTick(() => {
          this.renderInputs = true;
        });
      }
    },
  },
  async created() {
    this.inputs[0] = {};
    this.buttons[0] = {};

  },
  methods: {
    updateData(val) {
      var input = this.inputs;
      input[val.index] = val.inputObj;
      this.inputs = input;
    },
    deleteInput(val) {
      var input = this.inputs;
      if (input[val]) {
        input.splice(val, 1);
      }
      this.inputs = [];
      this.inputs = input;

      this.renderInputs = false;
      this.$nextTick(() => {
        this.renderInputs = true;
      });
    },
    updateBtnData(val) {
      var button = this.buttons;
      button[val.index] = val.buttonObj;
      this.buttons = button;
    },
    deleteButton(val) {
      var button = this.buttons;
      if (button[val]) {
        button.splice(val, 1);
      }
      this.buttons = [];
      this.buttons = button;

      this.renderInputs = false;
      this.$nextTick(() => {
        this.renderInputs = true;
      });
    },
    saveEvent() {
      if (this.event_type == "button") {
        let eventObj = {
          position: this.position,
          time_start: this.time_start,
          duration: this.duration,
          event_type: this.event_type,
          buttons: [],
        };
        let btnData = this.buttons;
        for (let i = 0; i < btnData.length; i++) {
          if (Object.keys(btnData[i]).length > 1) {
            eventObj.buttons.push(btnData[i]);
          }
        }
        this.$emit("eventSave", eventObj);
        this.resetInputs()
      }
      if (this.event_type == "form") {
        let eventObj = {
          position: this.position,
          time_start: this.time_start,
          duration: this.duration,
          event_type: this.event_type,
          inputs: [],
          form_title: this.form_title,
        };
        let inpData = this.inputs;
        var ins = [];
        for (let i = 0; i < inpData.length; i++) {
          if (Object.keys(inpData[i]).length > 1) {
            // alert(inpData[i])
            ins.push(inpData[i]);
          }
        }
        eventObj.inputs = ins;
        this.$emit("eventSave", eventObj);
        this.resetInputs()
      }
      if (this.event_type == "cta") {
        let eventObj = {
          position: this.position,
          time_start: this.time_start,
          duration: this.duration,
          event_type: this.event_type,
          inputs: [],
          cta_text: this.cta_text,
        };
        let inpData = this.inputs;
        var ins = [];
        for (let i = 0; i < inpData.length; i++) {
          if (Object.keys(inpData[i]).length > 1) {
            // alert(inpData[i])
            ins.push(inpData[i]);
          }
        }
        eventObj.inputs = ins;
        this.$emit("eventSave", eventObj);
        this.resetInputs()
      }
    },
    resetInputs(){
      this.time_start_minute =  0
      this.time_start_seconds =  0
      this.time_start =  0
      this.event_type =  "button"
      this.form_title =  ""
      this.duration =  0
      this.inputs =  []
      this.buttons = []
      this.position =  "top-right"
      this.cta_text =  ""
      this.inputs[0] = {}
      this.buttons[0] = {}

      this.renderInputs = false;
      this.$nextTick(() => {
        this.renderInputs = true;
      });
    }
  },
};
</script>