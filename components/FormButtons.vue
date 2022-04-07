<template>
  <div class="col">
    <div class="card w-100 p-4">
      <div
        class="
          d-flex
          align-items-center
          justify-content-between
          mb-2
          pb-2
          border-bottom border-1
        "
      >
        <h4 class="card-title">Button {{ btnIndex }}</h4>
        <div class="d-flex">
          <b-dropdown
            id="dropdown-2"
            text="Button Action"
            variant="outline-success"
          >
            <b-dropdown-item class="text-capitalize" @click="type = 'redirect', typeFunc()"
              >Redirect to a link</b-dropdown-item
            >
            <b-dropdown-item class="text-capitalize" @click="type = 'completed', typeFunc()"
              >Your completed videos</b-dropdown-item
            >
            <b-dropdown-item class="text-capitalize" @click="type = 'uploaded', typeFunc()"
              >Your uploaded videos</b-dropdown-item
            >
            <b-dropdown-item class="text-capitalize" @click="type = 'social', typeFunc()"
              >Share on Social Media</b-dropdown-item
            >
          </b-dropdown>
          <button
            @click="deleteButton(btnIndex)"
            class="btn btn-outline-danger ml-2"
          >
            Delete
          </button>
        </div>
      </div>
      <div class="d-flex flex-wrap py-4" v-if="type == 'social'">
        <button
          class="btn btn-outline-primary p-4 m-2 social-check shadow-none"
          v-for="(items, key, index) in social"
          :key="index"
          :class="{ active: items }"
          @click="socialFunc(key), emitData()"
        >
          <svg
            v-if="key == 'email'"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="#007bff"
              d="M19,4H5A3,3,0,0,0,2,7V17a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V7A3,3,0,0,0,19,4ZM5,6H19a1,1,0,0,1,1,1l-8,4.88L4,7A1,1,0,0,1,5,6ZM20,17a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V9.28l7.48,4.57a1,1,0,0,0,1,0L20,9.28Z"
            />
          </svg>
          <svg
            v-if="key == 'facebook'"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 24 24"
          >
            <path
              fill="#007bff"
              d="M15.12,5.32H17V2.14A26.11,26.11,0,0,0,14.26,2C11.54,2,9.68,3.66,9.68,6.7V9.32H6.61v3.56H9.68V22h3.68V12.88h3.06l.46-3.56H13.36V7.05C13.36,6,13.64,5.32,15.12,5.32Z"
            />
          </svg>
          
          <svg
            v-if="key == 'linkedin'"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 24 24"
          >
            <path
              fill="#007bff"
              d="M17.5,8.999a5.41868,5.41868,0,0,0-2.56543.64453A.99918.99918,0,0,0,14,8.999H10a.99943.99943,0,0,0-1,1v12a.99942.99942,0,0,0,1,1h4a.99942.99942,0,0,0,1-1v-5.5a1,1,0,1,1,2,0v5.5a.99942.99942,0,0,0,1,1h4a.99942.99942,0,0,0,1-1v-7.5A5.50685,5.50685,0,0,0,17.5,8.999Zm3.5,12H19v-4.5a3,3,0,1,0-6,0v4.5H11v-10h2v.70313a1.00048,1.00048,0,0,0,1.78125.625A3.48258,3.48258,0,0,1,21,14.499Zm-14-12H3a.99943.99943,0,0,0-1,1v12a.99942.99942,0,0,0,1,1H7a.99942.99942,0,0,0,1-1v-12A.99943.99943,0,0,0,7,8.999Zm-1,12H4v-10H6ZM5.01465,1.542A3.23283,3.23283,0,1,0,4.958,7.999h.02832a3.23341,3.23341,0,1,0,.02832-6.457ZM4.98633,5.999H4.958A1.22193,1.22193,0,0,1,3.58887,4.77051c0-.7461.55957-1.22852,1.42578-1.22852A1.2335,1.2335,0,0,1,6.41113,4.77051C6.41113,5.5166,5.85156,5.999,4.98633,5.999Z"
            />
          </svg>
          <svg
            v-if="key == 'twitter'"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
            viewBox="0 0 24 24"
          >
            <path
              fill="#007bff"
              d="M22.99121,3.9502a.99942.99942,0,0,0-1.51074-.85938,7.47956,7.47956,0,0,1-1.873.793,5.15234,5.15234,0,0,0-3.374-1.24219,5.23238,5.23238,0,0,0-5.22363,5.06348A11.03194,11.03194,0,0,1,4.19629,3.78125,1.01154,1.01154,0,0,0,3.33887,3.416a.99852.99852,0,0,0-.78516.5,5.2755,5.2755,0,0,0-.24219,4.76855l-.00195.00195a1.0411,1.0411,0,0,0-.49512.88868,3.04174,3.04174,0,0,0,.02637.43945,5.1854,5.1854,0,0,0,1.56836,3.3125.99813.99813,0,0,0-.06641.76953,5.20436,5.20436,0,0,0,2.36231,2.92187,7.46464,7.46464,0,0,1-3.58985.44825.99975.99975,0,0,0-.665,1.833A12.94248,12.94248,0,0,0,8.46,21.36133,12.7878,12.7878,0,0,0,20.9248,11.998,12.82166,12.82166,0,0,0,21.46,8.35156c0-.06543,0-.13281-.001-.20019A5.76963,5.76963,0,0,0,22.99121,3.9502ZM19.68457,7.16211a.995.995,0,0,0-.2334.70215c.00977.165.00879.331.00879.4873a10.82371,10.82371,0,0,1-.4541,3.08106A10.68457,10.68457,0,0,1,8.46,19.36133a10.93791,10.93791,0,0,1-2.55078-.30078,9.47951,9.47951,0,0,0,2.94238-1.56348A1.00033,1.00033,0,0,0,8.25,15.71094a3.208,3.208,0,0,1-2.21387-.93457q.22413-.04248.44532-.10547a1.00026,1.00026,0,0,0-.08008-1.94336,3.19824,3.19824,0,0,1-2.25-1.72559,5.29929,5.29929,0,0,0,.54492.0459,1.02093,1.02093,0,0,0,.9834-.69629A.9998.9998,0,0,0,5.2793,9.21484,3.19559,3.19559,0,0,1,3.85547,6.542c0-.0664.00195-.13281.00586-.19824a13.01365,13.01365,0,0,0,8.209,3.47949,1.02046,1.02046,0,0,0,.81739-.3584,1.00037,1.00037,0,0,0,.206-.86816,3.15653,3.15653,0,0,1-.08691-.72852A3.23,3.23,0,0,1,16.2334,4.6416a3.18428,3.18428,0,0,1,2.34472,1.02051A.993.993,0,0,0,19.499,5.96a9.27073,9.27073,0,0,0,1.21192-.32226A6.68126,6.68126,0,0,1,19.68457,7.16211Z"
            />
          </svg>
          <svg
            v-if="key == 'whatsapp'"
            xmlns:cc="http://creativecommons.org/ns#"
            xmlns:dc="http://purl.org/dc/elements/1.1/"
            xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape"
            xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
            xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
            xmlns:svg="http://www.w3.org/2000/svg"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            version="1.1"
            id="svg8"
            inkscape:version="0.92.4 (5da689c313, 2019-01-14)"
            sodipodi:docname="1881161.svg"
            x="0px"
            y="0px"
            viewBox="0 0 24 24"
            style="enable-background: new 0 0 24 24"
            xml:space="preserve"
          >
            <path
              fill="#007bff"
              id="path4"
              inkscape:connector-curvature="0"
              d="M16.6,14c-0.2-0.1-1.5-0.7-1.7-0.8c-0.2-0.1-0.4-0.1-0.6,0.1c-0.2,0.2-0.6,0.8-0.8,1c-0.1,0.2-0.3,0.2-0.5,0.1c-0.7-0.3-1.4-0.7-2-1.2c-0.5-0.5-1-1.1-1.4-1.7c-0.1-0.2,0-0.4,0.1-0.5c0.1-0.1,0.2-0.3,0.4-0.4c0.1-0.1,0.2-0.3,0.2-0.4c0.1-0.1,0.1-0.3,0-0.4c-0.1-0.1-0.6-1.3-0.8-1.8C9.4,7.3,9.2,7.3,9,7.3c-0.1,0-0.3,0-0.5,0C8.3,7.3,8,7.5,7.9,7.6C7.3,8.2,7,8.9,7,9.7c0.1,0.9,0.4,1.8,1,2.6c1.1,1.6,2.5,2.9,4.2,3.7c0.5,0.2,0.9,0.4,1.4,0.5c0.5,0.2,1,0.2,1.6,0.1c0.7-0.1,1.3-0.6,1.7-1.2c0.2-0.4,0.2-0.8,0.1-1.2C17,14.2,16.8,14.1,16.6,14 M19.1,4.9C15.2,1,8.9,1,5,4.9c-3.2,3.2-3.8,8.1-1.6,12L2,22l5.3-1.4c1.5,0.8,3.1,1.2,4.7,1.2h0c5.5,0,9.9-4.4,9.9-9.9C22,9.3,20.9,6.8,19.1,4.9 M16.4,18.9c-1.3,0.8-2.8,1.3-4.4,1.3h0c-1.5,0-2.9-0.4-4.2-1.1l-0.3-0.2l-3.1,0.8l0.8-3l-0.2-0.3C2.6,12.4,3.8,7.4,7.7,4.9S16.6,3.7,19,7.5C21.4,11.4,20.3,16.5,16.4,18.9"
            />
          </svg>
        </button>
      </div>
      <div class="d-block" v-if="type == null">
        <p class="text-center text-muted my-4 h5 font-weight-normal">
          Select a button type...
        </p>
      </div>
      <div class="d-block" v-if="type == 'completed'">

        <label for="btn_label">Video button Label</label>
            <input
              @keyup="emitData()"
              class="form-control mb-2"
              type="text"
              id="btn_label"
              :placeholder="`Enter button text...`"
              v-model="text"
            />
        
        <b-dropdown
          class="d-flex"
          id="dropdown-completed"
          text="Select your completed video"
          variant="outline-primary"
        >
          <b-dropdown-item class="text-capitalize" v-for="(items ,index) in createdVideos" :key="index" @click="compFunc({comp_video_id: items.video_id, link: items.video_id})">
            <div class="d-flex">
              <p class="m-0 mr-lg-5 pr-lg-5">{{items.video_name}}</p>
              <p class="m-0 text-muted fw-light fst-italic ml-lg-5 pl-lg-5">video_id:{{items.video_id}}</p>
            </div>
          </b-dropdown-item>
        </b-dropdown>

        <div class="d-flex mt-4 justify-content-between">
          <div class="d-flex">
            <p class="fw-bold mr-2">Selected video:</p>
            <p class="text-capitalize"> {{text}}</p>
          </div>
          <p class="text-muted fst-italic">{{comp_video_id}}</p>
        </div>
      </div>
      <div class="d-block" v-if="type == 'uploaded'">

        <label for="btn_label">Video button Label</label>
            <input
              @keyup="emitData()"
              class="form-control mb-2"
              type="text"
              id="btn_label"
              :placeholder="`Enter button text...`"
              v-model="text"
            />
        
        <b-dropdown
          class="d-flex"
          id="dropdown-completed"
          text="Select your uploaded video"
          variant="outline-primary"
        >
          <b-dropdown-item class="text-capitalize" v-for="(items ,index) in uploadedVideos" :key="index" @click="uploadFunc({up_video_id: items.id, link: items.url})">
            <div class="d-flex">
              <p class="m-0 mr-lg-5 pr-lg-5">{{items.name}}</p>
              <p class="m-0 text-muted fw-light fst-italic ml-lg-5 pl-lg-5">video_id:{{items.id}}</p>
            </div>
          </b-dropdown-item>
        </b-dropdown>

        <div class="d-flex mt-4 justify-content-between">
          <div class="d-flex">
            <p class="fw-bold mr-2">Selected video:</p>
            <p class="text-capitalize"> {{text}}</p>
          </div>
          <p class="text-muted fst-italic">{{up_video_id}}</p>
        </div>
      </div>
      <div class="d-block" v-if="type == 'redirect'">
        <h5 class="my-2 text-muted">Redirect to:</h5>
        <div class="d-flex">
          <div class="w-50 mr-1">
            <label for="btn_label">Button Label</label>
            <input
              @keyup="emitData()"
              class="form-control"
              type="text"
              id="btn_label"
              :placeholder="`Enter button ${btnIndex} text...`"
              v-model="text"
            />
          </div>
          <div class="w-50 ml-1">
            <label for="btn_url">Button Url</label>
            <input
              @keyup="emitData()"
              class="form-control"
              type="text"
              id="btn_url"
              :placeholder="`Enter button ${btnIndex} url...`"
              v-model="link"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "FormButtons",
  props: {
    btnIndex: Number,
    syncData: Object,
  },
  data() {
    return {
      text: "",
      link: "",
      type: null,
      comp_video_id:null,
      up_video_id:null,
      social: {
        email: false,
        facebook: false,
        linkedin: false,
        twitter: false,
        whatsapp: false,
      },
      createdVideos: [],
      uploadedVideos: [],
    };
  },
  async created() {
    if (
      this.syncData != null &&
      this.syncData != undefined &&
      Object.keys(this.syncData).length > 0
    ) {
      if (this.syncData.type == "redirect") {
        this.type = this.syncData.type;
        this.text = this.syncData.text;
        this.link = this.syncData.link;
      }
      if (this.syncData.type == "completed") {
        this.type = this.syncData.type;
        this.text = this.syncData.text;
        this.link = this.syncData.link;
        this.comp_video_id = this.syncData.comp_video_id
      }
      if (this.syncData.type == "uploaded") {
        this.type = this.syncData.type;
        this.text = this.syncData.text;
        this.link = this.syncData.link;
        this.up_video_id = this.syncData.up_video_id
      }
      if (this.syncData.type == "social") {
        this.type = this.syncData.type;
        this.social = this.syncData.social;
      }
    }
    this.fetchCompleted();
    this.fetchUploaded();
  },
  methods: {
    typeFunc() {
      this.text= ""
      this.link= ""
      this.comp_video_id=null
      this.up_video_id=null
      this.social= {
        email: false,
        facebook: false,
        linkedin: false,
        twitter: false,
        whatsapp: false
      }
      this.createdVideos= [];
      if (this.type == "completed") {
        this.fetchCompleted();
      }
      if (this.type == "uploaded") {
        this.fetchUploaded();
      }
    },
    async fetchCompleted() {
        let user = this.$store.state.auth.user;
        await axios.get(`/created-videos/${user}`).then((response) => {
          this.createdVideos = response.data;
          console.log(response.data);
        });
    },
    async fetchUploaded() {
        let user = this.$store.state.auth.user;
        await axios
        .get(`/videos/${user}`)
        .then((response) => {
          this.uploadedVideos = response.data;
          console.log(response.data);
        });
    },
    socialFunc(val) {
      this.social[`${val}`] = !this.social[`${val}`];
      this.emitData()
      // alert(val)
    },
    compFunc(val){
      // console.log(val)
      this.link = val.link
      this.comp_video_id = val.comp_video_id
      this.emitData()
      // comp_video_id = items.video_id, text = items.video_name, link = items.video_url
    },
    uploadFunc(val){
      // console.log(val)
      this.link = val.link
      this.up_video_id = val.up_video_id
      this.emitData()
      // comp_video_id = items.video_id, text = items.video_name, link = items.video_url
    },
    emitData() {
      if (this.type != null) {
        var buttonObj = {};
        if (this.type == "redirect") {
          buttonObj = {
            text: this.text,
            link: this.link,
            type: this.type,
          };
        }
        if (this.type == "completed") {
          buttonObj = {
            text: this.text,
            link: this.link,
            type: this.type,
          };
        }
        if (this.type == "uploaded") {
          let linkChk = (val)=>{
            if(this.isValidHttpUrl(val)){
                return `${val}`
            }else{
                return `${window.location.origin}${val}`
            }
          }

          buttonObj = {
            text: this.text,
            link: linkChk(this.link),
            type: this.type,
          };
        }
        if (this.type == "social") {
          buttonObj = {
            link: this.link,
            social: this.social,
            type: this.type,
          };
        }
        var shareObj = {
          index: this.btnIndex,
          buttonObj: buttonObj,
        };
        this.$emit("updateBtnData", shareObj);
      }
    },
    isValidHttpUrl(val) {
        let url;

        try {
          url = new URL(val);
        } catch (_) {
          return false;
        }

        return url.protocol === "http:" || url.protocol === "https:";
    },
    deleteButton(val) {
      this.$emit("deleteButton", val);
    },
  },
};
</script>

<style scoped>
.social-check {
  /* display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column-reverse;
  width: 140px;
  background-color: blueviolet;
  padding: 1.5rem 2.5rem;
  margin: 0.5rem auto; */
}
.social-check svg {
  width: 3.5rem;
}
.social-check:hover svg path {
  fill: #fff;
}
.active svg path {
  fill: #fff;
}
</style>