<template>
  <div class="d-flex jc-between ai-center">
    <h2>Vendors</h2>
    <TheButton @click="showModal = true">Add New</TheButton>
  </div>
  <table class="mt-3">
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="i in 9" :key="i">
        <td>name</td>
        <td>description</td>
        <td>
          <img src="/img/edit.png" alt="" class="action-icon" />
          <img
            src="/img/trash.png"
            alt=""
            class="action-icon action-icon--delete ml-3"
          />
        </td>
      </tr>
    </tbody>
  </table>
  <TheModal v-model="showModal" :heading="modalHeading">
    <form @submit.prevent="addVendor">
      <label class="block">Vandor Name</label>
      <input
        type="text"
        class="w-100 mt-1"
        placeholder="Enter vendor name"
        v-model="newVendor.name"
        required
      />
      <label class="block mt-3">Vandor Description</label>
      <input
        type="text"
        class="w-100 mt-1"
        placeholder="Enter vendor description"
        v-model="newVendor.description"
        required
      />
      <TheButton class="mt-4 w-100" :loding="looding">Add</TheButton>
    </form>
  </TheModal>
</template>
<script>
import axios from "axios";
import TheButton from "../../components/TheButton.vue";
import TheModal from "../../components/TheModal.vue";
export default {
  data: () => ({
    showModal: false,
    modalHeading: "Add New Vendor",
    newVendor: {
      name: "",
      description: "",
    },
    looding: false,
  }),
  components: {
    TheButton,
    TheModal,
  },
  methods: {
    resetForm() {
      this.newVendor = { name: "", description: "" };
    },
    addVendor() {
      // console.log(this.newVendor);
      this.looding = true;
      axios
        .post("http://127.0.0.1:8000/api/vendor/create", this.newVendor, {
          headers: {
            authorization: localStorage.getItem("accessToken"),
          },
        })
        .then((res) => {
          // console.log(res);
          this.$eventBus.emit("toast", {
            type: res.data.status,
            message: res.data.message,
          });
          this.resetForm();
        })
        .catch((err) => {
          // console.log(err);
          this.$eventBus.emit("toast", {
            type: "Error",
            message: err.response.data.message,
          });
        })
        .finally(() => {
          this.looding = false;
        });
    },
  },
};
</script>
