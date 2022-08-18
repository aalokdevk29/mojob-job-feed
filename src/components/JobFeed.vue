<template>
    <div v-if="jobListing.length">
      <JobCard v-for="(job, index) in jobListing" :key="index" :job="job" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import JobCard from '@/components/JobCard.vue';
import { JobListing, PositionFunction } from '@/models/models';

@Component({
  components: {
    JobCard,
  },
})

export default class JobFeed extends Vue {
 @Prop({ default: () => [], type: Array as () => JobListing[] })
 public jobListing!: JobListing[]
}

</script>

<style>
body {
    font-family: 'Open Sans', sans-serif;
    background-color: #fafdfd;
    margin: 0;
}
header {
    padding: 10px 15px;
    background-color: #fff;
}
.m-flex {
    display: flex;
} 
.m-items-center {
    align-items: center;
}
.m-justify-between {
    justify-content: space-between;
}
.m-wh-box {
    color: #b0b0b0;
    padding: 15px;
    margin: 15px 0;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0 2px 5px #ccc;
}
.m-wh-box h4 {
    padding: 0 8px;
    margin: 0;
    color: #303030;
    margin: 0 0 5px 0;
    font-size: 18px;
}
.m-wh-box ul {
    padding: 0 8px;
    margin: 0;
}
.m-wh-box ul li,
.m-wh-box p {
    font-size: 14px;
    margin: 0;
}
.m-wh-box ul li {
    display: inline;
    padding: 0 5px 0 15px;
    position: relative;
}
.m-wh-box ul li::before {
    content: '';
    position: absolute;
    height: 6px;
    width: 6px;
    background-color: #b0b0b0;
    border-radius: 50%;
    top: 7px;
    left: 2px;
}
.m-wid-md {
    padding: 20px;
    width: 90%;
    margin: 0 auto;
    max-width: 1280px;
}
.form-group select {
    border: none;
    font-size: 12px;
    text-transform: uppercase;
    font-weight: 600;
    background-color: transparent;
    font-family: 'Open Sans', sans-serif;
}
.form-group select:focus {
    border: none;
    outline: none;
}
@media (max-width: 480px) {
    .m-resp-block,
    .m-resp-block .m-flex {
        display: block;
        padding: 0;
    }
    .m-resp-block ul li {
        display: block;
    }
}
</style>
</style>
