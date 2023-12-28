<template>
  <div class="d-flex jc-between ai-center">
    <h2>Drugs</h2>
    <TheButton @click="showModal = true">Add New</TheButton>
  </div>
  <div v-if="gettingDrugs">Looding...</div>
  <table class="mt-3 text-center" v-else>
    <thead>
      <tr>
        <th>NO</th>
        <th>Name</th>
        <th>Drug</th>
        <th>Type</th>
        <th>Weight</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(drug, index) in drugs" :key="drug.name">
        <td>{{ index + 1 }}</td>
        <td>{{ drug.name }}</td>
        <td>{{ drug.vendor }}</td>
        <td>{{ drug.type }}</td>
        <td>{{ drug.weight }}</td>
        <td>{{ drug.price }}</td>
        <td>{{ drug.quantity }}</td>
        <td class="text-center">
          <img
            src="/img/edit.png"
            @click="
              editItem = drug;
              showEditModal = true;
            "
            class="action-icon"
          />
          <img
            src="/img/trash.png"
            @click="
              editItem = drug;
              showDeleteModal = true;
            "
            class="action-icon action-icon--delete ml-3"
          />
        </td>
      </tr>
    </tbody>
  </table>
  <TheModal v-model="showModal" :heading="modalHeading">
    <form @submit.prevent="addDrug">
      <label class="block">Drug Type</label>
      <div class="mt-1">
        <label>
          <input
            type="radio"
            name="type"
            value="Tab"
            v-model.lazy="newDrug.type"
          />
          Tab
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="Capsule"
            v-model.lazy="newDrug.type"
          />
          Capsule
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="Syrup"
            v-model.lazy="newDrug.type"
          />
          Syrup
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="Suppository"
            v-model.lazy="newDrug.type"
          />
          Suppository
        </label>
      </div>
      <label class="block mt-3">Drug</label>
      <select class="mt-1" v-model.lazy="newDrug.vendor_id">
        <option value="">Select Drug</option>
        <option v-for="vendor in vendors" :key="vendor.name" :value="vendor.id">{{vendor.name}}</option>
      </select>
      <label class="block mt-3">Drug Name</label>
      <input
        type="text"
        class="w-100 mt-1"
        placeholder="Enter vendor name"
        v-model.lazy="newDrug.name"
        required
      />
      <label class="block mt-3">Weight</label>
      <input
      type="text"
      class="w-100 mt-1"
      placeholder="Enter Drug Weight"
      v-model.lazy="newDrug.weight"
      required
      />
      <label class="block mt-3">Price</label>
      <input
        type="number"
        class="w-100 mt-1"
        placeholder="Enter Drug Price"
        v-model.lazy="newDrug.price"
        step="0.01"
        required
      />
      <label class="block mt-3">Quantity</label>
      <input
        type="number"
        class="w-100 mt-1"
        placeholder="Enter Drug Quantity"
        v-model.lazy="newDrug.quantity"
        required
      />
      <TheButton class="mt-4 w-100" :loding="looding">Add</TheButton>
    </form>
  </TheModal>
  <TheModal v-model="showEditModal" heading="Edit Drug">
    <form @submit.prevent="updateDrug">
      <label class="block">Drug Type</label>
      <div class="mt-1">
        <label>
          <input
            type="radio"
            name="type"
            value="Tab"
            v-model.lazy="editItem.type"
          />
          Tab
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="Capsule"
            v-model.lazy="editItem.type"
          />
          Capsule
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="Syrup"
            v-model.lazy="editItem.type"
          />
          Syrup
        </label>
        <label>
          <input
            type="radio"
            name="type"
            value="Suppository"
            v-model.lazy="editItem.type"
          />
          Suppository
        </label>
      </div>
      <label class="block mt-3">Drug</label>
      <select class="mt-1" v-model.lazy="editItem.vendor_id">
        <option value="">Select Drug</option>
        <option v-for="vendor in vendors" :key="vendor.name" :value="vendor.id">{{vendor.name}}</option>
      </select>
      <label class="block">Drug Name</label>
      <input
        type="text"
        class="w-100 mt-1"
        placeholder="Enter vendor name"
        v-model.lazy="editItem.name"
        required
      />
      <label class="block mt-3">Weight</label>
      <input
      type="text"
      class="w-100 mt-1"
      placeholder="Enter Drug Weight"
      v-model.lazy="editItem.weight"
      required
      />
      <label class="block mt-3">Price</label>
      <input
        type="number"
        class="w-100 mt-1"
        placeholder="Enter Drug Price"
        v-model.lazy="editItem.price"
        step="0.01"
        required
      />
      <label class="block mt-3">Quantity</label>
      <input
        type="number"
        class="w-100 mt-1"
        placeholder="Enter Drug Quantity"
        v-model.lazy="editItem.quantity"
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
        deleteDrug();
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
    modalHeading: "Add New Drug",
    newDrug: {
      name: "",
      vendor_id: "",
      type: "",
      weight: "",
      price: "",
      quantity: "",
    },
    looding: false,
    drugs: [],
    vendors: [],
    gettingDrugs: false,
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
    this.allDrugs();
    this.allVendors();
  },
  methods: {
    resetForm() {
      this.newDrug = { 
        name: "",
        vendor_id: "",
        type: "",
        weight: "",
        price: "",
        quantity: ""
       };
    },
    addDrug() {
      this.looding = true;
      privateService.create('/drug/create', this.newDrug)
        .then((res) => {
          if(res.data.status === 'success'){
            showSuccessMessage(res.data.message);
          }else{
            showErrorMessage(res.data.message);
          }
          this.allDrugs();
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
    updateDrug() {
      this.editing = true;
      privateService.update("/drug/update/"+this.editItem.id, this.editItem)
        .then((res) => {
          if(res.data.status == "success"){
            showSuccessMessage(res.data.message);
          }else{
            showErrorMessage(res.data.message);
          }
          // this.resetForm();
          this.allDrugs();
        })
        .catch((err) => {
          showErrorMessage(err.response.data.message);
          this.allDrugs();
        })
        .finally(() => {
          this.editing = false;
          this.showEditModal = false;
        });
    },
    deleteDrug() {
      this.deleting = true;
      privateService.delete("/drug/delete/" + this.editItem.id)
        .then((res) => {
          if(res.data.status == "success"){
            showSuccessMessage(res.data.message);
          }else{
            showErrorMessage(res.data.message);
          }
          // this.resetForm();
          this.allDrugs();
        })
        .catch((err) => {
          showErrorMessage(err.response.data.message);
        })
        .finally(() => {
          this.deleting = false;
          this.showDeleteModal = false;
        });
    },
    allDrugs() {
      this.gettingDrugs = true;
      privateService.getAll('/drugs')
      .then((res) => {
          this.drugs = res.data.data;
        })
        .catch((err) => {
          showErrorMessage(err.response.data.message);
        })
        .finally(() => {
          this.gettingDrugs = false;
        });
    },
    allVendors() {
      privateService.getAll('/vendors')
      .then((res) => {
          this.vendors = res.data.data;
        })
        .catch((err) => {
          showErrorMessage(err.response.data.message);
        })
        .finally(() => {
          this.gettingDrugs = false;
        });
    },
  },
};
</script>
