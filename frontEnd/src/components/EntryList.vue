
<script setup>

import { reactive } from "vue";
import EditForm from "./EditForm.vue";

const props = defineProps({
  allEntries: Array,
  getAllEntries: Function,
  searchInput: String,
  sortBy: String,
  sortOrder: String,
})

const state = reactive({
  showEditForm: false,
  editFormData: {},
})

const deleteEntry = (entryId) => {
  console.log("delete");
  fetch(`http://localhost:3030/api/entry/${entryId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(request => request.json())
    .then(() => {
      props.getAllEntries()
    })
}

const showEditForm = (params) => {
  state.editFormData = params
  state.showEditForm = true
}

const closeEditForm = () => {
  state.showEditForm = false
}

</script>

<template>
  <div class="table">
    <table>
      <tbody>
        <tr>
          <th>NO.</th>
          <th>Applicant</th>
          <th>Description</th>
          <th>Submission Time</th>
          <th>Score</th>
          <th>Actions</th>
        </tr>
        <tr v-for="(item, index) in allEntries" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.applicant }}</td>
          <td>{{ item.description }}</td>
          <td>{{ item.datetime_submitted }}</td>
          <td>{{ item.score == null ? "Not Scored" : item.score }}</td>
          <td class="actions">
            <div class="editBtn" @click="showEditForm({
              id: item.id,
              applicant: item.applicant,
              description: item.description,
              submissionDate: item.datetime_submitted.slice(0, 10),
              submissionTime: item.datetime_submitted.slice(11, 16),
              score: item.score
            })">Edit</div>
            <div class="deleteBtn" @click="deleteEntry(item.id)">Delete</div>
          </td>
        </tr>
      </tbody>
    </table>
    <EditForm 
      v-if="state.showEditForm"
      :closeEditForm="closeEditForm" :editFormData="state.editFormData" 
      :getAllEntries="props.getAllEntries" 
    />
  </div>
</template>

<style scoped>
tr {
  border-right: none;
  border-left: none;
  border-top: 1px solid rgb(250, 179, 0);
}

table tr:last-child {
  border-bottom: 1px solid rgb(250, 179, 0);
}

th {
  text-align: center;
  height: 50px;
  background-color: rgba(252, 221, 143, 0.425);
  padding-left: 30px;
  padding-right: 30px;
  color: rgb(250, 179, 0);
}

td {
  text-align: center;
  height: 70px;
  padding-left: 30px;
  padding-right: 30px;
}

table {
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0px;
  margin-bottom: 30px;
}

.actions {
  display: flex;
  justify-content: center;
  align-items: center;
}

.editBtn,
.deleteBtn {
  width: 60px;
  cursor: pointer;
  color: rgb(250, 179, 0);
}

.editBtn:hover,
.deleteBtn:hover {
  color: rgb(250, 104, 0);
  transition-duration: .5s;
}
</style>