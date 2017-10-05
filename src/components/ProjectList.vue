<template>
    <div class="value">
        <div class="heading">
            <navbar></navbar>
        </div>
        <div class="content">
            <form>
                <vue-form-generator :schema="schema" :model="model" :options="formOptions"></vue-form-generator>
            </form>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Navbar from './Navbar.vue'
    import VueFormGenerator from "vue-form-generator"

    Vue.use(VueFormGenerator);

    export default {
      data: () => {
          return {
            model: {             
              name: "",
              description: "",
            },      
            schema: {
              fields: [{
                type: "input",
                inputType: "text",
                label: "Name",
                model: "name",
                min: 5,
                placeholder: "Project name",
                featured: true,
                required: true,
                hint: "Minimum 5 characters",
                validator: VueFormGenerator.validators.string
              },{
                type: "input",
                inputType: "text",
                label: "Description",
                model: "description",
                min: 25,
                placeholder: "Project description",
                required: true,
                hint: "Minimum 25 characters",
                validator: VueFormGenerator.validators.string
              },
              {
                type: "submit",
                label: "",
                buttonText: "Submit",
                validateBeforeSubmit: true,
                onSubmit: () => {
                    console.log('aaa')
                }
              }]
            },
            formOptions: {
              validateAfterChanged: true
            }
          }
      },
      components: {
          Navbar,
      },
    }
</script>

<style lang="scss">
   
</style>