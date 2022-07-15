<script setup>

import { reactive, ref, toRef, toRefs } from "vue";
import { onMounted, onBeforeMount } from 'vue'

import Search from "./components/Search.vue";
import EntryList from "./components/EntryList.vue";
import AddForm from "./components/AddForm.vue";
import useFilter from "./hooks/useFilter.js";

let state = reactive({
  allEntries: [],
  showAddForm: false,
  searchInput: '',
  sortBy: 'Applicant',
  sortOrder: 'Ascending',
  newAllEntries: [],
  isShowAddForm: false,
})

// let allEntries = reactive([]);
// let isShowAddForm = ref(false);
// let searchInput = ref('')
// let sortBy = ref('Applicant')
// let sortOrder = ref('Ascending')
// let newAllEntries = reactive([])

// console.log(allEntries);
// console.log(toRef(state,'allEntries'));
// console.log(toRef(state,'allEntries').value);

let filterParams = {
  data: toRef(state,'allEntries').value,
  keyword: toRef(state,'searchInput'),
  sortBy: toRef(state,'sortBy'),
  sortOrder: toRef(state,'sortOrder'),
}
// let filterParams = {
//   data: allEntries,
//   keyword: searchInput,
//   sortBy,
//   sortOrder,
// }

const getAllEntries = () => {
  fetch("http://localhost:3030/api/entries")
    .then(request => request.json())
    .then(data => {
      state.allEntries = data
      state.newAllEntries = useFilter(filterParams)
    })
}

const showAddForm = () => {
  state.isShowAddForm = true
}

const closeForm = () => {
  state.isShowAddForm = false
}

const handleSearchInput = (e) => {
  state.searchInput = e.target.value
  state.newAllEntries = useFilter(state)
}

const handleSortBy = (e) => {
  state.sortBy = e.target.value
  state.newAllEntries = useFilter(state)
}

const handleSortOrder = (e) => {
  state.sortOrder = e.target.value
  state.newAllEntries = useFilter(state)
}

onBeforeMount(() => {
  getAllEntries()
})

</script>
      
<template>
  <div class="app">
    <div class="title">
      <span>Design Competition Manager</span>
    </div>

    <div class='app-hr'></div>

    <div class='search'>
      <Search @searchInput="handleSearchInput" :sortBy="handleSortBy" :sortOrder="handleSortOrder" />
    </div>

    <div class="addBtnDiv">
      <div class="addBtn" @click="showAddForm">
        + Add Entry
      </div>
    </div>

    <EntryList :allEntries="state.newAllEntries" :getAllEntries="getAllEntries" :searchInput="state.searchInput" :sortBy="state.sortBy"
      :sortOrder="state.sortOrder" />

    <AddForm v-if="state.isShowAddForm" :closeForm="closeForm" :getAllEntries="getAllEntries" />
  </div>
</template>


<style scoped>
.app {
  width: 1150px;
  margin: 10px auto;
  border: rgb(250, 179, 0) 2px solid;
  border-radius: 20px;
  background-color: rgb(255, 255, 255);
}

.title {
  text-align: center;
  color: rgb(250, 179, 0);
}

.title span {
  font-size: 55px;
  font-weight: 600;
}

.app-hr {
  width: 100%;
  height: 2px;
  background-color: rgb(250, 179, 0);
  margin: 10px auto;
}

.search2 {
  margin: 8px auto;
}

.addBtnDiv {
  margin: 10px auto;
  display: flex;
  justify-content: center;
}

.addBtn {
  width: 95%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: rgb(250, 179, 0);
  border: 1px dashed rgb(250, 179, 0);
}

.addBtn:hover {
  color: rgb(250, 104, 0);
  border: 1px dashed rgb(250, 104, 0);
  transition-duration: .5s;
  cursor: pointer;
}
</style>