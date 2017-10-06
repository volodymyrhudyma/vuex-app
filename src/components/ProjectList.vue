<template>
   <div class="flex-wrapper">
      <div class="add-section">
        <md-button class="md-icon-button md-raised md-primary">
          <md-icon>add</md-icon>
        </md-button>
      </div>
      <div class="list-section">
        <div class="phone-viewport">
          <md-list class="custom-list md-triple-line">
            <md-list-item>
              <md-avatar>
                <img src="https://placeimg.com/40/40/people/1" alt="People">
              </md-avatar>

              <div class="md-list-text-container">
                <span>Project 1</span>
                <span>Description</span>
                <p>
                  <md-chip class="md-default">Tag1</md-chip>
                  <md-chip class="md-default">Tag2</md-chip>
                </p>
              </div>

              <md-button class="md-icon-button md-list-action">
                <md-icon class="md-primary">done</md-icon>
              </md-button>

              <md-button class="md-icon-button md-list-action">
                <md-icon class="md-primary">star</md-icon>
              </md-button>

              <md-divider class="md-inset"></md-divider>
            </md-list-item>

            <md-list-item>
              <md-avatar>
                <img src="https://placeimg.com/40/40/people/6" alt="People">
              </md-avatar>

              <div class="md-list-text-container">
                <span>Project 2</span>
                <span>Description</span>
                <p>
                  <md-chip class="md-default">Tag1</md-chip>
                  <md-chip class="md-default">Tag2</md-chip>
                  <md-chip class="md-default">Tag3</md-chip>
                </p>
              </div>

              <md-button class="md-icon-button md-list-action">
                <md-icon>star_border</md-icon>
              </md-button>

              <md-divider class="md-inset"></md-divider>
            </md-list-item>
          </md-list>
        </div>
      </div>
    </div>
</template>

<script>
    import Vue from 'vue'

    export default {
      data: () => {
          return {}
      },
    }
</script>
