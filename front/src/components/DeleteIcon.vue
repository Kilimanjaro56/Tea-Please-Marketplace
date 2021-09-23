<template>
  <!--delete front end - Annabel-->
  <!-- Duplicated for Icon only - Keely, all code is Annabels -->
  <div
    class="delete-function"
    @click="confirmDelete"
  >
    <div class="bin">
      <i class="far fa-trash-alt" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Delete',
  props: {
    listingId: String,
  },
  methods: {
    confirmDelete() {
      const answerToDelete = confirm('Are you sure you want to delete this listing? This action cannot be undone.');
      if (answerToDelete) {
        this.handleDelete();
      }
    },
    async handleDelete() {
      await fetch(`http://localhost:3000/listings/edit/${this.listingId}`, {
        method: 'DELETE',
      }).then((response) => {
        if (response.status === 200) this.$router.push('/listings');
      });
    },
  },

};
</script>

<style scoped>

.delete-function {
  display: flex;
  flex-direction: column;
  margin-left: 8vw;
}

i{
  color: #A26360;
  margin: auto;
  font-size: 1.2em
};
</style>
