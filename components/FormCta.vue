<template>
  <div class="col">
    <div class="card p-4">
      <div
        class="d-flex justify-content-between mb-3 pb-3 border-bottom border-1"
      >
        <h4 class="card-title">Input-{{ ctaIndex + 1 }}</h4>
        <button @click="deleteInput(ctaIndex)" class="btn btn-outline-danger">
          Delete
        </button>
      </div>
      <div class="input-group mb-2 d-flex align-items-center">
        <label for="input_type" class="m-0">Input type :</label>
        <select
          name="input_type"
          id="input_type"
          class="
            form-select
            border-1
            ml-2
            px-2
            border-success
            rounded
            py-1
            shadow-none
            m-0
            mr-2
          "
          v-model="type"
          style="outline: none !important"
        >
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="textarea">Text Area</option>
          <option value="dropdown">Dropdown</option>
          <option value="radio">Radio</option>
          <option value="checkbox">Checkbox</option>
        </select>
      </div>
      <div class="d-flex align-items-center justify-content-between p-0">
        <input
          @keyup="emitData()"
          v-if="type == 'text' || type == 'email' || type == 'textarea'"
          class="form-control mr-1"
          type="text"
          id="btn_label"
          :placeholder="`Enter Input ${ctaIndex} label...`"
          v-model="inputName"
        />
        <input
          @keyup="emitData()"
          v-if="type == 'text' || type == 'email' || type == 'textarea'"
          class="form-control ml-1"
          type="text"
          id="btn_url"
          :placeholder="`Enter input ${ctaIndex} placeholder...`"
          v-model="placeholder"
        />
        <div class="d-flex flex-column w-100" v-if="type == 'radio'">
          <input
            @keyup="emitData()"
            class="form-control"
            type="text"
            id="btn_url"
            :placeholder="`Enter radio question...`"
            v-model="inputName"
          />
          <div class="d-flex w-100 px-0 my-1" v-for="(items, index) in radioArray" :key="index">
            <input
              @keyup="emitData()"
              class="form-control"
              type="text"
              :id="`radio_${index}`"
              :placeholder="`Enter radio option ${index+1} label...`"
              v-model="radioArray[index]"
            />
            <button
              type="button"
              class="btn btn-outline-danger ml-1"
              v-if="radioArray.length > 2"
              @click="deleteOpt(i - 1)"
            >
              X
            </button>
          </div>
          <b-button
            v-if="radioArray.length < 5"
            @click="radioArray.push('')"
            variant="outline-success"
            >Add more radio option</b-button
          >
          <b-button
            v-if="radioArray.length >= 2"
            @click="radioArray.pop()"
            variant="outline-danger mt-2"
            >Remove last radio option</b-button
          >
        </div>
        <div class="d-flex flex-column w-100" v-if="type == 'dropdown'">
          <input
            @keyup="emitData()"
            class="form-control"
            type="text"
            id="btn_url"
            :placeholder="`Enter dropdown name...`"
            v-model="inputName"
          />
          <div class="d-flex w-100 px-0 my-1" v-for="(items, index) in dropArray" :key="index">
            <input
              @keyup="emitData()"
              class="form-control"
              type="text"
              :id="`dropdown_${index}`"
              :placeholder="`Enter dropdown option ${index+1}...`"
              v-model="dropArray[index]"
            />
            <button
              type="button"
              class="btn btn-outline-danger ml-1"
              v-if="dropArray.length >= 2"
              @click="deleteOpt(index)"
            >
              X
            </button>
          </div>
          <b-button
            v-if="dropArray.length < 5"
            @click="dropArray.push('')"
            variant="outline-success"
            >Add more dropdown option</b-button
          >
          <b-button
            v-if="dropArray.length > 2"
            @click="dropArray.pop()"
            variant="outline-danger mt-2"
            >Remove last dropdown option</b-button
          >
        </div>
        <div class="d-flex flex-column w-100" v-if="type == 'checkbox'">
          <input
            @keyup="emitData()"
            class="form-control"
            type="text"
            id="btn_url"
            :placeholder="`Checkboxes description ( if any )...`"
            v-model="inputName"
          />
          <div class="d-flex w-100 px-0 my-1" v-for="(items, index) in checkArray" :key="index">
            <input
              @keyup="emitData()"
              class="form-control"
              type="text"
              :id="`check_${index}`"
              :placeholder="`Enter checkbox ${index+1} label...`"
              v-model="checkArray[index]"
            />
            <button
              type="button"
              class="btn btn-outline-danger ml-1"
              v-if="checkArray.length >= 1"
              @click="deleteOpt(index)"
            >
              X
            </button>
          </div>
          <b-button
            v-if="checkArray.length < 5"
            @click="checkArray.push('')"
            variant="outline-success"
            >Add more check option</b-button
          >
          <b-button
            v-if="checkArray.length > 1"
            @click="checkArray.pop()"
            variant="outline-danger mt-2"
            >Remove last check option</b-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormCta",
  props: {
    ctaIndex: Number,
    syncData: Object,
  },
  data() {
    return {
      inputName: "",
      placeholder: "",
      type: "text",
      checkArray: [],
      radioArray: [],
      dropArray: [],
    };
  },
  async created(){
      this.radioArray[0]='';
      this.radioArray[1]='';
      this.checkArray[0]='';
      this.dropArray[0]='';
      if(this.syncData!=null && this.syncData!=undefined && Object.keys(this.syncData).length > 0){
          if(this.syncData.name){this.inputName = this.syncData.name} 
          if(this.syncData.type){this.type = this.syncData.type}
          if(this.syncData.type == 'text' || this.syncData.type == 'textarea' || this.syncData.type == 'email'){
              if(this.syncData.placeholder){this.placeholder = this.syncData.placeholder}
          }else if(this.syncData.type == 'radio'){
              if(this.syncData.options){this.radioArray = this.syncData.options}
          }else if(this.syncData.type == 'dropdown'){
              if(this.syncData.options){this.dropArray = this.syncData.options}
          }else if(this.syncData.type == 'checkbox'){
              if(this.syncData.options){this.checkArray = this.syncData.options}
          }
      }
  },
  methods: {
    deleteOpt(val) {
      if (this.type == "radio") {
        var rad = this.radioArray;
        rad.splice(val, 1), (this.radioNum -= 1);
      }
      if (this.type == "dropdown") {
        var drp = this.radioArray;
        drp.splice(val, 1), (this.dropNum -= 1);
      }
      if (this.type == "checkbox") {
        var chk = this.checkArray;
        chk.splice(val, 1), (this.checkNum -= 1);
      }
    },
    emitData() {
      var inputObj = {};
      if (this.type == "text") {
        inputObj = {
          name: this.inputName,
          placeholder: this.placeholder,
          type: this.type,
        };
      }
      if (this.type == "email") {
        inputObj = {
          name: this.inputName,
          placeholder: this.placeholder,
          type: this.type,
        };
      }
      if (this.type == "textarea") {
        inputObj = {
          name: this.inputName,
          placeholder: this.placeholder,
          type: this.type,
        };
      }
      if (this.type == "radio") {
        inputObj = {
          name: this.inputName,
          options: this.radioArray.filter((el) => {
            return el != null || el != undefined;
          }),
          type: this.type,
        };
      }
      if (this.type == "dropdown") {
        inputObj = {
          name: this.inputName,
          options: this.dropArray.filter((el) => {
            return el != null || el != undefined;
          }),
          type: this.type,
        };
      }
      if (this.type == "checkbox") {
        inputObj = {
          name: this.inputName,
          options: this.checkArray.filter((el) => {
            return el != null || el != undefined;
          }),
          type: this.type,
        };
      }
      var shareObj = {
        index: this.ctaIndex,
        inputObj: inputObj,
      };
      this.$emit("updateData", shareObj);
    },
    deleteInput(val) {
      this.$emit("deleteInput", val);
    },
  },
};
</script>