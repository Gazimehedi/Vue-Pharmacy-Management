<template>
  <div class="d-flex jc-between ai-center">
    <h2>Vendors</h2>
    <TheButton @click="showModal = true">Add New</TheButton>
  </div>
  <div class="text-center" v-if="gettingVendors">Looding...</div>
  <table class="mt-3" v-else>
    <thead>
      <tr>
        <th>NO</th>
        <th>Name</th>
        <th>Description</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(vendor, index) in vendors" :key="vendor.name">
        <td>{{ index + 1 }}</td>
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
import TheButton from "../../components/TheButton.vue";
import TheModal from "../../components/TheModal.vue";
import { showErrorMessage, showSuccessMessage } from '../../utils/functions';
import privateService from "./../../services/privateService";
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
      privateService.create('/vendor/create', this.newVendor)
        .then((res) => {
          if(res.data.status === 'success'){
            showSuccessMessage(res.data.message);
          }else{
            showErrorMessage(res.data.message);
          }
          this.allVendors();
          this.resetForm();
        })
        .catch((err) => {
          showErrorMessage(err.response.data.message);
        })
        .finally(() => {
          this.looding = false;
          this.showModal = false;
        });
    },
    updateVendor() {
      this.editing = true;
      privateService.update("/vendor/update/"+this.editItem.id, this.editItem)
        .then((res) => {
          if(res.data.status == "success"){
            showSuccessMessage(res.data.message);
          }else{
            showErrorMessage(res.data.message);
          }
          this.allVendors();
        })
        .catch((err) => {
          showErrorMessage(err.response.data.message);
          this.allVendors();
        })
        .finally(() => {
          this.editing = false;
          this.showEditModal = false;
        });
    },
    deleteVendor() {
      this.deleting = true;
      privateService.delete("/vendor/delete/" + this.editItem.id)
        .then((res) => {
          if(res.data.status == "success"){
            showSuccessMessage(res.data.message);
          }else{
            showErrorMessage(res.data.message);
          }
          // this.resetForm();
          this.allVendors();
        })
        .catch((err) => {
          showErrorMessage(err.response.data.message);
        })
        .finally(() => {
          this.deleting = false;
          this.showDeleteModal = false;
        });
    },
    allVendors() {
      this.gettingVendors = true;
      privateService.getAll('/vendors')
      .then((res) => {
          this.vendors = res.data.data;
        })
        .catch((err) => {
          showErrorMessage(err.response.data.message);
        })
        .finally(() => {
          this.gettingVendors = false;
        });
    },
  },
};
</script>
