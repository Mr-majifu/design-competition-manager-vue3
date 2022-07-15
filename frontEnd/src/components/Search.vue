<template>
  <div class="searchList">
    <div class="search">
      <span>Search : </span>
      <!-- <input type="text" placeholder="Enter The Keyword" @change="searchHandle" /> -->
      <input type="text" placeholder="Enter The Keyword" @change="(e) => emit('searchInput',e)" />
    </div>
    <div class="sortBy">
      <span>Sort By : </span>
      <select @change="sortBy">
        <option>Applicant</option>
        <option>Submission</option>
        <option>Score</option>
      </select>
    </div>
    <div class="sortOrder">
      <span>Sort Order : </span>
      <select @change="sortOrder">
        <option>Ascending</option>
        <option>Descending</option>
      </select>
    </div>
  </div>
</template>

<script setup>

// import { emit } from "vue";

defineProps({
  // searchInput: Function,
  sortBy: Function,
  sortOrder: Function,
})

const emit = defineEmits([
  'searchInput',
])

// const searchHandle = (e) => {
//   emit('searchInput',e)
// }
</script>

<style scoped>
.searchList {
  margin: auto 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.searchList span {
  color: rgb(250, 179, 0);
}

.searchList input, .searchList select {
  width: 200px;
  height: 30px;
  border: 1px dashed rgb(250, 179, 0);
  text-align: center;
}

.searchList select:hover {
  cursor: pointer;
  border: 1px dashed rgb(250, 104, 0);
  transition-duration: .5s;
}

.searchList input:hover {
  border: 1px dashed rgb(250, 104, 0);
  transition-duration: .5s;
}
</style>