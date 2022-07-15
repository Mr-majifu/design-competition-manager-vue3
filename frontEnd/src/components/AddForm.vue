
<script setup>

import { reactive } from "vue";

const state = reactive({
  applicant: '',
  description: '',
  submissionDate: '',
  submissionTime: '',
  score: '',
})

const props = defineProps({
  closeForm: Function,
  getAllEntries: Function
})

const onSubmit = () => {
    fetch("http://localhost:3030/api/entries", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        applicant: state.applicant,
        description: state.description,
        datetime_submitted: state.submissionDate + ' ' + state.submissionTime + ':00',
        score: state.score,
      }),
    })
      .then(request => request.json())
      .then(() => {
        props.closeForm()
        props.getAllEntries()
      })
  }

</script>

<template>
  <div class="addFormShade">
    <div class="addForm">
      <div class='addForm-top'>
        <div class='addForm-title'>
          <span>Add Form</span>
        </div>
        <div class='addForm-close'>
          <span @click="closeForm()">X</span>
        </div>
      </div>

      <div class='addForm-hr'></div>

      <div class='addForm-inputList'>
        <div class='addForm-applicant'>
          <span>Applicant :</span>
          <input type="text" name='applicant' v-model="state.applicant" />
        </div>
        <div class='addForm-description'>
          <span>Description :</span>
          <textarea name='description' v-model="state.description"></textarea>
        </div>
        <div class='addForm-submissionDate'>
          <span>Submission Date :</span>
          <input type="date" name='submissionDate' v-model="state.submissionDate" />
        </div>
        <div class='addForm-submissionTime'>
          <span>Submission time :</span>
          <input type="time" name='submissionTime' v-model="state.submissionTime" />
        </div>
        <div class='addForm-score'>
          <span>Score :</span>
          <input type="text" name='score' v-model="state.score" />
        </div>
      </div>

      <div class='addForm-hr'></div>

      <div class='addForm-bottom'>
        <div class='addForm-bottom-btn'>
          <button class='addForm-bottom-cancelBtn' @click="closeForm">Cancel</button>
        </div>
        <div class='addForm-bottom-btn'>
          <button class='addForm-bottom-createBtn' @click="onSubmit">Create</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.addFormShade {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  background-color: rgba(255, 255, 255, 0);
  display: flex;
  align-items: center;
  animation: addFormShadeAni .5s linear both;
}

@keyframes addFormShadeAni {
  0% {
    transform: translateX(-520px);
    opacity: 0;
  }

  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}

.addForm {
  width: 520px;
  height: 99%;
  background-color: rgb(255, 255, 255);
  border: 2px rgb(250, 179, 0) solid;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
  overflow: scroll;
}

.addForm-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.addForm-title {
  color: rgb(250, 179, 0);
  font-weight: 600;
  font-size: 25px;
  padding: 19px 0px 13px 30px;
}

.addForm-close {
  color: rgb(250, 179, 0);
  font-weight: 600;
  font-size: 25px;
  padding: 19px 21px 13px 0px;
}

.addForm-close span:hover {
  color: rgb(250, 104, 0);
  cursor: pointer;
}

.addForm-hr {
  width: 100%;
  height: 2px;
  background-color: rgb(250, 179, 0);
  margin: 10px auto;
}

.addForm-inputList {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 30px;
}

.addForm-inputList div {
  margin: 22px 0;
}

.addForm-inputList span {
  display: block;
  padding-bottom: 10px;
  color: rgb(250, 179, 0);
}

.addForm-applicant input,
.addForm-score input,
.addForm-submissionDate input,
.addForm-submissionTime input {
  width: 450px;
  height: 28px;
  border: 1px rgb(250, 179, 0) solid;
  border-radius: 4px;
}

.addForm-applicant input:hover {
  border: 1px rgb(250, 104, 0) solid;
}

.addForm-description textarea {
  width: 450px;
  height: 90px;
  resize: none;
  border: 1px rgb(250, 179, 0) solid;
}

.addForm-description textarea:hover {
  border: 1px rgb(250, 104, 0) solid;
}

/* .addForm-submissionDate input:hover, .addForm-submissionTime input:hover {
  cursor: pointer;
} */

.addForm-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.addForm-bottom-cancelBtn {
  margin-left: 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  padding: 8px 14px;
  color: rgb(250, 179, 0);
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(250, 179, 0);
}

.addForm-bottom-cancelBtn:hover {
  background-color: rgb(151, 63, 0);
  color: rgb(255, 255, 255);
  border: 1px solid rgba(250, 104, 0, 0.335);
  transition-duration: .5s;
}

.addForm-bottom-createBtn {
  margin-left: 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  padding: 8px 14px;
  background-color: rgb(250, 179, 0);
  border: none;
  color: rgb(255, 255, 255);
}

.addForm-bottom-createBtn:hover {
  background-color: rgb(250, 104, 0);
  transition-duration: .5s;
}
</style>