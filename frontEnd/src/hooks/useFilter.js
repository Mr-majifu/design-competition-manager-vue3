
import { reactive } from "vue";

export default function ({ data, keyword, sortBy, sortOrder }) {
  console.log(data, keyword, sortBy, sortOrder);

  let newAllEntries = reactive([])

  newAllEntries = search(data, keyword)

  console.log(newAllEntries);
  filterFun(sortBy, sortOrder, newAllEntries)

  return newAllEntries
}

const search = (arr, value) => {
  return arr.filter(item => item.applicant.includes(value));
}

// 策略模式，对象映射，去掉了臃肿的 if-else
const filterFun = (sortBy, sortOrder, newData) => {
  console.log(sortBy,sortOrder);
  return filterProcessor[`${sortBy}_${sortOrder}`](newData)
}

const filterProcessor = {
  'Applicant_Ascending': (newData) => {
    return newData.sort((entry1, entry2) => {
      if (entry1.applicant < entry2.applicant)
        return -1;
      if (entry1.applicant > entry2.applicant)
        return 1;
      return 0
    });
  },
  'Submission_Ascending': (newData) => {
    newData.sort((entry1, entry2) => {
      if (entry1.datetime_submitted < entry2.datetime_submitted)
        return -1;
      if (entry1.datetime_submitted > entry2.datetime_submitted)
        return 1;
      return 0
    });
  },
  'Score_Ascending': (newData) => {
    newData.sort((entry1, entry2) => {
      if (entry1.score < entry2.score)
        return -1;
      if (entry1.score > entry2.score)
        return 1;
      return 0
    });
  },
  'Applicant_Descending': (newData) => {
    newData.sort((entry1, entry2) => {
      if (entry1.applicant < entry2.applicant)
        return 1;
      if (entry1.applicant > entry2.applicant)
        return -1;
      return 0
    });
  },
  'Submission_Descending': (newData) => {
    newData.sort((entry1, entry2) => {
      if (entry1.datetime_submitted < entry2.datetime_submitted)
        return 1;
      if (entry1.datetime_submitted > entry2.datetime_submitted)
        return -1;
      return 0
    });
  },
  'Score_Descending': (newData) => {
    newData.sort((entry1, entry2) => {
      if (entry1.score < entry2.score)
        return 1;
      if (entry1.score > entry2.score)
        return -1;
      return 0
    });
  },
}