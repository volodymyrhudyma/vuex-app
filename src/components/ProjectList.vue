<template>
   <div class="flex-wrapper">
      <div class="add-section">
        <md-button class="md-icon-button md-raised md-primary" @click="openDialog('addProject')">
          <md-icon>add</md-icon>
        </md-button>
      </div>
      <div class="list-section">
  
        <div class="phone-viewport">
          <md-bottom-bar md-theme="teal">
            <md-bottom-bar-item md-icon="history">Recents</md-bottom-bar-item>
            <md-bottom-bar-item md-icon="star" md-active>Favorites</md-bottom-bar-item>
            <md-bottom-bar-item md-icon="done">Completed</md-bottom-bar-item>
          </md-bottom-bar>
        </div>

        <div class="phone-viewport">
          <md-dialog md-open-from="#fab" md-close-to="#fab" ref="addProject">
            <md-dialog-title>Create new project</md-dialog-title>

            <md-dialog-content>
              <form>
                <md-input-container>
                  <label>Name</label>
                  <md-textarea></md-textarea>
                </md-input-container>
                <md-input-container>
                  <label>Description</label>
                  <md-textarea></md-textarea>
                </md-input-container>
              </form>
            </md-dialog-content>

            <md-dialog-actions>
              <md-button class="md-primary" @click="closeDialog('addProject')">Cancel</md-button>
              <md-button class="md-primary" @click="createProject()">Create</md-button>
            </md-dialog-actions>
          </md-dialog>

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

            <md-list-item>
              <md-avatar>
                <img src="https://placeimg.com/40/40/people/6" alt="People">
              </md-avatar>

              <div class="md-list-text-container">
                <span>Project 3</span>
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

            <md-list-item>
              <md-avatar>
                <img src="https://placeimg.com/40/40/people/6" alt="People">
              </md-avatar>

              <div class="md-list-text-container">
                <span>Project 4</span>
                <span>Description</span>
                <p>
                  <md-chip class="md-default">Tag1</md-chip>
                </p>
              </div>

              <md-button class="md-icon-button md-list-action">
                <md-icon>star_border</md-icon>
              </md-button>

              <md-divider class="md-inset"></md-divider>
            </md-list-item>

            <md-list-item>
              <md-avatar>
                <img src="https://placeimg.com/40/40/people/6" alt="People">
              </md-avatar>

              <div class="md-list-text-container">
                <span>Project 5</span>
                <span>Description</span>
              </div>

              <md-button class="md-icon-button md-list-action">
                <md-icon>star_border</md-icon>
              </md-button>

              <md-divider class="md-inset"></md-divider>
            </md-list-item>

            <md-list-item>
              <md-avatar>
                <img src="https://placeimg.com/40/40/people/6" alt="People">
              </md-avatar>

              <div class="md-list-text-container">
                <span>Project 6</span>
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
    export default {
      methods: {
        openDialog(ref) {
          this.$refs[ref].open();
        },
        closeDialog(ref) {
          this.$refs[ref].close();
        },
        onOpen() {
          console.log('Opened');
        },
        onClose(type) {
          console.log('Closed', type);
        },
        createProject() {
          console.log('createProject')
        }
      }
    };
</script>
