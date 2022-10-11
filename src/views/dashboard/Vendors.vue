<template>
  <div class="d-flex jc-between ai-center">
    <h2>Vendors</h2>
    <TheButton @click="showModal = true">Add New</TheButton>
  </div>
  <div class="text-center" v-if="gettingVendors">Looding...</div>
  <table class="mt-3" v-else>
    <thead>
      <tr>
        <th>Name</th>
        <th>Description</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="vendor in vendors" :key="vendor.name">
        <td>{{ vendor.name }}</td>
        <td>{{ vendor.description }}</td>
        <td>
          <img
            src="/img/edit.png"
            @click="
              editItem = vendor;
              showEditModal = true;
            "
            class="action-icon"
          />
          <img
            src="/img/trash.png"
            @click="
              editItem = vendor;
              showDeleteModal = true;
            "
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
  <TheModal v-model="showEditModal" heading="Edit Vendor">
    <form @submit.prevent="updateVendor">
      <label class="block">Vandor Name</label>
      <input
        type="text"
        class="w-100 mt-1"
        placeholder="Enter vendor name"
        v-model.lazy="editItem.name"
        required
      />
      <label class="block mt-3">Vandor Description</label>
      <input
        type="text"
        class="w-100 mt-1"
        placeholder="Enter vendor description"
        v-model.lazy="editItem.description"
        required
      />
      <TheButton class="mt-4 w-100" :loding="editing">Save change</TheButton>
    </form>
  </TheModal>
  <TheModal v-model="showDeleteModal" heading="Are you sure?">
    <p>
      Do you really want to delete <strong>{{ editItem.name }}</strong>
    </p>
    <TheButton
      @click="
        deleteVendor();
        showDeleteModal = false;
      "
      class="mt-4"
      >Yes</TheButton
    >
    <TheButton @click="showDeleteModal = false" class="ml-2" color="gray"
      >No</TheButton
    >
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
    vendors: [],
    gettingVendors: false,
    showEditModal: false,
    editItem: {},
    editing: false,
    showDeleteModal: false,
    deleting: false,
  }),
  components: {
    TheButton,
    TheModal,
  },
  mounted() {
    this.allVendors();
  },
  methods: {
    resetForm() {
      this.newVendor = { name: "", description: "" };
    },
    addVendor() {
      this.looding = true;
      axios
        .post("http://127.0.0.1:8000/api/auth/vendor/create", this.newVendor, {
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
          this.allVendors();
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
          this.showModal = false,
        });
    },
    updateVendor() {
      this.editing = true;
      axios
        .post(
          "http://127.0.0.1:8000/api/auth/vendor/update/" + this.editItem.id,
          this.editItem,
          {
            headers: {
              authorization: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((res) => {
          // console.log(res);
          this.$eventBus.emit("toast", {
            type: res.data.status,
            message: res.data.message,
          });
          // this.resetForm();
          this.allVendors();
        })
        .catch((err) => {
          // console.log(err);
          this.$eventBus.emit("toast", {
            type: "Error",
            message: err.response.data.message,
          });
          this.allVendors();
        })
        .finally(() => {
          this.editing = false;
          this.showEditModal = false;
        });
    },
    deleteVendor() {
      this.deleting = true;
      axios
        .delete(
          "http://127.0.0.1:8000/api/auth/vendor/delete/" + this.editItem.id,
          {
            headers: {
              authorization: localStorage.getItem("accessToken"),
            },
          }
        )
        .then((res) => {
          // console.log(res);
          this.$eventBus.emit("toast", {
            type: res.data.status,
            message: res.data.message,
          });
          // this.resetForm();
          this.allVendors();
        })
        .catch((err) => {
          // console.log(err);
          this.$eventBus.emit("toast", {
            type: "Error",
            message: err.response.data.message,
          });
        })
        .finally(() => {
          this.deleting = false;
          this.showDeleteModal = false;
        });
    },
    allVendors() {
      this.gettingVendors = true;
      axios
        .get("http://127.0.0.1:8000/api/auth/vendors", {
          headers: {
            authorization: localStorage.getItem("accessToken"),
          },
        })
        .then((res) => {
          // console.log(res);
          this.vendors = res.data.data;
        })
        .catch((err) => {
          // console.log(err);
          this.$eventBus.emit("toast", {
            type: "Error",
            message: err.response.data.message,
          });
        })
        .finally(() => {
          this.gettingVendors = false;
        });
    },
  },
};
</script>
