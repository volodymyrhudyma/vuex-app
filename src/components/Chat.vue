<template>
    <div class="flex-wrapper">
      
      <div class="dialogs">
          <div class="phone-viewport">
            <md-list class="custom-list md-triple-line">
              <md-list-item class="dialog">
                <md-avatar>
                  <img src="https://placeimg.com/40/40/people/1" alt="People">
                </md-avatar>

                <div class="md-list-text-container">
                  <span>Ali Connors</span>
                  <p>I'll be in your neighborhood doing errands...</p>
                </div>

                <md-button class="md-icon-button md-list-action">
                  <md-icon class="md-primary">star</md-icon>
                </md-button>

                <md-divider class="md-inset"></md-divider>
              </md-list-item>

              <md-list-item class="dialog">
                <md-avatar>
                  <img src="https://placeimg.com/40/40/people/6" alt="People">
                </md-avatar>

                <div class="md-list-text-container">
                  <span>me, Scott, Jennifer</span>
                  <p>Wish I could come, but I'm out of town ...</p>
                </div>

                <md-button class="md-icon-button md-list-action">
                  <md-icon>star_border</md-icon>
                </md-button>

                <md-divider class="md-inset"></md-divider>
              </md-list-item>

              <md-list-item class="dialog">
                <md-avatar>
                  <img src="https://placeimg.com/40/40/people/5" alt="People">
                </md-avatar>

                <div class="md-list-text-container">
                  <span>Sandra Adams</span>
                  <p>Do you have Paris recommendations ...</p>
                </div>

                <md-button class="md-icon-button md-list-action">
                  <md-icon>star_border</md-icon>
                </md-button>

                <md-divider class="md-inset"></md-divider>
              </md-list-item>

              <md-list-item class="dialog">
                <md-avatar>
                  <img src="https://placeimg.com/40/40/people/8" alt="People">
                </md-avatar>

                <div class="md-list-text-container">
                  <span>Trevor Hansen</span>
                  <p>Thank you for your recent order from ...</p>
                </div>

                <md-button class="md-icon-button md-list-action">
                  <md-icon>star_border</md-icon>
                </md-button>

                <md-divider class="md-inset"></md-divider>
              </md-list-item>
            </md-list>
          </div>
      </div>

      <div class="chat-area">
        <div class="messages-container">
          <div class="phone-viewport">
            <md-list class="messages-list">

              <md-list-item v-for="message in messages" :key="message">
                <md-avatar>
                  <img src="https://placeimg.com/40/40/people/5" alt="People">
                </md-avatar>
                <span>{{message}}</span>
                <span class="time">Now</span>
              </md-list-item>
            </md-list>
          </div>
        </div>
        <div class="write">
          Write
        </div>
      </div>

    </div>
</template>

<script>
    export default {
        data() {
          return {
            messages: [
              'First',
              'Second',
              'Third',
              'Fourth',
              'Fifth',
              'Sixth',
              'Seventh',
              'Eighth',
              'Ninth',
              'Tenth',
              '1',
              '2',
              '3',
              '4',
              '4',
              '4',
              '4',
              '4',
              '4',
              '4',
              '4',
              '4',
              '4',
            ]
          }
        }
    }
</script>