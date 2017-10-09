<script>
  import { Doughnut } from 'vue-chartjs'
  
  export default Doughnut.extend({
    props: ['stats', 'labels', 'availableColors'],
    data () {
      return {
        datacollection: {
          labels: this.labels, 
          datasets: [
            {
              label: 'Languages',
              backgroundColor: this.availableColors,
              pointBackgroundColor: 'white',
              borderWidth: 1,
              pointBorderColor: '#249EBF',
              data: this.stats
            },
          ]
        },
        options: {
          scales: {
            yAxes: [],
            xAxes: []
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
    //renderChart function renders the chart with the datacollection and options object.
      this.renderChart(this.datacollection, this.options)
    }
  })
</script>