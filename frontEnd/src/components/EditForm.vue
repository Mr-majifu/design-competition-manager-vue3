
<script setup>
import { reactive } from 'vue';

const props = defineProps({
  editFormData: Object,
  closeEditForm: Function,
  getAllEntries: Function,
})

const onSubmit = (entryId) => {
  fetch(`http://localhost:3030/api/entry/${entryId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      applicant: props.editFormData.applicant,
      description: props.editFormData.description,
      datetime_submitted: props.editFormData.submissionDate + ' ' + props.editFormData.submissionTime + ':00',
      score: props.editFormData.score,
    }),
  })
    .then(request => request.json())
    .then(() => {
      props.closeEditForm()
      props.getAllEntries()
    })
}

</script>

<template>
  <div class="editFormShade">
    <div class="editForm">
      <div class='editForm-top'>
        <div class='editForm-title'>
          <span>Edit Form</span>
        </div>
        <div class='editForm-close'>
          <span @click="closeEditForm">X</span>
        </div>
      </div>

      <div class="editForm-hr"></div>

      <div class='editForm-inputList'>
        <div class='editForm-applicant'>
          <span>Applicant :</span>
          <input type="text" name='applicant' v-model="editFormData.applicant" />
        </div>
        <div class='editForm-description'>
          <span>Description :</span>
          <textarea name='description' v-model="editFormData.description"></textarea>
        </div>
        <div class='editForm-submissionDate'>
          <span>Submission Date :</span>
          <input type="date" name='submissionDate' v-model="editFormData.submissionDate" />
        </div>
        <div class='editForm-submissionTime'>
          <span>Submission time :</span>
          <input type="time" name='submissionTime' v-model="editFormData.submissionTime" />
        </div>
        <div class='editForm-score'>
          <span>Score :</span>
          <input type="text" name='score' v-model="editFormData.score" />
        </div>
      </div>

      <div class="editForm-hr"></div>

      <div class='editForm-bottom'>
        <div class='editForm-bottom-btn'>
          <button class='editForm-bottom-cancelBtn' @click="closeEditForm">Cancel</button>
        </div>
        <div class='editForm-bottom-btn'>
          <button class='editForm-bottom-submitBtn' @click="onSubmit(editFormData.id)">Submit</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.editFormShade {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  height: 100%;
  background-color: rgba(255, 255, 255, 0);
  display: flex;
  align-items: center;
  animation: editFormShadeAni .5s linear both;
}

@keyframes editFormShadeAni {
  0% {
    transform: translateX(-520px);
    opacity: 0;
  }

  100% {
    opacity: 1;
    transform: translateX(0px);
  }
}

.editForm {
  width: 520px;
  height: 99%;
  background-color: rgb(255, 255, 255);
  border: 2px rgb(250, 179, 0) solid;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgb(0 0 0 / 15%);
  overflow: scroll;
}

.editForm-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.editForm-title {
  color: rgb(250, 179, 0);
  font-weight: 600;
  font-size: 25px;
  padding: 19px 0px 13px 30px;
}

.editForm-close {
  color: rgb(250, 179, 0);
  font-weight: 600;
  font-size: 25px;
  padding: 19px 21px 13px 0px;
}

.editForm-close span:hover {
  color: rgb(250, 104, 0);
  cursor: pointer;
}

.editForm-hr {
  width: 100%;
  height: 2px;
  background-color: rgb(250, 179, 0);
  margin: 10px auto;
}

.editForm-inputList {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 30px;
}

.editForm-inputList div {
  margin: 22px 0;
}

.editForm-inputList span {
  display: block;
  padding-bottom: 10px;
  color: rgb(250, 179, 0);
}

.editForm-applicant input,
.editForm-score input,
.editForm-submissionDate input,
.editForm-submissionTime input {
  width: 450px;
  height: 28px;
  border: 1px rgb(250, 179, 0) solid;
  border-radius: 4px;
}

.editForm-applicant input:hover {
  border: 1px rgb(250, 104, 0) solid;
}

.editForm-description textarea {
  width: 450px;
  height: 90px;
  resize: none;
  border: 1px rgb(250, 179, 0) solid;
}

.editForm-description textarea:hover {
  border: 1px rgb(250, 104, 0) solid;
}

.editForm-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}

.editForm-bottom-cancelBtn {
  margin-left: 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  padding: 8px 14px;
  color: rgb(250, 179, 0);
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(250, 179, 0);
}

.editForm-bottom-cancelBtn:hover {
  background-color: rgb(151, 63, 0);
  color: rgb(255, 255, 255);
  border: 1px solid rgba(250, 104, 0, 0.335);
  transition-duration: .5s;
}

.editForm-bottom-submitBtn {
  margin-left: 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  padding: 8px 14px;
  background-color: rgb(250, 179, 0);
  border: none;
  color: rgb(255, 255, 255);
}

.editForm-bottom-submitBtn:hover {
  background-color: rgb(250, 104, 0);
  transition-duration: .5s;
}
</style>