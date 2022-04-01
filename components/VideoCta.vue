<template>
  <form class="card p-3" @submit.prevent="formSubmit(event)" method="post">
    <div class="mb-3" v-for="(input, index) in event.inputs" :key="index">
      <div class="text-capitalize"
        v-if="
          input.type == 'text' ||
          input.type == 'email' ||
          input.type == 'textarea'
        "
      >
        <label :for="`input-${index}`">{{ input.name }}</label>
        <input
          class="form-control"
          v-model="formInputs[index]"
          :name="`input-${index}`"
          :id="`input-${index}`"
          :type="input.type"
          :placeholder="input.placeholder"
        />
      </div>
      <div class="text-capitalize" v-if="input.type == 'dropdown'">
          <b-form-select v-model="formInputs[index]" :options="input.options"></b-form-select>       
      </div>
      <div class="text-capitalize" v-if="input.type == 'radio'">
        <p>{{ input.name }}</p>
        <div v-for="(items, radioIndex) in input.options" :key="radioIndex">
          <input type="radio" v-model="formInputs[index]" :value="items" :name="input.name" :id="`radio-${radioIndex}`" />
          <label :for="`radio-${radioIndex}`">{{ items }}</label>
        </div>
      </div>
      <div class="text-capitalize" v-if="input.type == 'checkbox'">
        <p>{{ input.name }}</p>
        <div v-for="(items, checkIndex) in input.options" :key="checkIndex">
          <input type="checkbox" @click="checkFunc({inpIndex:index,checkIndex:checkIndex,id:`checkbox-${checkIndex}`,text:items})" :name="input.name" :id="`checkbox-${checkIndex}`" />
          <label :for="`checkbox-${checkIndex}`">{{ items }}</label>
        </div>
      </div>
    </div>
    <button class="btn btn-outline-primary">Submit</button>
  </form>
</template>

<script>
import axios from 'axios';
export default {
  name: "VideoForm",
  props:{
      videoName:String,
      event:Object
  },
  data() {
    return {
        dropdownVal:'select an opt',
        formInputs:[],
    };
  },
  methods: {
      checkFunc(val){
        var selCheck = document.getElementById(val.id).checked;
            if(!this.formInputs[val.inpIndex]){
                this.formInputs[val.inpIndex] = [];
            }
        if(selCheck){
            this.formInputs[val.inpIndex][val.checkIndex] = val.text;
        }
        else{
            this.formInputs[val.inpIndex][val.checkIndex] = undefined
        }
      },
    async formSubmit(val) {
      var inputs = this.formInputs;

      var qAns = [];
      inputs.forEach((element, index) => {
          if(typeof element == 'string'){
            var qaObj = {
              ques: `${val.inputs[index].name}`,
              ans: `${element}`,
            };
            qAns.push(qaObj);
          }else{
            var ans = []
            element.forEach((el)=>{
              ans.push(el)
            });
            var qaObj = {
              ques: `${val.inputs[index].name}`,
              ans: ans,
            };
      console.log(ans)
            qAns.push(qaObj);
          }
      });
      console.log(qAns)
      let user = JSON.parse(localStorage.getItem("user")).login_user;
      const formData = new FormData();
      formData.append("video_id", this.$route.query.id);
      formData.append("video_name", this.videoName);
      formData.append("user", user);
      formData.append("form_data", JSON.stringify(qAns));

      await axios.post(`/form-submit`, formData).then((response)=>{this.$emit('submitted')})        
        .catch ((err)=>{
        console.log(err);
      })
      this.$emit("refreshList");
    },
  },
};
</script>