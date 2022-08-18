<template>
  <div
    class="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 justify-items-center">
    <JobCard v-for="(job, index) in jobList" :key="index" :job="job" />
  </div>
</template>

<script>

import JobCard from '@/components/JobCard.vue';
export default {
  props: {
    jobList: {
      type: Array,
      required: true,
    },
  },
  components: {
    JobCard,
  },
}
</script>