
<template>
<div>
  <header class="headertop">
    <div>
      <img class="logotop" src="../assets/mojob.png" alt="logo"/>
    </div>
  </header>
<section class="m-wid-md">
        <div class="m-flex m-items-center m-justify-between">
            <div class="form-group widthboxfilter">
            <treeselect :disable-branch-nodes="true"
              :show-count="true"
              placeholder="FILTER BY POSITION"
              v-on:select="fetchJobByPositionFunction($event)"
             :options="options" >
             </treeselect>
            </div>
            <div class="form-group">
                <select id="pageSize" @change="fetchJobBySize($event)">
                    <option value="5">5 per page</option>
                    <option value="25">25 per page</option>                   
                    <option value="">Display all</option>
                </select>
            </div>
        </div>
    <job-feed
      v-if="apiDone === true && apiDone1 === true"
      :job-listing="JobListingFilters"
      :position-functions="positionFunctionFilters"
    />
</section>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import JobFeed from '@/components/JobFeed.vue';
import BaseApi from '@/api-requests/api';
import { IPage, JobListing, PositionFunction } from '@/models/models';
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'

@Component({
  components: {
    JobFeed,
    Treeselect,

  },
  data () {
    return {
        size: 5,
        position_filter: NaN,
        options: []    
    }
  },
  methods: {
    fetchJobBySize(event) {
      if (event){
        this.size = event.target.value
      }      
      this.fetchJobList()
    },

    fetchJobByPositionFunction(event) {
      if (event){
        this.position_filter = event.id
      }      
      this.fetchJobList()
    },
    async fetchJobList(){
      if (this.position_filter){
          this.jobListApi = new BaseApi(
          `https://test-api.mojob.io/public/job/listings/?include_open=False&page=1&position_functions=${this.position_filter}&page_size=${this.size}&use_mojob_feed_filter=True&use_pagination=True`,
            this.axios
          );
          }
      else{
          this.jobListApi = new BaseApi(
            `https://test-api.mojob.io/public/job/listings/?include_open=False&page=1&page_size=${this.size}&use_mojob_feed_filter=True&use_pagination=True`,
            this.axios
          );
      }
      try {
        const jobListPage: IPage<JobListing> =
          await this.jobListApi.getJobListing();

        if (jobListPage.results) {
          this.JobListingFilters = jobListPage.results;
          this.apiDone1 = true
        } else {
          console.log('Failed loading job listing api');
        }
      }
      catch (e) {
        console.log('Failed loading job listing api');
        console.log(e);
    }
    },
    async FetchPositionFunctionList(){
      this.mojobApi = new BaseApi(
        `https://test-api.mojob.io/public/`,
        this.axios
      );
     
      try{
          const jobLocationFiltersResponsePage: IPage<PositionFunction> =
          await this.mojobApi.getPositionFunctions();
        
        if (jobLocationFiltersResponsePage.results) {
          this.positionFunctionFilters = jobLocationFiltersResponsePage.results;
          this.apiDone = true
          this.option_list = [];
          this.positionFunctionFilters.forEach(async (parent_obj: { id: any; name: any; children: any[]; }) => {
              let parent_data = {}  
              let children_option_list: {}[] = []
              parent_data['id'] = parent_obj.id;
              parent_data['label'] = parent_obj.name
              if (parent_obj.children){
                parent_obj.children.forEach(async (child_obj: { id: any; name: any; }) =>{
                  let children_data = {}
                  debugger
                  if (parent_obj.name != child_obj.name){
                    children_data['id'] = child_obj.id;
                    children_data['label'] = child_obj.name
                    children_option_list.push(children_data)
                  }
                })
                if (children_option_list.length !=0 ){
                parent_data['children'] =  children_option_list
                }                
              }
              this.option_list.push(parent_data)

          })
        } else {
          console.log('Failed loading position function filters');
        }
      }
      catch(e){
        console.log('Failed loading position function filters');
        console.log(e);
      }
      console.log(this.option_list)
      const option = this.option_list
      this.options = option 

    }
  },
},
 )
export default class Home extends Vue {
  private mojobApi: BaseApi | null = null;
  private jobListApi: BaseApi | null = null;
  public positionFunctionFilters: PositionFunction[] = [];
  public JobListingFilters: JobListing[] = [];
  public apiDone: boolean=false;
  public apiDone1: boolean=false;
  public async mounted(){
    this.fetchJobList()
    this.FetchPositionFunctionList()
  }
}
</script>
<style>
.headertop {
    padding: 10px 15px;
    background-color: #fff;
    text-align: left;
        display: flex;
    align-items: center;
    justify-content: space-between;

}
.logotop{
  width: 100px;
}
.widthboxfilter{
  max-width: 300px;
}
</style>