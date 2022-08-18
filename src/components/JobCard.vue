<template>
  <div class="m-wh-box">
    <h4 class="m-flex m-resp-block">{{job.job.title}}</h4>
    <div class="m-flex m-resp-block">
        <p>{{job.job.unit.display_name}} </p>
        <ul class="m-flex m-items-center">
            <li>{{job.job.position_function.name_en}}</li>
            <li>{{formatDate(job.job.due_date)}}</li>
        </ul>
    </div>
  </div>
</template>

<script lang="ts">

import { format } from "date-fns"

export default {
  props: {
    job: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatDate(strDate) {
      return format(new Date(strDate), "MMMM do, yyyy")
    },
  },
}
</script>


